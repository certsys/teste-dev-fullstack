import React from 'react';
import { UpdatePropertyModel } from '../models/property';

type TIsEditingProperty = {
  id: string;
  isEditing: boolean;
};

type data = {
  showAddProperty: boolean;
  isEditingProperty: UpdatePropertyModel;
  newPropertyValue: string;
  quantProperty: number;
};

export interface IMainContext {
  state: data;
  setState: React.Dispatch<React.SetStateAction<data>>;
}

export const data = {
  showAddProperty: false,
  isEditingProperty: {
    idEditing: '',
    isEditing: false,
  },
  newPropertyValue: '',
  quantProperty: 0,
};

const MainContext = React.createContext<IMainContext | any>(null);

export default MainContext;
