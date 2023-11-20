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
            .select('username, bio, profile_picture')
            .eq('id', session.user.id)
            .single();

          if (error) {
            throw error;
          }

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
    <div className="user-tile">
      <img src={user?.profile_picture || '/public/profilePicDefault.jpeg'}/>
      <h2>Username: {user?.username}</h2>
      <p>Bio: {user?.bio}</p>
      <button onClick={showFriends}>See All Friends</button>
    </div>
  );
};

export default UserProfileTile;
