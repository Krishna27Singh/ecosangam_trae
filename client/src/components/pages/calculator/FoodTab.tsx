
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils } from 'lucide-react';

interface FoodTabProps {
  onResultUpdate: (value: number) => void;
}

export const FoodTab: React.FC<FoodTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    rice: '',
    wheat: '',
    pulses: '',
    chicken: '',
    mutton: '',
    fish: '',
    milk: '',
    curd: '',
    paneer: '',
    ghee: '',
    vegetables: '',
    fruits: '',
    sugar: '',
    tea: '',
    coffee: '',
    cooking_oil: '',
    dietType: 'mixed'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    // Emission factors (kg CO2 per kg of food) - Indian context
    const emissionFactors = {
      rice: 2.7,
      wheat: 1.1,
      pulses: 0.9,
      chicken: 6.9,
      mutton: 39.2,
      fish: 6.1,
      milk: 3.2,
      curd: 2.9,
      paneer: 8.8,
      ghee: 23.9,
      vegetables: 2.0,
      fruits: 1.1,
      sugar: 3.7,
      tea: 5.7,
      coffee: 16.5,
      cooking_oil: 6.3
    };

    let totalEmissions = 0;
    
    // Calculate based on daily consumption in grams, convert to kg per year
    totalEmissions += Number(data.rice) * 365 / 1000 * emissionFactors.rice;
    totalEmissions += Number(data.wheat) * 365 / 1000 * emissionFactors.wheat;
    totalEmissions += Number(data.pulses) * 365 / 1000 * emissionFactors.pulses;
    totalEmissions += Number(data.chicken) * 365 / 1000 * emissionFactors.chicken;
    totalEmissions += Number(data.mutton) * 365 / 1000 * emissionFactors.mutton;
    totalEmissions += Number(data.fish) * 365 / 1000 * emissionFactors.fish;
    totalEmissions += Number(data.milk) * 365 / 1000 * emissionFactors.milk; // ml treated as grams
    totalEmissions += Number(data.curd) * 365 / 1000 * emissionFactors.curd;
    totalEmissions += Number(data.paneer) * 365 / 1000 * emissionFactors.paneer;
    totalEmissions += Number(data.ghee) * 365 / 1000 * emissionFactors.ghee;
    totalEmissions += Number(data.vegetables) * 365 / 1000 * emissionFactors.vegetables;
    totalEmissions += Number(data.fruits) * 365 / 1000 * emissionFactors.fruits;
    totalEmissions += Number(data.sugar) * 365 / 1000 * emissionFactors.sugar;
    totalEmissions += Number(data.tea) * 365 / 1000 * emissionFactors.tea;
    totalEmissions += Number(data.coffee) * 365 / 1000 * emissionFactors.coffee;
    totalEmissions += Number(data.cooking_oil) * 365 / 1000 * emissionFactors.cooking_oil;

    const finalEmissions = totalEmissions / 1000; // Convert to tons
    
    setResult(Math.round(finalEmissions * 100) / 100);
    onResultUpdate(Math.round(finalEmissions * 100) / 100);
  };

  return (
  <div className="space-y-6">
    <Card className="bg-[#e5e1d8]/10 backdrop-blur-sm border-[#e5e1d8]/30">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
          <Utensils className="w-6 h-6 mr-3" />
          FOOD & DIET
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions from your daily food consumption.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-6">
          {/* Staples Section */}
          <div className="space-y-4">
            <h4 className="text-[#e5e1d8] font-semibold uppercase text-[#e5e1d8]/90">
              STAPLES (grams per day)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'rice', label: 'RICE', placeholder: 'e.g., 200' },
                { id: 'wheat', label: 'WHEAT (Roti/Bread)', placeholder: 'e.g., 150' },
                { id: 'pulses', label: 'PULSES (Dal)', placeholder: 'e.g., 50' },
                { id: 'vegetables', label: 'VEGETABLES', placeholder: 'e.g., 200' }
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <Label htmlFor={id} className="text-[#e5e1d8] font-semibold uppercase">{label}</Label>
                  <Input
                    id={id}
                    type="number"
                    placeholder={placeholder}
                    value={data[id]}
                    onChange={(e) => setData({ ...data, [id]: e.target.value })}
                    className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Protein Section */}
          <div className="space-y-4">
            <h4 className="text-[#e5e1d8] font-semibold uppercase text-[#e5e1d8]/90">
              PROTEIN (grams per day)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'chicken', label: 'CHICKEN', placeholder: 'e.g., 100' },
                { id: 'mutton', label: 'MUTTON/GOAT', placeholder: 'e.g., 50' },
                { id: 'fish', label: 'FISH', placeholder: 'e.g., 80' },
                { id: 'paneer', label: 'PANEER', placeholder: 'e.g., 50' }
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <Label htmlFor={id} className="text-[#e5e1d8] font-semibold uppercase">{label}</Label>
                  <Input
                    id={id}
                    type="number"
                    placeholder={placeholder}
                    value={data[id]}
                    onChange={(e) => setData({ ...data, [id]: e.target.value })}
                    className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dairy & Others */}
          <div className="space-y-4">
            <h4 className="text-[#e5e1d8] font-semibold uppercase text-[#e5e1d8]/90">
              DAIRY & OTHERS (grams/ml per day)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'milk', label: 'MILK (ml)', placeholder: 'e.g., 200' },
                { id: 'curd', label: 'CURD', placeholder: 'e.g., 100' },
                { id: 'ghee', label: 'GHEE', placeholder: 'e.g., 10' },
                { id: 'cooking_oil', label: 'COOKING OIL', placeholder: 'e.g., 20' },
                { id: 'fruits', label: 'FRUITS', placeholder: 'e.g., 150' },
                { id: 'sugar', label: 'SUGAR', placeholder: 'e.g., 20' },
                { id: 'tea', label: 'TEA (grams of tea leaves)', placeholder: 'e.g., 5' },
                { id: 'coffee', label: 'COFFEE (grams of coffee)', placeholder: 'e.g., 10' }
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <Label htmlFor={id} className="text-[#e5e1d8] font-semibold uppercase">{label}</Label>
                  <Input
                    id={id}
                    type="number"
                    placeholder={placeholder}
                    value={data[id]}
                    onChange={(e) => setData({ ...data, [id]: e.target.value })}
                    className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Diet Type Dropdown */}
          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase">DIET TYPE</Label>
            <Select
              value={data.dietType}
              onValueChange={(value) => setData({ ...data, dietType: value })}
            >
              <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60">
                <SelectItem value="vegan" className="text-black">Vegan</SelectItem>
                <SelectItem value="vegetarian" className="text-black">Vegetarian</SelectItem>
                <SelectItem value="jain" className="text-black">Jain Vegetarian</SelectItem>
                <SelectItem value="mixed" className="text-black">Mixed Diet</SelectItem>
                <SelectItem value="non_veg" className="text-black">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={calculateEmissions}
          className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
        >
          CALCULATE FOOD EMISSIONS
        </Button>

        {/* Result Box */}
        {result > 0 && (
          <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              FOOD & DIET FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

};
