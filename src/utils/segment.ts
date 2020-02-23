export function trackClick(
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
) {
  return function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (window.analytics) {
      const element = event.currentTarget
      window.analytics.track("click", {
        text:
          element.name.trim() ||
          element.innerText.trim() ||
          element.title.trim(),
        href: element.href,
        location: location.toString(),
      })
    }

    onClick && onClick(event)
  }
}
