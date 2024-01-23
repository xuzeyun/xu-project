<template>
  <div class="red">
    home
    <font-awesome-icon :icon="['fas', 'user-secret']" />
    <font-awesome-icon :icon="['fas', 'users-cog']" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style lang="scss">
.red {
  color: red;
}
</style>
