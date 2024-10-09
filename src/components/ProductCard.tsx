// import { Product } from '../types/Product';
// import { useCart } from '../hooks/useCart';

// interface ProductCardProps {
//     product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//     const { addToCart } = useCart();

//     return (
//         <div className="border p-4 rounded shadow">
//             <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
//             <h2 className="text-lg font-bold">{product.title}</h2>
//             <p>${product.price}</p>
//             <button
//                 className="bg-blue-500 text-white p-2 mt-2 w-full"
//                 onClick={() => addToCart(product)}
//             >
//                 Add to Cart
//             </button>
//         </div>
//     );
// }





import { Product } from '../types/Product';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);  // State to track if the product is added to cart

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);  // Revert back the button state after 2 seconds
    };

    return (
        <div className="ml-8 w-80 transform transition-transform hover:scale-105 hover:shadow-2xl bg-white rounded-lg shadow-md p-4 relative">
            <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-bold mt-3">{product.title}</h2>
            <p className="text-gray-700 text-base font-semibold mt-1">${product.price}</p>
            <button
                onClick={handleAddToCart}
                className={`mt-3 p-2 w-full text-white font-bold rounded-md transition-colors ${
                    isAdded ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                Best Seller
            </div>
        </div>
    );
}

