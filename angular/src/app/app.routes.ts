import { Routes } from "@angular/router";
import { EDUCATION_ROUTE, HOME_ROUTE, INTERESTS_ROUTE, SKILLS_ROUTE, WORK_ROUTE } from "./core";

export const routes: Routes = [
  {
    path: HOME_ROUTE.path,
    loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent)
  },
  {
    path: WORK_ROUTE.path,
    loadComponent: () => import("./pages/work/work.component").then(c => c.WorkComponent)
  },
  {
    path: EDUCATION_ROUTE.path,
    loadComponent: () => import("./pages/education/education.component").then(c => c.EducationComponent)
  },
  {
    path: SKILLS_ROUTE.path,
    loadComponent: () => import("./pages/skills/skills.component").then(c => c.SkillsComponent)
  },
  {
    path: INTERESTS_ROUTE.path,
    loadComponent: () => import("./pages/interests/interests.component").then(c => c.InterestsComponent)
  },
  {
    path: "**",
    redirectTo: HOME_ROUTE.path
  }
];
