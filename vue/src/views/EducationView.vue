<script setup lang="ts">
import SectionSubHeader from '@/components/headers/SectionSubHeader.vue';
import ContentView from '@/components/ContentView.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <ContentView>
    <template #header>Education</template>
    <template #content>
      <ul>
        <li v-for="experience in store.education" :key="experience.startDate">
          <SectionSubHeader tag="h3">{{ experience.institution }}</SectionSubHeader>
          <p class="text-xl mb-2 print:mb-1 print:text-xs">{{ experience.studyType }}</p>
        </li>
      </ul>
    </template>
  </ContentView>
</template>
