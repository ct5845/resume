<script setup lang="ts">
import { Theme } from '@/core/theme';
import { useThemeStore } from '@/stores/theme.store';
import { computed } from 'vue';
const themes = Theme;
const store = useThemeStore();

const themeIcons = [
  {
    name: 'md-sunny',
    class: computed(() => (!store.isSystem && !store.isDark ? 'swap-on' : 'swap-off'))
  },
  {
    name: 'md-wbsunny-outlined',
    class: computed(() => (store.isSystem && !store.isDark ? 'swap-on' : 'swap-off'))
  },
  {
    name: 'md-modenight-sharp',
    class: computed(() => (!store.isSystem && store.isDark ? 'swap-on' : 'swap-off'))
  },
  {
    name: 'md-modenight-outlined',
    class: computed(() => (store.isSystem && store.isDark ? 'swap-on' : 'swap-off'))
  }
];

const themeButtons = [
  {
    icon: 'md-sunny',
    name: 'Light',
    value: Theme.light,
    active: computed(() => store.theme === Theme.light),
    update: () => store.update(themes.light)
  },
  {
    icon: 'md-modenight-sharp',
    name: 'Dark',
    value: Theme.light,
    active: computed(() => store.theme === Theme.dark),
    update: () => store.update(themes.dark)
  },
  {
    icon: 'md-computer',
    name: 'System',
    value: null,
    active: computed(() => store.theme === null),
    update: () => store.update(null)
  }
];
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabIndex="{0}" class="btn btn-secondary btn-outline shadow">
      <div class="swap swap-flip swap-active">
        <v-icon
          v-for="icon in themeIcons"
          :key="icon"
          :name="icon.name"
          :class="icon.class.value" />
      </div>
      <span>Theme</span>
    </label>
    <ul
      tabIndex="{0}"
      class="menu menu-lg dropdown-content rounded-box bg-base-200 z-10 p-2 mt-2 shadow-md">
      <li v-for="button in themeButtons" :key="button.name">
        <button @click="button.update()" :class="{ active: button.active.value }" type="button">
          <v-icon :name="button.icon" />
          <span>{{ button.name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
