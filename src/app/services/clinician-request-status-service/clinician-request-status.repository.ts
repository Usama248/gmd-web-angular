import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootReducerState, getClinicianRequestStatusLoaded, getClinicianRequestStatusLoading, getClinicianRequestStatusStoreData } from "src/store/reducers";
import { Observable, combineLatest, take } from "rxjs";
import { ClinicianRequestStatusActions } from "src/store/actions/clinician-request-status-action";
import { DBStores } from "src/index-db/model/idb.store.model";
import { CLINICIAN_REQUEST_STATUS_API_ENDPOINTS } from "src/app/shared/constants/api-endpoint-url";
import { DataService } from "src/index-db/services/data-service.service";
import { AuthService } from "../auth-service/auth.service";
import { IClinicianRequestStatus } from "src/index-db/interfaces/clinician-request-status.interface";
import { ClinicianRequestStatusNames } from "src/app/shared/constants/enums/clinician-request-status-enum";

@Injectable({ providedIn: 'root' })

export class ClinicianRequestStatusRepository {
  constructor(private store: Store<RootReducerState>, private dataService: DataService, private authService: AuthService) { }
  CLINICIAN_REQUEST_STATUS_ENUM_NAMES$ = ClinicianRequestStatusNames;
  getClinicianRequestStatusData(force = false): Observable<IClinicianRequestStatus[]> {
    const loading$ = this.store.select(getClinicianRequestStatusLoading);
    const loaded$ = this.store.select(getClinicianRequestStatusLoaded);
    const getClinicianRequestStatusData = this.store.select(getClinicianRequestStatusStoreData);
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
      if ((!data[0] && !data[1])) {
        this.store.dispatch(ClinicianRequestStatusActions.loadRequest());
        this.dataService.getListAsync(DBStores.ClinicianRequestStatus.TableName,
          CLINICIAN_REQUEST_STATUS_API_ENDPOINTS.GetClinicianRequestStatus + "?id=" + this.authService.loginUserId).then(res => {
            res.forEach((clinicianRequest: any) =>
            (
              clinicianRequest.createdDate = new Date(clinicianRequest.createdDate),
              clinicianRequest.statusEnum = { label: this.CLINICIAN_REQUEST_STATUS_ENUM_NAMES$.get(clinicianRequest.status), value: clinicianRequest.status }
            ));
            this.store.dispatch(ClinicianRequestStatusActions.loadRequestSuccess({ data: res }));
          });
      }
    });
    return getClinicianRequestStatusData;
  }
}


