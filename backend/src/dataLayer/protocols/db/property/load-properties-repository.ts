import { PropertyModel } from '../../../../domain/models/property';

export interface LoadPropertiesRepository {
  loadAll(): Promise<PropertyModel[]>;
}
