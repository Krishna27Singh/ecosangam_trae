import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

export const UserProfile = () => {
  const { user, logout, login } = useAuth(); // Assuming login or a refresh function exists to update context
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    joinDate: '',
    totalSaved: '2.4 tons CO₂', // Keeping dummy stats for now
    streakDays: 45,
    badgesEarned: 12,
  });

  // 1. Sync local state with AuthContext user data
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        location: user.location || '', // Assuming you add location to your DB
        // Format the MongoDB createdAt date, or fallback to a default
        joinDate: user.createdAt 
          ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'Recently',
      }));
    }
  }, [user]);

  const handleLogout = () => {
    try {
      logout(); 
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // 2. Browser Geolocation Feature
  const fetchBrowserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap's free API to turn coordinates into a city/state
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const city = data.address.city || data.address.town || data.address.state_district || "";
          const state = data.address.state || "";
          const locationString = [city, state].filter(Boolean).join(", ");
          
          setProfile({ ...profile, location: locationString || `${latitude}, ${longitude}` });
        } catch (error) {
          console.error("Error fetching location details:", error);
          // Fallback to raw coordinates if the API fails
          setProfile({ ...profile, location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` });
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setIsLoadingLocation(false);
      }
    );
  };

  // 3. Save Changes to Backend
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/update_profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          location: profile.location
        })
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const updatedUser = await response.json();
      setIsEditing(false);
      
      // If your useAuth has a method to update the user state without reloading, call it here
      // login(token); 
      
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const badges = [
    { name: 'Eco Warrior', icon: '🌱', description: 'Reduced footprint by 20%' },
    { name: 'Commuter Champion', icon: '🚲', description: 'Used public transport 30 days' },
    { name: 'Energy Saver', icon: '💡', description: 'Reduced home energy by 15%' },
    { name: 'Green Streak', icon: '🔥', description: 'Logged activity for 30 days' },
  ];

  return (
    <div className="min-h-screen mt-[-100px] flex items-center justify-center px-4 py-8 text-[#e5e1d8]">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleLogout} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
            Logout
          </Button>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">
                Personal Information
              </CardTitle>
              <Button
                onClick={() => {
                  if (isEditing) {
                    // Reset to original data if they cancel
                    setProfile({ ...profile, name: user?.name || '', email: user?.email || '', location: user?.location || '' });
                  }
                  setIsEditing(!isEditing);
                }}
                variant="outline"
                size="sm"
                className="border-[#e5e1d8]/40 text-black hover:bg-white/10"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-green-700 text-white text-xl">
                  {profile.name ? profile.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() : '??'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-[#e5e1d8]">{profile.name || 'Loading...'}</h3>
                <p className="text-[#e5e1d8]/80">Eco Enthusiast</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-[#e5e1d8] uppercase font-semibold">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#e5e1d8] uppercase font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-[#e5e1d8] uppercase font-semibold">Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8] flex-1"
                  />
                  {/* Location fetch button only shows when editing */}
                  {isEditing && (
                    <Button 
                      onClick={fetchBrowserLocation} 
                      disabled={isLoadingLocation}
                      className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/80"
                    >
                      {isLoadingLocation ? '...' : '📍 Auto'}
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-[#e5e1d8] uppercase font-semibold">Member Since</Label>
                <Input
                  value={profile.joinDate}
                  disabled // Always disabled as requested
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8] opacity-70"
                />
              </div>
            </div>
            {isEditing && (
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-green-700 hover:bg-green-800 text-white w-full md:w-auto mt-4"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* ... Badges Card remains exactly the same ... */}
        
      </div>
    </div>
  );
};

export default UserProfile;