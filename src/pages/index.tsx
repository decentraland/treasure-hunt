import React, { useState, useEffect } from "react"
import { useFormatMessage, useFormatListOfMessage } from "~/utils/intl"
import { Eth } from 'web3x/eth'

// import { Link } from "gatsby"
import {
  Container,
  Grid,
  Input,
  Button,
  Card,
  // Icon,
  InputOnChangeData,
  Loader,
  Select,
  SelectProps,
  DropdownProps,
  Label,
  Dropdown
  // Responsive,
} from "semantic-ui-react"


import { Hero } from "~/decentraland-ui/src/components/Hero/Hero"
import Layout from "~/components/Layout"
import SEO from "~/components/seo"
// import Place, { PlaceNote } from "~/components/Place"
import Paragraph from "~/components/Section/Paragraph"
import MainTitle from "~/components/Section/MainTitle"
import Note from "~/components/Section/Note"
import Title from "~/components/Section/Title"
// import Link from "~/components/Section/Link"
// import Judge from "~/components/Judge/Judge"
import SubTitle from "~/components/Section/SubTitle"
// import { Image } from "~/components/Hero"
// import useWindowScroll from "~/utils/useWindowScroll"
// import Modal from "~/components/Modal/Modal"
import Bold from "~/components/Section/Bold"

import "./index.css"
import Link from "~/components/Section/Link"
import { stat } from "fs"
import { Address } from "web3x/address"
import { PartialTransactionRequest } from "web3x/formatters"

const logo = require("~/images/logo.svg")
const closedChest = require("~/images/closed-chest.png")
const almostOpenedChest = require("~/images/almost-opened-chest.png")
const openedChest = require("~/images/opened-chest.png")

const images: { [key: string]: string | undefined } = {
  'Aeyon Death Run Project': require("../images/Death Run.jpg"),
  'After the Flood: Two Towers': require("../images/After the Flood.jpg"),
  'Asian Plaza': require("../images/Asian Plaza.jpg"),
  'Back To The Past': require("../images/Back To The Past.jpg"),
  'Barter Town': require("../images/Barter Town.jpg"),
  'Battleracers': require("../images/Battleracers.jpg"),
  'Blockrunner': require("../images/BlockRunner.jpg"),
  'Chateau satoshi': require("../images/Chateau satoshi.jpg"),
  'Coin Rush': require("../images/CoinRush.jpg"),
  'Dinosaur hunt': require("../images/Dinosaur hunt Can you find them all_.jpg"),
  'Dragon race': require("../images/Dragon Race.jpg"),
  'Eden Project': require("../images/Eden Project_.jpg"),
  'Enchannelled Wood': require("../images/Enchannelled Wood.jpg"),
  'Fantasy World of Endless Time': require("../images/Fantasy World of Endless Time.jpg"),
  'Festivaland District': require("../images/Festival Land.png"),
  'Forest Plaza': require("../images/Forest Plaza.jpg"),
  'Fruit Catcher': require("../images/Fruit Catcher.jpg"),
  'Gamer Plaza': require("../images/Gamer Plaza.jpg"),
  'Gingerbread breakdown ': require("../images/Gingerbread breakdown.jpg"),
  'Infinity Engine': require("../images/Infinity Engine.jpg"),
  'Koko Jones': require("../images/Koko Jones.jpg"),
  'Matic': require("../images/Matic.jpg"),
  'Maze Race': require("../images/Maze Run.jpg"),
  'Medieval Plaza': require("../images/Medieval Plaza.jpg"),
  'Merlin\'s Keep': require("../images/Merlin_s Keep.jpg"),
  'Midas Car Park': require("../images/Midas Car Park.jpg"),
  'MoonShot': require("../images/MoonShot.jpg"),
  'Museum District ': require("../images/Museum District.jpg"),
  'Mystery Castle': require("../images/Mystery Castle.jpg"),
  'Neo DCL City': require("../images/Neo DCL City.jpg"),
  'Present Predicament': require("../images/Present Predicament.jpg"),
  'Quest of an Alcoholic Scarecrow_': require("../images/Quest of an Alcoholic Scarecrow.jpg"),
  'Salmonomicon': require("../images/Salmonomicon.jpg"),
  'Serenity Casino': require("../images/Serenity Casino.jpg"),
  'SoYou': require("../images/SoYou.jpg"),
  'Space Odyssey': require("../images/Space Odyssey.jpg"),
  'Space Office': require("../images/Space Office.jpg"),
  'Techno Oasis': require("../images/Techno Oasis_.jpg"),
  'The Cat Came Back': require("../images/The Cat Came Back.jpg"),
  'The Farm': require("../images/The Farm.jpg"),
  'The floor is lava': require("../images/The floor is lava.jpg"),
  'The Walk': require("../images/The Walk.jpg"),
  'Toki Land': require("../images/Toki Land.jpg"),
  'Tomb Chaser': require("../images/Tomb Chaser.jpg"),
  'Vegas City District': require("../images/Vegas City District.jpg"),
  'Vertical garden': require("../images/Vertical garden.jpg"),
  'Volcano': require("../images/Volcano.jpg"),
  'Wonder World': require("../images/Wonder World.jpg"),
}


const scenes = [
  { "name": "Aeyon Death Run Project", "x": 105, "y": -21 },
  { "name": "After the Flood: Two Towers", "x": -48, "y": 58 },
  { "name": "Asian Plaza", "x": 52, "y": -71 },
  { "name": "Back To The Past", "x": -49, "y": -49 },
  { "name": "Barter Town", "x": 60, "y": 115 },
  { "name": "Battleracers", "x": 67, "y": -21 },
  { "name": "Blockrunner", "x": 61, "y": -27 },
  { "name": "Chateau satoshi", "x": -75, "y": 73 },
  { "name": "Coin Rush", "x": -148, "y": -35 },
  { "name": "Dinosaur hunt", "x": -12, "y": -39 },
  { "name": "Dragon race", "x": -43, "y": 53 },
  { "name": "Eden Project", "x": -40, "y": 33 },
  { "name": "Enchannelled Wood", "x": -34, "y": -37 },
  { "name": "Fantasy World of Endless Time", "x": -49, "y": -41 },
  { "name": "Festivaland District", "x": -65, "y": 77 },
  { "name": "Forest Plaza", "x": -9, "y": 73 },
  { "name": "Fruit Catcher", "x": 59, "y": 133 },
  { "name": "Gamer Plaza", "x": 72, "y": -9 },
  { "name": "Gingerbread breakdown ", "x": -43, "y": 57 },
  { "name": "Infinity Engine", "x": -71, "y": -38 },
  { "name": "Koko Jones", "x": -39, "y": 58 },
  { "name": "Matic", "x": 52, "y": 16 },
  { "name": "Maze Race", "x": 113, "y": -7 },
  { "name": "Medieval Plaza", "x": -71, "y": -71 },
  { "name": "Merlin's Keep", "x": -5, "y": -16 },
  { "name": "Midas Car Park", "x": -129, "y": -141 },
  { "name": "MoonShot", "x": 58, "y": 2 },
  { "name": "Museum District ", "x": 16, "y": 83 },
  { "name": "Mystery Castle", "x": -134, "y": -121 },
  { "name": "Neo DCL City", "x": 137, "y": 34 },
  { "name": "Present Predicament", "x": -40, "y": -49 },
  { "name": "Quest of an Alcoholic Scarecrow_", "x": -11, "y": -30 },
  { "name": "Salmonomicon", "x": -55, "y": 1 },
  { "name": "Serenity Casino", "x": -55, "y": 143 },
  { "name": "SoYou", "x": 24, "y": -124 },
  { "name": "Space Odyssey", "x": 63, "y": 2 },
  { "name": "Space Office", "x": 52, "y": 2 },
  { "name": "Techno Oasis", "x": -35, "y": -41 },
  { "name": "The Cat Came Back", "x": 36, "y": 46 },
  { "name": "The Farm", "x": -3, "y": -33 },
  { "name": "The floor is lava", "x": 87, "y": 18 },
  { "name": "The Walk", "x": 52, "y": 10 },
  { "name": "Toki Land", "x": 28, "y": 45 },
  { "name": "Tomb Chaser", "x": 12, "y": 46 },
  { "name": "Vegas City District", "x": -25, "y": 103 },
  { "name": "Vertical garden", "x": 57, "y": 8 },
  { "name": "Volcano", "x": -109, "y": -89 },
  { "name": "Wonder World", "x": -15, "y": -22 },
]

export const sceneNames = new Set(scenes.map(s => s.name))

export type Reward = {
  "id": string,
  "user": string,
  "createdAt": string,
  "name": string,
  contract: string,
  transaction: string,
  "status": 'READY' | 'SUCCESS',
  "rewardItems": {
    id: string,
    type: string | null
    payload: string | null
    signature: string | null
    expiration: number | null
    completed: boolean
    rarity: string
    tokens: {
      title: string,
      image: string
    }
  }[],
}

export type IndexPageState = {
  loading?: boolean
  filter?: 'ALL' | 'COMPLETED' | 'INCOMPLETE' | 'CLAIMED' | 'UNCLAIMED'
  address?: string,
  data?: Map<string, Reward>
  error?: Error
}

let ETH: Eth | null;

async function eth() {
  if (ETH === undefined) {
    const ethereum = (window as any).ethereum
    await ethereum.enable()
    ETH = Eth.fromCurrentProvider() || null
  }

  return ETH
}


const RandomWallet = () => '0x' + Array.from(new Array(40), () => Math.floor(Math.random() * 16).toString(16)).join('')

export default function IndexPage(props: any) {
  // return null
  const l = useFormatMessage()
  // const ll = useFormatListOfMessage()
  // const language: keyof typeof Interests = props?.pageContext?.intl?.language || 'en'
  // const [currentEmail, setCurrentEmail] = useState("")
  // const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(
  //   SubscribeStatus.Unsubscribed
  // )

  const now = Date.now()
  const [state, setState] = useState<IndexPageState>({})

  async function loadAddressData(address?: string) {
    const setNewState = (newState: Partial<IndexPageState>) => window.location.hash.slice(2) === address && setState((current) => ({ ...current, ...newState }))

    setNewState({ loading: true })

    try {
      const res = await fetch(`https://giveaways.decentraland.org/api/rewards/${address}`)
      const json = await res.json() as { statusCode: number, message: string, address: string, data: Reward[] }

      if (res.status === 200) {
        const data = new Map((json.data || []).filter(data => sceneNames.has(data.name)).map(data => [data.name, data]))
        setNewState({ loading: false, data, address: json.address })
        let element = document.querySelector('form') as HTMLElement
        let top = element.offsetTop || 0
        while (element.parentElement) {
          element = element.parentElement
          top += element.offsetTop
        }

        if (top && window.scrollY < top) {
          window.scrollTo({ top, behavior: 'smooth' })
        }
      } else {
        console.error('invalid server response', json)
        setNewState({ loading: false, error: new Error(json.message || 'invalid server response') })
      }
    } catch (error) {
      console.log(error)
      setNewState({ error })
    }
  }

  useEffect(() => {
    const updateAddressData = () => {
      const newHash = window.location.hash.slice(2)
      if (newHash) {
        loadAddressData(newHash)
      }
    }

    window.addEventListener('hashchange', updateAddressData)
    const newHash = window.location.hash.slice(2)
    if (newHash) {
      const input = document.querySelector('input')
      if (input && !input.value) {
        input.value = newHash
      }
      loadAddressData(newHash)
    }


    return () => window.removeEventListener('hashchange', updateAddressData)

  }, [])

  async function handleConnectWallet() {
    setState((current) => ({ ...current, loading: true }))
    try {
      const ethereum = await eth()
      if (ethereum) {
        const accounts = await ethereum.getAccounts()
        if (accounts.length) {
          window.location.hash = '#/' + accounts[0].toString()
        }
      }
    } catch (err) {
      console.error(err)
      setState((current) => ({ ...current, loading: false }))
    }
  }

  async function handleClaim(contract: string, data: string) {
    const ethereum = await eth()
    const address = state.address as string
    const from = Address.fromString(address)
    const to = Address.fromString(contract)
    if (ethereum && state.address) {
      try {
        const gasPrice = await ethereum.getGasPrice()
        const transaction: PartialTransactionRequest = {
          from,
          to,
          gasPrice: 10000000000,
          data: Buffer.from(data, 'hex')
        }
        console.log(transaction)
        await ethereum.sendTransaction(transaction)
      } catch (error) {
        console.error(error)
      }
    }
  }

  function handleAddressChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input: HTMLInputElement = Array.from((event.target as any).elements).find((e: any) => e.name === 'address') as any
    if (/^0x[0-9a-f]{40}$/gi.test(String(input?.value))) {
      window.location.hash = '#/' + input?.value
    }
  }

  function handleFilterChange(e: any, data: DropdownProps) {
    setState({ ...state, filter: data.value as any })
  }

  const sceneList = state.data && scenes
    .filter(scene => {
      const reward = state.data?.get(scene.name)
      const hasPendingRewardItems = reward && reward.status !== 'SUCCESS'
      switch (state.filter) {
        case 'INCOMPLETE': return !reward
        case 'COMPLETED': return !!reward
        case 'CLAIMED': return !!reward && !hasPendingRewardItems
        case 'UNCLAIMED': return !!reward && hasPendingRewardItems
        default: return true
      }
    })

  return (
    <Layout {...props}>
      <SEO
        title={l("hunt.meta.title") as string}
        description={l("hunt.meta.description") as string}
        image={logo}
      />
      <Hero centered>
        <Hero.Content>{''}</Hero.Content>
        <Hero.Actions>
          <img src={almostOpenedChest} width={300} height={300} />
        </Hero.Actions>
        <Hero.Header>
          <MainTitle>{l("hunt.main.title")}</MainTitle>
          <SubTitle>{l("hunt.main.description")}</SubTitle>
        </Hero.Header>
        <Hero.Actions className="hero-actions hero-subscribe">
          {/* <form onSubmit={handleAddressChange}> */}
          {/* <Input
              name="address"
              placeholder={RandomWallet()}
          /> */}
          {!state.address && <Button
            primary
            loading={state.loading}
            onClick={handleConnectWallet}
          >
            {l(`hunt.main.cta`)}
          </Button>}
          {state.address && <Button
            primary
          >
            wallet: {state.address}
          </Button>}
          {/* </form> */}
        </Hero.Actions>
        {/* <HeroContent /> */}
      </Hero>
      <div className="container-background" id="lean-more">
        <Container className="scenes">
          <Grid stackable>
            {state.loading && <Loader />}
            {/* {state.data && <pre>{JSON.stringify(state.data, null, 2)}</pre>} */}
            {state.data && <Grid.Row style={{ borderBottom: '1px solid #ddd' }}>
              <Grid.Column mobile={10}>
                <SubTitle>List of scenes ({state.data.size}/{sceneNames.size} completed)</SubTitle>
              </Grid.Column>
              <Grid.Column mobile={6} textAlign="right">
                <Label>
                  <span style={{ marginRight: '.5rem' }}>FILTER:</span>
                  <Dropdown onChange={handleFilterChange} defaultValue={state.filter || 'ALL'} pointing="top right" options={[
                    { text: 'ALL SCENES', value: 'ALL' },
                    { text: 'INCOMPLETE SCENES', value: 'INCOMPLETE' },
                    { text: 'COMPLETED SCENES', value: 'COMPLETED' },
                    { text: 'CLAIMED REWARDS', value: 'CLAIMED' },
                    { text: 'UNCLAIMED REWARDS', value: 'UNCLAIMED' },
                  ]}>
                  </Dropdown>
                </Label>
              </Grid.Column>
            </Grid.Row>}
            {sceneList && sceneList.length === 0 && <div style={{ padding: '5rem 0', textAlign: 'center', width: '100%' }}>
              <Paragraph secondary>There are no scenes to show</Paragraph>
            </div>}
            {sceneList && sceneList.map((scene) => {
              const reward = state.data?.get(scene.name)
              const hasRewards = !!reward
              const rewardsItems = (reward?.rewardItems || [])
              const hasRewardItems = rewardsItems.length > 0
              const hasPendingRewardItems = reward && reward.status !== 'SUCCESS'
              const image = images[scene.name as any] as any || `https://api.decentraland.org/v1/parcels/${scene.x}/${scene.y}/map.png`
              const expiration = Math.min(...rewardsItems.map(item => item.expiration || Infinity))
              const expired = now > (expiration * 1000)
              return <Grid.Row key={scene.name} verticalAlign="top">
                <Grid.Column mobile={5}>
                  <div style={{ background: `url("${image}") center center`, backgroundSize: 'cover' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABAQMAAADO7O3JAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWNgAAAAAgABz8g15QAAAABJRU5ErkJggg==" width={1920} height={960} style={{ width: '100%', height: 'auto' }} />
                  </div>
                  {/* <img src={`https://api.decentraland.org/v1/parcels/${scene.x}/${scene.y}/map.png`} width={500} height={500} style={{ maxWidth: '300px', width: '100%', height: 'auto' }} /> */}
                </Grid.Column>
                <Grid.Column mobile={8} style={{ height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                      <SubTitle>{scene.name} <Link href={`https://play.decentraland.org/?position=${scene.x},${scene.y}`}>({scene.x},{scene.y})</Link></SubTitle>
                      {hasRewards && rewardsItems.length === 0 && <div><Paragraph secondary>Sorry! This chest was empty</Paragraph></div>}
                    </div>
                    <div>
                      {hasRewards && rewardsItems.length > 0 && <div>{rewardsItems.map((item, i) => {
                        return <div key={i} className={['reward', item.rarity || 'common'].join(' ')} title={item.tokens.title}>
                          <div className="name">{item.tokens.title}</div>
                          <div className="label">{item.rarity || 'common'}</div>
                          <img src={item.tokens.image} width={125} height={125} />
                        </div>
                      })}</div>}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={3} >
                  <div>
                    <Button href={`https://play.decentraland.org/?position=${scene.x},${scene.y}`} primary inverted={!!reward} style={{ width: '100%' }} > {!reward ? 'Incomplete' : `Completed`} </Button>
                  </div>
                  <div style={{ paddingTop: '1rem' }}>
                    {hasRewardItems && <Button
                      style={{ width: '100%' }}
                      primary={hasPendingRewardItems && !expired}
                      reversed={hasPendingRewardItems && expired}
                      disabled={!hasPendingRewardItems || expired}
                      onClick={() => hasPendingRewardItems && !expired && reward && handleClaim(reward.contract, reward.transaction)}>
                      {hasPendingRewardItems && expired ? 'Expired' : hasPendingRewardItems ? 'Claim' : 'Claimed'}
                    </Button>}
                  </div>
                </Grid.Column>
              </Grid.Row>
            })}
            {/* <Grid.Row>
              <Grid.Column mobile={7} className="image">
                <img src={whatIs} width="1024" height="1024" />
              </Grid.Column>
              <Grid.Column mobile={9}>
                <Title>{l("hunt.what_is.title")}</Title>
                <Paragraph>{l("hunt.what_is.description")}</Paragraph>
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
        </Container>
      </div>

    </Layout>
  )
}
