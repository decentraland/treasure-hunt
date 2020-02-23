import React from "react"
import className from "~/utils/className"

import "./PlaceNote.css"

export type PlaceNoteProps = React.Props<HTMLSpanElement> &
  React.HTMLProps<HTMLSpanElement> & {
    secondary?: boolean
    bold?: boolean
  }

export default function PlaceNote({
  secondary,
  bold,
  ...props
}: PlaceNoteProps) {
  return (
    <span
      {...props}
      className={className([
        "PlaceNote",
        secondary && "PlaceNote--secondary",
        bold && "PlaceNote--bold",
        props.className,
      ])}
    />
  )
}
