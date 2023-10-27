import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export interface Route {
  path: string;
  name: string;
  icon?: string;
  iconClass?: string;
  component: any;
}

export const HOME_ROUTE = {
  path: '/',
  name: 'Home',
  icon: 'ct-logo',
  component: HomeView
};

export const WORK_ROUTE = {
  path: '/work',
  name: 'Work Experience',
  iconClass: 'mask mask-hexagon',
  component: () => import('../views/WorkView.vue')
};

export const EDUCATION_ROUTE = {
  path: '/education',
  name: 'Education',
  iconClass: 'mask mask-parallelogram',
  component: () => import('../views/EducationView.vue')
};

export const SKILLS_ROUTE = {
  path: '/skills',
  name: 'Skills',
  iconClass: 'mask mask-star',
  component: () => import('../views/SkillsView.vue')
};

export const INTERESTS_ROUTE = {
  path: '/interests',
  name: 'Interests',
  iconClass: 'mask mask-pentagon',
  component: () => import('../views/InterestsView.vue')
};

export const routes: Route[] = [
  HOME_ROUTE,
  WORK_ROUTE,
  EDUCATION_ROUTE,
  SKILLS_ROUTE,
  INTERESTS_ROUTE
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
