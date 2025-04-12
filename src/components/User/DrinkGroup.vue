<template>
  <div v-if="list.length > 0">
    {{ moment(date).format('ll') }}
    <a-badge
      :count="getSummary.total"
      :overflow-count="999"
      :number-style="{
        backgroundColor: getSummary.color,
        color: '#fff',
      }"
    />
  </div>
  <div v-for="record in list" :key="record.id">
    <div style="padding: 10px 0; border-bottom: dashed 1px #422f19; margin-bottom: 10px">
      {{ record.drink.caffeine }} - {{ record.drink.name }} - {{ record.level }}
    </div>
  </div>
</template>

<script setup>
import { sum, get} from 'lodash'
import { computed, toRefs } from 'vue'
import moment from 'moment/moment'
import { userStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'

const uStore = userStore()
const { user } = storeToRefs(uStore)

const props = defineProps({
  list: {
    type: Array,
    default() {
      ;[]
    },
  },
  date: {
    type: String,
    required: true,
  },
})

const { list, date } = toRefs(props)

const getSummary = computed(() => {
  const v = get(user.value, 'config.threshold', 200)
  if (v) {
    const total = sum(
      list.value.map((item) => {
        if (item.level === 'full') return item.drink.caffeine
        if (item.level === 'half') return item.drink.caffeine / 2
        if (item.level === 'some') return item.drink.caffeine / 4
        else return 0
      }),
    )

    return {
      total: total,
      threshold: v,
      color: total >= v ? '#ff4d4f' : total < v / 2 ? '#52c41a' : '#e8c83c',
    }
  } else {
    return {}
  }
})
</script>
