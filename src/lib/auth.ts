import { useAuth, useUser } from "@clerk/tanstack-react-start";

export function useSafeAuth() {
  try {
    const auth = useAuth();
    return auth ?? { isSignedIn: false, userId: null, isLoaded: true };
  } catch (e) {
    return { isSignedIn: false, userId: null, isLoaded: true };
  }
}

export function useSafeUser() {
  try {
    const userState = useUser();
    return userState ?? { user: null, isLoaded: true };
  } catch (e) {
    return { user: null, isLoaded: true };
  }
}
