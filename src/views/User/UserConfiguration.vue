<template>
  <div style="padding: 20px;">
    <h3>Account</h3>
    <p>Email: {{ user.email }}</p>
    <p>Username: {{ user.username }}</p>
    <h4>Configuration</h4>
    <p>Threshold: {{ user.config.threshold }}</p>
    <p>Max per day: {{ user.config.max_per_day }}</p>
    <br>
    <a-button @click="showModal = true">Edit Configuration</a-button>
  </div>


  <a-modal v-model:open="showModal" title="Edit Configuration" @ok="submit">
    <a-form
      layout="vertical"
      :model="userCopy"
    >
      <a-form-item
        label="Username"
        name="username"
      >
        <a-input v-model:value="userCopy.username" />
      </a-form-item>
      <a-form-item
        label="Threshold"
        name="threshold"
      >
        <a-input-number v-model:value="userCopy.config.threshold" />
      </a-form-item>
      <a-form-item
        label="Max per day"
        name="max_per_day"
      >
        <a-input-number v-model:value="userCopy.config.max_per_day" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { userStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import {cloneDeep} from 'lodash'
import { ref } from 'vue'
import { editUser } from '@/services/user.js'

const uStore = userStore()
const showModal = ref(false)
const { user } = storeToRefs(uStore);

const userCopy = ref(cloneDeep(user.value))

const submit = async () => {
  try {
    const res = await editUser({
      user: {
        username: userCopy.value.username,
        user_configuration_attributes: {
          max_per_day: userCopy.value.config.max_per_day,
          threshold: userCopy.value.config.threshold
        }
      }
    })
    userCopy.value = cloneDeep(res.data.user)
    uStore.login(res.data.user)
    showModal.value = false
  } catch (e) {
    console.log(e)
  }
}
</script>
