<script setup lang="ts">
import MyIdentity from '@/components/MyIdentity.vue';
import { computed } from 'vue';

const props = defineProps<{ align?: 'left' }>();

const alignment = computed(() => {
  return props.align === 'left' ? 'text-left items-start' : 'text-center items-center';
});
</script>

<template>
  <section :class="alignment" class="h-full flex flex-col justify-center min-h-[75vh]">
    <MyIdentity />
  </section>
</template>
