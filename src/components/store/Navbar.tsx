import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { UserButton } from "@clerk/tanstack-react-start";
import { useSafeAuth } from "@/lib/auth";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Percent,
  LayoutGrid,
  Sparkles,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import { products, categories, formatPrice } from "@/data/products";
import { useWishlist } from "@/lib/wishlistStore";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "Categories", to: "/categories" },
  { name: "Deals", to: "/deals" },
  { name: "FAQs", to: "/faq" },
  { name: "About Us", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export function Navbar({
  cartCount,
  onNotify,
}: {
  cartCount: number;
  onNotify: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useSafeAuth();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when search modal is opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
    }
  }, [searchOpen]);

  // Handle keyboard events (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate({
        to: "/shop",
        search: { search: searchQuery },
      });
      setSearchQuery("");
    }
  };

  const handleSearchResultClick = (type: "product" | "category" | "deal", value: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (type === "category") {
      navigate({
        to: "/shop",
        search: { category: value },
      });
    } else if (type === "deal") {
      navigate({
        to: "/deals",
      });
    } else {
      // product
      navigate({
        to: "/shop",
        search: { search: value },
      });
    }
  };

  // Search matching logic
  const getSearchMatches = () => {
    if (!searchQuery.trim())
      return { matchedProducts: [], matchedCategories: [], matchedDeals: [] };

    const query = searchQuery.toLowerCase();

    const matchedProducts = products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    );

    const matchedCategories = categories.filter((c) => c.name.toLowerCase().includes(query));

    const matchedDeals = products.filter(
      (p) => p.discount && p.discount > 0 && p.name.toLowerCase().includes(query),
    );

    return {
      matchedProducts: matchedProducts.slice(0, 3),
      matchedCategories: matchedCategories.slice(0, 3),
      matchedDeals: matchedDeals.slice(0, 3),
    };
  };

  const { matchedProducts, matchedCategories, matchedDeals } = getSearchMatches();
  const hasResults =
    matchedProducts.length > 0 || matchedCategories.length > 0 || matchedDeals.length > 0;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "pt-0 px-0" : "pt-4 px-4 sm:px-6"
        }`}
      >
        <div
          className={`mx-auto w-full transition-all duration-300 ${
            scrolled
              ? "max-w-none rounded-none border-b border-white/10 bg-[#051124]/95 px-6 py-3 shadow-md backdrop-blur-md"
              : "max-w-7xl rounded-2xl border border-white/10 bg-[#051124]/90 px-6 py-3 shadow-[0_10px_30px_rgba(5,17,36,0.3)] backdrop-blur-md"
          } flex items-center justify-between relative overflow-hidden`}
        >
          {/* Logo Link */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <img
              src={logoDark}
              alt="The Gadget Zone"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center justify-center gap-6 xl:flex 2xl:gap-8">
            {navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.name}
                  to={l.to}
                  className={`relative flex items-center gap-1 text-sm font-semibold transition-colors py-1 ${
                    isActive ? "text-[#FFC400]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.name}
                  {isActive && (
                    <span className="absolute bottom-[-16px] left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#FFC400]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Icon buttons right side */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <IconButton label="Search" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
              </IconButton>

              {/* Wishlist Link */}
              <Link to="/wishlist" className="relative hidden md:block" title="Wishlist" aria-label="Wishlist">
                <IconButton label="Wishlist" asSpan>
                  <Heart className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-md">
                      {wishlistCount}
                    </span>
                  )}
                </IconButton>
              </Link>

              {/* Theme Toggle Button */}
              <div className="hidden md:block">
                <IconButton
                  label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  pressed={theme === "dark"}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
                  ) : (
                    <Moon className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
                  )}
                </IconButton>
              </div>

              {isSignedIn ? (
                <div className="hidden items-center gap-2 pl-1.5 pr-0.5 md:flex">
                  <UserButton />
                  <Link
                    to="/account"
                    className="text-xs font-bold text-white/95 hover:text-[#FFC400] transition-colors hidden xl:inline-block"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <Link to="/account" className="relative" title="Account" aria-label="Account">
                  <IconButton label="Account" asSpan>
                    <User className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
                  </IconButton>
                </Link>
              )}
            </div>
            <Link to="/cart" className="relative" title="Cart" aria-label="Cart">
              <IconButton label="Cart" asSpan>
                <ShoppingCart className="h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" />
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#FFC400] px-1 text-[11px] font-bold text-slate-950 shadow-md">
                  {cartCount}
                </span>
              </IconButton>
            </Link>

            {/* Mobile menu trigger */}
            <button
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#051124]/95 px-4 py-3 shadow-lg xl:hidden backdrop-blur-md space-y-1"
          >
            {navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.name}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#FFC400] bg-white/5"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.name}
                </Link>
              );
            })}

            {/* Mobile Search Toggle */}
            <button
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2"
            >
              <Search className="h-4 w-4" /> Search Products
            </button>

            {/* Mobile Wishlist Link */}
            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> My Wishlist
              </span>
              {wishlistCount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              Theme: {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> My Cart
              </span>
              {cartCount > 0 && (
                <span className="rounded-full bg-[#FFC400] px-2 py-0.5 text-[10px] font-bold text-royal-deep">
                  {cartCount}
                </span>
              )}
            </Link>

            {isSignedIn ? (
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" /> My Account (Dashboard)
                </span>
              </Link>
            ) : (
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Sign In / Create Account
                </span>
              </Link>
            )}
          </nav>
        )}
      </header>

      {/* Floating Search Console (Command Palette Style) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/45 p-3 pt-[5vh] backdrop-blur-sm sm:p-4 sm:pt-[10vh]"
          onClick={() => setSearchOpen(false)}
          role="presentation"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#051124] p-4 text-white shadow-2xl sm:p-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close search"
                title="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 border-b border-white/10 pb-4"
            >
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, deals, and categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* Results Grid */}
            <div className="max-h-[50vh] overflow-y-auto space-y-6 pr-2">
              {searchQuery.trim() ? (
                hasResults ? (
                  <div className="space-y-6">
                    {/* Categories section */}
                    {matchedCategories.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <LayoutGrid className="h-3 w-3 text-royal" /> Categories
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {matchedCategories.map((c) => (
                            <button
                              key={c.name}
                              onClick={() => handleSearchResultClick("category", c.name)}
                              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-left text-xs font-bold hover:bg-royal/20 transition-all"
                            >
                              <span>{c.name}</span>
                              <span className="text-[10px] text-white/55">{c.count}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Active deals matches */}
                    {matchedDeals.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <Percent className="h-3.5 w-3.5 text-gold" /> Active Deals
                        </h4>
                        <div className="space-y-2">
                          {matchedDeals.map((d) => (
                            <button
                              key={d.id}
                              onClick={() => handleSearchResultClick("deal", d.name)}
                              className="flex items-center justify-between w-full rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-royal/20 transition-all text-left"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={d.image}
                                  alt=""
                                  className="h-8 w-8 rounded-lg object-cover bg-white/10"
                                />
                                <div>
                                  <span className="text-xs font-bold block">{d.name}</span>
                                  <span className="text-[10px] text-[#FFC400] font-bold">
                                    Discount: {d.discount}% OFF
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-extrabold text-white">
                                {formatPrice(d.price)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products matches */}
                    {matchedProducts.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <ShoppingBag className="h-3.5 w-3.5 text-royal" /> Products
                        </h4>
                        <div className="space-y-2">
                          {matchedProducts.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSearchResultClick("product", p.name)}
                              className="flex items-center justify-between w-full rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-royal/20 transition-all text-left"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt=""
                                  className="h-8 w-8 rounded-lg object-cover bg-white/10"
                                />
                                <div>
                                  <span className="text-xs font-bold block">{p.name}</span>
                                  <span className="text-[10px] text-white/55 line-clamp-1">
                                    {p.description}
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-extrabold text-white">
                                {formatPrice(p.price)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* See all button */}
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="w-full text-center py-2.5 text-xs font-bold text-royal hover:text-white transition-colors border-t border-white/15 pt-4"
                    >
                      Search all matching results in Shop →
                    </button>
                  </div>
                ) : (
                  /* Search empty result */
                  <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
                    <p>No matches found for "{searchQuery}"</p>
                    <p className="text-[10px] opacity-75">
                      Verify spelling or search standard gadgets.
                    </p>
                  </div>
                )
              ) : (
                /* Suggestion lists when query is empty */
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-royal" /> Popular Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Earbuds", "Watch", "Speaker", "Power Bank", "Charger"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            searchInputRef.current?.focus();
                          }}
                          className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-royal/20 hover:border-royal/40 transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <LayoutGrid className="h-3.5 w-3.5 text-royal" /> Explore Categories
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => handleSearchResultClick("category", c.name)}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold hover:bg-white/10 transition-all"
                        >
                          <span>{c.name}</span>
                          <span className="text-[10px] text-white/55">{c.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function IconButton({
  children,
  label,
  pressed,
  onClick,
  asSpan,
}: {
  children: React.ReactNode;
  label: string;
  pressed?: boolean;
  onClick?: () => void;
  asSpan?: boolean;
}) {
  const className =
    "relative grid h-10 w-10 place-items-center rounded-full text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white cursor-pointer";
  if (asSpan) {
    return (
      <span title={label} className={className}>
        {children}
      </span>
    );
  }
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
