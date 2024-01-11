import { Injectable } from '@angular/core';
import { AppDatabase } from './init.idb.service';
import { IClinicianRequestStatus } from '../interfaces/clinician-request-status.interface';
import { LoadedStores } from '../model/loaded-stores';
import { CrudService } from './crud-service.service';
import { DBStores } from "src/index-db/model/idb.store.model";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  clinicianRequestStatus!: CrudService<IClinicianRequestStatus, number>;
  loadedStores!: CrudService<LoadedStores, number>;
  [key: string]: CrudService<any, any> | undefined;
  constructor(appDatabase: AppDatabase) {
    this.clinicianRequestStatus = new CrudService<IClinicianRequestStatus, number>(appDatabase.ClinicianRequestStatus);
    this.loadedStores = new CrudService<LoadedStores, number>(
      appDatabase.LoadedStores
    );
    this[DBStores.ClinicianRequestStatus.TableName] = this.clinicianRequestStatus;
    this[DBStores.LoadedStores.TableName] = this.loadedStores;
  }
}