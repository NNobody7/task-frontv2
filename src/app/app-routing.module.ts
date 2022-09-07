import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { NoteListComponent } from './note-list/note-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { NavBarDeactivatorService } from './services/nav-bar-deactivator.service';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { component: NoteListComponent, path: '' },
  { component: UserDetailComponent, path: 'user' },
  { component: UserEditComponent, path: 'user/edit' },
  {
    component: LogInComponent,
    path: 'logIn',
    canDeactivate: [NavBarDeactivatorService],
    canActivate: [NavBarDeactivatorService],
  },
  {
    component: RegisterComponent,
    path: 'register',
    canDeactivate: [NavBarDeactivatorService],
    canActivate: [NavBarDeactivatorService],
  },
  {
    component: RedirectComponent,
    path: 'redirect',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
