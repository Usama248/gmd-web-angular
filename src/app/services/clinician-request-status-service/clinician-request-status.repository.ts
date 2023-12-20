import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootReducerState, getClinicianRequestStatusLoaded, getClinicianRequestStatusLoading, getClinicianRequestStatusStoreData} from "src/store/reducers";
import { Observable, combineLatest, take } from "rxjs";
import { ClinicianRequestStatusService } from "./clinician-request-status.service";
import { ClinicianRequestStatusActions } from "src/store/actions/clinician-request-status-action";
import { ClinicianRequestStatusModel } from "src/app/models/clinician-request-status/clinician-request-status.model";

@Injectable({ providedIn: 'root' })

export class ClinicianRequestStatusRepository {
  constructor(private store: Store<RootReducerState>, private clinicianRequestStatusService: ClinicianRequestStatusService) { }

  getClinicianRequestStatusData(force = false): Observable<ClinicianRequestStatusModel[]> {
    const loading$ = this.store.select(getClinicianRequestStatusLoading);
    const loaded$ = this.store.select(getClinicianRequestStatusLoaded);
    const getClinicianRequestStatusData = this.store.select(getClinicianRequestStatusStoreData);
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(ClinicianRequestStatusActions.loadRequest());
          this.clinicianRequestStatusService.getAllClinicianRequests().subscribe({ next : res => {
            if(res.status == 1) {
            this.store.dispatch(ClinicianRequestStatusActions.loadRequestSuccess({ data: res.data }));
            } else {
              this.store.dispatch(ClinicianRequestStatusActions.loadRequestFailture(res.message));
            }
          }, error: err => {
            this.store.dispatch(ClinicianRequestStatusActions.loadRequestFailture(err));
          }
        });
        }
    });
    return getClinicianRequestStatusData;
  }
}


