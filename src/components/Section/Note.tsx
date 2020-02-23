import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./Note.css"

export type NoteProps = React.Props<HTMLParagraphElement> &
  React.HTMLProps<HTMLParagraphElement>

export default function Note(props: NoteProps) {
  return <p {...props} className={className(["Note", props.className])} />
}
