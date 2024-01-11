import { Dexie } from 'dexie';
import { IFilterDelegate } from '../interfaces/idb.interface';


export class CrudService<T, Tkey> {
  dbSet: Dexie.Table<T, Tkey>;

  constructor(dbSet: Dexie.Table<T, Tkey>) {
    this.dbSet = dbSet;
  }

  getAll(filterDelegate?: IFilterDelegate): Promise<T[]> {
    try {
      return !!filterDelegate ? filterDelegate(this.dbSet).toArray() : this.dbSet.toArray();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async AddBulkAsync(items: T[]) {
    const batchSize = 1000;
    let processed = 0;

    while (processed < items.length) {
      const batch = items.slice(processed, processed + batchSize);
      await this.dbSet.bulkPut(batch);
      processed += batchSize;
    }
  }

  getById(id: Tkey) {
    return this.dbSet.get(id);
  }
  async AddAsync(item: T): Promise<void> {
    await this.dbSet.add(item);
  }

  async AddOrEditAsync(item: T): Promise<void> {
    await this.dbSet.put(item);
  }

  async UpdateAsync(id: Tkey, changes: Partial<T>): Promise<void> {
    await this.dbSet.update(id, changes);
  }

  async RemoveAsync(id: Tkey): Promise<void> {
    await this.dbSet.delete(id);
  }

  async RemoveRangeAsync(ids: Tkey[]): Promise<void> {
    await this.dbSet.bulkDelete(ids);
  }
}