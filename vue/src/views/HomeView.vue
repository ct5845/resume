<script setup lang="ts">
import MyIdentity from '@/components/MyIdentity.vue';
import PermenantNavigation from '@/components/PermenantNavigation.vue';
</script>

<template>
  <v-responsive
    tag="section"
    target="md-"
    class="h-full flex flex-col justify-center min-h-[75vh] items-center text-center">
    <MyIdentity />
  </v-responsive>
  <v-responsive tag="section" target="lg+" class="flex flex-row min-h-[75vh] items-center">
    <PermenantNavigation />
  </v-responsive>
</template>
