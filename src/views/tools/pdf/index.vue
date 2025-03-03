<template>
  <BasePdf :src="pdfUrl"></BasePdf>
</template>
<script setup>
const pdfUrl = ref('/files/czsc.pdf')

onMounted(() => {})
</script>
