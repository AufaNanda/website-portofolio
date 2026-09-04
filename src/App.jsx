import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import SkillTree from './components/SkillTree.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import GlowCursor from './components/GlowCursor.jsx';

export default function App() {
  // Honour the OS "reduce motion" setting — skip the animated cursor entirely.
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      {motionOk && (
        <GlowCursor
          className="glow-cursor--overlay"
          trackWindow
          color="#7fd4ff"
          secondaryColor="#a9b8ff"
          trailWidth={7}
          glowIntensity={1.6}
          brightness={1.15}
          opacity={0.9}
        />
      )}
      <Header />
      <main>
        <ProfileSection />
        <SkillTree />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
