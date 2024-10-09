







// "use client";
// import { useState } from 'react';

// interface SearchBarProps {
//     onSearch: (query: string) => void;
// }

// export default function SearchBar({ onSearch }: SearchBarProps) {
//     const [query, setQuery] = useState('');

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setQuery(value);
//         onSearch(value); // Pass the search query to the parent
//     };

//     return (
//         <input
//             type="text"
//             placeholder="Search products..."
//             value={query}
//             onChange={handleSearch}
//             className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700"
//         />
//     );
// }





"use client";
import { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value); // Pass the search query to the parent
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (query.length > 0) {
                const response = await fetch(`https://fakestoreapi.com/products?search=${query}`);
                const data = await response.json();
                setProducts(data);
            } else {
                setProducts([]);
            }
        };

        const debounceFetch = setTimeout(fetchProducts, 300); // Debounce to limit API calls

        return () => clearTimeout(debounceFetch); // Cleanup timeout on unmount
    }, [query]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearch}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700"
            />
            {products.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded-lg shadow-lg">
                    {products.map(product => (
                        <li key={product.id} className="p-2 border-b border-gray-200">
                            {product.title} - ${product.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


