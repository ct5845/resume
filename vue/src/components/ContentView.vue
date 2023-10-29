<script setup>
import PageHeader from './headers/PageHeader.vue';
</script>

<template>
  <section class="max-w-prose mx-auto">
    <PageHeader><slot name="header"></slot></PageHeader>
    <slot name="content"></slot>
  </section>
</template>
