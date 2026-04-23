
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Train } from 'lucide-react';

interface TrainsTabProps {
  onResultUpdate: (value: number) => void;
}

export const TrainsTab: React.FC<TrainsTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    distance: '',
    unit: 'km',
    trainType: 'express',
    coachClass: 'sleeper'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const distance = Number(data.distance);
    if (!distance) return;

    // Convert to kilometers if input is in miles
    const distanceInKm = data.unit === 'miles' ? distance * 1.60934 : distance;
    
    // Emission factors (kg CO2 per km per passenger) for Indian railways
    const emissionFactors = {
      // Train types
      'vande-bharat': 0.045,    // Electric, modern, efficient
      'rajdhani': 0.055,        // Premium express, AC coaches
      'shatabdi': 0.050,        // Day express, AC coaches
      'duronto': 0.058,         // Non-stop express
      'garib-rath': 0.052,      // AC economy express
      'express': 0.065,         // Regular express trains
      'superfast': 0.062,       // Superfast express
      'passenger': 0.075,       // Local passenger trains
      'emu-local': 0.040,       // Electric Multiple Unit (local)
      'demu-local': 0.070,      // Diesel Multiple Unit (local)
      'metro': 0.035            // Metro/Suburban electric
    };

    // Coach class multipliers (AC coaches consume more energy)
    const coachMultipliers = {
      'ac-1': 1.4,              // AC First Class
      'ac-2': 1.25,             // AC 2-Tier
      'ac-3': 1.15,             // AC 3-Tier
      'ac-chair': 1.2,          // AC Chair Car
      'sleeper': 1.0,           // Sleeper Class (base)
      'general': 0.9,           // General/Unreserved
      'second-sitting': 0.95    // Second Sitting
    };

    const baseFactor = emissionFactors[data.trainType as keyof typeof emissionFactors];
    const multiplier = coachMultipliers[data.coachClass as keyof typeof coachMultipliers];
    
    const totalEmissions = distanceInKm * baseFactor * multiplier / 1000; // Convert to tons
    
    const roundedResult = Math.round(totalEmissions * 1000) / 1000; // 3 decimal places for small values
    setResult(roundedResult);
    onResultUpdate(roundedResult);
  };

  return (
  <div className="space-y-6">
    <Card className="bg-[#e5e1d8]/10 backdrop-blur-sm border-[#e5e1d8]/30">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
          <Train className="w-6 h-6 mr-3" />
          TRAIN CALCULATOR
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions for train journeys.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Distance and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="distance" className="text-[#e5e1d8] font-semibold uppercase">
                TRAVEL DISTANCE
              </Label>
              <Input
                id="distance"
                type="number"
                placeholder="e.g., 500"
                value={data.distance}
                onChange={(e) => setData({ ...data, distance: e.target.value })}
                className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
              />
            </div>

            <div>
              <Label className="text-[#e5e1d8] font-semibold uppercase">
                UNIT
              </Label>
              <Select value={data.unit} onValueChange={(value) => setData({ ...data, unit: value })}>
                <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
                  <SelectItem value="km" className="text-black">Kilometers</SelectItem>
                  <SelectItem value="miles" className="text-black">Miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Train Type */}
          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase">
              TRAIN TYPE
            </Label>
            <Select value={data.trainType} onValueChange={(value) => setData({ ...data, trainType: value })}>
              <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
                {[
                  'vande-bharat', 'rajdhani', 'shatabdi', 'duronto', 'garib-rath',
                  'superfast', 'express', 'passenger', 'emu-local', 'demu-local', 'metro'
                ].map((type) => (
                  <SelectItem key={type} value={type} className="text-black capitalize">
                    {type.replace(/-/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Coach Class */}
          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase">
              COACH CLASS
            </Label>
            <Select value={data.coachClass} onValueChange={(value) => setData({ ...data, coachClass: value })}>
              <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
                {[
                  { value: 'ac-1', label: 'AC First Class (1A)' },
                  { value: 'ac-2', label: 'AC 2-Tier (2A)' },
                  { value: 'ac-3', label: 'AC 3-Tier (3A)' },
                  { value: 'ac-chair', label: 'AC Chair Car (CC)' },
                  { value: 'sleeper', label: 'Sleeper Class (SL)' },
                  { value: 'second-sitting', label: 'Second Sitting (2S)' },
                  { value: 'general', label: 'General/Unreserved' }
                ].map(({ value, label }) => (
                  <SelectItem key={value} value={value} className="text-black">{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[#e5e1d8]/60 text-sm mt-1">
              AC coaches have higher emissions due to air conditioning
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-[#e5e1d8]/10 rounded-lg p-4">
            <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">ABOUT INDIAN RAILWAYS</h4>
            <p className="text-[#e5e1d8]/80 text-sm">
              Indian Railways is one of the most carbon-efficient transport modes. Electric trains 
              produce significantly lower emissions than diesel trains. Modern trains like Vande Bharat 
              are more energy-efficient, while local EMU services have the lowest carbon footprint 
              per passenger-kilometer.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={calculateEmissions}
          className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
        >
          CALCULATE TRAIN EMISSIONS
        </Button>

        {/* Result */}
        {result > 0 && (
          <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              TRAIN JOURNEY FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">
              CO₂ equivalent for this journey
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

};
