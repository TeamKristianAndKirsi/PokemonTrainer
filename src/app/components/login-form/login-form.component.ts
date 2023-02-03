import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

//Login page functions
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    ) {}

  // Handles form input and logs user in
  public loginSubmit(loginForm: NgForm): void {

    const {username} = loginForm.value;

    this.loginService.login(username)
    .subscribe({
      next: (user: User) => {
        this. userService.user = user;
        this.login.emit();
      },
      error: () => {
      },
    });
  }
}
