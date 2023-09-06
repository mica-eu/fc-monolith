export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}

export interface ProductAdmFacadeInterface {
  addProduct(product: AddProductFacadeInputDto): Promise<void>;
  checkStock(product: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}
