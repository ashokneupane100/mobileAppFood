import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    // Check if item already exists with same product and size
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      // If item exists, update quantity
      updateQuantity(existingItem.id, 1);
    } else {
      // If item doesn't exist, add new item
      const newCartItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };
      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);