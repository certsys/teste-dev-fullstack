import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { formatAmountToCurrencyPTBR } from "../../utils/formatAmountToCurrencyPTBR";
import { api } from "../apiClient";

interface Property {
  id: string;
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  public_place: string;
  house_number: number;
  complement: string;
  district: string;
  cep: number;
  city: string;
  uf: string;
  created_at: Date;
}

interface PropertyRequest {
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  house_number: number;
  cep: number;
}

type PropertyUpdateRequest = {
  id?: string;
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  public_place: string;
  house_number: number;
  complement: string;
  district: string;
  cep: number;
  city: string;
  uf: string;
}

interface GetPropertiesResponse {
  properties: Property[];
  totalCount: number;
}

interface PostPropertyResponse {
  property: Property;
}

export async function getProperties(page: number): Promise<GetPropertiesResponse> {
  const { data, headers } = await api.get('/properties', {
    params: {
      page,
      limit: 8
    }
  });

  const properties = data.properties.map((property: Property) => {
    return {
      id: property.id,
      title: property.title,
      description: property.description,
      value: formatAmountToCurrencyPTBR(property.value),
      area: property.area,
      address: property.address,
      public_place: property.public_place,
      house_number: property.house_number,
      complement: property.complement,
      district: property.district,
      cep: property.cep,
      city: property.city,
      uf: property.uf,
      created_at: new Date(property.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return {
    properties,
    totalCount: Number(headers['x-total-count'])
  };
}

export async function getPropertyById(id: string): Promise<Property> {
  const { data } = await api.get(`/properties/${id}`);

  data.value = formatAmountToCurrencyPTBR(data.value);
  data.created_at = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return data;
}

export async function deletePropertyById(id: string): Promise<boolean> {
  const { data } = await api.delete(`/properties/${id}`);

  return data;
}

export async function updatePropertyById({
  id,
  title,
  description,
  area,
  address,
  cep,
  house_number,
  value,
  city,
  complement,
  district,
  public_place,
  uf
}: PropertyUpdateRequest): Promise<PostPropertyResponse> {
  const { data } = await api.put(`/properties/${id}`, {
    title,
    description,
    area,
    address,
    cep,
    house_number,
    value,
    city,
    complement,
    district,
    public_place,
    uf
  });

  data.value = formatAmountToCurrencyPTBR(data.value);
  data.created_at = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return {
    property: data
  };
}

export async function createProperty({
  title,
  description,
  area,
  address,
  cep,
  house_number,
  value
}: PropertyRequest): Promise<PostPropertyResponse> {
  const { data } = await api.post('/properties', {
    title,
    description,
    area,
    address,
    cep,
    house_number,
    value
  });

  data.value = formatAmountToCurrencyPTBR(data.value);
  data.created_at = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return {
    property: data
  };
}

export function useProperties(page: number, options: UseQueryOptions) {
  return useQuery(['properties', page], () => getProperties(page), {
    staleTime: 1000 * 10, // 10 minutos
    ...options,
  }) as UseQueryResult<GetPropertiesResponse, unknown>
}