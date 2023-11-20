import Link from 'next/link';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from "next/router";
import UserProfileTile from '@/components/profileHeaderTile';
export default function Profile({ session }: { session: Session | null }) {
  const router = useRouter();
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/signup')
    } catch (error) {
      console.error('Error signing out:');
    }
  };

  return (
    <main>
      <h1 className="text-center text-4xl mt-5">Your Profile!</h1>
    
      {!session?.user ? (
        <p>
          Please sign in! (You are currently not signed in)
          <div className="flex items-center justify-center mt-10">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              <Link href="/signup">Sign Up!</Link>
            </button>
          </div>
        </p>
      ) : (
        <div className = "flex flex-col">
          <div className="flex flex-col items-center justify-center mt-5">
            <UserProfileTile session = {session}></UserProfileTile>
            <button
              className="flex px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
