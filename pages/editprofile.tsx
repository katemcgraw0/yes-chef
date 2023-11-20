import Link from 'next/link';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';


export default function EditProfile({ session }: { session: Session | null }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    profile_pic: "",
    pronouns: "",
   
  });

  useEffect(() => {
    // Fetch user data from Supabase
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, bio, profile_pic, pronouns')
          .eq('id', session?.user.id); // Replace 'current_user_id' with the actual user ID

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Update the component state with user data
          setUserData(data[0]);
          console.log("userdata:");
          console.log(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:');
      }
    };

    fetchUserData();
  }, [session?.user.id]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to: ${value}`);
    
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value !== '' ? value : null, // Only update if the value is not an empty string
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      console.log('handling save');
      // Update user data in the Supabase table
      await supabase.from('profiles').upsert([
        {
          id: session?.user.id,
          ...userData,
        },
      ]);
      router.push('/profile');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-8 p-4 bg-white border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Bio:</label>
          <input
            type = "text"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Profile Picture:</label>
          <input
            type="text"
            name="profile_pic"
            value={userData.profile_pic}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Pronouns:</label>
          <input
            type="text"
            name="pronouns"
            value={userData.pronouns}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
  onClick={(event) => handleSave(event)}
  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
>
  Save
</button>
      </form>
    </main>
  );
}
