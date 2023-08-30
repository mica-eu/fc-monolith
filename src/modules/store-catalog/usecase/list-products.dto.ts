type ProductDto = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export interface ListProductsOutputDto {
  products: ProductDto[];
}
