import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Cuisines } from './components/Cuisines';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Location } from './components/Location';
import { FinalCTA, Footer } from './components/Closing';
import { ScrollProgress } from './components/ui/Primitives';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Cuisines />
        <Menu />
        <Gallery />
        <Reviews />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
