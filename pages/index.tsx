import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { supabase } from "../supabase";
import { Session } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ session }: { session: Session | null }) {
  console.log(session);

  return (
    <main>
      <h1 className = "text-center text-4xl mt-5">yes chef!</h1>

      {!session?.user ? (
        <div>
          Please sign in! (You are currently not signed in)
          <div className="flex items-center justify-center mt-10">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              <Link href="/signup">Sign Up!</Link>
            </button>
          </div>
        </div>
      ) : (
        <p>Hello, {session.user?.email}!</p>
      )}
    </main>
  );
}
