<script setup lang="ts">
const props = defineProps<{ tag?: string }>();
</script>

<template>
  <component
    :is="tag ?? 'h4'"
    class="text-2xl mb-2 text-secondary flex flex-row justify-between print:text-lg print:mb-1">
    <slot></slot>
  </component>
</template>
