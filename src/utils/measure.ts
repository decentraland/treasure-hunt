import isNullish from "./isNullish"

export default function measure(value: any): string | null {
  if (isNullish(value)) {
    return null
  } else if (typeof value === "number" && Number.isFinite(value)) {
    return `${value}px`
  } else if (typeof value === "string") {
    return value
  } else {
    return null
  }
}
