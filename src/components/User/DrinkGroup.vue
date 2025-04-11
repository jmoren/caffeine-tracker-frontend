<template>
  <div>
    {{ moment(date).format('ll') }}
    <a-badge
      :count="getSummary.total"
      :overflow-count="999"
      :number-style="{
              backgroundColor: getSummary.color,
              color: '#fff'
            }"
    />
  </div>
  <div v-for="record in list" :key="record.id">
    <div style="padding: 10px 0; border-bottom: dashed 1px #422f19; margin-bottom: 10px;">
      {{ record.drink.caffeine }} - {{ record.drink.name }} - {{ record.level }}
    </div>
  </div>
</template>

<script setup>
import { sum } from 'lodash'
import { computed, toRefs } from 'vue'
import moment from 'moment/moment'

const threshold = 200
const props = defineProps({
  list: {
    type: Array,
    default() {[]}
  },
  date: {
    type: String,
    required: true
  }
})

const { list, date } = toRefs(props)

const getSummary = computed(() => {
  const total = sum(list.value.map((item) => {
    if (item.level === 'full') return item.drink.caffeine
    if (item.level === 'half') return item.drink.caffeine / 2
    if (item.level === 'some') return item.drink.caffeine / 4
    else return 0
  }))

  return {
    total: total,
    threshold: threshold,
    color: total >= threshold ? '#ff4d4f' : total < (threshold / 2) ? '#52c41a' : '#e8c83c',
  }
})
</script>
