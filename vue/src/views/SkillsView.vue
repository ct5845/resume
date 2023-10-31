<script setup lang="ts">
import ContentView from '@/components/ContentView.vue';
import SectionHeader from '@/components/headers/SectionHeader.vue';
import SectionSubHeader from '@/components/headers/SectionSubHeader.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <ContentView>
    <template #header>Skills</template>
    <template #content>
      <ul>
        <SectionHeader class="mb-4 print:hidden">Languages</SectionHeader>
        <SectionSubHeader class="hidden print:block">Languages</SectionSubHeader>
        <div class="print:flex print:flex-row print:flex-wrap">
          <li v-for="skill in store.skills.languages.primary" :key="skill">
            <span
              class="badge badge-lg mb-1 text-lg font-semibold badge-secondary print:badge-sm print:badge-ghost">
              {{ skill }}
            </span>
          </li>
        </div>
        <div class="flex flex-row flex-wrap print:mb-1">
          <li v-for="skill in store.skills.languages.secondary" :key="skill">
            <span class="badge badge-neutral mr-2 print:badge-sm mb-1 print:badge-ghost">
              {{ skill }}
            </span>
          </li>
          <li v-for="skill in store.skills.languages.tertiary" :key="skill">
            <span class="badge badge-sm badge-ghost mr-2 mb-1 print:badge-sm">{{ skill }}</span>
          </li>
        </div>
        <SectionHeader class="my-4 print:hidden">Frameworks</SectionHeader>
        <SectionSubHeader class="hidden print:block">Languages</SectionSubHeader>
        <div class="print:flex print:flex-row print:flex-wrap">
          <li v-for="skill in store.skills.frameworks.primary" :key="skill">
            <span
              class="badge badge-lg mb-1 text-lg font-semibold badge-accent print:badge-sm print:badge-ghost">
              {{ skill }}
            </span>
          </li>
        </div>
        <div class="flex flex-row flex-wrap print:mb-1">
          <li v-for="skill in store.skills.frameworks.secondary" :key="skill">
            <span class="badge badge-neutral mr-2 mb-1 print:badge-sm print:badge-ghost">
              {{ skill }}
            </span>
          </li>
          <li v-for="skill in store.skills.frameworks.tertiary" :key="skill">
            <span class="badge badge-sm badge-ghost print:badge-sm mb-1 mr-2">{{ skill }}</span>
          </li>
        </div>
        <SectionHeader class="my-4 print:hidden">Tools/Other</SectionHeader>
        <SectionSubHeader class="hidden print:block">Languages</SectionSubHeader>
        <div class="flex flex-row flex-wrap">
          <li v-for="skill in store.skills.tools.primary" :key="skill">
            <span class="badge badge-neutral print:badge-sm mr-2 mb-1 print:badge-ghost">
              {{ skill }}
            </span>
          </li>
          <li v-for="skill in store.skills.tools.secondary" :key="skill">
            <span class="badge badge-neutral print:badge-sm mr-2 mb-1 print:badge-ghost">
              {{ skill }}
            </span>
          </li>
        </div>
      </ul>
    </template>
  </ContentView>
</template>
