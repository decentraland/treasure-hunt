import React from "react"

import "./Place.css"
import { ordinalNote } from "~/utils/ordinal"

export type PlaceProps = React.Props<HTMLDivElement> & {
  place?: React.ReactNode
  ordinal?: boolean
  color?: "regular" | "gold" | "silver" | "bronze" | "outline"
  type?: "box" | "medal"
}

export default function Place(props: PlaceProps) {
  const hasPlace = props.place !== undefined
  const showNote =
    typeof props.place === "string" || typeof props.place === "number"

  const classList = [`Place`]

  switch (props.type) {
    case "medal":
      classList.push(`Place--type-${props.type}`)
      break

    case "box":
    default:
      // ignore
      break
  }

  switch (props.color) {
    case "gold":
    case "silver":
    case "bronze":
    case "outline":
      classList.push(`Place--color-${props.color}`)
      break

    case "regular":
    default:
      // ignore
      break
  }

  const isOrdinal = props.ordinal && typeof props.place === "number"

  if (isOrdinal) {
    classList.push("Place--ordinal")
  }

  return (
    <div className={classList.join(" ")}>
      <div className="Place__Box">
        {hasPlace && (
          <div className="Place__Position">
            <div className="Place__Position__Digit">{props.place}</div>
            {isOrdinal && (
              <div className="Place__Position__Note">
                {ordinalNote(props.place as number)}
              </div>
            )}
          </div>
        )}
        {showNote && <div className="Place__Description">place</div>}
      </div>
      {props.children}
    </div>
  )
}

Place.defaultProps = {
  color: "regular",
  type: "box",
  ordinal: true,
} as Partial<PlaceProps>
