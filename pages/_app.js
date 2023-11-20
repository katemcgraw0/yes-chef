import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { supabase } from "../supabase";
import Layout from '../components/layout.tsx'
function MyApp({ Component, pageProps }) {
 const [session, setSession] = useState(null);

 useEffect(() => {
   //setSession(supabase.auth.session());
   supabase.auth.onAuthStateChange((event, session) => {
     setSession(session);
   });
 }, []);
 return (
   <div>
    <Layout>
     <Component {...pageProps} session={session} />
     </Layout>
   </div>
 );
}
export default MyApp;