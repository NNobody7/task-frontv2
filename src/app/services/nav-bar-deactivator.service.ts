import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from '../auth/register/register.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavBarService } from './nav-bar.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarDeactivatorService
  implements CanDeactivate<NavBarService>, CanActivate
{
  constructor(public navbarService: NavBarService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.navbarService.hide();
    return true;
  }

  canDeactivate(
    component: NavBarService,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.navbarService.show();
    return true;
  }
}
