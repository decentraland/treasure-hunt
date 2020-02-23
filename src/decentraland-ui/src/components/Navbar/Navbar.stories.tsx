import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Navbar, Menu, Icon, Parallax, Hero, Button } from '../..'
import './Navbar.stories.css'

storiesOf('Navbar', module)
  .addDecorator(centered)
  .add('Agora', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage="agora" />
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })

  .add('Sign In Page', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isSignIn
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Connecting', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          onSignIn={() => console.log('Clicked on sign in')}
          isConnecting
        />
      </div>
    )
  })
  .add('Connected', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
        />
      </div>
    )
  })
  .add('On click account', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
        />
      </div>
    )
  })

  .add('Fullscreen', () => {
    return (
      <div className="Navbar-story-container">
        <div className="background" />
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          isFullscreen
        />
      </div>
    )
  })
  .add('With hero', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage="agora" isFullscreen />
        <Hero height={442} centered>
          <Hero.Header>Help us build Decentraland</Hero.Header>
          <Hero.Description>Join the discussion</Hero.Description>
          <Hero.Content>
            <Parallax>
              <Parallax.Layer depth={0.3}>
                <div className="homepage-pyramid small" />
              </Parallax.Layer>
              <Parallax.Layer depth={1.5}>
                <div className="homepage-pyramid large" />
              </Parallax.Layer>
            </Parallax>
          </Hero.Content>
        </Hero>
      </div>
    )
  })
  .add('With Overlay over Hero', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage="agora" isFullscreen isOverlay />
        <Hero className="over-gradient" height={442} centered>
          <Hero.Header>Help us build Decentraland</Hero.Header>
          <Hero.Description>Join the discussion</Hero.Description>
          <Hero.Content>
            <div className="color-layer" />
          </Hero.Content>
        </Hero>
      </div>
    )
  })
  .add('Custom middle menu', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          middleMenu={
            <Menu.Item>
              <Icon
                name="bell"
                onClick={() => console.log('Clicked on notification bell')}
              />
            </Menu.Item>
          }
        />
      </div>
    )
  })
  .add('Custom left menu', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          leftMenu={
            <>
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>About</Menu.Item>
              <Menu.Item>Contact Us</Menu.Item>
            </>
          }
        />
      </div>
    )
  })
  .add('Custom right menu', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          rightMenu={
            <Button primary size="small" style={{ minWidth: 100 }}>
              Get Started
            </Button>
          }
        />
      </div>
    )
  })