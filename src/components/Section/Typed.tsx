import React, { useState, useEffect } from 'react'
import T, { TypedOptions } from 'typed.js'

export type TypedProps = React.Props<HTMLSpanElement> & React.HTMLProps<HTMLSpanElement> & TypedOptions & {
  restartDelay?: number
}

export default function Typed(props: TypedProps) {
  useEffect(() => {
    const onComplete = (self: T) => {
      const restartDelay = props.restartDelay as number
      if (typeof props.onComplete === 'function') {
        props.onComplete(self)
      }

      if (Number.isFinite(restartDelay)) {
        setTimeout(() => self && self.reset(true), restartDelay)
      }
    }
    const t = new T('#typed', { ...props, onComplete, fadeOut: true })
    return () => t.destroy()
  }, [])

  return <span id="typed">{props.children}</span>
}