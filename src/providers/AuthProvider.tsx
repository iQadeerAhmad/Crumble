import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

// You might want to replace 'any' with a more specific profile type from your database.types.ts
export type Profile = any;

type AuthData = {
    session: Session | null;
    profile: Profile | null; // Changed from any to Profile type
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
})

export default function AuthProvider({ children }: { children: ReactNode }) { // Typed children
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null) // Typed profile state
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true); // Set loading true at the start

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session); // Update session state

            if (session) {
                // Fetch profile if session exists
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(profileData || null);
            } else {
                // Clear profile if session is null (e.g., on logout)
                setProfile(null);
            }
            setLoading(false); // Set loading to false after session and profile are handled
        });

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []); // Empty dependency array: run once on mount and clean up on unmount

    console.log(profile)
    return (
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)