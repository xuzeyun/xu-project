<template>
  <div>
    <el-form ref="formRef" :model="form">
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <el-button @click="reset(formRef)">重置</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const formRef = ref(null);
const form = reactive({
  name: '',
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
