export function ordinalNote(value: number) {
  const mod = value % 10
  switch (mod) {
    case 1:
      return value === 11 ? "th" : "st"
    case 2:
      return value === 13 ? "th" : "nd"
    case 3:
      return value === 13 ? "th" : "rd"
    default:
      return "th"
  }
}
