/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { Menu, DropdownProps, Responsive } from "semantic-ui-react"
import { Link, changeLocale } from "gatsby-plugin-intl"

import { Footer } from "~/decentraland-ui/src/components/Footer/Footer"
import { Locale } from "~/decentraland-ui/src/components/LanguageIcon/LanguageIcon"
import { Navbar } from "~/decentraland-ui/src/components/Navbar/Navbar"
import { trackClick } from "~/utils/segment"

import "../theme.css"
import "./Layout.css"

const LangLabel = {
  en: "ENG",
  es: "ESP",
  fr: "FRA",
  ja: "日本語",
  zh: "中文",
  ko: "KOR",
}

const Layout = ({ children, ...props }: any) => {
  const language: Locale = props?.pageContext?.intl?.language || 'en'
  const languages: Locale[] = props?.pageContext?.intl?.languages || ['en']
  const currentPath: string = props?.pageContext?.intl?.originalPath || '/'
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const onWindowScroll = function () {
      if (window.scrollY < 100 && isScrolled) {
        setIsScrolled(false)
      } else if (window.scrollY > 100 && !isScrolled) {
        setIsScrolled(true)
      }
    }

    window.addEventListener("scroll", onWindowScroll)
    onWindowScroll()

    return () => {
      window.removeEventListener("scroll", onWindowScroll)
    }
  })

  const handleChangeLocal = function (
    _: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) {
    const newLanguage = data.value as Locale
    changeLocale(newLanguage, currentPath)
  }

  return (
    <>
      <Helmet meta={[
        {
          property: `og:url`,
          content: String(process.env.GATSBY_BASE_URL || 'https://contest.decentraland.org') + props.location.pathname,
        }
      ]} />
      <Navbar
        className={isScrolled ? "" : "initial"}
        rightMenu={<>
          <Responsive
            as={Menu}
            secondary
            stackable
            minWidth={Responsive.onlyTablet.minWidth}
          >
            {languages.length > 1 && languages.map(lang => <Menu.Item
              key={lang}
              as={(props: any) => <Link {...props} onClick={trackClick(props.onClick)} />}
              active={language === lang}
              language={lang}
              to={currentPath}
            >
              {LangLabel[lang]}
            </Menu.Item>)}
          </Responsive>
        </>}
      />
      {children}
      <Footer
        locale={language}
        locales={languages}
        onChange={handleChangeLocal}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
