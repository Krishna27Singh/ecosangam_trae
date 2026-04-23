
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OthersTabProps {
  onResultUpdate: (value: number) => void;
}

export const OthersTab: React.FC<OthersTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    pharmaceuticals: '',
    clothesTextiles: '',
    paperProducts: '',
    computersIT: '',
    televisionRadio: '',
    motorVehicles: '',
    furnitureGoods: '',
    hotelsRestaurants: '',
    phoneCallCosts: '',
    bankingFinance: '',
    insurance: '',
    education: '',
    recreational: ''
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    // Emission factors (kg CO2 per rupee spent) - based on Indian economic input-output analysis
    const emissionFactors = {
      pharmaceuticals: 0.00012, // Lower emissions per rupee
      clothesTextiles: 0.00018, // Higher due to manufacturing
      paperProducts: 0.00025, // High due to deforestation and processing
      computersIT: 0.00015, // Electronics manufacturing
      televisionRadio: 0.00020, // Electronics with higher energy use
      motorVehicles: 0.00035, // Very high emissions from manufacturing
      furnitureGoods: 0.00022, // Wood processing and manufacturing
      hotelsRestaurants: 0.00008, // Service sector, lower per rupee
      phoneCallCosts: 0.00005, // Telecommunications infrastructure
      bankingFinance: 0.00003, // Financial services, very low
      insurance: 0.00002, // Financial services, very low
      education: 0.00004, // Educational services, low
      recreational: 0.00010 // Sports, culture, entertainment
    };

    let totalEmissions = 0;
    
    // Calculate emissions for each category
    totalEmissions += Number(data.pharmaceuticals) * emissionFactors.pharmaceuticals;
    totalEmissions += Number(data.clothesTextiles) * emissionFactors.clothesTextiles;
    totalEmissions += Number(data.paperProducts) * emissionFactors.paperProducts;
    totalEmissions += Number(data.computersIT) * emissionFactors.computersIT;
    totalEmissions += Number(data.televisionRadio) * emissionFactors.televisionRadio;
    totalEmissions += Number(data.motorVehicles) * emissionFactors.motorVehicles;
    totalEmissions += Number(data.furnitureGoods) * emissionFactors.furnitureGoods;
    totalEmissions += Number(data.hotelsRestaurants) * emissionFactors.hotelsRestaurants;
    totalEmissions += Number(data.phoneCallCosts) * emissionFactors.phoneCallCosts;
    totalEmissions += Number(data.bankingFinance) * emissionFactors.bankingFinance;
    totalEmissions += Number(data.insurance) * emissionFactors.insurance;
    totalEmissions += Number(data.education) * emissionFactors.education;
    totalEmissions += Number(data.recreational) * emissionFactors.recreational;

    // Convert to tons
    const finalEmissions = totalEmissions / 1000;
    
    setResult(Math.round(finalEmissions * 100) / 100);
    onResultUpdate(Math.round(finalEmissions * 100) / 100);
  };

  return (
  <div className="space-y-6">
    <Card className="bg-[#e5e1d8]/10 backdrop-blur-sm border-[#e5e1d8]/30">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
          OTHER CONSUMPTION
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions from various spending categories (Annual spending in ₹)
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[
            { id: 'pharmaceuticals', label: 'PHARMACEUTICALS', placeholder: 'e.g., 5000' },
            { id: 'clothesTextiles', label: 'CLOTHES, TEXTILES AND SHOES', placeholder: 'e.g., 15000' },
            { id: 'paperProducts', label: 'PAPER BASED PRODUCTS (books, magazines, newspapers)', placeholder: 'e.g., 3000' },
            { id: 'computersIT', label: 'COMPUTERS AND IT EQUIPMENT', placeholder: 'e.g., 25000' },
            { id: 'televisionRadio', label: 'TELEVISION, RADIO AND PHONE (equipment)', placeholder: 'e.g., 20000' },
            { id: 'motorVehicles', label: 'MOTOR VEHICLES (not including fuel costs)', placeholder: 'e.g., 50000' },
            { id: 'furnitureGoods', label: 'FURNITURE AND OTHER MANUFACTURED GOODS', placeholder: 'e.g., 12000' },
            { id: 'hotelsRestaurants', label: 'HOTELS, RESTAURANTS, AND PUBS ETC.', placeholder: 'e.g., 30000' },
            { id: 'phoneCallCosts', label: 'TELEPHONE, MOBILE/CELL PHONE CALL COSTS', placeholder: 'e.g., 6000' },
            { id: 'bankingFinance', label: 'BANKING AND FINANCE (mortgage and loan interest payments)', placeholder: 'e.g., 80000' },
            { id: 'insurance', label: 'INSURANCE', placeholder: 'e.g., 15000' },
            { id: 'education', label: 'EDUCATION', placeholder: 'e.g., 25000' },
            { id: 'recreational', label: 'RECREATIONAL, CULTURAL AND SPORTING ACTIVITIES', placeholder: 'e.g., 18000' }
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <Label htmlFor={id} className="text-[#e5e1d8] font-semibold uppercase">
                {label} (₹ per year)
              </Label>
              <Input
                id={id}
                type="number"
                placeholder={placeholder}
                value={data[id]}
                onChange={(e) => setData({ ...data, [id]: e.target.value })}
                className="bg-[#e5e1d8]/20 border-[#e5e1d8]/40 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
              />
            </div>
          ))}
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
        >
          CALCULATE CONSUMPTION EMISSIONS
        </Button>

        {result > 0 && (
          <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              CONSUMPTION FOOTPRINT
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
