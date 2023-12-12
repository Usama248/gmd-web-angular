import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadUserData, loadUserDataFailure, loadUserDataSuccess } from "./actions";
import { AuthService } from "src/app/appServices/auth.service";

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap(() =>
        this.authService.getProfile().pipe(
          map((userData) => loadUserDataSuccess({ userData })),
          catchError((error) =>
            of(loadUserDataFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}