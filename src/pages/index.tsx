import React, { useState, useEffect, useRef } from "react"
// import { transform } from "framer-motion"
import { useFormatMessage, useFormatListOfMessage } from "~/utils/intl"

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

const logo = require("~/images/logo.svg")
const closedChest = require("~/images/closed-chest.png")
const almostOpenedChest = require("~/images/almost-opened-chest.png")
const openedChest = require("~/images/opened-chest.png")


const scenes = [
  { "name": "The Farm", "x": -3, "y": -33 },
  { "name": "Gamer Plaza", "x": 72, "y": -9 },
  { "name": "Serenity Casino", "x": -55, "y": 143 },
  { "name": "MoonShot", "x": 58, "y": 2 },
  { "name": "Blockrunner", "x": 61, "y": -27 },
  { "name": "Fantasy World of Endless Time", "x": -49, "y": -41 },
  { "name": "The Cat Came Back", "x": 36, "y": 46 },
  { "name": "Infinity Engine", "x": -71, "y": -38 },
  { "name": "Midas Car Park", "x": -129, "y": -141 },
  { "name": "Space Office", "x": 52, "y": 2 },
  { "name": "Koko Jones", "x": -39, "y": 58 },
  { "name": "Fruit Catcher", "x": 59, "y": 133 },
  { "name": "Vertical garden", "x": 57, "y": 8 },
  { "name": "Present Predicament", "x": -40, "y": -49 },
  { "name": "Dinosaur hunt", "x": -12, "y": -39 },
  { "name": "Forest Plaza", "x": -9, "y": 73 },
  { "name": "The floor is lava", "x": 87, "y": 18 },
  { "name": "Battleracers", "x": 67, "y": -21 },
  { "name": "Chateau satoshi", "x": -75, "y": 73 },
  { "name": "Wonder World", "x": -15, "y": -22 },
  { "name": "Enchannelled Wood", "x": -34, "y": -37 },
  { "name": "Matic", "x": 52, "y": 16 },
  { "name": "Medieval Plaza", "x": -71, "y": -71 },
  { "name": "Salmonomicon", "x": -55, "y": 1 },
  { "name": "Vegas City District", "x": -25, "y": 103 },
  { "name": "The Walk", "x": 52, "y": 10 },
  { "name": "Tomb Chaser", "x": 12, "y": 46 },
  { "name": "Merlin's Keep", "x": -5, "y": -16 },
  { "name": "Aeyon Death Run Project", "x": 105, "y": -21 },
  { "name": "Quest of an Alcoholic Scarecrow_", "x": -11, "y": -30 },
  { "name": "Back To The Past", "x": -49, "y": -49 },
  { "name": "Maze Race", "x": 113, "y": -7 },
  { "name": "Asian Plaza", "x": 52, "y": -71 },
  { "name": "Dragon race", "x": -43, "y": 53 },
  { "name": "Space Odyssey", "x": 63, "y": 2 },
  { "name": "Mystery Castle", "x": -134, "y": -121 },
  { "name": "Toki Land", "x": 28, "y": 45 },
  { "name": "Neo DCL City", "x": 137, "y": 34 },
  { "name": "Gingerbread breakdown ", "x": -43, "y": 57 },
  { "name": "Museum District ", "x": 16, "y": 83 },
  { "name": "Barter Town", "x": 60, "y": 115 },
  { "name": "Eden Project", "x": -40, "y": 33 },
  { "name": "Festivaland District", "x": -75, "y": 65 },
  { "name": "After the Flood: Two Towers", "x": -48, "y": 58 },
  { "name": "Techno Oasis", "x": -35, "y": -41 },
  { "name": "SoYou", "x": 24, "y": -124 },
  { "name": "Coin Rush", "x": -148, "y": -35 },
  { "name": "Volcano", "x": -109, "y": -89 },
]

export const sceneNames = new Set(scenes.map(s => s.name))

export type Reward = {
  "id": string,
  "user": string,
  "createdAt": string,
  "name": string,
  "rewardItems": {
    id: string,
    type: string | null
    payload: string | null
    signature: string | null
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
  filter?: 'ALL' | 'COMPLETED' | 'PENDING' | 'CLAIMED' | 'UNCLAIMED'
  data?: Map<string, Reward>
  error?: Error
}

const RandomWallet = () => '0x' + Array.from(new Array(40), () => Math.floor(Math.random() * 16).toString(16)).join('')

export default function IndexPage(props: any) {
  // return null
  const l = useFormatMessage()
  const ll = useFormatListOfMessage()
  // const language: keyof typeof Interests = props?.pageContext?.intl?.language || 'en'
  // const [currentEmail, setCurrentEmail] = useState("")
  // const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(
  //   SubscribeStatus.Unsubscribed
  // )

  const [state, setState] = useState<IndexPageState>({})

  async function loadAddressData(address?: string) {
    const setNewState = (newState: Partial<IndexPageState>) => window.location.hash.slice(2) === address && setState({ ...state, ...newState })

    setNewState({ loading: true })

    try {
      const res = await fetch(`https://giveaways.decentraland.org/api/rewards/${address}`)
      const json = await res.json() as { statusCode: number, message: string, data: Reward[] }

      if (res.status === 200) {
        const data = new Map((json.data || []).filter(data => sceneNames.has(data.name)).map(data => [data.name, data]))
        setNewState({ loading: false, data })
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
      const hasPendingRewardItems = !(reward?.rewardItems || []).some(item => item.completed)
      switch (state.filter) {
        case 'PENDING': return !reward
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
          <form onSubmit={handleAddressChange}>
            <Input
              name="address"
              placeholder={RandomWallet()}
            />
            <Button
              primary
            >
              {l(`hunt.main.cta`)}
            </Button>
          </form>
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
                    { text: 'PENDING SCENES', value: 'PENDING' },
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
              const hasRewardItems = reward?.rewardItems && reward.rewardItems.length > 0
              const rewardsItems = (reward?.rewardItems || [])
              const hasPendingRewardItems = !rewardsItems.some(item => item.completed)
              return <Grid.Row key={scene.name} verticalAlign="top">
                <Grid.Column mobile={4}>
                  <div style={{ background: `url("https://api.decentraland.org/v1/parcels/${scene.x}/${scene.y}/map.png") center center` }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=" width={500} height={500} style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
                  </div>
                  {/* <img src={`https://api.decentraland.org/v1/parcels/${scene.x}/${scene.y}/map.png`} width={500} height={500} style={{ maxWidth: '300px', width: '100%', height: 'auto' }} /> */}
                </Grid.Column>
                <Grid.Column mobile={9} style={{ height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                      <SubTitle>{scene.name} <Link href={`https://play.decentraland.org/?position=${scene.x}%2C${scene.x}`}>({scene.x},{scene.x})</Link></SubTitle>
                      {hasRewards && rewardsItems.length === 0 && <div><Paragraph secondary>Sorry! This chest was empty</Paragraph></div>}
                    </div>
                    <div>
                      {hasRewards && rewardsItems.length > 0 && <div>{rewardsItems.map(item => {
                        return <div className={['reward', item.rarity || 'common'].join(' ')}>
                          <div className="label">{item.rarity || 'common'}</div>
                          <img src={item.tokens.image} width={125} height={125} style={{}} />
                        </div>
                      })}</div>}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={3} >
                  <div>
                    <Button href={`https://play.decentraland.org/?position=${scene.x}%2C${scene.x}`} primary inverted={!!reward} style={{ width: '100%' }} > {!reward ? 'Pending' : `Completed`} </Button>
                  </div>
                  <div style={{ paddingTop: '1rem' }}>
                    {hasRewardItems && <Button href={`https://play.decentraland.org/?position=${scene.x}%2C${scene.x}`} primary={hasPendingRewardItems} style={{ width: '100%' }} > {hasPendingRewardItems ? 'Claim' : 'Claimed'} </Button>}
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
