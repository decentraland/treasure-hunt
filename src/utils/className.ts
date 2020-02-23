export default function className(
  classes: (string | boolean | undefined | null)[]
) {
  return classes.filter(Boolean).join(" ")
}
