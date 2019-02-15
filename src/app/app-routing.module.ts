import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EducationComponent} from './education/education.component';
import {ExperienceComponent} from './experience/experience.component';
import {HobbiesComponent} from './hobbies/hobbies.component';
import {HomeComponent} from './home/home.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {RouteGuard} from './route.guard';
import {SkillsComponent} from './skills/skills.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [ RouteGuard ]},
    {path: 'about', component: AboutMeComponent, data: { name: 'about' }, canActivate: [ RouteGuard ]},
    {path: 'experience', component: ExperienceComponent, data: { name: 'experience' }, canActivate: [ RouteGuard ]},
    {path: 'education', component: EducationComponent, data: { name: 'education' }, canActivate: [ RouteGuard ]},
    {path: 'skills', component: SkillsComponent, data: { name: 'skills' }, canActivate: [ RouteGuard ]},
    {path: 'hobbies', component: HobbiesComponent, data: { name: 'hobbies' }, canActivate: [ RouteGuard ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
