import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IClinicianRequestStatus } from '../interfaces/clinician-request-status.interface';
import { LoadedStores } from '../model/loaded-stores';
import { DBStores } from '../model/idb.store.model';
import { IDexieTableSchema, ITableSchema } from '../interfaces/idb.interface';

@Injectable({
  providedIn: 'root',
})
export class AppDatabase extends Dexie {
  ClinicianRequestStatus!: Dexie.Table<IClinicianRequestStatus, number>;
  LoadedStores!: Dexie.Table<LoadedStores, number>;
  versionNumber: number = 1;
  private dbName: string = '';
  constructor() {
    super('gmd-index-db-app');
    this.dbName = 'gmd-index-db-app';
    this.initializeDatabase();
    this.seedData();
  }

  private initializeDatabase() {
    this.version(this.versionNumber).stores(this.setTablesSchema());
    console.log('database initialized');
    this.ClinicianRequestStatus = this.table(DBStores.ClinicianRequestStatus.TableName);
  }
  private setTablesSchema() {
    return Object.entries(DBStores).reduce((tables, [key, value]) => {
      tables[value.TableName] = value.Columns;
      return tables;
    }, {} as Record<string, string>);
  }
  private async seedData() {
    this.on('populate', async () => {
      await this.LoadedStores.add(new LoadedStores());
    });
  }
  async migrateDB() {
    if (await Dexie.exists(this.dbName)) {
      const declaredSchema = this.getCanonicalComparableSchema(this);
      const dynDb = new Dexie(this.dbName);
      const installedSchema = await dynDb
        .open()
        .then(this.getCanonicalComparableSchema);
      dynDb.close();
      if (declaredSchema !== installedSchema) {
        console.log('Db schema is not updated, so deleting the db.');
        await this.clearDB();
      }
    }
  }

  getCanonicalComparableSchema(db: Dexie): string {
    const tableSchemas: ITableSchema[] = db.tables.map((table) =>
      this.getTableSchema(table)
    );
    return JSON.stringify(
      tableSchemas.sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  }

  private getTableSchema(table: {
    name: string;
    schema: IDexieTableSchema;
  }): ITableSchema {
    const { name, schema } = table;
    const indexSources = schema.indexes.map((idx) => idx.src).sort();
    const schemaString = [schema.primKey.src, ...indexSources].join(',');
    return { name, schema: schemaString };
  }

  async clearDB() {
    console.log('Deleting database...');
    this.close();
    await this.delete();
    await this.open();
    console.log('Database deleted.');
  }
}