<template>
  <div class="red">home</div>
  <el-radio-group v-model="radio1" class="ml-4">
      <el-radio value="1" size="large">Option 1</el-radio>
      <el-radio value="2" size="large">Option 2</el-radio>
    </el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const radio1 = ref('1')
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
</style>
