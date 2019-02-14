import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from "./app.service";
import {HomeComponent} from "./home/home.component";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {
    constructor(private appService: AppService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.appService.home = next.component instanceof HomeComponent;

        return true;
    }
}
