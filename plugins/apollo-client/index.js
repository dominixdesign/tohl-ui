import { defineNuxtPlugin } from '#app'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
  ApolloLink,
  concat
} from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'
import { AuthService } from './auth.class'

const positions = {
  C: 'Center',
  LW: 'Left-Wing',
  RW: 'Right-Wing',
  D: 'Defender',
  G: 'Goalie'
}

const colors = {
  kni: { f: '#000', b: '#27A349' },
  np: { f: '#000', b: '#558148' },
  haw: { f: '#C0A062', b: '#4A2162' },
  mer: { f: '#243E90', b: '#F6EB16' },
  pow: { f: '#EF7E3E', b: '#f6c51c' },
  kai: { f: '#ABAAAA', b: '#243E90' },
  hor: { f: '#6ABD45', b: '#051732' },
  pat: { f: '#575858', b: '#ED2224' },
  eng: { f: '#808285', b: '#0F352E' },
  rea: { f: '#F4E00B', b: '#7D8282' },
  ste: { f: '#ED2224', b: '#24275A' },
  sha: { f: '#ED1C24', b: '#000' },
  cob: { f: '#FFF', b: '#3751A3' },
  pre: { f: '#FBC0A2', b: '#6A211D' },
  bra: { f: '#000', b: '#F6C51C' },
  hea: { f: '#FFF', b: '#ED1C24' },
  los: { f: '#000', b: '#ED2224' },
  rac: { f: '#FFF', b: '#126232' },
  rap: { f: '#D71920', b: '#3B4D81' },
  ali: { f: '#73BF44', b: '#E00885' },
  voo: { f: '#B7AB94', b: '#C52839' },
  bro: { f: '#000', b: '#7D241E' },
  wol: { f: '#fff', b: '#bfa57f' },
  adm: { f: '#dad265', b: '#197fbd' }
}

export default defineNuxtPlugin((nuxtApp) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('tohl-token')
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    }
    return forward(operation)
  })

  const apolloClients = {}

  const resolvers = {
    Team: {
      foreground: (team) => colors[team.teamid]?.f || '#fff',
      background: (team) => colors[team.teamid]?.b || '#000'
    },
    Playerdata: {
      position: (playerdata) => positions[playerdata.pos]
    },
    Playerstats: {
      spercentage: (stat) => {
        if (stat.games <= 0) {
          return 0
        }
        let sp = 0
        if (stat.goals > 0) {
          sp = (100 * stat.goals) / stat.shots
        }
        return sp
      },
      averageicetime: (stat) => {
        if (stat.games <= 0) {
          return false
        }
        let atoi = 0
        if (stat.icetime > 0) {
          atoi = stat.icetime / stat.games
        }
        return atoi
      }
    }
  }

  const key = 'default'

  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql'
  })

  const cacheOptions = {
    typePolicies: {
      Playerstats: {
        keyFields: ['season', 'team', 'player']
      },
      Team: {
        keyFields: ['teamid']
      }
    }
  }

  const cache = new InMemoryCache(cacheOptions)
  if (process.server) {
    const apolloClient = new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache(cacheOptions),
      resolvers
    })
    nuxtApp.hook('app:rendered', () => {
      // store the result
      // eslint-disable-next-line prefer-template
      nuxtApp.payload.data['apollo-' + key] = apolloClient.extract()
    })
    apolloClients[key] = apolloClient
  } else {
    // restore to cache, so the client won't request
    // eslint-disable-next-line prefer-template
    cache.restore(JSON.parse(JSON.stringify(nuxtApp.payload.data['apollo-' + key])))
    const apolloClient = new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: cache,
      ssrForceFetchDelay: 100,
      resolvers
    })
    apolloClients[key] = apolloClient
  }

  // provide client, used in useQuery()
  nuxtApp.vueApp.provide(ApolloClients, apolloClients)
  nuxtApp.provide('apollo', apolloClients)

  const authService = new AuthService(apolloClients[key])
  nuxtApp.vueApp.provide('authService', authService)
})
