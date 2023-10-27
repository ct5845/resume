import { defineStore } from 'pinia';
import resumeJSON from '@/assets/resume.json';
import { computed, ref } from 'vue';
import type { Basics, Education, Resume, Work, Skills, Interest } from '@/core';

export const useResumeStore = defineStore('resume', () => {
  const resume = ref(resumeJSON as Resume);

  const basics = computed<Basics>(() => resume.value.basics);
  const work = computed<Work[]>(() => resume.value.work);
  const education = computed<Education[]>(() => resume.value.education);
  const skills = computed<Skills>(() => resume.value.skills);
  const interests = computed<Interest[]>(() => resume.value.interests);

  return { resume, basics, work, education, skills, interests };
});
