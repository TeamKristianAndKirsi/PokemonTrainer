import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers, pokemonApiKey } = environment;


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Dependency Injection.
  constructor(private readonly http: HttpClient) {}

  // > Models, HttpClient, Observables, and RXJS operators
  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      // Switchmap allows to change to different observable
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          // user does not exist
          return this.createUser(username);
        }
        return of(user);
      }),
      tap((user: User) => {
        StorageUtil.storageSave<User>(StorageKeys.User, user);
      })
    );
  }

  // Check if user exists
  // Returns undefined if array is empty
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`).pipe(
      // RxJS Operators
      map((response: User[]) => response.pop())
    );
  }
  // Create a user
  private createUser(username: string): Observable<User> {
    // user
    const user = {
      username,
      pokemon: []
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': pokemonApiKey,
    });

    return this.http.post<User>(apiUsers, user, {
      headers,
    });
    // headers -> API key
    // Post - Create items on the server
  }
}
