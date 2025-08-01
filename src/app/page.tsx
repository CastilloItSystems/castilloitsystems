import { About } from '@/features/landing/About';
import { Contact } from '@/features/landing/Contact';
import { Header } from '@/features/landing/Header';
import { Hero } from '@/features/landing/Hero';
import { Portfolio } from '@/features/landing/Portfolio';
import { Services } from '@/features/landing/Services';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
    </>
  );
}
