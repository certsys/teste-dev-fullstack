interface IRequestPropertyDTO {
  id?: string;
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  house_number: number;
  cep: number;
}

export { IRequestPropertyDTO }