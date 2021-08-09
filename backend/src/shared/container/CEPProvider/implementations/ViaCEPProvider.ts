import { AppError } from '@shared/errors/AppError';
import axios from 'axios';
import { CEPResponse, ICEPProvider } from "../models/ICEPProvider";

class ViaCEPProvider implements ICEPProvider {
  private client: any;
  constructor() {
    this.client = axios.create({
      baseURL: "https://viacep.com.br/ws",
      timeout: 60000,
    });
  }

  public async recoverAddress(cep: number): Promise<CEPResponse> {
    try {      
      const { data } = await this.client.get(`/${cep}/json`);
      
      return {
        public_place: data.logradouro || 'Não encontrado',
        complement: data.complemento || 'Não encontrado',
        district: data.bairro || 'Não encontrado',
        city: data.localidade || 'Não encontrado',
        uf: data.uf || 'Não encontrado'
      }
    } catch (error) {      
      new AppError("Erro na api do Via CEP.", 500)
    }
  }
}

export {ViaCEPProvider}