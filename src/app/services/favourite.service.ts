import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { pokemonApiKey, apiUsers} = environment

@Injectable({
  providedIn: 'root'
})

export class FavouriteService {

   constructor(
    private http: HttpClient, 
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService,
  ) { }

  // Adds and removes pokemons to/from users pokemonlist
  public addToUsersPokemons(name: string): Observable<User> {
    if(!this.userService.user) {
      throw new Error("addToUsersPokemons: There is no user");

    }
    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.findPokemonByName(name);

    if(!pokemon) {
      throw new Error("addToUsersPokemons: No pokemon with name: " + name);
    }

    if (this.userService.inUserPokemons(name)) {
      this.userService.removeFromUserPokemonList(name);
    } else {
      this.userService.addToUserPokemonList(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': pokemonApiKey
    })


    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User)=> {
        this.userService.user = updatedUser;
      })
    ) 
  }
}
