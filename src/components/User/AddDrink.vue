<template>
  <a-form
    layout="inline"
    :model="newRecord"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-select
        v-model:value="newRecord.drink_id"
        style="width: 250px"
        show-search
        :filter-option="filterOption"
        :options="drinks.map(item => ({ label: item.name, value: item.id }))"
      />
    </a-form-item>
    <a-form-item>
      <a-select
        v-model:value="newRecord.level"
        style="width: 150px"
        :options="levels.map(item => ({ value: item }))"
      />
    </a-form-item>
    <a-form-item>
      <a-date-picker v-model:value="newRecord.consumed_at" :format="dateFormat" />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="newRecord.drink_id === '' || newRecord.consumed_at === ''"
      >
        Save
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { allDrinks } from "@/services/drinks.js"
import { addRecord } from "@/services/user.js"
const drinks = ref([])
const dateFormat = 'YYYY/MM/DD';
const levels = [
  'full',
  'half',
  'some'
]
const emits = defineEmits(["newRecord"])
const newRecord = ref({
  drink_id: '',
  level: '',
  consumed_at: ''
})

const fetchDrinks = async () => {
  const res = await allDrinks()
  drinks.value = res.data
}

const handleFinish = async () => {
  const res = await addRecord(newRecord.value)
  emits('newRecord', res.data)
  newRecord.value = {
    drink_id: '',
    level: '',
    consumed_at: ''
  }
}

const handleFinishFailed = () => {
  console.log('fail')
}

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

onMounted(async () => {
  await fetchDrinks()
})
</script>
