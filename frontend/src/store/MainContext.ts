import React from 'react';
import { UpdatePropertyModel } from '../models/property';

type TIsEditingProperty = {
  id: string;
  isEditing: boolean;
};

type data = {
  showAddProperty: boolean;
  isEditingProperty: string;
  newPropertyValue: UpdatePropertyModel;
  quantProperty: number;
};

export interface IMainContext {
  state: data;
  setState: React.Dispatch<React.SetStateAction<data>>;
}

export const data = {
  showAddProperty: false,
  searchNow: 0,
  searchTerm: '',
  limit: 3,
  page: 1,
  quantPage: 3,
  isEditingProperty: {
    id: '',
    isEditing: false,
  },
  title: '',
  description: '',
  value: '',
  area: '',
  address: '',
  public_place: '',
  number: '',
  adjunct: '',
  neighborhood: '',
  zip_code: '',
  city: '',
  state: '',
  quantProperty: 0,
};

const MainContext = React.createContext<IMainContext | any>(null);

export default MainContext;
