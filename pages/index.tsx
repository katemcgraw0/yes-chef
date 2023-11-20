import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { supabase } from "../supabase";
import { Session } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] })

export default function  Home({ session }: { session: Session | null }) {
  console.log(session)
  return (
    <main>
    <h1>Welcome to my app!</h1>
    <div className = "">
      {!session?.user? (
        <p>Please sign in! (you are currently not signed it)</p>
      ): (
        <p>Hello, {session.user?.email}!</p>
      )}
    </div>
    <div className = "flex items-center justify-center mt-10">
    <h1 className="px-4 py-2 bg-green-500 text-white rounded-md">
     <Link href="/signup">Sign Up!</Link>
    </h1>
    </div>
    </main>
  )
}
