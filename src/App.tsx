import Header from './components/Header';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Stats from './components/Stats';
import Catalog from './components/Catalog';
import CatalogBook from './components/CatalogBook';
import Brands from './components/Brands';
import Local from './components/Local';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { FlyerProvider } from './components/FlyerProvider';
import useScrollReveal from './hooks/useScrollReveal';
import usePageScroll from './hooks/usePageScroll';
import useOutboundTracking from './hooks/useOutboundTracking';

export default function App() {
  useScrollReveal();
  usePageScroll();
  useOutboundTracking();

  return (
    <FlyerProvider>
      <div className="page">
        {/* Primer tabulador de la página: quien navega con teclado no tiene que
            recorrer el nav y las redes en cada visita. */}
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">
          <section className="band">
            <Hero />
            <Featured />
          </section>
          <Stats />
          <Brands />

          <CatalogBook />
          <Catalog />
          <Local />
          <ContactBanner />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </FlyerProvider>
  );
}
