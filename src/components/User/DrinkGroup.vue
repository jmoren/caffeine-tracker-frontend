<template>
  <div v-if="copyList.length > 0">
    <div style="margin-bottom: 20px;">
      {{ moment(date).format('ll') }}
      <a-badge
        :count="getSummary.total"
        :overflow-count="999"
        :number-style="{
          backgroundColor: getSummary.color,
          color: '#fff'
        }"
      />
      <div style="float: right" v-if="isCurrentDate">
        You can still consume
        <a-badge
          :count="user.config.max_per_day - getSummary.total"
          :overflow-count="999"
          :number-style="{
            backgroundColor: '#1677ff',
            color: '#fff'
          }"
        />
      </div>
    </div>
    <div v-for="record in copyList" :key="record.id">
    <div style="padding: 10px 0; border-bottom: dashed 1px #422f19; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center">
      {{ record.drink.caffeine }} - {{ record.drink.name }} - {{ record.level }}
      <a-button type="primary" danger size="small" @click="showDeleteConfirm(record)">
        <template #icon>
          <DeleteOutlined />
        </template>
      </a-button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { sum, get, cloneDeep} from 'lodash'
import { computed, createVNode, ref, toRefs } from 'vue'
import moment from 'moment/moment'
import { userStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { removeRecord } from '@/services/user.js'

const uStore = userStore()
const { user } = storeToRefs(uStore)

const props = defineProps({
  list: {
    type: Array,
    default() {
      []
    },
  },
  date: {
    type: String,
    required: true,
  },
})

const { list, date } = toRefs(props)
const copyList = ref(cloneDeep(list.value))
const isCurrentDate = computed(() => {
  return moment(date.value).format('ll') === moment().format('ll')
})

const getSummary = computed(() => {
  const v = get(user.value, 'config.threshold', 200)
  if (v) {
    const total = sum(
      copyList.value.map((item) => {
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

const showDeleteConfirm = (record) => {
  Modal.confirm({
    title: 'Are you sure delete this record?',
    icon: createVNode(ExclamationCircleOutlined),
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deleteRecord(record)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const deleteRecord = async (record) => {
  await removeRecord(record.id)
  const index = copyList.value.findIndex(record => record.id === record.id)
  copyList.value.splice(index, 1)
}
</script>
