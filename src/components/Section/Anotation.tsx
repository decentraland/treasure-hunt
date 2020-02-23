import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./Paragraph.css"

export type ParagraphProps = React.Props<HTMLHeadingElement> &
  React.HTMLProps<HTMLHeadingElement>

export default function Paragraph(props: ParagraphProps) {
  return <p {...props} className={className(["Paragraph", props.className])} />
}
