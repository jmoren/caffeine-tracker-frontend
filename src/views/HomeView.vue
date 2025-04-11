<script setup>
import IconCoffee from '@/components/icons/IconCoffee.vue'
import { ref } from 'vue'
import router from '@/router/index.js'
import { logout } from '@/services/auth'

const headerStyle = {
  display: 'flex',
  color: '#422f19',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const menuStyle = {
  backgroundColor: 'transparent',
  textAlign: 'left',
  color: '#fff',
}

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#422f19',
}

const contentStyle = {
  color: '#1a1a1a',
  backgroundColor: '#fff0e5',
}
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: 'Dashboard',
    label: 'Dashboard',
    title: 'Dashboard'
  },
  {
    key: 'Drinks',
    label: 'Drinks',
    title: 'Drinks'
  },
  {
    key: 'Configuration',
    label: 'Configuration',
    title: 'Configuration'
  }
])

const handleClick = menuInfo => {
  console.log('click ', menuInfo);
  router.push({ name: menuInfo.key })
};

const makeLogout = async () => {
  await logout()
  await router.push({ name: 'login' })
}
</script>

<style>
.ant-layout-header {
  padding: 0 !important;
  line-height: unset !important;

}
</style>
<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <h2 style="color: #422f19; padding: 0 10px;">Caffeine Tracker</h2>
      <IconCoffee />
      <a-button type="text" danger @click="makeLogout">
        Logout
      </a-button>
    </a-layout-header>
    <a-layout style="min-height: 100vh">
      <a-layout-sider :style="siderStyle">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="vertical"
          theme="dark"
          :style="menuStyle"
          :items="items"
          @click="handleClick"
        />
      </a-layout-sider>
      <a-layout-content :style="contentStyle">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
