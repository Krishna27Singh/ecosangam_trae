
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MotorbikeTabProps {
  onResultUpdate: (value: number) => void;
}

export const MotorbikeTab: React.FC<MotorbikeTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    distance: '',
    distanceUnit: 'km',
    bikeType: 'commuter',
    mileage: '',
    engineCC: ''
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const distance = Number(data.distance);
    const mileage = Number(data.mileage) || getDefaultMileage(data.bikeType);
    
    if (distance === 0 || mileage === 0) {
      setResult(0);
      onResultUpdate(0);
      return;
    }

    // Convert miles to km if needed
    const distanceInKm = data.distanceUnit === 'miles' ? distance * 1.60934 : distance;
    
    // Calculate fuel consumption in liters
    const fuelConsumed = distanceInKm / mileage;
    
    // Petrol emission factor: 2.31 kg CO2 per liter (Indian standard)
    const totalEmissions = fuelConsumed * 2.31 / 1000; // Convert to tons
    
    setResult(Math.round(totalEmissions * 10000) / 10000);
    onResultUpdate(Math.round(totalEmissions * 10000) / 10000);
  };

  const getDefaultMileage = (bikeType: string) => {
    const defaultMileages = {
      commuter: 55, // Hero Splendor, Bajaj CT
      sport: 35,   // Yamaha R15, KTM Duke
      premium: 40, // Royal Enfield, Bajaj Dominar
      scooter: 45, // Honda Activa, TVS Jupiter
      electric: 0  // No fuel consumption
    };
    return defaultMileages[bikeType as keyof typeof defaultMileages] || 45;
  };

  return (
  <Card className="bg-[#e5e1d8]/10 backdrop-blur-sm border-[#e5e1d8]/30">
    <CardHeader>
      <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
        MOTORBIKE TRANSPORTATION
      </CardTitle>
      <CardDescription className="text-[#e5e1d8]/80">
        Calculate emissions for a single bike trip.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      <div className="space-y-4">
        {/* Distance Input */}
        <div>
          <Label htmlFor="distance" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
            DISTANCE TRAVELED
          </Label>
          <div className="flex gap-2">
            <Input
              id="distance"
              type="number"
              placeholder="e.g., 50"
              value={data.distance}
              onChange={(e) => setData({ ...data, distance: e.target.value })}
              className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-1"
            />
            <Select
              value={data.distanceUnit}
              onValueChange={(value) => setData({ ...data, distanceUnit: value })}
            >
              <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
                <SelectItem value="km" className="text-black">KM</SelectItem>
                <SelectItem value="miles" className="text-black">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bike Type */}
        <div>
          <Label className="text-[#e5e1d8] font-semibold uppercase block mb-2">
            BIKE TYPE
          </Label>
          <Select
            value={data.bikeType}
            onValueChange={(value) => setData({ ...data, bikeType: value })}
          >
            <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
              {[
                { value: 'commuter', label: 'Commuter (Hero Splendor, Bajaj CT)' },
                { value: 'sport', label: 'Sport (Yamaha R15, KTM Duke)' },
                { value: 'premium', label: 'Premium (Royal Enfield, Dominar)' },
                { value: 'scooter', label: 'Scooter (Honda Activa, TVS Jupiter)' },
                { value: 'electric', label: 'Electric Bike' }
              ].map(({ value, label }) => (
                <SelectItem key={value} value={value} className="text-black">{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mileage Input */}
        <div>
          <Label htmlFor="mileage" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
            MILEAGE (KM/L)
          </Label>
          <Input
            id="mileage"
            type="number"
            placeholder={`Default: ${getDefaultMileage(data.bikeType)} km/l`}
            value={data.mileage}
            onChange={(e) => setData({ ...data, mileage: e.target.value })}
            className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
          />
        </div>

        {/* Engine CC */}
        <div>
          <Label htmlFor="engineCC" className="text-[#e5e1d8] font-semibold uppercase block mb-2">
            ENGINE CC (Optional)
          </Label>
          <Input
            id="engineCC"
            type="number"
            placeholder="e.g., 125, 150, 200"
            value={data.engineCC}
            onChange={(e) => setData({ ...data, engineCC: e.target.value })}
            className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        onClick={calculateEmissions}
        className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
      >
        CALCULATE BIKE EMISSIONS
      </Button>

      {/* Emissions Result */}
      {result > 0 && (
        <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
          <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
            MOTORBIKE TRIP FOOTPRINT
          </h3>
          <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
          <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent for this trip</p>
          <div className="mt-2 text-[#e5e1d8]/70 text-xs">
            Distance: {data.distance} {data.distanceUnit} | Mileage: {data.mileage || getDefaultMileage(data.bikeType)} km/l
            {data.engineCC && ` | Engine: ${data.engineCC}cc`}
          </div>
        </div>
      )}

      {/* Electric Info Box */}
      {data.bikeType === 'electric' && (
        <div className="bg-blue-600/30 backdrop-blur-sm rounded-lg p-4 text-center">
          <p className="text-[#e5e1d8] text-sm">
            🌱 Electric bikes produce zero direct emissions! Carbon footprint depends on electricity source.
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

};
