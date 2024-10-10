// src/pages/_app.tsx
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
            <Navbar />
            <Component {...pageProps} />
        </CartProvider>
    );
}

// src/pages/_app.tsx
// import { CartProvider } from '../context/CartContext'; // Import CartProvider from the correct file
// import Navbar from '../components/Navbar';

// export default function App({ Component, pageProps }) {
//     return (
//         <CartProvider>
//             <Navbar />
//             <Component {...pageProps} />
//         </CartProvider>
//     );
// }

