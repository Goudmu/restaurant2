
export type MenuType = {
    id: string;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
  }[];

  export type ProductType = {
    id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };

  export type UserType = {
    id: string;
    createdAt: Date;
    username: string;
    password: string;
    isAdmin: boolean
  }
 export type OrderType = {
    id: string;
    userEmail: string;
    price: number;
    products: CartItemType[];
    status: string;
    createdAt: Date;
    intent_id?: String;
  };
  export type OrderTypeForOrder = {
    id: string;
    usernameUser: string;
    price: number;
    products: CartItemType[];
    status: string;
    createdAt: Date;
    intent_id?: String;
  };
  export type CartType2 = {
    id: string;
    createdAt: Date;
    usernameUser: string;
    products: CartItemType[];
  };
  export type CartItemType = {
    id: string;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
  };
  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice:number;
  }
  export type ActionType = {
    addToCart:(item:CartItemType) => void;
    removeFromCart:(item:CartItemType) => void;
    removeAllFromCart: () => void;
  }
  export type ProductTypeLaporan = {
    id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
    catslug: string;
  };