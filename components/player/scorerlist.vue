<template>
  <div class="overflow-y-auto">
    <table
      class="relative min-w-full divide-y divide-gray-200 text-right font-mono dark:divide-gray-600"
    >
      <thead
        class="
          sticky
          top-0
          z-9
          bg-primary-500
          text-right text-base
          uppercase
          tracking-wider
          text-primary-50
          dark:bg-primary-700 dark:text-primary-200
        "
      >
        <tr class="font-serif text-sm font-extralight uppercase md:text-xl">
          <th></th>
          <th
            v-for="col in cols"
            scope="col"
            class="cursor-pointer whitespace-nowrap px-1 py-3"
            @click="() => sortColumn(col)"
            :key="'headline-' + col"
            :class="col === 'name' ? 'text-left' : ''"
          >
            {{ $t(`column.${col}`) }}
            <span
              class="inline-block h-1 w-1 border-4 border-transparent"
              :class="
                sortCol === col && direction === 'desc'
                  ? 'border-t-primary-100'
                  : sortCol === col && direction === 'asc'
                  ? 'border-b-primary-100'
                  : ''
              "
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="error">
          <td colspan="9" class="py-4 text-center font-medium text-secondary-500">
            Spieler können nicht geladen werden.
          </td>
        </tr>
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <tr
          v-if="loading"
          v-for="n in 12"
          :key="`roster-${n}`"
          :class="n % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        >
          <!-- eslint-enable -->
          <td></td>
          <td class="p-1 text-left">
            <div
              class="float-right h-6 w-4 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
            />
            <div
              class="float-right h-6 w-16 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
            />
          </td>
          <td v-for="c in 20" :key="`playerlist-${n}-${c}`" class="px-2 py-1">
            <div
              class="float-right h-6 w-6 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
            />
          </td>
        </tr>
        <tr
          v-for="(row, index) in sortedScorer"
          :class="
            index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
          "
          class="text-base hover:bg-gray-100 dark:hover:bg-primary-700"
          :key="`${row.player.fname}-${row.player.lname}-${row.team.teamid}`"
        >
          <td v-if="firstCol === 'rank'">{{ index + 1 }}.</td>
          <td v-else></td>
          <td
            v-for="col in cols"
            class="whitespace-nowrap p-1 text-gray-600 dark:text-gray-400"
            :class="[
              sortCol === col
                ? 'bg-gray-100 hover:bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700'
                : '',
              col === 'name' ? 'text-left' : ''
            ]"
            :style="
              logTeam === row.team.teamid
                ? `background-color: ${row.team.background}; color: ${row.team.foreground};`
                : ''
            "
            :key="row.team.teamid + col"
          >
            <player-linked-name v-if="col === 'name'" :player="row.player" />
            <span v-else-if="col === 'spercentage'">{{ shotpercentage(row[col]) }}</span>
            <span v-else-if="col === 'averageicetime'">{{ averageicetime(row[col]) }}</span>
            <span v-else>{{ row[col] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import statsMixin from '~/mixins/playerstats'

export default {
  mixins: [statsMixin],
  props: {
    sortedScorer: Array,
    columns: Array,
    loading: Boolean,
    error: Boolean,
    sortColumn: {
      type: Function,
      default: () => {}
    },
    sortCol: String,
    direction: String,
    firstCol: {
      type: String,
      default: 'rank'
    }
  },
  computed: {
    ...mapState({
      logTeam: (state) => state.user.team
    }),
    cols() {
      if (this.columns) {
        return this.columns
      }
      return [
        'name',
        'games',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
        'ejections',
        'evg',
        'ppg',
        'shg',
        'gwg',
        'eva',
        'ppa',
        'sha',
        'shots',
        'spercentage',
        'icetime',
        'averageicetime',
        'hits',
        'injuries'
      ]
    }
  }
}
</script>
