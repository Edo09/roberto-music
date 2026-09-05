import Header from './components/Header';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Stats from './components/Stats';
import Catalog from './components/Catalog';
import Brands from './components/Brands';
import Local from './components/Local';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="page">
      <Header />
      <section className="band">
        <Hero />
        <Featured />
      </section>
      <Stats />
      <Brands />

      <Catalog />
      <Local />
      <ContactBanner />
      <Footer />
    </div>
  );
}
