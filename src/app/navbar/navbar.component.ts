import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavBarService } from '../services/nav-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public navbarService: NavBarService,
              public auth: AuthService) {}

  ngOnInit(): void {}
}
