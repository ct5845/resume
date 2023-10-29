<script setup lang="ts">
import ContentView from '@/components/ContentView.vue';
import SectionHeader from '@/components/headers/SectionHeader.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <ContentView>
    <template #header>Interests</template>
    <template #content>
      <ul>
        <li v-for="interest in store.interests" :key="interest.name">
          <SectionHeader>{{ interest.name }}</SectionHeader>
          <ul>
            <li class="mb-2" v-for="item in interest.keywords" :key="item">
              <p v-html="item"></p>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </ContentView>
</template>
