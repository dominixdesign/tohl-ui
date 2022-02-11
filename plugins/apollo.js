import { defaultDataIdFromObject } from 'apollo-cache-inmemory'

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
  bro: { f: '#000', b: '#7D241E' }
}
export default ({ store, $envConfig, error, app }) => {
  return {
    httpEndpoint: process.env.GRAPHQL_API_URL,
    inMemoryCacheOptions: {
      dataIdFromObject: (object) => {
        switch (object.__typename) {
          case 'Playerstats':
            return `playerstats:${object.season}:${object.team?.teamid}:${object.player.id}`
          case 'Team':
            return `Team:${object.teamid}`
          default:
            return defaultDataIdFromObject(object) // fall back to default handling
        }
      }
    },
    getAuth: () => {
      const token = store.getters['user/token']
      return token ? `Bearer ${token}` : ''
    },
    resolvers: {
      Playerdata: {
        position: (playerdata) => positions[playerdata.pos]
      },
      Team: {
        foreground: (team) => colors[team.teamid]?.f || '#fff',
        background: (team) => colors[team.teamid]?.b || '#000'
      },
      Lineup: {
        spercentage: (stat) => {
          let sp = 0
          if (stat.goals > 0) {
            sp = (100 * stat.goals) / stat.shots
          }
          return sp
        }
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
  }
  /*
  {
    link,
    cache,
    resolvers: {
      Thing: {
        localState: (thing) => {
          return getState(thing.state, thing.ts_last_seen)
        }
      },
      Mutation: {
        updateThingsState: (_, _args, { cache }) => {
          const query = gql`
            query OrgThingsQuery {
              orgData: getRootOrg @client {
                things {
                  id
                  state
                  ts_last_seen
                }
              }
            }
          `
          try {
            const data = cache.readQuery({ query })
            for (const thing of data?.orgData.things) {
              const localState = getState(thing.state, thing.ts_last_seen)
              if (localState !== thing.localState) {
                cache.writeData({
                  id: `${thing.__typename}:${thing.id}`,
                  data: {
                    localState
                  }
                })
              }
            }
          } catch (e) {
            // throw new Error('unable to update cache')
            throw new Error(e)
          }
        }
      }
    }
  }*/
}
