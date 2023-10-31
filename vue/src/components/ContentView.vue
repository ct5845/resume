<script setup>
import PageHeader from './headers/PageHeader.vue';
</script>

<template>
  <section class="max-w-prose mx-auto print:mx-0 print:max-w-none">
    <PageHeader><slot name="header"></slot></PageHeader>
    <slot name="content"></slot>
  </section>
</template>
