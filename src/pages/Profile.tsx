import React, { useState } from 'react';
import { Camera, Edit2, Facebook, Globe, Instagram, Save, Twitter, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState('Electronic music producer and DJ based in Los Angeles. Creating beats since 2015.');
  const [genre, setGenre] = useState('Electronic');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [website, setWebsite] = useState('https://example.com');
  
  // Social links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Instagram', url: 'https://instagram.com/artistname', icon: <Instagram className="h-5 w-5" /> },
    { platform: 'Twitter', url: 'https://twitter.com/artistname', icon: <Twitter className="h-5 w-5" /> },
    { platform: 'Facebook', url: 'https://facebook.com/artistname', icon: <Facebook className="h-5 w-5" /> },
    { platform: 'YouTube', url: 'https://youtube.com/artistname', icon: <Youtube className="h-5 w-5" /> },
  ]);
  
  const handleSocialChange = (index: number, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].url = value;
    setSocialLinks(updatedLinks);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => {
    if (editing) {
      // Save changes
      // In a real app, this would make an API call
      
      // Reset preview states if save is successful
      setAvatarPreview(null);
      setCoverPreview(null);
    }
    
    setEditing(!editing);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Artist Profile</h1>
          <p className="mt-1 text-gray-400">Manage your public artist profile</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            className={`px-4 py-2 rounded-md flex items-center transition-colors ${
              editing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            onClick={toggleEditing}
          >
            {editing ? (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Cover image */}
        <div className="relative h-48 sm:h-64 bg-gray-700">
          {(coverPreview || 'https://images.pexels.com/photos/4997833/pexels-photo-4997833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') && (
            <img 
              src={coverPreview || 'https://images.pexels.com/photos/4997833/pexels-photo-4997833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          )}
          
          {editing && (
            <div className="absolute bottom-4 right-4">
              <label className="bg-gray-900 bg-opacity-70 p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition-opacity">
                <Camera className="h-6 w-6 text-white" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleCoverChange}
                />
              </label>
            </div>
          )}
        </div>
        
        {/* Profile content */}
        <div className="relative px-4 sm:px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700">
              {(avatarPreview || user?.avatar || 'https://images.pexels.com/photos/1699419/pexels-photo-1699419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') && (
                <img 
                  src={avatarPreview || user?.avatar || 'https://images.pexels.com/photos/1699419/pexels-photo-1699419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {editing && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                <Camera className="h-5 w-5 text-white" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>

          <div className="space-y-6">
            {/* Basic info */}
            <div>
              {editing ? (
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-bold text-white bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <h2 className="text-2xl font-bold text-white">{name}</h2>
              )}
              
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {editing ? (
                  <select 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Electronic">Electronic</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="R&B">R&B</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                    <option value="Country">Country</option>
                    <option value="Folk">Folk</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 bg-gray-700 rounded-md text-sm text-white">
                    {genre}
                  </span>
                )}
                
                {editing ? (
                  <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md px-3 py-1">
                    <Globe className="h-4 w-4 text-gray-400 mr-1" />
                    <input 
                      type="text" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent text-sm text-white focus:outline-none"
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Globe className="h-4 w-4 mr-1" />
                    {location}
                  </div>
                )}
                
                {editing ? (
                  <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md px-3 py-1">
                    <Globe className="h-4 w-4 text-gray-400 mr-1" />
                    <input 
                      type="text" 
                      value={website} 
                      onChange={(e) => setWebsite(e.target.value)}
                      className="bg-transparent text-sm text-white focus:outline-none"
                      placeholder="Website URL"
                    />
                  </div>
                ) : (
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-indigo-400 text-sm hover:underline"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Bio</h3>
              {editing ? (
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <p className="text-gray-300">{bio}</p>
              )}
            </div>
            
            {/* Social links */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Social Media</h3>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      {link.icon}
                    </div>
                    {editing ? (
                      <input 
                        type="text" 
                        value={link.url} 
                        onChange={(e) => handleSocialChange(index, e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:underline"
                      >
                        {link.platform}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Membership</p>
              <p className="text-white">Pro Plan</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="text-white">June 2023</p>
            </div>
            <button className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm">
              Change Password
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Payment Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Payout Method</p>
              <p className="text-white">Bank Transfer (ACH)</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Tax Information</p>
              <p className="text-white">W-9 Form Submitted</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Next Payout</p>
              <p className="text-white">$1,245.67 on July 15, 2023</p>
            </div>
            <button className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm">
              Update Payment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;