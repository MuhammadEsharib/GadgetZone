import { Instagram, Youtube, Music2, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

import logoDark from "@/assets/logo-dark.png";

export function Footer() {
  return (
    <footer className="relative bg-royal-deep text-primary-foreground overflow-hidden border-t border-white/5">
      {/* Background Grid Pattern (Navy lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Royal Blue Lighting Glow Orbs */}
      <div className="absolute -bottom-16 -right-16 bg-royal/10 rounded-full blur-[100px] h-[300px] w-[300px] pointer-events-none z-0" />
      <div className="absolute -top-16 -left-16 bg-royal/10 rounded-full blur-[100px] h-[300px] w-[300px] pointer-events-none z-0" />

      {/* Hero-like Royal Blue Diagonal Line Streaks */}
      <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-royal/15 to-transparent rotate-[20deg] pointer-events-none hidden md:block" />
      <div className="absolute bottom-[20%] left-[-5%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-royal/10 to-transparent rotate-[20deg] pointer-events-none hidden md:block" />

      {/* Overlapping Tech Circles - Left Side */}
      <div className="absolute left-[10%] bottom-[-50px] w-[180px] h-[180px] rounded-full border border-royal/10 pointer-events-none hidden md:block" />
      <div className="absolute left-[12%] bottom-[-30px] w-[120px] h-[120px] rounded-full border border-royal/5 pointer-events-none hidden md:block" />

      {/* Overlapping Tech Circles - Center Grid */}
      <div className="absolute left-[50%] top-[20%] -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-royal/5 pointer-events-none hidden md:block" />
      <div className="absolute left-[50%] top-[25%] -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-dashed border-royal/5 pointer-events-none hidden md:block" />

      {/* Hero-like Faint Wireframe Circles in Royal Blue */}
      <div className="absolute top-[40%] right-[25%] w-[100px] h-[100px] rounded-full border border-royal/5 pointer-events-none hidden lg:block animate-pulse [animation-duration:8s]" />

      {/* Concentric Rotating Orbits - Right Side */}
      <div className="absolute right-[5%] top-[10%] w-[350px] h-[350px] rounded-full border border-royal/10 pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] top-[12%] w-[300px] h-[300px] rounded-full border border-dashed border-royal/10 animate-[spin_120s_linear_infinite] pointer-events-none hidden lg:block" />
      <div className="absolute right-[11%] top-[15%] w-[250px] h-[250px] rounded-full border border-dotted border-royal/15 animate-[spin_90s_linear_infinite_reverse] pointer-events-none hidden lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 z-10">
        <div>
          <div className="flex items-center">
            <div className="relative overflow-hidden rounded-r-[24px] bg-[#629dfa] inline-flex items-center h-14 pl-2 pr-6 border-y border-r border-white/10 shadow-[0_4px_15px_rgba(98,157,250,0.15)]">
              <img
                src={logoDark}
                alt="The Gadget Zone"
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            {[Instagram, Music2, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-gold hover:text-royal-deep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
            <li>
              <Link to="/" className="transition-colors hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition-colors hover:text-gold">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition-colors hover:text-gold">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-gold">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" /> 0342 0024369
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" /> 0332 2205842
            </li>
            <li>Usama Bin Abid</li>
            <li>Thegadgetzone.pk</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Visit Us</h3>
          <p className="mt-4 flex gap-2 text-sm leading-relaxed text-primary-foreground/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33,
            Karachi
          </p>
        </div>
      </div>
      <div className="relative border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60 z-10 bg-slate-950/10 backdrop-blur-sm">
        © 2026 The Gadget Zone. All Rights Reserved.
      </div>
    </footer>
  );
}
