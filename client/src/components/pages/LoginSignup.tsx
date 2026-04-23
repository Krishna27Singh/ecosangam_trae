
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Something went wrong');
      }

      // CRITICAL ADDITION: Extract the token from the response
      const data = await response.json(); 
      
      // Pass the token into your new login function
      login(data.token); 

    } catch (error) {
      console.error('Auth Error:', error);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative font-roboto-condensed">
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/20 backdrop-blur-sm shadow-xl border border-white/30">
          <CardHeader className="text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/ecosangamlogo.png"
                alt="EcoSangam Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <CardTitle className="text-2xl uppercase font-bold tracking-wide text-[#e5e1d8]">
              {isLogin ? 'WELCOME BACK' : 'JOIN ECOSANGAM'}
            </CardTitle>
            <CardDescription className="text-[#e5e1d8] opacity-80">
              {isLogin
                ? 'Sign In to track your carbon footprint'
                : 'Start your eco-friendly journey today'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#e5e1d8] uppercase font-semibold">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#e5e1d8] uppercase font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#e5e1d8] uppercase font-semibold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-black font-bold uppercase tracking-wide"
                style={{ backgroundColor: '#e5e1d8' }}
              >
                {loading
                  ? isLogin
                    ? 'Signing In...'
                    : 'Signing Up...'
                  : isLogin
                  ? 'SIGN IN'
                  : 'SIGN UP'}
              </Button>

              <a
                href={`${import.meta.env.VITE_BACKEND_URI}/auth/google`}
                className="block w-full"
              >
                <Button
                  type="button"
                  className="w-full text-black font-bold uppercase tracking-wide mt-2"
                  style={{ backgroundColor: '#e5e1d8' }}
                >
                  Login With Google
                </Button>
              </a>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm uppercase text-[#e5e1d8] opacity-80">
                {isLogin
                  ? "DON'T HAVE AN ACCOUNT?"
                  : 'ALREADY HAVE AN ACCOUNT?'}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 underline hover:opacity-80"
                >
                  {isLogin ? 'SIGN UP' : 'SIGN IN'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginSignup;