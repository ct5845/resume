<script setup lang="ts">
import ContentView from '@/components/ContentView.vue';
import SectionHeader from '@/components/headers/SectionHeader.vue';
import SectionSubHeader from '@/components/headers/SectionSubHeader.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <ContentView>
    <template #header>Interests</template>
    <template #content>
      <ul>
        <li v-for="interest in store.interests" :key="interest.name">
          <SectionHeader class="print:hidden">{{ interest.name }}</SectionHeader>
          <ul class="print:hidden mb-4">
            <li class="mb-2" v-for="item in interest.keywords" :key="item">
              <p v-html="item"></p>
            </li>
          </ul>
          <SectionSubHeader class="hidden print:block">{{ interest.name }}</SectionSubHeader>
          <p class="hidden print:block" v-html="interest.shortText"></p>
        </li>
      </ul>
    </template>
  </ContentView>
</template>
