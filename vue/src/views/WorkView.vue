<script setup lang="ts">
import SectionHeader from '@/components/headers/SectionHeader.vue';
import SectionSubHeader from '@/components/headers/SectionSubHeader.vue';
import ContentView from '@/components/ContentView.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <ContentView>
    <template #header>Work Experience</template>
    <template #content>
      <ul>
        <li v-for="experience in store.work" :key="experience.id">
          <SectionHeader>{{ experience.position }}</SectionHeader>
          <SectionSubHeader>
            <span>{{ experience.name }}</span>
            <span class="text-accent">
              {{ experience.startDate }} - {{ experience.endDate ?? 'Present' }}
            </span>
          </SectionSubHeader>
          <ul class="pl-4 mb-6 list-disc">
            <li v-for="highlight in experience.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </ContentView>
</template>
