import React, { useState } from 'react';
import { Heart, Leaf, Shield, Award, Star, Users, Globe, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OffsetEntry {
  id: number;
  project: string;
  amount: number;
  date: string;
}

const initialOffsets: OffsetEntry[] = [
  { id: 1, project: 'Tree Plantation - Assam', amount: 12.5, date: '2025-07-10' },
  { id: 2, project: 'Solar Energy Fund - Rajasthan', amount: 8.2, date: '2025-07-12' },
  { id: 3, project: 'Wind Power - Tamil Nadu', amount: 5.6, date: '2025-07-13' },
];

const Offset: React.FC = () => {
  const [offsets] = useState<OffsetEntry[]>(initialOffsets);
  const [contributionAmount, setContributionAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const totalOffset = offsets.reduce((sum, entry) => sum + entry.amount, 0);
  const presetAmounts = [100, 255, 500, 1000, 2500, 5000];

  const handlePresetClick = (amount: number) => {
    setContributionAmount(amount.toString());
    setSelectedPreset(amount);
  };

  const handleContribute = () => {
    const amount = parseFloat(contributionAmount);
    if (amount > 0) {
      // Here you would integrate with your payment system
      console.log(`Contributing $${amount}`);
      // For now, just show an alert
      alert(`Thank you for contributing $${amount}! You'll receive your certificate via email soon.`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-roboto-condensed">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-bold text-[#e5e1d8] mb-6 leading-tight uppercase">
            WE'RE <span className="text-green-400">GLAD</span> YOU'RE HERE
          </h1>
          
          <p className="text-xl text-[#e5e1d8]/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            You really care about your environment, and that means the world to us. 
            Every step you take towards sustainability creates ripples of positive change across our planet.
          </p>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
              <h2 className="text-2xl font-semibold text-[#e5e1d8] uppercase">YOUR IMPACT SO FAR</h2>
              <Sparkles className="w-6 h-6 text-yellow-400 ml-2" />
            </div>
            <p className="text-4xl font-bold text-green-400 mb-2">{totalOffset.toFixed(2)} kg CO₂</p>
            <p className="text-[#e5e1d8]/80">Total Carbon Offset</p>
          </div>
        </div>

        {/* Emotional Section */}
        <div className="mb-16">
          <Card className="bg-[#e5e1d8] border border-white/30 p-8">

            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-6 uppercase">
                TIRED OF SEARCHING FOR THE <span className="text-green-400">BEST</span> OFFSET PROGRAMS?
              </h2>
              <p className="text-xl text-black/80 mb-6 leading-relaxed max-w-4xl mx-auto">
                Don't want to contribute too much amount but still make a difference? 
                We understand. That's why we've created a platform where <strong className="text-green-400">every rupee counts</strong>.
              </p>
              <div className="bg-white/5 rounded-xl text-black p-6 max-w-3xl mx-auto">
                <p className="text-lg text-black">
                  We take your contribution (whatever amount you're comfortable with) and channel it to the 
                  <span className="text-green-400 font-semibold"> most effective offset programs</span> available. 
                  We only take a minimal <span className="text-yellow-400 font-semibold">1% platform fee</span> - 
                  the rest goes directly to environmental impact.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contribution Section */}
        <div className="mb-16">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#e5e1d8] mb-4 uppercase">MAKE YOUR CONTRIBUTION</h2>
              <p className="text-[#e5e1d8]/80 text-lg">Choose an amount that feels right for you - every contribution matters</p>
            </div>

            {/* Preset Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedPreset === amount ? "default" : "outline"}
                  style={{ backgroundColor: selectedPreset === amount ? '#e5e1d8' : 'transparent' }}
                  className={`h-16 text-lg font-semibold transition-all duration-300 border-[#e5e1d8]/30 ${
                    selectedPreset === amount 
                      ? 'text-black scale-105 hover:opacity-80' 
                      : 'text-[#e5e1d8] hover:bg-[#e5e1d8]/10'
                  }`}
                  onClick={() => handlePresetClick(amount)}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="max-w-md mx-auto mb-8">
              <label className="block text-[#e5e1d8] text-sm font-medium mb-2">Or enter a custom amount:</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e5e1d8]/60 text-lg">₹</span>
                <Input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => {
                    setContributionAmount(e.target.value);
                    setSelectedPreset(null);
                  }}
                  placeholder="Enter amount"
                  className="pl-8 h-14 text-lg bg-white/5 border-[#e5e1d8]/30 text-[#e5e1d8] placeholder-[#e5e1d8]/40"
                />
              </div>
            </div>

            {/* Contribute Button */}
            <div className="text-center">
              <Button
                onClick={handleContribute}
                disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
                style={{ backgroundColor: '#e5e1d8' }}
                className="text-black px-12 py-4 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
              >
                CONTRIBUTE NOW <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <p className="text-sm text-[#e5e1d8]/60 mt-4">
                You'll receive an official certificate via email after your contribution
              </p>
            </div>
          </Card>
        </div>

        {/* Why Contribute Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#e5e1d8] text-center mb-12 uppercase">
            WHY CONTRIBUTE USING OUR <span className="text-green-400">PLATFORM?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-green-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">VERIFIED PROGRAMS</h3>
                <p className="text-[#e5e1d8]/80">
                  We partner only with certified and verified offset programs that deliver real environmental impact.
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Star className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">MAXIMUM IMPACT</h3>
                <p className="text-[#e5e1d8]/80">
                  99% of your contribution goes directly to environmental projects - we keep only 1% for platform maintenance.
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-purple-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Award className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">OFFICIAL CERTIFICATES</h3>
                <p className="text-[#e5e1d8]/80">
                  Receive verified certificates for your contributions that you can share and use for reporting.
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-yellow-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">COMMUNITY IMPACT</h3>
                <p className="text-[#e5e1d8]/80">
                  Join thousands of conscious individuals making a collective difference for our planet's future.
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-red-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Globe className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">GLOBAL REACH</h3>
                <p className="text-[#e5e1d8]/80">
                  Support diverse projects worldwide - from reforestation to renewable energy initiatives.
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-green-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#e5e1d8] mb-4 uppercase">TRANSPARENCY</h3>
                <p className="text-[#e5e1d8]/80">
                  Track exactly where your money goes and see the real-world impact of your contributions.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Previous Contributions */}
        {offsets.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#e5e1d8] text-center mb-8 uppercase">YOUR PREVIOUS CONTRIBUTIONS</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offsets.map((entry) => (
                <Card
                  key={entry.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Leaf className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-[#e5e1d8]/60">{entry.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#e5e1d8] mb-2">{entry.project}</h3>
                  <p className="text-2xl font-bold text-green-400">{entry.amount} kg CO₂</p>
                  <p className="text-sm text-[#e5e1d8]/80">Carbon Offset</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-[#e5e1d8] border border-white/30 p-8
">
            <h2 className="text-4xl font-bold text-black mb-6 uppercase">
              READY TO MAKE A <span className="text-green-400">DIFFERENCE?</span>
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-3xl mx-auto">
              Every contribution, no matter the size, creates positive environmental impact. 
              Join our community of earth guardians today.
            </p>
            <Button
              onClick={() => document.querySelector('[data-contribution-section]')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ backgroundColor: 'green' }}
              className="text-[#e5e1d8] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:opacity-80"
            >
              START CONTRIBUTING <Heart className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Offset;