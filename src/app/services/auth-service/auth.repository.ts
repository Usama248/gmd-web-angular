import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootReducerState, getUserInfo, getUserLoaded, getUserLoading } from "src/store/reducers";
import { AuthService } from "./auth.service";
import { Observable, combineLatest, take } from "rxjs";
import { loadUserDataFailure, loadUserDataRequest, loadUserDataSuccess, logout } from "src/store/actions/user-actions";
import { UserProfileModel } from "src/app/models/user/user-profile.model";

@Injectable({ providedIn: 'root' })

export class AuthRepository {
  constructor(private store: Store<RootReducerState>, private authService: AuthService) { }

  getLoginUserData(force = false): Observable<UserProfileModel> {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUserInfo);
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(loadUserDataRequest());
          this.authService.getProfile().subscribe({ next : res => {
            if(res.status == 1) {
            this.store.dispatch(loadUserDataSuccess({ data: res.data }));
            } else {
              this.store.dispatch(loadUserDataFailure(res.message));
            }
          }, error: err => {
            this.store.dispatch(loadUserDataFailure(err));
          }
        });
        }
    });
    return getUserData;
  }
  logout() {
    this.store.dispatch(logout());
    this.authService.logout();
  }
}


