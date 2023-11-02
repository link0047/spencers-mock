const uidMap = new Map();

function generateId(signature = "uid") {
  !uidMap.has(signature)
    ? uidMap.set(signature, 0)
    : uidMap.set(signature, uidMap.get(signature) + 1);

  return uidMap.get(signature);
}

function resetId(signature = "uid") {
  if (uidMap.has(signature)) uidMap.set(signature, 0);
}

export default generateId;
