<template>
  <div style="padding: 40px; display: flex; justify-content: space-between; align-items: center">
    <add-drink @new-record="(data) => storeRecord(data)" />
    <a-button @click="openSummary">View Summary</a-button>
  </div>
  <hr />
  <div style="padding: 40px">
    <a-timeline>
      <a-timeline-item v-for="(record_list, date) in sortedList" :key="date">
        <drink-group :date="date" :list="record_list" />
      </a-timeline-item>
    </a-timeline>
  </div>

  <a-drawer
    v-model:open="showDrawer"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="Summary"
    width="500px"
    placement="right"
  >
    <drinks-summary ref="summaryRef" />
  </a-drawer>
</template>

<script setup>
import AddDrink from '@/components/User/AddDrink.vue'
import DrinkGroup from '@/components/User/DrinkGroup.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { fetchEntries } from '@/services/user.js'
import { fromPairs, toPairs, sortBy } from 'lodash'
import moment from 'moment'
import DrinksSummary from '@/components/User/DrinksSummary.vue'

const summaryRef = ref(null)
const records = ref([])
const showDrawer =  ref(false)
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

const openSummary = () => {
  showDrawer.value = true
}
onMounted(() => {
  loadEntries()
})
</script>
