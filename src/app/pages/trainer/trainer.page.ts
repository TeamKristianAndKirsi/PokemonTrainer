import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})

// Renders pokemons and user information to trainer page
export class TrainerPage {

  get user(): User | undefined {
    return this.userService.user;
  }

  get username(): String {
    if (this.userService.user) {
      return this.userService.user.username
    }
    return ""
  }

  get pokemon(): Pokemon[] {
    if (this.userService.user) {
      return this.userService.user.pokemon
    }
    return [];
  } 

  constructor(
    private userService: UserService
  ) {}

}
