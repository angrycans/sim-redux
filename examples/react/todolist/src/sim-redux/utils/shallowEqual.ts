export default function shallowEqual(a: object, b: object) {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  return !!~keysA.findIndex(keyA => keysB.includes(keyA))
}
