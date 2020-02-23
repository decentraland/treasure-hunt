import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./MainTitle.css"

export type MainTitleProps = React.Props<HTMLHeadingElement> &
  React.HTMLProps<HTMLHeadingElement>

export default function MainTitle(props: MainTitleProps) {
  return <h1 {...props} className={className(["MainTitle", props.className])} />
}
