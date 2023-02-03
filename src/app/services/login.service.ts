import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs';

const { apiUsers, pokemonApiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  // > Models, HttpClient, Observables, and RXJS operators
  public login(username: string): Observable<User> {
    return this.checkUsername(username)
      .pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }

  // Check if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`).pipe(
      map((response: User[]) => response.pop())
    );
  }
  // Create a user
  private createUser(username: string): Observable<User> {
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
  }
}
