import { defineStore } from 'pinia';
import resumeJSON from '../../public/resume.json';
import { ref } from 'vue';

export const useResumeStore = defineStore('resume', () => {
  const resume = ref(resumeJSON);

  return { resume };
});
