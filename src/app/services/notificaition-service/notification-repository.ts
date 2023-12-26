import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootReducerState, getNotificationCount, getNotificationLoaded, getNotificationLoading} from "src/store/reducers";
import { Observable, combineLatest, take } from "rxjs";
import { NotificationService } from "./notification.service";
import { NotificationActions } from "src/store/actions/notification-action";

@Injectable({ providedIn: 'root' })

export class NotificationRepository {
  constructor(private store: Store<RootReducerState>, private notificationService: NotificationService) { }

  getUserNotificationsCount(force = false): Observable<number> {
    const loading$ = this.store.select(getNotificationLoading);
    const loaded$ = this.store.select(getNotificationLoaded);
    const notificationCount = this.store.select(getNotificationCount);
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(NotificationActions.loadNotificationCount());
          this.notificationService.getNotificationsCount().subscribe({ next : res => {
            this.store.dispatch(NotificationActions.loadNotificationCountSuccess({ data: res }));
          }, error: err => {
            this.store.dispatch(NotificationActions.loadNotificationCountFailture(err));
          }
        });
        }
    });
    return notificationCount;
  }
  getLatestNotifications() {
    return this.notificationService.getLatestNotifications();
  }
}


