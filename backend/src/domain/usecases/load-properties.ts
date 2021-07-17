import { PropertyModel } from '../models/property';

export interface LoadProperties {
  load(): Promise<PropertyModel[]>;
}
