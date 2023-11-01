<script setup lang="ts">
const props = defineProps<{ tag?: string }>();
</script>

<template>
  <component
    :is="tag ?? 'h3'"
    class="text-3xl mb-2 text-primary font-bold print:text-xl print:mb-1">
    <slot></slot>
  </component>
</template>
