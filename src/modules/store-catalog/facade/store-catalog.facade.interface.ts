export interface StoreCatalogFacadeFindInputDto {
  id: string;
}

export interface StoreCatalogFacadeFindOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface StoreCatalogFacadeListOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface StoreCatalogFacadeInterface {
  find(id: string): Promise<StoreCatalogFacadeFindOutputDto>;
  list(): Promise<StoreCatalogFacadeListOutputDto>;
}
