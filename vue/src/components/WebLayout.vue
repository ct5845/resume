<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ splash: boolean }>();

const sideDrawerLargeClass = computed(() => (props.splash ? 'lg:hidden' : ''));
const contentClass = computed(() => (props.splash ? '' : ''));
const footerClass = computed(() => (props.splash ? '' : 'lg:col-start-2 lg:col-span-1'));
const sideNavToggleId = 'side-nav-open';
</script>

<template>
  <div
    class="drawer grid gap-1 min-h-screen grid-cols-2 grid-rows-[auto_1fr_auto] md:grid-cols-[1fr_auto_auto_1fr] md:grid-rows-[auto_auto_auto] md:min-h-fit">
    <input :id="sideNavToggleId" type="checkbox" class="drawer-toggle lg:hidden" />
    <header class="sticky top-0 col-span-2 flex items-center p-2 backdrop-blur-sm md:col-span-4">
      <label
        :for="sideNavToggleId"
        aria-label="open sidebar"
        class="btn btn-circle btn-ghost lg:hidden">
        <v-icon name="md-menu" />
      </label>
      <slot name="header"></slot>
    </header>
    <nav
      class="max-lg:drawer-side relative overflow-auto lg:row-span-2 lg:col-span-1 lg:col-start-2 z-10 lg:w-112"
      :class="sideDrawerLargeClass">
      <label :for="sideNavToggleId" aria-label="close sidebar" class="drawer-overlay"></label>
      <div
        class="backdrop-blur lg:fixed lg:w-112 lg:top-16 bg-base-200/80 h-full p-2 lg:bg-base-100 overflow-y-auto">
        <slot name="nav"></slot>
      </div>
    </nav>
    <main
      class="col-span-2 px-2 md:col-start-2 md:w-prose lg:col-span-1 lg:col-start-3"
      :class="contentClass">
      <slot name="main"></slot>
    </main>
    <footer
      class="sticky bottom-0 col-span-2 p-2 flex flex-row items-center backdrop-blur-sm md:col-start-2 lg:col-span-1 lg:col-start-3"
      :class="footerClass">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
