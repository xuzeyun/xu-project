<template>
  <div>
    <p v-html="text"></p>
  </div>
  <div>
    <textarea v-model="textVal" cols="30" rows="10"></textarea>
    <button @click="submit">提交</button>
  </div>
  <div class="emo-select">
    <template v-for="(item, key, index) in emoList" :key="index">
      <img :src="item" alt="" @click="addEmo(key)">
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const textVal = ref('');
const text = ref('');

const emoList = {
  '[image 2]': 'emoji/image 2.png',
  '[image 3]': 'emoji/image 3.png',
  '[image 4]': 'emoji/image 4.png',
}

const addEmo = (emoName: any) => {
  textVal.value += emoName
}

const submit = () => {
  text.value = textVal.value
  for (const key in emoList) {
    text.value = text.value.replace(key, `<img src="${emoList[key]}">`)

    all(key)
  }
  textVal.value = ''
}

const all = (key) => {
  if(text.value.indexOf(key) != -1){
    text.value = text.value.replace(key, `<img src="${emoList[key]}">`)
    all(key)
  } else {
    return
  }
}
</script>

<style>
.emo-select img{
  cursor: pointer;
  width: 40px;
  height: 40px;
}
p{
  line-height: 30px;
}
p img{
  vertical-align: middle;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 2px;
}
</style>