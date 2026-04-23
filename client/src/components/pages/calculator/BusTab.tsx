
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bus } from 'lucide-react';

interface BusTabProps {
  onResultUpdate: (value: number) => void;
}

export const BusTab: React.FC<BusTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    distance: '',
    unit: 'km',
    busType: 'ordinary'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const distance = Number(data.distance);
    if (!distance || !data.busType) return;

    // Convert miles to km if needed
    const distanceInKm = data.unit === 'miles' ? distance * 1.60934 : distance;
    
    // Indian bus emission factors in kg CO2 per km per passenger
    const emissionFactors = {
      'very-old': 0.105,      // Very old buses (pre-2000)
      'ordinary': 0.089,      // Ordinary city buses
      'deluxe': 0.082,        // Deluxe/AC buses
      'volvo': 0.075,         // Modern Volvo buses
      'cng': 0.068,           // CNG buses
      'electric': 0.045       // Electric buses (considering Indian grid mix)
    };

    const emissionFactor = emissionFactors[data.busType as keyof typeof emissionFactors];
    const totalEmissions = distanceInKm * emissionFactor / 1000; // Convert to tons
    
    const roundedResult = Math.round(totalEmissions * 1000) / 1000; // Round to 3 decimal places
    setResult(roundedResult);
    onResultUpdate(roundedResult);
  };

  const getBusTypeDescription = (type: string) => {
    const descriptions = {
      'very-old': 'Pre-2000, high emissions',
      'ordinary': 'Standard city buses',
      'deluxe': 'AC/Semi-deluxe buses',
      'volvo': 'Modern low-floor buses',
      'cng': 'Compressed Natural Gas',
      'electric': 'Battery electric buses'
    };
    return descriptions[type as keyof typeof descriptions] || '';
  };

  return (
  <Card className="bg-white/10 backdrop-blur-sm border-[#e5e1d8]/30">
    <CardHeader>
      <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
        <Bus className="w-6 h-6 mr-3" />
        BUS TRANSPORTATION
      </CardTitle>
      <CardDescription className="text-[#e5e1d8]/80">
        Calculate emissions for single bus trip.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4">
        {/* Distance Input */}
        <div>
          <Label htmlFor="distance" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
            TRAVEL DISTANCE
          </Label>
          <div className="flex gap-2">
            <Input
              id="distance"
              type="number"
              placeholder="Enter distance"
              value={data.distance}
              onChange={(e) => setData({...data, distance: e.target.value})}
              className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
            <Select value={data.unit} onValueChange={(value) => setData({...data, unit: value})}>
              <SelectTrigger className="w-32 bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                <SelectItem value="km" className="text-black">Kilometers</SelectItem>
                <SelectItem value="miles" className="text-black">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bus Type */}
        <div>
          <Label className="text-[#e5e1d8] font-semibold uppercase mb-3 block">
            BUS TYPE
          </Label>
          <RadioGroup 
            value={data.busType} 
            onValueChange={(value) => setData({...data, busType: value})}
            className="space-y-3"
          >
            {[
              { id: 'very-old', label: 'Very Old Bus' },
              { id: 'ordinary', label: 'Ordinary Bus' },
              { id: 'deluxe', label: 'Deluxe/AC Bus' },
              { id: 'volvo', label: 'Volvo/Modern Bus' },
              { id: 'cng', label: 'CNG Bus' },
              { id: 'electric', label: 'Electric Bus' }
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2 bg-[#e5e1d8]/10 p-3 rounded-lg">
                <RadioGroupItem value={id} id={id} className="border-[#e5e1d8] data-[state=checked]:bg-[#e5e1d8] data-[state=checked]:border-[#e5e1d8]" />
                <div className="flex-1">
                  <Label htmlFor={id} className="text-[#e5e1d8] font-medium cursor-pointer">
                    {label}
                  </Label>
                  <p className="text-[#e5e1d8]/60 text-sm">{getBusTypeDescription(id)}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        onClick={calculateEmissions}
        className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
      >
        CALCULATE BUS EMISSIONS
      </Button>

      {/* Result */}
      {result > 0 && (
        <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
          <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
            BUS TRIP CARBON FOOTPRINT
          </h3>
          <div className="text-3xl font-bold text-[#e5e1d8] mb-2">
            {result < 0.001 ? '<0.001' : result} tons
          </div>
          <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent for this trip</p>
        </div>
      )}
    </CardContent>
  </Card>
);

};
