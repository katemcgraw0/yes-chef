import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase'; // Import your Supabase client instance

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
    <div className="user-tile p-4 flex flex-col items-center">

      <div className="user-header flex flex-col items-center">
        <div className = 'flex flex-row'>
        <h2 className="text-4xl">{user?.username || session.user?.email}</h2>
        <h1 className ="text-2xl text-gray-500 self-end pl-4">{user?.pronouns}</h1>
        </div>
        <div className="flex flex-row">
          <img className="profile-picture w-36 h-36 rounded-full mt-2" src={user?.profile_picture || '/profilePicDefault.jpeg'} alt="Profile" />
       
        <div className="user-info mt-4">
          <p>Bio: {user?.bio}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={showFriends}>
            0
          </button>
          <p>Friends</p>
        </div>
        </div>
      </div>
      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfileTile;
