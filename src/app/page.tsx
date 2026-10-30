import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
