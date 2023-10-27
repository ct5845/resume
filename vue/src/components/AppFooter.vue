<script setup lang="ts">
import { EDUCATION_ROUTE, HOME_ROUTE, INTERESTS_ROUTE, SKILLS_ROUTE, WORK_ROUTE } from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const routes = computed(() => {
  switch (route.path) {
    case HOME_ROUTE.path:
      return { next: WORK_ROUTE };
    case WORK_ROUTE.path:
      return { next: EDUCATION_ROUTE, prev: HOME_ROUTE };
    case EDUCATION_ROUTE.path:
      return { next: SKILLS_ROUTE, prev: WORK_ROUTE };
    case SKILLS_ROUTE.path:
      return { next: INTERESTS_ROUTE, prev: EDUCATION_ROUTE };
    case INTERESTS_ROUTE.path:
      return { prev: SKILLS_ROUTE };
    default:
      return {};
  }
});
</script>

<template>
  <footer v-if="routes" class="flex flex-row p-2">
    <template v-if="routes.prev">
      <RouterLink :to="routes.prev.path" class="btn shadow">
        <v-icon name="md-arrowbackiosnew" />
        <div class="flex items-start flex-col">
          <span class="text-sm font-bold">{{ routes.prev.name }}</span>
          <span class="text-xs font-thin">Previous</span>
        </div>
      </RouterLink>
    </template>
    <div class="flex-1"></div>
    <RouterLink v-if="routes.next" :to="routes!.next!.path" class="btn shadow-md btn-neutral">
      <div class="flex items-start flex-col">
        <span class="text-sm font-bold">{{ routes.next.name }}</span>
        <span class="text-xs font-thin">Next</span>
      </div>
      <v-icon name="md-arrowforwardios" />
    </RouterLink>
  </footer>
</template>
