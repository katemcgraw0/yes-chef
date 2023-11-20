import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase'; // Import your Supabase client instance
import Link from 'next/link';

const UserProfileTile: React.FC<{ session: Session | null }> = ({ session }) => {
  const [user, setUser] = useState<any>(null); // Adjust the type based on your user schema

  useEffect(() => {
    const fetchUserInformation = async () => {
      if (session) {
        try {
          // Use the Supabase client to get user information
          const { data, error } = await supabase
            .from('profiles')
            .select('username, bio, profile_pic, pronouns')
            .eq('id', session.user.id)
            .single();

          if (error) {
            throw error;
          }
          console.log(data);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    };

    fetchUserInformation();
  }, [session]);

  const showFriends = () => {
    // Implement logic to show all friends
    console.log('Show friends button clicked!');
  };

  if (!session) {
    return <div>Please log in to view the profile.</div>;
  }

  return (
    <div className="user-tile p-4 flex flex-col items-center  rounded-md shadow-md w-full md:w-1/2">
      <div className="user-header flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row items-center">
          <img className="profile-picture w-36 h-36 rounded-full mb-0 md:mb-4 md:mr-4" src={user?.profile_picture || '/profilePicDefault.jpeg'} alt="Profile" />
          <div>
            <h2 className="text-3xl font-semibold">{user?.username || session.user?.email}</h2>
            <h1 className="text-xl text-gray-500">{user?.pronouns}</h1>
          </div>
        </div>
  
        <div className="user-info mt-4">
          <p className="text-gray-700">Bio: {user?.bio}</p>
          <div className = "flex flex-row items-center justify-center">
          <div className="flex flex-col items-center mt-2">
            
            <button className="bg-black text-white px-4 py-2 rounded" onClick={showFriends}>
              0
            </button>
            <p className="ml-2">Friends</p>
          </div>
          <div className="flex flex-col items-center mt-2">
            <button className="bg-black text-white px-4 py-2 rounded" onClick={showFriends}>
              0
            </button>
            <p className="ml-2">Posts</p>
          </div>
          </div>
        </div>
      </div>
  
      <button className="mt-4 bg-black text-white px-8 py-2 rounded">
        <Link href="/editprofile">Edit Profile</Link>
      </button>
    </div>
  );
};

export default UserProfileTile;
