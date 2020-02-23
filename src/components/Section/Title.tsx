import React, { TimeHTMLAttributes } from "react"
import className from "~/utils/className"

import "./Title.css"

export type TitleProps = React.Props<HTMLHeadingElement> &
  React.HTMLProps<HTMLHeadingElement>

export default function Title(props: TitleProps) {
  return <h2 {...props} className={className(["Title", props.className])} />
}
