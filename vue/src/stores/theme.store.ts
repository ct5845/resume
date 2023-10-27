import { Theme, getTheme, setTheme, storeTheme, systemTheme } from '@/core/theme';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(getTheme());

  const absoluteTheme = computed(() => {
    return theme.value ? theme.value : systemTheme();
  });

  const isSystem = computed(() => {
    return theme.value === null;
  });

  const isDark = computed(() => {
    return absoluteTheme.value === Theme.dark;
  });

  const update = (value: Theme | null) => {
    theme.value = value;
    storeTheme(value);
    setTheme(absoluteTheme.value);
  };

  return { theme, isSystem, isDark, update };
});
