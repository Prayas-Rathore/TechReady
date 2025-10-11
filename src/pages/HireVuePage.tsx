import HireVueHero from '../components/hirevue/HireVueHero';
import DataDriven from '../components/hirevue/DataDriven';
import TrustedBy from '../components/hirevue/TrustedBy';
import Solutions from '../components/hirevue/Solutions';
import WhyChooseUs from '../components/hirevue/WhyChooseUs';
import HireVueCTA from '../components/hirevue/HireVueCTA';
import HireVueFooter from '../components/hirevue/HireVueFooter';

export default function HireVuePage() {
  return (
    <div className="min-h-screen bg-white">
      <HireVueHero />
      <TrustedBy />
      <DataDriven />
      <Solutions />
      <WhyChooseUs />
      <HireVueCTA />
      <HireVueFooter />
    </div>
  );
}
