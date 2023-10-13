import { ResourceAvailability } from './resource-availability.interface';
import { ResourceType } from './resource-type.interface';
import { Supplier } from './supplier.interface';

export interface AppSettings {
  supplier: Supplier;
  resourceType?: ResourceType;
  resourceAvailability?: ResourceAvailability;
}
