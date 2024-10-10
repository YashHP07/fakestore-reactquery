
// src/components/Navbar.tsx
import { useCart } from '../hooks/useCart';
import Link from 'next/link';

export default function Navbar() {
    const { cart } = useCart();

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">E-Commerce Store</h1>
            <Link href="/cart" className="text-white">
                <div className="mr-8 relative">
                    <span className="material-icons"><img src="https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png" className='h-[30px] w-[40px]'/></span>
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {cart.length}
                        </span>
                    )}
                </div>
            </Link>
        </nav>
    );
}

