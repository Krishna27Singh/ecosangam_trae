
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IntroductionTab } from './calculator/IntroductionTab';
import { HouseTab } from './calculator/HouseTab';
import { CarTab } from './calculator/CarTab';
import { FlightsTab } from './calculator/FlightsTab';
import { BusTab } from './calculator/BusTab';
import { TrainsTab } from './calculator/TrainsTab';
import { MotorbikeTab } from './calculator/MotorbikeTab';
import { FoodTab } from './calculator/FoodTab';
import { OthersTab } from './calculator/OthersTab';

export const CarbonCalculator = () => {
  const [results, setResults] = useState({
    house: 0,
    car: 0,
    flights: 0,
    bus: 0,
    trains: 0,
    motorbike: 0,
    food: 0,
    others: 0
  });

const handleResultUpdate = (value: number) => {
  updateResult('house', value);  // Just update the total, no Gemini call here
};



  const updateResult = (category: string, value: number) => {
    setResults(prev => ({ ...prev, [category]: value }));
  };

  const totalFootprint = Object.values(results).reduce((sum, value) => sum + value, 0);

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">
            CARBON FOOTPRINT CALCULATOR
          </h1>
          <p className="text-[#e5e1d8] text-lg opacity-90">Calculate your environmental impact</p>
          
          {totalFootprint > 0 && (
            <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">TOTAL FOOTPRINT</h3>
              <div className="text-3xl font-bold text-green-600">{totalFootprint.toFixed(2)} tons</div>
              <p className="text-[#e5e1d8] text-sm opacity-80">CO₂ equivalent per year</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="introduction" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 bg-white/5 backdrop-blur-sm mb-8 p-0 gap-0 h-auto rounded-lg overflow-hidden">
            <TabsTrigger 
              value="introduction" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              INTRO
            </TabsTrigger>
            <TabsTrigger 
              value="house" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              HOUSE
            </TabsTrigger>
            <TabsTrigger 
              value="car" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              CAR
            </TabsTrigger>
            <TabsTrigger 
              value="flights" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              FLIGHTS
            </TabsTrigger>
            <TabsTrigger 
              value="bus" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              BUS
            </TabsTrigger>
            <TabsTrigger 
              value="trains" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              TRAINS
            </TabsTrigger>
            <TabsTrigger 
              value="motorbike" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              BIKE
            </TabsTrigger>
            <TabsTrigger 
              value="food" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              FOOD
            </TabsTrigger>
            <TabsTrigger 
              value="others" 
              className="bg-[#e5e1d8] text-black data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs uppercase font-semibold rounded-none border-r border-white/20 last:border-r-0 h-12"
            >
              OTHERS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="introduction">
            <IntroductionTab />
          </TabsContent>
          
          <TabsContent value="house">
            <HouseTab onResultUpdate={handleResultUpdate} />

            {/* <HouseTab onResultUpdate={(value) => updateResult('house', value)} /> */}
          </TabsContent>
          
          <TabsContent value="car">
            <CarTab onResultUpdate={(value) => updateResult('car', value)} />
          </TabsContent>
          
          <TabsContent value="flights">
            <FlightsTab onResultUpdate={(value) => updateResult('flights', value)} />
          </TabsContent>
          
          <TabsContent value="bus">
            <BusTab onResultUpdate={(value) => updateResult('bus', value)} />
          </TabsContent>
          
          <TabsContent value="trains">
            <TrainsTab onResultUpdate={(value) => updateResult('trains', value)} />
          </TabsContent>
          
          <TabsContent value="motorbike">
            <MotorbikeTab onResultUpdate={(value) => updateResult('motorbike', value)} />
          </TabsContent>
          
          <TabsContent value="food">
            <FoodTab onResultUpdate={(value) => updateResult('food', value)} />
          </TabsContent>
          
          <TabsContent value="others">
            <OthersTab onResultUpdate={(value) => updateResult('others', value)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarbonCalculator;