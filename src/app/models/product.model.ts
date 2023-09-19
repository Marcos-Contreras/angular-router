export interface Category {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

// REUSES THE PRODUCT MODEL OMITING id AND category ATTRIBUTES SO REPEATING IS AVOIDED
// ALSO ADDED THE categoryId PROPERTY
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

// Partial MAKES THE PROPERTIES OPTIONAL WITH '?'
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
