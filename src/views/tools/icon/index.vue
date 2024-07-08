<template>
  <div>
    <el-row>
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="名称" prop="mc">
          <el-input v-model="queryForm.mc" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryHandle"><font-awesome-icon class="icon" icon="search" />查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="icon-wrap">
      <el-card class="icon-card" v-for="(item, index) in modules" :key="index" >
        <font-awesome-icon class="icon" :icon="item.iconName" />
        <p class="g-ellipsis">{{ item.iconName }}</p>
      </el-card>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons';

onMounted(() => {
  for (let [key, item] of Object.entries(fas)) {
    modules.value.push({
      key,
      prefix: item.prefix,
      iconName: item.iconName
    })
  }
});

// 查询表单
const queryForm = reactive({
  mc: ''
})

const modules = ref([])

const queryHandle = () => {

}
</script>

<style lang="scss" scoped>
.icon-wrap{
  display: flex;
  gap: 10px;
}
.icon-card{
width: 100px;
text-align: center;
  p{
    margin:10px auto 0px auto;
  }
}
</style>
