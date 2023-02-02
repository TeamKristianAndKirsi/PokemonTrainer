import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-pokemon',
  templateUrl: './favourite-pokemon.component.html',
  styleUrls: ['./favourite-pokemon.component.css']
})
export class FavouritePokemonComponent {

  public loading: boolean = false;
  public isFavourite: boolean = false;
  @Input() pokemonName: string = "";

  constructor(
    private userService: UserService,
    private readonly favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.isFavourite = this.userService.inUserPokemons(this.pokemonName)
  }

  onFavouriteClick(): void {
    this.loading = true;
    this.favouriteService.addToUsersPokemons(this.pokemonName)
    .subscribe({
      next: (user: User) => {
        this.loading = false;
        this.isFavourite = this.userService.inUserPokemons(this.pokemonName);

      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
}
