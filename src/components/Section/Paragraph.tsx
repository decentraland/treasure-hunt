import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./Paragraph.css"

export type ParagraphProps = React.Props<HTMLParagraphElement> &
  React.HTMLProps<HTMLParagraphElement> & {
    secondary?: boolean
  }

export default function Paragraph({ secondary, ...props }: ParagraphProps) {
  return (
    <p
      {...props}
      className={className([
        "Paragraph",
        secondary && "Paragraph--secondary",
        props.className,
      ])}
    />
  )
}
