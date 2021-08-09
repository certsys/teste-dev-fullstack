interface IFindParamsDTO {
  title?: string;
  description?: string;
  value?: number;
  area?: number;
  address?: string;
  public_place?: string;
  house_number?: number;
  complement?: string;
  district?: string;
  cep?: number;
  city?: string;
  uf?: string;
  page: number;
  limit: number;
}

export { IFindParamsDTO }