import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  //DI.
  constructor(private readonly loginService: LoginService) {}

  public loginSubmit(loginForm: NgForm): void {

    // username
    const {username} = loginForm.value;

    this.loginService.login(username)
    .subscribe({
      next: (user: User) => {

      },
      error: () => {

      },
    });
  }
}
