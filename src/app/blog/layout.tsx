import "@/app/landing.css";
import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="amplixia-landing min-h-screen">
      <LandingNav />
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}
