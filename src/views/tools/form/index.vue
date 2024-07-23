<template>
  <div>
    <el-form ref="formRef" :model="form">
      <el-form-item label="Activity name" prop="name">
        <el-radio-group v-model="form.name" size="">
          <el-radio label="New York" value="1" />
          <el-radio label="Washington" value="2" />
          <el-radio label="Los Angeles" value="3" />
          <el-radio label="Chicago" value="4" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity name2" prop="name2">
        <el-radio-group v-model="form.name2" size="">
          <el-radio label="New York" value="1" />
          <el-radio label="Washington" value="2" />
          <el-radio label="Los Angeles" value="3" />
          <el-radio label="Chicago" value="4" />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button @click="reset(formRef)">重置</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const formRef = ref(null);
const form = reactive({
  name: '1',
  name2: '1',

})

onMounted(() => {
  
})

const reset = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>

</style>
