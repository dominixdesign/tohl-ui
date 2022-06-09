<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, CogIcon } from '@heroicons/vue/solid'
import { computed, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import Datatable from '@/components/Datatable.vue'
import gql from 'graphql-tag'

const route = useRoute()
const router = useRouter()

const { result, loading, error } = useQuery(
  gql`
    query getRoster($team: String!, $season: ID!) {
      roster(teamsim: $team, season: $season) {
        id
        fname
        lname
        display_fname
        display_lname
        seasondata(season: $season) {
          roster
          number
          age
          salary
          contract
          pos
          cd
          ij
          it
          sp
          st
          en
          du
          di
          sk
          pa
          pc
          df
          sc
          ex
          ld
          ov
        }
      }
    }
  `,
  {
    season: `TOHL${route.params.season}`,
    team: route.params.team
  }
)
const players = computed(() => result.value.roster || [])

const navigateToPlayer = (playerId) => {
  router.push(`/player/${playerId}`)
}

const columns = [
  {
    title: '#',
    field: 'seasondata.number',
    sorter: 'number',
    hozAlign: 'right',
    cssClass: 'text-secondary-500 font-bold',
    width: 27,
    minWidth: 27,
    resizable: false,
    frozen: true,
    responsive: 2
  },
  {
    title: 'Name',
    field: 'display_lname',
    sorter: 'string',
    minWidth: 200,
    resizable: false,
    frozen: true,
    cssClass: 'text-tohl-500 underline',
    responsive: 0,
    cellClick: function (e, cell) {
      var data = cell.getRow().getData()
      navigateToPlayer(data.id)
    },
    formatter: function (cell) {
      var data = cell.getRow().getData()
      return `${data.display_fname} <b>${data.display_lname}</b>`
    }
  },
  {
    title: 'Pos',
    field: 'seasondata.pos',
    sorter: 'string',
    width: 37,
    minWidth: 37,
    resizable: false
  },
  {
    title: 'CD',
    field: 'seasondata.cd',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'IT',
    field: 'seasondata.it',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SP',
    field: 'seasondata.sp',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'ST',
    field: 'seasondata.st',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'EN',
    field: 'seasondata.en',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DU',
    field: 'seasondata.du',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DI',
    field: 'seasondata.di',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SK',
    field: 'seasondata.sk',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'PA',
    field: 'seasondata.pa',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'PC',
    field: 'seasondata.pc',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DF',
    field: 'seasondata.df',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SC',
    field: 'seasondata.sc',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'EX',
    field: 'seasondata.ex',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'LD',
    field: 'seasondata.ld',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'OV',
    field: 'seasondata.ov',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'Age',
    field: 'seasondata.age',
    sorter: 'number',
    hozAlign: 'right',
    width: 37,
    minWidth: 37,
    resizable: false,
    responsive: 0
  },
  {
    title: 'CT',
    field: 'seasondata.contract',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'Salary',
    field: 'seasondata.salary',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false,
    responsive: 0,
    width: 100,
    sorterParams: {
      thousandSeparator: '.',
      decimalSeparator: ','
    },
    formatter: 'money',
    formatterParams: {
      decimal: ',',
      thousand: '.',
      symbol: '$',
      precision: false
    }
  },
  {
    title: '#',
    field: 'seasondata.roster',
    visible: false,
    sorter: 'number',
    hozAlign: 'right',
    cssClass: 'text-secondary-500 font-bold',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 2
  }
]

const grouping = ref(false)
const open = ref(false)

const datatableOptions = ref({})

const groups = reactive([
  { id: 'seasondata.cd', name: 'Fitness', active: ref(false) },
  { id: 'seasondata.roster', name: 'Zuordnung', active: ref(false) },
  { id: 'seasondata.pos', name: 'nach Positionen', active: ref(false) }
])

watch(
  groups,
  (newGrouping) => {
    const groupBy = []
    for (const group of newGrouping) {
      if (group.active === true) {
        groupBy.push(group.id)
      }
    }
    datatableOptions.value = {
      groupBy,
      groupHeader: function (value, count) {
        return value + "<span style='margin-left:10px;'>(" + count + ' Spieler)</span>'
      }
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="mt-3">
    <div v-if="loading">laden...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <div v-else>
      <layout-headline :showSeasonSelect="true">{{ $route.params.team }} Roster</layout-headline>
      <Popover class="z-10 relative" v-slot="{ open }">
        <div class="max-w-7xl mx-auto flex justify-end">
          <PopoverButton
            :class="[
              open ? 'text-gray-900' : 'text-gray-500',
              'bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tohl-500'
            ]"
          >
            <CogIcon
              :class="[
                open ? 'text-gray-600' : 'text-gray-400',
                'h-5 w-5 group-hover:text-gray-500'
              ]"
              aria-hidden="true"
            />
          </PopoverButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <PopoverPanel class="absolute z-10 max-w-xl right-0 transform">
            <div class="bg-white relative border border-gray-300 py-2 px-4 rounded shadow-lg">
              <h3 class="text-sm font-medium tracking-wide text-gray-500 uppercase">
                Gruppierungen
              </h3>
              <div class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div
                  v-for="(group, groupIdx) in groups"
                  :key="groupIdx"
                  class="relative flex items-start p-2"
                >
                  <div class="min-w-0 flex-1 text-sm">
                    <label
                      :for="`group-${group.id}`"
                      class="font-medium text-gray-700 select-none"
                      >{{ group.name }}</label
                    >
                  </div>
                  <div class="ml-3 flex items-center h-5">
                    <input
                      v-model="group.active"
                      :id="`group-${group.id}`"
                      :name="`group-${group.id}`"
                      type="checkbox"
                      class="focus:ring-tohl-500 h-4 w-4 text-tohl-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
      <Datatable :tabledata="players" :columns="columns" :options="datatableOptions" />
    </div>
    <span class="text-secondary-500 font-bold"></span>
    <span class="text-tohl-500 font-bold underline"></span>
  </div>
</template>
