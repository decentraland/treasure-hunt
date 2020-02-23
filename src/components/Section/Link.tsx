import React from "react"
import className from "~/utils/className"
import { trackClick } from "~/utils/segment"

import "./Link.css"

export type LinkProps = React.Props<HTMLAnchorElement> &
  React.HTMLProps<HTMLAnchorElement> & {
    secondary?: boolean
  }

export default function Link({ secondary, onClick, ...props }: LinkProps) {
  const handleClick = trackClick(onClick)

  return (
    <a
      {...props}
      onClick={handleClick}
      className={className(["Link", props.className])}
    />
  )
}
