<template>
  <a-form layout="inline">
    <a-form-item><a-date-picker v-model:value="startDate" :format="dateFormat" /></a-form-item>
    <a-form-item><a-date-picker v-model:value="endDate" :format="dateFormat" /></a-form-item>
    <a-form-item><a-button @click="getResults">Get Results</a-button></a-form-item>
  </a-form>
  <div style="margin: 20px 0; padding: 10px;">
    <h3>You Caffeine consumption</h3>
    <br>
    <p> Total consumed: {{ result.sum  || 'N/A' }}</p>
    <p> Average consumption: {{ result.avg  || 'N/A' }}</p>
    <p> Max consumed: {{ result.max  || 'N/A' }}</p>
    <p> Total drinks consumed: {{ result.total_drinks  || 'N/A' }}</p>
  </div>
</template>


<script setup>

import { fetchSummary } from '@/services/user.js'
import { ref } from 'vue'

const startDate = ref(null)
const endDate = ref(null)
const result = ref({})
const dateFormat = 'MM/DD/YYYY';

const getResults = async () => {
  const res = await fetchSummary(startDate.value, endDate.value)
  result.value = res.data.summary
}

</script>
