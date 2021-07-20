import { ViaCEP } from 'viacep';

export const viaCep = async (cep: string) => {
  const viacep = new ViaCEP();
  try {
    await viacep.cep(cep);
    return true;
  } catch (error) {
    return false;
  }
};
