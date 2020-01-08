import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

import { User } from '../models';
import { AuthService } from '.';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Observable<User>> {
  constructor(
    private _authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._authService
      .getUserById()
      .pipe(
        filter(response => !!response && !!response.user),
        pluck('user')
      );
  }
}
