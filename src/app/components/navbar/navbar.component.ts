import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

//Navbar functions
export class NavbarComponent {

  get user(): User | undefined{
    return this.userService.user;

  }

  constructor(
    private readonly userService: UserService,
    private readonly router: Router 
  ) {}

  // Logs user out, removes user from session storage and refreshes the login page
  logout(): void {
    sessionStorage.removeItem(StorageKeys.User)
    this.router.navigateByUrl("/login")
    window.location.reload()
  }

}
