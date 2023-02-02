import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
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

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient, 
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService,
  ) { }

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
      throw new Error("addToUsersPokemons: Pokemon allready in pokemonlist with that name");

    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': pokemonApiKey
    })

    this._loading = true;

    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon, pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User)=> {
        this.userService.user = updatedUser;

      }),

      finalize(() => {
        this._loading = false;
        
      })
    ) 
  }
}
