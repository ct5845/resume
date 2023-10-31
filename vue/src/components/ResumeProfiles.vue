<script setup lang="ts">
import { useResumeStore } from '@/stores';
const resumeStore = useResumeStore();
</script>

<template>
  <li class="text-info hidden print:list-item print:mb-1">
    <v-icon name="md-email-round" class="print:mr-1" />
    <span>ct5845@gmail.com</span>
  </li>
  <li class="text-info hidden print:list-item print:mb-1">
    <v-icon name="md-link" class="print:mr-1" />
    <span>{{ resumeStore.basics.url.replace('https://', '') }}</span>
  </li>
  <li
    class="text-info print:mb-1"
    v-for="profile in resumeStore.basics.profiles"
    :key="profile.network">
    <a :href="profile.url">
      <v-icon :name="profile.icon['vue']" class="print:mr-1" />
      <span class="print:hidden">{{ profile.network }}</span>
      <span class="hidden print:inline">{{ profile.url.replace('https://', '') }}</span>
    </a>
  </li>
</template>
