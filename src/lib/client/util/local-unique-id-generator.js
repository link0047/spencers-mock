let id = 0;

function nextId() {
  return ++id;
}

function generateId(signature = "uid") {
  return `${signature}-${nextId()}`;
}

export default generateId;
