import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {RouteGuard} from "./route.guard";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [RouteGuard]},
    {path: 'about', component: AboutMeComponent, canActivate: [RouteGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
