import React from "react"
import { motion, MotionProps } from "framer-motion"
import className from "~/utils/className"

import "./Modal.css"

export type ModalProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    onClickOutside?: (event: React.MouseEvent<HTMLElement>) => void
  }

export default function Modal({ onClickOutside, ...props }: ModalProps) {
  return (
    <div className="Modal">
      <motion.div
        className="Modal__Background"
        onClick={onClickOutside}
        initial={{
          background: "#000",
          opacity: 0,
        }}
        animate={{
          background: "#000",
          opacity: 0.7,
        }}
        transition={{
          timeConstant: 300,
        }}
      ></motion.div>
      <motion.div
        {...props}
        className={className(["Modal__Content", props.className])}
      ></motion.div>
    </div>
  )
}
