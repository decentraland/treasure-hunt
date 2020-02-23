import React from "react"
import PropsTypes from "prop-types"

export type FlexProps = React.Props<HTMLDivElement> &
  React.HTMLProps<HTMLDivElement> & {
    grow: boolean
    shrink: boolean
    size: number | string
  }

export default function Flex(props: FlexProps) {
  const flex = [
    Number(Boolean(props.grow)),
    Number(Boolean(props.shrink)),
    typeof props.size === "number" ? String(props.size) + "px" : props.size,
  ].join(" ")

  return <div {...props} style={{ ...props.style, flex }} />
}

Flex.defaultProps = {
  grow: true,
  shrink: true,
  size: "auto",
}

Flex.propTypes = {
  grow: PropsTypes.bool,
  shrink: PropsTypes.bool,
  size: PropsTypes.oneOfType([
    PropsTypes.number,
    PropsTypes.string
  ]),
}
