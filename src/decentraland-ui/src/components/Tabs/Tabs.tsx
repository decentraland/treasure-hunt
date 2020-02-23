import * as React from 'react'
import './Tabs.css'
import '../../components/Container/Container.css'
import { Container, Responsive } from 'semantic-ui-react'

export type TabsProps = {
  isFullscreen?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class Tabs extends React.PureComponent<TabsProps> {
  static defaultProps: Partial<TabsProps> = {
    isFullscreen: false
  }
  static Left = ({ children }) => (
    <div className="dcl tabs-left">{children}</div>
  )

  static Right = ({ children }) => (
    <div className="dcl tabs-right">{children}</div>
  )

  static Tab = ({
    active,
    onClick,
    children
  }: {
    active?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    children: React.ReactNode
  }) => (
    <div className={`dcl tab ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
    </div>
  )

  render() {
    const { children, isFullscreen, onClick } = this.props
    return (
      <div
        className={`dcl tabs ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={onClick}
      >
        <Responsive as={Container} minWidth={Responsive.onlyTablet.minWidth}>
          {children}
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>{children}</Responsive>
      </div>
    )
  }
}
