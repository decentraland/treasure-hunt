import React from "react"
import className from "~/utils/className"
import "./Bold.css"

export type BoldProps = React.Props<HTMLSpanElement> &
  React.HTMLProps<HTMLSpanElement> & {
    primary?: boolean
  }

export default function Bold({ primary, ...props }: BoldProps) {
  return (
    <span
      {...props}
      className={className([
        "Bold",
        primary && "Bold_Primary",
        props.className,
      ])}
    />
  )
}
