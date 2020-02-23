import React, { useState } from "react"
import fetch from "isomorphic-fetch"
import { isEmail } from "validator"
import {
  SubscribeProps,
  SubscribeStatus,
  SubscribeData,
} from "./Subscribe.types"
import { findEmailValue, getFormValues } from "./utils"

import "./Subscribe.css"
import className from "~/utils/className"

export default function Subscribe({
  onSubmit,
  onStatusChange,
  interest,
  ...props
}: SubscribeProps) {
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([])

  function handleStatusChange(status: SubscribeStatus, email: string) {
    if (typeof onStatusChange === "function") {
      onStatusChange(status, email)
    }

    if (
      status === SubscribeStatus.Subscribed &&
      !subscribedEmails.includes(email)
    ) {
      setSubscribedEmails([...subscribedEmails, email])
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = getFormValues(event.currentTarget)

    if (typeof onSubmit === "function") {
      onSubmit(event, data)
    }

    const wasPrevented = event.defaultPrevented
    event.preventDefault()

    if (!wasPrevented) {
      const email = findEmailValue(data)

      if (!email) {
        handleStatusChange(SubscribeStatus.InvalidInput, "")
      } else if (!isEmail(email)) {
        handleStatusChange(SubscribeStatus.InvalidInput, email)
      } else if (subscribedEmails.includes(email)) {
        handleStatusChange(SubscribeStatus.Subscribed, email)
      } else {
        handleStatusChange(SubscribeStatus.Subscribing, email)

        const body = { email } as Partial<SubscribeData>

        if (interest) {
          body.interest = interest
        }

        fetch(props.action || "", {
          method: props.method || "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then(response => {
            if (!response.ok || response.status >= 400) {
              handleStatusChange(SubscribeStatus.SubscriptionFail, email)
            } else {
              handleStatusChange(SubscribeStatus.Subscribed, email)
            }
          })
          .catch(err => {
            handleStatusChange(SubscribeStatus.SubscriptionFail, email)
          })
      }
    }
  }

  return (
    <form
      {...props}
      className={className(["Subscribe", props.className])}
      onSubmit={handleSubmit}
    />
  )
}
