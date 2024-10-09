"use client"
import { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types/Product';

interface CartContextProps {
  cart: (Product & { quantity: number })[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

// Export the CartContext so it can be used in other files
export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

// import { createContext, useContext, useState, ReactNode } from 'react';
// import { Product } from '../types/Product';

// interface CartItem extends Product {
//     quantity: number;
// }

// interface CartContextType {
//     cart: CartItem[];
//     addToCart: (product: Product) => void;
//     increaseQuantity: (id: number) => void;
//     decreaseQuantity: (id: number) => void;
//     removeFromCart: (id: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [cart, setCart] = useState<CartItem[]>([]);

//     const addToCart = (product: Product) => {
//         setCart((prev) => {
//             const existingItem = prev.find(item => item.id === product.id);
//             if (existingItem) {
//                 return prev.map(item =>
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//             }
//             return [...prev, { ...product, quantity: 1 }];
//         });
//     };

//     const increaseQuantity = (id: number) => {
//         setCart(prev =>
//             prev.map(item =>
//                 item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//             )
//         );
//     };

//     const decreaseQuantity = (id: number) => {
//         setCart(prev =>
//             prev.map(item =>
//                 item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//             ).filter(item => item.quantity > 0) // Remove items with quantity 0
//         );
//     };

//     const removeFromCart = (id: number) => {
//         setCart(prev => prev.filter(item => item.id !== id));
//     };

//     return (
//         <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

