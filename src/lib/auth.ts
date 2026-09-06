export type CustomerProfile = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  savedAt?: string;
};

const PROFILE_KEY = "gz_customer_profile";
const ACTIVE_PHONE_KEY = "gz_active_phone";

// Helper to normalize phone format (0342 0024369 -> 03420024369)
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)\+]/g, "").trim();
}

export const cleanPhone = normalizePhone;

export function getActivePhone(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ACTIVE_PHONE_KEY) || null;
  } catch {
    return null;
  }
}

export function getCustomerProfile(): CustomerProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginCustomer(phone: string, name?: string): CustomerProfile {
  const clean = normalizePhone(phone);
  const existing = getCustomerProfile();

  const profile: CustomerProfile = {
    name: name?.trim() || existing?.name || "Customer",
    phone: clean,
    email: existing?.email || "",
    address: existing?.address || "",
    city: existing?.city || "Karachi",
    savedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ACTIVE_PHONE_KEY, clean);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      window.dispatchEvent(new Event("gz_auth_change"));
    } catch (e) {
      console.error("Error persisting customer login:", e);
    }
  }

  return profile;
}

export function saveCustomerProfile(profile: Partial<CustomerProfile>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getCustomerProfile() || {
      name: "",
      phone: "",
      city: "Karachi",
    };
    const updated = { ...existing, ...profile, savedAt: new Date().toISOString() };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    if (updated.phone) {
      localStorage.setItem(ACTIVE_PHONE_KEY, normalizePhone(updated.phone));
    }
    window.dispatchEvent(new Event("gz_auth_change"));
  } catch (e) {
    console.error("Failed to save customer profile", e);
  }
}

export function logoutCustomer(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACTIVE_PHONE_KEY);
    window.dispatchEvent(new Event("gz_auth_change"));
  } catch {}
}

export function isCustomerLoggedIn(): boolean {
  return Boolean(getActivePhone());
}

// Backward compatibility stubs
export function useSafeAuth() {
  return { isSignedIn: isCustomerLoggedIn(), userId: getActivePhone(), isLoaded: true };
}

export function useSafeUser() {
  const profile = getCustomerProfile();
  return { user: profile ? { fullName: profile.name, phone: profile.phone } : null, isLoaded: true };
}
