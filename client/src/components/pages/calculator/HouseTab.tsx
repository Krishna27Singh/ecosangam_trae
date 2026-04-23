
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';

interface HouseTabProps {
  onResultUpdate: (value: number) => void;
}

export const HouseTab: React.FC<HouseTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    electricity: '',
    electricityFactor: '0.5',
    naturalGas: '',
    naturalGasUnit: 'kWh',
    heatingOil: '',
    heatingOilUnit: 'gallons',
    coal: '',
    coalUnit: 'kWh',
    lpg: '',
    lpgUnit: 'therms',
    propane: '',
    propaneUnit: 'gallons',
    woodenPellets: '',
    woodenPelletsUnit: 'tons',
    residents: '',
    energySource: 'grid'
  });
  const [geminiAdvice, setGeminiAdvice] = useState('');

  const [result, setResult] = useState(0);

const calculateEmissions = async () => {
  // Emission factors (same as before)...
  const factors = {
    electricity: Number(data.electricityFactor),
    naturalGas: data.naturalGasUnit === 'kWh' ? 0.185 : 5.3,
    heatingOil: data.heatingOilUnit === 'gallons' ? 10.15 : 2.52,
    coal: 0.34,
    lpg: data.lpgUnit === 'therms' ? 5.68 : 1.51,
    propane: data.propaneUnit === 'gallons' ? 5.72 : 1.54,
    woodenPellets: data.woodenPelletsUnit === 'tons' ? 1540 : 1.54,
  };

  const electricityEmissions = Number(data.electricity) * factors.electricity;
  const gasEmissions = Number(data.naturalGas) * factors.naturalGas;
  const oilEmissions = Number(data.heatingOil) * factors.heatingOil;
  const coalEmissions = Number(data.coal) * factors.coal;
  const lpgEmissions = Number(data.lpg) * factors.lpg;
  const propaneEmissions = Number(data.propane) * factors.propane;
  const pelletsEmissions = Number(data.woodenPellets) * factors.woodenPellets;
  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const sourceMultiplier = data.energySource === 'renewable' ? 0.1 :
                           data.energySource === 'mixed' ? 0.7 : 1.0;

  const totalEmissions = (electricityEmissions + gasEmissions + oilEmissions + coalEmissions + lpgEmissions + propaneEmissions + pelletsEmissions) * sourceMultiplier;
  const totalInTons = totalEmissions / 1000;
  const perPersonTotal = Number(data.residents) > 0 ? totalInTons / Number(data.residents) : totalInTons;

  const roundedResult = Math.round(perPersonTotal * 100) / 100;
  setResult(roundedResult);
  onResultUpdate(roundedResult);

  // 💡 Call backend Gemini route
  try {
    const res = await fetch(`${backendUri}/api/gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carbonEmission: roundedResult }),
    });

    console.log("Calculated per person emission:", roundedResult);


    const json = await res.json();
    setGeminiAdvice(json.summary || "No suggestions received.");
    console.log("Gemini response:", json.summary);
  } catch (err) {
    console.error("Failed to fetch Gemini suggestions", err);
    setGeminiAdvice("Failed to generate advice. Please try again.");
  }
};


  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-[#e5e1d8]/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Home className="w-6 h-6 mr-3" />
            HOME ENERGY CONSUMPTION
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your household energy use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Electricity */}
            <div>
              <Label htmlFor="electricity" className="text-[#e5e1d8] font-semibold uppercase">
                ELECTRICITY (kWh at a factor of)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 300"
                  value={data.electricity}
                  onChange={(e) => setData({...data, electricity: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0.5"
                  value={data.electricityFactor}
                  onChange={(e) => setData({...data, electricityFactor: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[2]"
                />
              </div>
            </div>

            {/* Natural Gas */}
            <div>
              <Label htmlFor="naturalGas" className="text-[#e5e1d8] font-semibold uppercase">
                NATURAL GAS
              </Label>
              <div className="flex gap-2">
                <Input
                  id="naturalGas"
                  type="number"
                  placeholder="e.g., 50"
                  value={data.naturalGas}
                  onChange={(e) => setData({...data, naturalGas: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.naturalGasUnit} onValueChange={(value) => setData({...data, naturalGasUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="kWh" className="text-black">kWh</SelectItem>
                    <SelectItem value="therms" className="text-black">therms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Heating Oil */}
            <div>
              <Label htmlFor="heatingOil" className="text-[#e5e1d8] font-semibold uppercase">
                HEATING OIL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="heatingOil"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.heatingOil}
                  onChange={(e) => setData({...data, heatingOil: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.heatingOilUnit} onValueChange={(value) => setData({...data, heatingOilUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="gallons" className="text-black">US gallons</SelectItem>
                    <SelectItem value="liters" className="text-black">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Coal */}
            <div>
              <Label htmlFor="coal" className="text-[#e5e1d8] font-semibold uppercase">
                COAL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="coal"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.coal}
                  onChange={(e) => setData({...data, coal: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.coalUnit} onValueChange={(value) => setData({...data, coalUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="kWh" className="text-black">kWh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* LPG */}
            <div>
              <Label htmlFor="lpg" className="text-[#e5e1d8] font-semibold uppercase">
                LPG
              </Label>
              <div className="flex gap-2">
                <Input
                  id="lpg"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.lpg}
                  onChange={(e) => setData({...data, lpg: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.lpgUnit} onValueChange={(value) => setData({...data, lpgUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="therms" className="text-black">therms</SelectItem>
                    <SelectItem value="kg" className="text-black">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Propane */}
            <div>
              <Label htmlFor="propane" className="text-[#e5e1d8] font-semibold uppercase">
                PROPANE
              </Label>
              <div className="flex gap-2">
                <Input
                  id="propane"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.propane}
                  onChange={(e) => setData({...data, propane: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.propaneUnit} onValueChange={(value) => setData({...data, propaneUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="gallons" className="text-black">US gallons</SelectItem>
                    <SelectItem value="kg" className="text-black">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Wooden Pellets */}
            <div>
              <Label htmlFor="woodenPellets" className="text-[#e5e1d8] font-semibold uppercase">
                WOODEN PELLETS
              </Label>
              <div className="flex gap-2">
                <Input
                  id="woodenPellets"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.woodenPellets}
                  onChange={(e) => setData({...data, woodenPellets: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.woodenPelletsUnit} onValueChange={(value) => setData({...data, woodenPelletsUnit: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="tons" className="text-black">metric tons</SelectItem>
                    <SelectItem value="kg" className="text-black">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Number of Residents */}
            <div>
              <Label htmlFor="residents" className="text-[#e5e1d8] font-semibold uppercase">
                NUMBER OF RESIDENTS
              </Label>
              <div className="flex gap-2">
                <Input
                  id="residents"
                  type="number"
                  placeholder="e.g., 2"
                  value={data.residents}
                  onChange={(e) => setData({...data, residents: e.target.value})}
                  className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <div className="flex-[2]"></div>
              </div>
            </div>

            {/* Energy Source */}
            <div>
              <Label className="text-[#e5e1d8] font-semibold uppercase">
                ENERGY SOURCE
              </Label>
              <div className="flex gap-2">
                <Select value={data.energySource} onValueChange={(value) => setData({...data, energySource: value})}>
                  <SelectTrigger className="bg-white/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[3]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]">
                    <SelectItem value="grid" className="text-black">Standard Grid Mix</SelectItem>
                    <SelectItem value="mixed" className="text-black">Partial Renewable</SelectItem>
                    <SelectItem value="renewable" className="text-black">100% Renewable</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-[2]"></div>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
          >
            CALCULATE HOME EMISSIONS
          </Button>

{result !== 0 && !isNaN(result) && (
  <div className="bg-[#e5e1d8]/20 backdrop-blur-sm rounded-lg p-6 text-center border border-[#e5e1d8]/30">
    <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
      HOME ENERGY FOOTPRINT
    </h3>
    <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
    <p className="text-[#e5e1d8]/80 text-sm mb-4">CO₂ equivalent per year (per person)</p>
  </div>
)}

{geminiAdvice && (
  <div className="text-left bg-white/10 border border-white/20 p-4 rounded-lg text-[#e5e1d8] mt-4 whitespace-pre-line">
    <h4 className="text-lg font-semibold uppercase mb-2">EcoSangam Suggests You To:</h4>
    {geminiAdvice}
  </div>
)}


        </CardContent>
      </Card>
    </div>
  );
};
