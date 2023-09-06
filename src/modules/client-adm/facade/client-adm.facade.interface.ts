export interface ClientAdmFacadeAddInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface ClientAdmFacadeAddOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface ClientAdmFacadeFindOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add(inputDto: ClientAdmFacadeAddInputDto): Promise<ClientAdmFacadeAddOutputDto>;
  find(id: string): Promise<ClientAdmFacadeFindOutputDto>;
}
