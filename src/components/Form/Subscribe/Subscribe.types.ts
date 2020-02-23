export type FormEntries = [string, string | boolean]

export type SubscribeProps = React.Props<HTMLFormElement> &
  React.HTMLProps<HTMLFormElement> & {
    interest?: string
    onSubmit?: (
      event: React.FormEvent<HTMLFormElement>,
      data: FormEntries[]
    ) => void

    onStatusChange?: (status: SubscribeStatus, email: string) => void
  }

export type SubscribeData = {
  email: string
  interest: string
}

export enum SubscribeStatus {
  Unsubscribed,
  InvalidInput,
  Subscribing,
  Subscribed,
  SubscriptionFail,
}
