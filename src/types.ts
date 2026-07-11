/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: "rc-cars" | "foam-blasters" | "dolls-kitchen" | "party-balloons";
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  description: string;
  isOutofStock?: boolean;
}

export interface CartItem {
  id: string; // Dynamic ID composed of product.id + giftWrapped state
  productId: string;
  name: string;
  price: number;
  qty: number;
  giftWrapped: boolean;
  wrappingPrice: number;
  image: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  governorate: string;
  address: string;
  giftWrappingNotes: string;
}

export interface OrderPayload {
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  timestamp: string;
}
