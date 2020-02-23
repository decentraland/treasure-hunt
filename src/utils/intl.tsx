import React, { useMemo } from "react"
import { useIntl } from "gatsby-plugin-intl"
import Bold from "~/components/Section/Bold"
import Link from "~/components/Section/Link"

export type Formatter = (id: string, values?: any) => React.ReactNode

const defaultValues = {
  br: <br />,
  blank: (text: string, more: any) => {
    const match = text.match(/^\[(.*)\]\((.*)\)$/)

    if (null) {
      return text
    }

    const [, innerText, href] = match
    return <Link target="_blank" href={href}>{innerText}</Link>
  },
  a: (text: string, more: any) => {
    const match = text.match(/^\[(.*)\]\((.*)\)$/)

    if (null) {
      return text
    }

    const [, innerText, href] = match

    return <Link href={href}>{innerText}</Link>
  },
  b: (text: string) => <Bold key={0} primary>{text}</Bold>,
  bold: (text: string) => <Bold key={0} primary>{text}</Bold>,
  strong: (text: string) => <Bold key={0} primary>{text}</Bold>,
}

export function useFormatMessage() {
  const intl = useIntl()
  const formatMessage: Formatter = useMemo(
    () => (id: string, values?: any) => {
      if (intl.messages[id] === "") {
        return ""
      }

      return intl.formatMessage({ id }, { ...defaultValues, ...values })
    },
    [intl]
  )

  return formatMessage
}

export function useFormatListOfMessage() {
  const intl = useIntl()
  const formatMessage = useMemo(
    () => (
      baseId: string,
      items: number,
      formatter: (
        formatMessage: Formatter,
        index: number,
        isLast: boolean
      ) => React.ReactNode
    ) => {
      const result = [] as React.ReactNode[]
      let current = 0

      while (current < items) {
        result.push(
          formatter(
            (id, values) => {
              const currentId = [baseId, current, id].join(".")
              if (intl.messages[currentId] === "") {
                return ""
              }

              return intl.formatMessage({ id: currentId }, { ...defaultValues, ...values })
            },
            current,
            current === items - 1
          )
        )
        current++
      }

      return result
    },
    [intl]
  )

  return formatMessage
}
