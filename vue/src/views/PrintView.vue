<script setup>
import MyIdentity from '@/components/MyIdentity.vue';
import WorkViewVue from './WorkView.vue';
import ResumeProfiles from '@/components/ResumeProfiles.vue';
import EducationView from './EducationView.vue';
import SkillsView from './SkillsView.vue';
import InterestsView from './InterestsView.vue';
</script>

<template>
  <main class="h-full mx-auto max-w-[525pt] min-h-screen grid-cols-[1fr_150pt] text-black">
    <div class="pr-2 border-r-2">
      <MyIdentity />
      <WorkViewVue class="border-t-2 mt-2 pt-2" />
    </div>
    <div class="pl-2">
      <ul>
        <ResumeProfiles />
      </ul>
      <EducationView class="border-t-2 mt-2 pt-2" />
      <SkillsView class="border-t-2 mt-2 pt-2" />
      <InterestsView class="border-t-2 mt-2 pt-2" />
    </div>
  </main>
</template>
