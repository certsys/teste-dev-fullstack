export interface PropertyModel {
  _id: string;
  publication_date: Date;
  title: string;
  description: string;
  value: number;
  area: string;
  address: string;
  public_place: string;
  number: string;
  adjunct: string;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;
}

export interface PropertyPropModel {
  key?: string;
  property: PropertyModel;
  field?: string;
}

export interface PropertyAddModel {
  key?: string;
  id?: string;
  field: string;
  value?: string;
  type?: string;
}

export interface UpdatePropertyModel {
  property: {
    _id: string;
    title?: string;
    description?: string;
    value?: number;
    area?: string;
    address?: string;
    public_place?: string;
    number?: string;
    adjunct?: string;
    neighborhood?: string;
    zip_code?: string;
    city?: string;
    state?: string;
  };
}
