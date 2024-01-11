import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { EntityStateEnum } from '../enum/idb.enum';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { CacheService } from './cache-service.service';
import { lastValueFrom } from 'rxjs';
import { IEntitySyncDTO } from '../interfaces/idb.interface';


@Injectable({ providedIn: 'root' })
export class DataService {
  private refreshSubject: Subject<IEntitySyncDTO> = new Subject();

  constructor(
    private apiService: ApiHandler,
    private cacheService: CacheService
  ) { }

  get refreshObserver(): Observable<IEntitySyncDTO> {
    return this.refreshSubject.asObservable();
  }

  /**
   *
   * @param table Name of EntityRepo to be used
   * @param endpoint API Endpoint with API URL
   * @returns list of data fetched from api or cache
   */
  async getListAsync(
    table: string,
    endpoint: string,
    filterDelegate?: any,
    // chunkLoadStrategy: ChunkLoadStrategy | undefined = undefined
  ) {
    // get data from cache first if availble
    const cacheData = await this.cacheService[table]?.getAll(filterDelegate);

    // if cache data is available then return the data
    let isCachedDataAvailable = cacheData !== undefined && cacheData !== null && cacheData.length > 0;
    if (
      isCachedDataAvailable ||
      (!isCachedDataAvailable && (await this.isStoreLoaded(table)))
    ) {
      return cacheData;
    }
    let apiData = await lastValueFrom(this.apiService.get(endpoint));
     // chunkLoadStrategy === undefined? 
       // : await this.apiService.GetAllChunks(endpoint, chunkLoadStrategy);
    if (apiData?.status == 1) {
      // if API call was successful and there is any data then add the data to cache
      if (apiData?.data?.length > 0) {
        await (this.cacheService as any)[table].AddBulkAsync(apiData?.data);
      }
      await this.loadClientDbStore(table);
      if (!!filterDelegate) {
          return await this.cacheService[table]?.getAll(filterDelegate);
      }
      return apiData.data;
    } else {
      // TODO
      // if some error occurs then show a dialog
      console.error('Error in Data Service: ', apiData?.response);
    }
  }

  async updateCache(data: IEntitySyncDTO) {
    //if store is not loaded then no need of sync notification
    if (!(await this.isStoreLoaded(data.table))) {
      return;
    }

    // add record to cache
    if (data.state == EntityStateEnum.Added) {
      await (this.cacheService as any)[data.table].AddOrEditAsync(data.entity);
    }
    // delete record from cache
    if (data.state == EntityStateEnum.Deleted) {
      let entity: any = data.entity;
      await (this.cacheService as any)[data.table].RemoveAsync(entity.Id);
    }
    // update record from cache
    if (data.state == EntityStateEnum.Modified) {
      let entity: any = data.entity;
      await (this.cacheService as any)[data.table].UpdateAsync(
        entity.Id,
        entity
      );
    }
    this.refreshSubject.next(data);
  }

  async isStoreLoaded(storeName: string) {
    let record = await this.cacheService.loadedStores.getById(1);
    if (record && (record as any)[storeName] == true) {
      return true;
    }
    return false;
  }

  async loadClientDbStore(storeName: string) {
    let patch = {};
    (patch as any)[storeName] = true;
    await this.cacheService.loadedStores.UpdateAsync(1, { ...patch });
  }
}