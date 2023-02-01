import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite-pokemon',
  templateUrl: './favourite-pokemon.component.html',
  styleUrls: ['./favourite-pokemon.component.css']
})
export class FavouritePokemonComponent {

  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.favouriteService.loading
  }

  constructor(
    private readonly favouriteService: FavouriteService
  ) {}

  onFavouriteClick(): void {
    this.favouriteService.addToUsersPokemons(this.pokemonName)
    .subscribe({
      next: (response: User) => {
        console.log("NEXT", response);

      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
}
