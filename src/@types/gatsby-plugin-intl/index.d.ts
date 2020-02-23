declare module "gatsby-plugin-intl" {
  import React from "react"
  import { GatsbyLinkProps } from "gatsby"

  export { navigate } from "gatsby"
  export * from "react-intl"

  export type LinkProps = GatsbyLinkProps<{}> & { language?: string }
  export class Link extends React.PureComponent<LinkProps, {}> {}

  export function changeLocale(language: string, to?: string): void
}
