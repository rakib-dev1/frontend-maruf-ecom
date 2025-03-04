// /F:/Maruf_Ecom/frontend-maruf-ecom/src/models/mega-fashions.tsx

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

export interface Order {
  id: number;
  userId: number;
  products: OrderProduct[];
  totalAmount: number;
  orderDate: Date;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

export interface OrderProduct {
  productId: number;
  quantity: number;
}
export interface MegaFashionModel {
  fashion: string;
  fashionCategories: string;
  highLight: string;
}
export interface ProductModel {
  product: Product;
  category: Category;
  _id: string;
  title: string;
  images: string[];
  price: number;
}
export interface HighlightModel {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}
