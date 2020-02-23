import { FormEntries } from "./Subscribe.types"

export function getFormValues(form: HTMLFormElement): FormEntries[] {
  const entries = [] as FormEntries[]
  for (let element of form.elements) {
    const { name, type, value, checked } = element as HTMLInputElement
    if (name) {
      if (type === "checkbox" || type === "radio") {
        entries.push([name, checked])
      } else {
        entries.push([name, value])
      }
    }
  }

  return entries
}

export function findEmailValue(entries: FormEntries[]): string | undefined {
  for (let [name, value] of entries) {
    if (name === "email" || name === "mail") {
      return String(value).toLowerCase()
    }
  }

  return undefined
}
