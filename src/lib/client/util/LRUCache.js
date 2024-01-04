/**
 * Symbol representing the next entry in the linked list.
 * @type {symbol}
 */
const NEXT = Symbol('next');

/**
 * Symbol representing the previous entry in the linked list.
 * @type {symbol}
 */
const PREV = Symbol('prev');

/**
 * Represents a Least Recently Used (LRU) Cache.
 */
class LRUCache {
  /**
   * Creates a new LRUCache instance.
   * @param {number} [limit=0] - The maximum number of entries the cache can hold.
   * @param {Iterable} [entries] - Initial entries to populate the cache.
   * @throws {Error} - If the limit is less than 0 during initialization.
   */
  constructor(limit = 0, entries) {
    if (limit < 0) {
      throw new Error('Limit must be a non-negative number');
    }

    this.size = 0;
    this.limit = limit;
    this.head = this.tail = undefined;
    this._keyMap = new Map();

    if (entries) {
      this._initialize(entries);
    }
  }

  /**
   * Creates a new cache entry.
   * @param {*} key - The key for the entry.
   * @param {*} value - The value for the entry.
   * @returns {Object} - The new cache entry.
   * @private
   */
  _createEntry(key, value) {
    return { key, value, [NEXT]: undefined, [PREV]: undefined };
  }

  /**
   * Initializes the cache with the provided entries.
   * @param {Iterable} entries - Initial entries to populate the cache.
   * @private
   */
  _initialize(entries) {
    this._keyMap.clear();
    for (const {key, value} of entries) {
      const entry = this._createEntry(key, value);
      this._keyMap.set(entry.key, entry);
      this._addToTail(entry);
    }
    this.size = this._keyMap.size;
  }

  /**
   * Adds an entry to the tail of the linked list.
   * @param {Object} entry - The entry to be added.
   * @private
   */
  _addToTail(entry) {
    if (this.tail) {
      this.tail[NEXT] = entry;
      entry[PREV] = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
  }

  /**
   * Moves the specified entry to the tail of the linked list.
   * @param {Object} entry - The entry to be moved.
   * @private
   */
  _moveEntryToTail(entry) {
    if (entry === this.tail) return;
    if (entry[PREV]) entry[PREV][NEXT] = entry[NEXT];
    if (entry[NEXT]) entry[NEXT][PREV] = entry[PREV];
    this._addToTail(entry);
  }

  /**
   * Retrieves the value associated with the given key.
   * @param {*} key - The key to look up in the cache.
   * @returns {*} - The value associated with the key, or `undefined` if not found.
   */
  get(key) {
    const entry = this._keyMap.get(key);
    if (entry) this._moveEntryToTail(entry);
    return entry ? entry.value : undefined;
  }

  /**
   * Sets the value for the given key in the cache.
   * @param {*} key - The key for the entry.
   * @param {*} value - The value for the entry.
   * @returns {LRUCache} - The LRUCache instance for method chaining.
   */
  set(key, value) {
    const entry = this._keyMap.get(key);

    if (entry) {
      entry.value = value;
    } else {
      this._evictIfLimitExceeded();
      const newEntry = this._createEntry(key, value);
      this._keyMap.set(key, newEntry);
      this._addToTail(newEntry);
      this.size++;
    }

    return this;
  }

  /**
   * Evicts the least recently used entry if the cache limit is exceeded.
   * @private
   */
  _evictIfLimitExceeded() {
    if (this.limit === 0) {
      throw new Error('Cannot add entries when the limit is set to 0');
    }

    if (this.size >= this.limit) {
      const entry = this.head;
      this.head = entry?.[NEXT];
      if (!this.head) {
        this.tail = undefined;
      } else {
        this.head[PREV] = undefined;
      }
      this._removeEntry(entry);
    }
  }

  /**
   * Deletes the entry with the specified key from the cache.
   * @param {*} key - The key of the entry to be deleted.
   * @returns {*} - The value of the deleted entry, or `undefined` if not found.
   */
  delete(key) {
    const entry = this._keyMap.get(key);
    if (entry) {
      this._removeEntry(entry);
      return entry.value;
    }
    return undefined;
  }

  /**
   * Removes an entry from the cache.
   * @param {Object} entry - The entry to be removed.
   * @private
   */
  _removeEntry(entry) {
    if (entry[PREV]) entry[PREV][NEXT] = entry[NEXT];
    if (entry[NEXT]) entry[NEXT][PREV] = entry[PREV];

    if (entry === this.head) this.head = entry[NEXT];
    if (entry === this.tail) this.tail = entry[PREV];

    entry[NEXT] = entry[PREV] = undefined;
    this._keyMap.delete(entry.key);
    this.size--;
  }

  /**
   * Clears the cache, removing all entries.
   */
  clear() {
    this._keyMap.clear();
    this.head = this.tail = undefined;
    this.size = 0;
  }

  /**
   * Finds the value associated with the given key in the cache.
   * @param {*} key - The key to look up in the cache.
   * @returns {*} - The value associated with the key, or `undefined` if not found.
   */
  find(key) {
    const entry = this._keyMap.get(key);
    return entry ? entry.value : undefined;
  }

  /**
   * Checks if the cache contains an entry with the given key.
   * @param {*} key - The key to check for in the cache.
   * @returns {boolean} - `true` if the cache contains the key, otherwise `false`.
   */
  has(key) {
    return this._keyMap.has(key);
  }

	/**
   * Returns a JSON (array) representation of the cache.
   * @returns {Array} - JSON representation of the cache.
   */
  toJSON() {
    const jsonRepresentation = [];
    let entry = this.head;

    while (entry) {
      jsonRepresentation.push({ key: entry.key, value: entry.value });
      entry = entry[NEXT];
    }

    return jsonRepresentation;
  }

  /**
   * Returns an iterator for the entries in the cache.
   * @returns {Iterator} - Iterator for the entries in the cache.
   */
  *[Symbol.iterator]() {
    let entry = this.head;
    while (entry) {
      yield [entry.key, entry.value];
      entry = entry[NEXT];
    }
  }
}

export default LRUCache;