
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';
import React, {useState, useEffect} from "react"
import { supabase } from "../supabase";


const Navbar = () => {
  
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          setLoggedIn(true);
          console.log(loggedIn);
        }
        else{
          setLoggedIn(false)
          console.log(loggedIn);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoggedIn(true);
        console.log(loggedIn);
      }
      if (event === 'SIGNED_OUT') {
        setLoggedIn(false);
        console.log(loggedIn);
      }
    });

  }, []);


  return (
    loggedIn ? (
      <div className="flex w-full">
      <div className="flex w-full flex-row items-center justify-center bg-gray-200 px-20 h-full">
        <button className={`px-4 py-2 ${router.pathname === '/' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-md flex items-center`}>
          <Link href="/">
            <img src="/cookbook.png" alt="Feed" className="w-6 h-6" />
          </Link>
        </button>
    
        <div className="ml-2 flex items-center">
          <button className={`px-4 py-2 text-4xl ${router.pathname === '/profile' ? 'bg-green-500 text-white' : 'bg-gray-300'} rounded-md`}>
            <Link href="/profile">👩🏻‍🍳</Link>
          </button>
        </div>
      </div>
    </div>

    ) : null
  );
}
export default Navbar;


