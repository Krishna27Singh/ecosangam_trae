import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Target, Users, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#e5e1d8] mb-4 uppercase tracking-wide">About Ecosangam</h1>
        <p className="text-xl text-[#e5e1d8]/80 max-w-3xl mx-auto">
          Ecosangam is on a mission to simplify sustainability — helping people track, reduce, and offset their carbon footprint in one place.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
          <CardHeader>
            <Target className="w-12 h-12 text-[#e5e1d8] mb-4" />
            <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[#e5e1d8]/80 text-base">
              To empower individuals and communities to reduce their environmental impact through easy-to-use tracking tools, personalized insights, and collective action.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
          <CardHeader>
            <Leaf className="w-12 h-12 text-[#e5e1d8] mb-4" />
            <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[#e5e1d8]/80 text-base">
              A world where every person is conscious of their environmental impact and empowered to make sustainable choices that protect our planet for future generations.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Why Carbon Tracking Matters */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#e5e1d8] text-center mb-8 uppercase tracking-wide">Why Carbon Tracking Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-[#e5e1d8] mx-auto mb-4" />
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-[#e5e1d8]/80">
                Individual actions add up. When millions track and reduce their footprint, we create meaningful global change.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
            <CardHeader className="text-center">
              <Award className="w-12 h-12 text-[#e5e1d8] mx-auto mb-4" />
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Personal Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-[#e5e1d8]/80">
                Understanding your impact helps you make informed decisions and develop sustainable habits that benefit both you and the planet.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
            <CardHeader className="text-center">
              <Leaf className="w-12 h-12 text-[#e5e1d8] mx-auto mb-4" />
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Future Generations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-[#e5e1d8]/80">
                By reducing our carbon footprint today, we preserve a healthy, sustainable world for our children and their children.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Developer Profiles */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#e5e1d8] mb-8 uppercase tracking-wide">Meet the Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
            <CardContent className="flex flex-col items-center py-6">
              <img src="krishna.jpg" alt="Krishna Singh" className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-[#e5e1d8]" />
              <h3 className="text-xl font-semibold text-[#e5e1d8] uppercase">Krishna Singh</h3>
              <a href="http://github.com/Krishna27Singh" target="_blank" rel="noopener noreferrer" className="mt-2 px-4 py-1 rounded bg-[#e5e1d8]/10 border border-[#e5e1d8]/40 text-[#e5e1d8] hover:bg-[#e5e1d8]/20 transition">
                GitHub Profile
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-[#e5e1d8]/20">
            <CardContent className="flex flex-col items-center py-6">
              <img src="shalini.jpg" alt="Shalini Kashyap" className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-[#e5e1d8]" />
              <h3 className="text-xl font-semibold text-[#e5e1d8] uppercase">Shalini Kashyap</h3>
              <a href="https://github.com/shaliniKashyap717" target="_blank" rel="noopener noreferrer" className="mt-2 px-4 py-1 rounded bg-[#e5e1d8]/10 border border-[#e5e1d8]/40 text-[#e5e1d8] hover:bg-[#e5e1d8]/20 transition">
                GitHub Profile
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[#e5e1d8] text-center mb-6 uppercase tracking-wide">Feedback</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 bg-white/10 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 border border-[#e5e1d8]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e1d8]/50"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 bg-white/10 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 border border-[#e5e1d8]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e1d8]/50"
          />
          <textarea
            rows={4}
            placeholder="Your Feedback"
            className="w-full px-4 py-2 bg-white/10 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 border border-[#e5e1d8]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e1d8]/50"
          ></textarea>
          <button
            type="submit"
            className="bg-[#e5e1d8]/20 border border-[#e5e1d8]/40 text-[#e5e1d8] px-6 py-2 rounded-md hover:bg-[#e5e1d8]/30 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Contact Section */}
      <div className="text-center text-[#e5e1d8] bg-white/5 border border-[#e5e1d8]/20 rounded-lg py-8">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Contact Us</h2>
        <p className="mb-2">Krishna Singh — <a href="mailto:krishnasingh97857@gmail.com" className="underline text-[#e5e1d8]/90">krishnasingh97857@gmail.com</a></p>
        <p>Shalini Kashyap — <a href="mailto:shalinikashyap717@gmail.com" className="underline text-[#e5e1d8]/90">shalinikashyap717@gmail.com</a></p>
      </div>
    </div>
  );
};

export default About;