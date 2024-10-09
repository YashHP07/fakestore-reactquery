// src/pages/_app.tsx
import { CartProvider } from '../hooks/useCart';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
            <Navbar />
            <Component {...pageProps} />
        </CartProvider>
    );
}
