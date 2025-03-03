<template>
  <div class="wrap">
    <BaseGantt :view-mode="mode" :tasks="tasks" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

onMounted(() => {})

const mode = ref('week')
const tasks = ref([
  {
    id: '1',
    name: 'Hello',
    start: '2019-01-01',
    end: '2019-01-05',
    progress: 10
  },
  {
    id: '2',
    name: 'World',
    start: '2019-01-05',
    end: '2019-01-10',
    progress: 20,
    dependencies: '1'
  },
  {
    id: '3',
    name: 'From',
    start: '2019-01-10',
    end: '2019-01-15',
    progress: 30,
    dependencies: '2'
  },
  {
    id: '4',
    name: 'Lloyd',
    start: '2019-01-15',
    end: '2019-01-20',
    progress: 40,
    dependencies: '3'
  }
])
</script>

<style lang="scss" scoped>
@import '@/assets/dist/frappe-gantt.css';
// @import 'frappe-gantt/dist/frappe-gantt.css';
.wrap {
  width: 100%;
  height: 100%;
}
</style>
