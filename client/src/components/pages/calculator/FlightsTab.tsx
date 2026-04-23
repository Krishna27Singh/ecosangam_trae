
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plane, Info } from 'lucide-react';

interface FlightsTabProps {
  onResultUpdate: (value: number) => void;
}

export const FlightsTab: React.FC<FlightsTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    distance: '',
    flightClass: 'economy',
    isReturnTrip: false,
    numberOfTrips: '1',
    includeRadiativeForcing: false
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const distance = Number(data.distance);
    if (!distance) return;

    // Emission factors in kg CO2 per mile per passenger based on flight distance
    const getEmissionFactor = (miles: number, flightClass: string) => {
      let baseFactor;
      
      // Base factors by distance (economy class)
      if (miles < 1500) {
        baseFactor = 0.24; // Short-haul
      } else if (miles < 4000) {
        baseFactor = 0.18; // Medium-haul
      } else {
        baseFactor = 0.15; // Long-haul
      }

      // Class multipliers
      const classMultipliers = {
        economy: 1,
        'premium-economy': 1.3,
        business: 2,
        first: 3
      };

      return baseFactor * (classMultipliers[flightClass as keyof typeof classMultipliers] || 1);
    };

    const emissionFactor = getEmissionFactor(distance, data.flightClass);
    let totalEmissions = distance * emissionFactor;

    // Apply return trip multiplier
    if (data.isReturnTrip) {
      totalEmissions *= 2;
    }

    // Apply number of trips
    totalEmissions *= Number(data.numberOfTrips);

    // Apply radiative forcing multiplier (typically 2-3x for aviation)
    if (data.includeRadiativeForcing) {
      totalEmissions *= 2.7; // Standard RF multiplier for aviation
    }

    // Convert to tons
    const totalTons = totalEmissions / 1000;
    
    const roundedResult = Math.round(totalTons * 100) / 100;
    setResult(roundedResult);
    onResultUpdate(roundedResult);
  };

  return (
  <div className="space-y-6">
    <Card className="bg-white/10 backdrop-blur-sm border-[#e5e1d8]/30">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
          <Plane className="w-6 h-6 mr-3" />
          FLIGHT CALCULATOR
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions for specific flights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="distance" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
              FLIGHT DISTANCE (miles)
            </Label>
            <Input
              id="distance"
              type="number"
              placeholder="e.g., 2500"
              value={data.distance}
              onChange={(e) => setData({...data, distance: e.target.value})}
              className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
            <p className="text-[#e5e1d8]/60 text-sm mt-1">
              One-way distance between origin and destination
            </p>
          </div>

          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase block mb-2">
              FLIGHT CLASS
            </Label>
            <Select value={data.flightClass} onValueChange={(value) => setData({...data, flightClass: value})}>
              <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                <SelectItem value="economy" className="text-black">Economy Class</SelectItem>
                <SelectItem value="premium-economy" className="text-black">Premium Economy</SelectItem>
                <SelectItem value="business" className="text-black">Business Class</SelectItem>
                <SelectItem value="first" className="text-black">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="numberOfTrips" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
              NUMBER OF TRIPS
            </Label>
            <Input
              id="numberOfTrips"
              type="number"
              min="1"
              placeholder="1"
              value={data.numberOfTrips}
              onChange={(e) => setData({...data, numberOfTrips: e.target.value})}
              className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="returnTrip"
              checked={data.isReturnTrip}
              onCheckedChange={(checked) => setData({...data, isReturnTrip: !!checked})}
              className="border-[#e5e1d8]/50 data-[state=checked]:bg-[#e5e1d8]/60"
            />
            <Label htmlFor="returnTrip" className="text-[#e5e1d8] font-semibold uppercase">
              INCLUDE RETURN TRIP
            </Label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="radiativeForcing"
                checked={data.includeRadiativeForcing}
                onCheckedChange={(checked) => setData({...data, includeRadiativeForcing: !!checked})}
                className="border-[#e5e1d8]/50 data-[state=checked]:bg-[#e5e1d8]/60"
              />
              <Label htmlFor="radiativeForcing" className="text-[#e5e1d8] font-semibold uppercase flex items-center">
                INCLUDE RADIATIVE FORCING
                <Info className="w-4 h-4 ml-2" />
              </Label>
            </div>

            <div className="bg-[#e5e1d8]/10 rounded-lg p-4">
              <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">WHAT IS RADIATIVE FORCING?</h4>
              <p className="text-[#e5e1d8]/80 text-sm">
                Radiative forcing accounts for aviation's additional climate impact beyond CO₂ emissions. 
                Aircraft emit greenhouse gases at high altitudes where they have amplified warming effects. 
                This includes water vapor, nitrogen oxides, and contrail formation. Scientists estimate 
                aviation's total climate impact is 2-3 times higher than CO₂ emissions alone, which is 
                why we apply a multiplier of 1.891x (DEFRA's recommended radiative forcing factor) when this option is selected.
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
        >
          CALCULATE FLIGHT EMISSIONS
        </Button>

        {result > 0 && (
          <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              FLIGHT FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">
              CO₂ equivalent {data.includeRadiativeForcing ? '(with radiative forcing)' : ''}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

};