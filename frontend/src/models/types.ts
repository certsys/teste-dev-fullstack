export type quantProperty = {
  quant: number;
};

export type TCheckAddButton = {
  to: 'add' | 'edit';
  id?: string;
};

export type TCheckDelButton = {
  to: 'del' | 'cancel';
  id?: string;
};
