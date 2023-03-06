<script lang="ts" setup>
import { toRef } from 'vue';

const props = withDefaults(defineProps<{
  width?: string
}>(), {
  width: '300px'
})

const width = toRef(props, "width")
</script>

<template>
  <div class="grid-wrapper">
    <slot/>
  </div>
</template>

<style scoped>
.grid-wrapper {
  margin: 1.4rem 0;
  display: grid;
  place-items: stretch;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(v-bind(width), 1fr));
}
</style>