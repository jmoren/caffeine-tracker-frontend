<template>
  <div style="padding: 40px">
    <div style="margin-bottom: 20px;">
      <a-button @click="openDrinkForm">New Drink</a-button>
    </div>

    <a-table :dataSource="drinks" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <a-image :src="record.image_url" :width="120"/>
        </template>
        <template v-else-if="column.key === 'name'">
          <h3>{{ record.name }}</h3>
          <p>{{ record.description }}</p>
        </template>
        <template v-else-if="column.key === 'caffeine'">
          <span>
            <a-tag :color="record.caffeine > 100 ? 'volcano' : record.caffeine > 50 ? 'yellow' : 'green'">
              {{ record.caffeine }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="showForm" title="New Drink" @ok="submit" :confirm-loading="confirmLoading">
      <a-form
        layout="vertical"
        :model="newDrink"
      >
        <a-form-item
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please add the name' }]"
        >
          <a-input v-model:value="newDrink.name" />
        </a-form-item>
        <a-form-item
          label="Description"
          name="description"
        >
          <a-input v-model:value="newDrink.description" />
        </a-form-item>
        <a-form-item
          label="Caffeine"
          name="caffeine"
          :rules="[{ required: true, message: 'Please set caffeine level' }]"
        >
          <a-input-number v-model:value="newDrink.caffeine" :min="1" />
        </a-form-item>
        <a-form-item
          label="Image"
          name="image"
        >
          <a-input v-model:value="newDrink.image_url" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { allDrinks, createDrink } from '@/services/drinks.js'


const drinks = ref([])
const showForm = ref(false)
const newDrink = ref({
  name: '',
  description: '',
  caffeine: 0,
  image_url: ''
})

const loadDrinks = async () => {
  const res = await allDrinks()
  drinks.value = res.data
}

const columns = [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Caffeine',
    dataIndex: 'caffeine',
    key: 'caffeine',
  },
]

const submit = async () => {
  const res = await createDrink(newDrink.value)
  drinks.value.push(res.data)
  showForm.value = false
  newDrink.value = {
    name: '',
    description: '',
    caffeine: 0,
    image_url: ''
  }
}

const openDrinkForm = () => {
  showForm.value = true
  newDrink.value = {
    name: '',
    description: '',
    caffeine: 0,
    image_url: ''
  }
}

onMounted(() => {
  loadDrinks()
})
</script>
