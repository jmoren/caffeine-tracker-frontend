<template>
  <div style="padding: 40px">
    <add-drink @new-record="(data) => storeRecord(data)" />
  </div>
  <hr />
  <div style="padding: 40px">
    <a-timeline>
      <a-timeline-item v-for="(record_list, date) in sortedList" :key="date">
        <drink-group :date="date" :list="record_list" />
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup>
import AddDrink from '@/components/User/AddDrink.vue'
import DrinkGroup from '@/components/User/DrinkGroup.vue'
import { computed, onMounted, ref } from 'vue'
import { fetchEntries } from '@/services/user.js'
import { fromPairs, toPairs, sortBy } from 'lodash'
import moment from 'moment'

const records = ref([])

const sortedList = computed(() => {
  return fromPairs(sortBy(toPairs(records.value), ([key]) => key))
})
const storeRecord = (record) => {
  const key = moment(record.consumed_at).format('YYYY-MM-DD')
  if (records.value[key]) records.value[key].push(record)
  else records.value[key] = [record]
}

const loadEntries = async () => {
  const res = await fetchEntries()
  records.value = res.data
}

onMounted(() => {
  loadEntries()
})
</script>
