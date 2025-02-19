import React, { useState } from 'react';

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. Jane Doe',
    specialty: 'Internal Medicine',
    email: 'jane.doe@example.com',
    bio: 'Passionate medical professional with 10 years of experience in healthcare.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`
              px-4 py-2 rounded-lg transition-colors
              ${isEditing 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}
            `}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-6">
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Specialty
                </label>
                <input 
                  type="text"
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea 
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={handleSave}
                  className="
                    bg-green-500 text-white 
                    px-6 py-2 rounded-lg 
                    hover:bg-green-600 
                    transition-colors
                  "
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Full Name</h2>
                <p className="text-gray-900">{profile.name}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Medical Specialty</h2>
                <p className="text-gray-900">{profile.specialty}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Email</h2>
                <p className="text-gray-900">{profile.email}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Professional Bio</h2>
                <p className="text-gray-900">{profile.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
