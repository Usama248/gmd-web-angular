import { ClinicianRequestStatus } from "./clinician-request-status.model";
import { LoadedStores } from "./loaded-stores";

const ClinicianRequestStatusInstance = new ClinicianRequestStatus();
const loadedStoresInstance = new LoadedStores();

// Define a generic function to generate columns with a constraint
function generateColumns<T extends Record<string, any>>(instance: T): string {
  return (Object.keys(instance) as (keyof T)[]).join(',');
}

export const DBStores = {
    ClinicianRequestStatus: {
    TableName: 'ClinicianRequestStatus',
    Columns: generateColumns(ClinicianRequestStatusInstance),
  },
  LoadedStores: {
    TableName: 'LoadedStores',
    Columns: generateColumns(loadedStoresInstance),
  },
};