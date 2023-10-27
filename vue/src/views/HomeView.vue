<script setup lang="ts">
import ContactMe from '@/components/ContactMe.vue';
</script>

<template>
  <main class="flex-1 flex flex-col align-items-center justify-center">
    <h1 class="text-6xl text-center font-bold leading-none tracking-tight mt-6">
      <span
        class="box-decoration-clone bg-gradient-to-r from-primary to-secondary text-white px-2 leading-tight">
        Christopher
        <br />
        Turner
      </span>
    </h1>
    <h2 class="text-2xl text-center font-bold tracking-wide">Web Architect</h2>
  </main>
  <div class="p-2 flex flex-row items-center justify-center">
    <a
      class="btn btn-info btn-sm w-24 flex-grow"
      href="https://www.linkedin.com/in/christopher-turner-b4a2813a">
      <v-icon name="bi-linkedin" />
      Contact via LinkedIn
    </a>
    <span class="mx-2 flex-shrink-0">•</span>
    <div class="flex flex-grow flex-shrink-0 w-24 flex-row items-center">
      <v-icon class="mr-2" name="fi-gb" />
      <span>Bristol, UK</span>
    </div>
  </div>
</template>
