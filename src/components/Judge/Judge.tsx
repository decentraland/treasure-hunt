import React from "react"
import className from "~/utils/className"

import "./Judge.css"
const judge = require("~/images/judge.png")

export type JudgeProps = React.Props<HTMLDivElement> &
  React.HTMLProps<HTMLDivElement> & {
    name?: string
    description?: string
    image?: string
    twitter?: string
    facebook?: string
    linkedin?: string
  }

export default function Judge({
  name,
  description,
  image,
  twitter,
  facebook,
  linkedin,
  children,
  ...props
}: JudgeProps) {
  return (
    <div
      {...props}
      className={className([
        "Judge",
        !image && "Judge--pending",
        props.className,
      ])}
    >
      <div
        className="Judge__Image"
        style={{
          backgroundImage: `url(${image || judge})`,
        }}
      ></div>
      {name && <div className="Judge__Name">{name}</div>}
      {description && <div className="Judge__Description">{description}</div>}
      {(twitter || linkedin) && (
        <div>
          {twitter && (
            <a className="Judge__Link" href={twitter} target="_blank">
              twitter
            </a>
          )}
          {facebook && (
            <a className="Judge__Link" href={facebook} target="_blank">
              facebook
            </a>
          )}
          {linkedin && (
            <a className="Judge__Link" href={linkedin} target="_blank">
              linkedin
            </a>
          )}
        </div>
      )}
    </div>
  )
}
