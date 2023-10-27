<script setup lang="ts">
import { routes } from '@/router';
import type { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="p-2">
    <ul class="menu menu-lg">
      <template v-for="route in routes" :key="route.name">
        <li>
          <RouterLink v-slot="{ isActive }" :to="route.path" active-class="active">
            <div
              class="w-4 h-4 mx-1 rounded-full"
              :class="isActive ? 'bg-primary' : 'bg-neutral'"></div>
            <span>{{ route.name }}</span>
          </RouterLink>
        </li>
      </template>
      <div class="divider"></div>
      <li>
        <a class="text-info" href="https://www.linkedin.com/in/christopher-turner-b4a2813a">
          <v-icon class="w-6 h-6" name="bi-linkedin" />
          LinkedIn
        </a>
      </li>
    </ul>
  </nav>
</template>
