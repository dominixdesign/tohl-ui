export const state = () => ({
  colors: {
    kni: { f: '#000', b: '#27A349' },
    np: { f: '#000', b: '#558148' },
    haw: { f: '#C0A062', b: '#4A2162' },
    mer: { f: '#243E90', b: '#F6EB16' },
    pow: { f: '#000', b: '#EF7E3E' },
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
})

export const getters = {
  colorsByTeam: (state) => (team) => state.colors[team],
  foregroundByTeam: (state) => (team) => state.colors[team]?.f,
  backgroundByTeam: (state) => (team) => state.colors[team]?.b
}
