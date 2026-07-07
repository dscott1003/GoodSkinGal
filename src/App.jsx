import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Shop from './components/Shop';
import Forms from './components/Forms';
import Footer from './components/Footer';
import Admin from './components/Admin';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './shop/CartContext';

function useIsAdminRoute() {
  const getIsAdmin = () => window.location.hash.replace(/^#\/?/, '') === 'admin';
  const [isAdmin, setIsAdmin] = useState(getIsAdmin);
  useEffect(() => {
    const onHashChange = () => setIsAdmin(getIsAdmin());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return isAdmin;
}

export default function App() {
  const isAdmin = useIsAdminRoute();

  if (isAdmin) {
    return (
      <CartProvider>
        <Admin />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Shop />
        <Forms />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
