import { ICEPProvider, CEPResponse } from '../models/ICEPProvider';

class FakeCEPProvider implements ICEPProvider {
  public async recoverAddress(cep: number): Promise<CEPResponse> {
    return {
      public_place: "public_place",
      complement: "complement",
      district: "district",
      city: "city",
      uf: "uf"
    }
  }
}

export { FakeCEPProvider }