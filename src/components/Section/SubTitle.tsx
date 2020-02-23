import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./SubTitle.css"

export type SubTitleProps = React.Props<HTMLHeadingElement> &
  React.HTMLProps<HTMLHeadingElement>

export default function SubTitle(props: SubTitleProps) {
  return <h3 {...props} className={className(["SubTitle", props.className])} />
}
