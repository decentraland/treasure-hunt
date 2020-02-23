export default function isNullish(value: any) {
  return value === undefined || value === null || Number.isNaN(value)
}
