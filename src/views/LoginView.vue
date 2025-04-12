<!-- src/views/LoginView.vue -->
<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <i><IconCoffee /></i>
    </a-layout-header>
    <a-layout>
      <a-layout-content :style="contentStyle">
        <a-form
          :model="user"
          name="basic"
          layout="vertical"
          autocomplete="off"
          @finish="handleLogin"
        >
          <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input v-model:value="user.email" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="user.password" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
        <p v-if="error">{{ error }}</p>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/services/auth'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import IconCoffee from '@/components/icons/IconCoffee.vue'

const uStore = userStore()
const router = useRouter()
const user = ref({ email: '', password: '' })
const error = ref('')

const handleLogin = async () => {
  try {
    await login(user.value)
    await router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed'
  }
}

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
}

const contentStyle = {
  padding: '20px',
  height: '100%',
  width: '40%',
  margin: '20px auto',
}
</script>
