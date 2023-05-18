// let id = 0;

// function nextId() {
//   return ++id;
// }

// function generateId(signature = "uid") {
//   return `${signature}-${nextId()}`;
// }

// export default generateId;

const uidMap = new Map();

function generateId(signature = "uid") {
  !uidMap.has(signature)
    ? uidMap.set(signature, 0)
    : uidMap.set(signature, uidMap.get(signature) + 1);

  return uidMap.get(signature);
}

export default generateId;
