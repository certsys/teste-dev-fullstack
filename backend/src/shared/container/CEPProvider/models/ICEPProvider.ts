export interface CEPResponse {
  public_place: string,
  complement: string,
  district: string,
  city: string,
  uf: string
}

interface ICEPProvider {
  recoverAddress(cep: number): Promise<CEPResponse>;
}

export { ICEPProvider }