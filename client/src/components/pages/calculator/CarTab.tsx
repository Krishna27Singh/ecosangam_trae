
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car } from 'lucide-react';

interface CarTabProps {
  onResultUpdate: (value: number) => void;
}

const vehicleData = {
  'india-car-database': {
    manufacturers: {
      'ford-india': { name: 'Ford India Pvt. Ltd.', models: ['Figo', 'EcoSport', 'Freestyle', 'Endeavour'] },
      'honda-india': { name: 'Honda Cars India Ltd.', models: ['City', 'Amaze', 'WR-V', 'Jazz', 'CR-V'] },
      'hyundai-india': { name: 'Hyundai Motor India Ltd.', models: ['i10', 'i20', 'Verna', 'Creta', 'Tucson'] },
      'mahindra': { name: 'Mahindra & Mahindra Ltd.', models: ['XUV500', 'Scorpio', 'Bolero', 'Thar', 'XUV300'] },
      'maruti-suzuki': { name: 'Maruti Suzuki India Ltd.', models: ['Swift', 'Baleno', 'Alto', 'Dzire', 'Vitara Brezza'] },
      'nissan-india': { name: 'Nissan Motor India Pvt. Ltd.', models: ['Micra', 'Sunny', 'Terrano', 'X-Trail'] },
      'renault-india': { name: 'Renault India Pvt. Ltd.', models: ['Kwid', 'Duster', 'Captur', 'Lodgy'] },
      'skoda-india': { name: 'Skoda Auto Volkswagen India Pvt. Ltd.', models: ['Rapid', 'Octavia', 'Superb', 'Kodiaq'] },
      'tata-motors': { name: 'Tata Motors Ltd.', models: ['Tiago', 'Tigor', 'Nexon', 'Harrier', 'Safari'] },
      'toyota-india': { name: 'Toyota Kirloskar Motor Pvt. Ltd.', models: ['Etios', 'Yaris', 'Innova', 'Fortuner', 'Camry'] }
    }
  },
  'us-car-database': {
    manufacturers: {
      'acura': { name: 'Acura', models: ['ILX', 'TLX', 'RLX', 'RDX', 'MDX'] },
      'audi': { name: 'Audi', models: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7'] },
      'bmw': { name: 'BMW', models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7'] },
      'buick': { name: 'Buick', models: ['Encore', 'Envision', 'Enclave', 'Regal'] },
      'cadillac': { name: 'Cadillac', models: ['ATS', 'CTS', 'XTS', 'XT4', 'XT5', 'Escalade'] },
      'chevrolet': { name: 'Chevrolet', models: ['Spark', 'Sonic', 'Cruze', 'Malibu', 'Impala', 'Equinox'] },
      'chrysler': { name: 'Chrysler', models: ['300', 'Pacifica'] },
      'dodge': { name: 'Dodge', models: ['Charger', 'Challenger', 'Durango', 'Journey'] },
      'ford': { name: 'Ford', models: ['Fiesta', 'Focus', 'Fusion', 'Mustang', 'Escape', 'Explorer'] },
      'honda': { name: 'Honda', models: ['Fit', 'Civic', 'Accord', 'CR-V', 'Pilot', 'Ridgeline'] },
      'hyundai': { name: 'Hyundai', models: ['Accent', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe'] },
      'infiniti': { name: 'Infiniti', models: ['Q50', 'Q60', 'QX50', 'QX60', 'QX80'] },
      'jaguar': { name: 'Jaguar', models: ['XE', 'XF', 'XJ', 'F-PACE', 'E-PACE'] },
      'jeep': { name: 'Jeep', models: ['Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler'] },
      'lexus': { name: 'Lexus', models: ['IS', 'ES', 'GS', 'LS', 'NX', 'RX', 'GX'] },
      'mercedes-benz': { name: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS'] },
      'nissan': { name: 'Nissan', models: ['Versa', 'Sentra', 'Altima', 'Maxima', 'Rogue', 'Pathfinder'] },
      'toyota': { name: 'Toyota', models: ['Yaris', 'Corolla', 'Camry', 'Avalon', 'RAV4', 'Highlander'] },
      'volkswagen': { name: 'Volkswagen', models: ['Jetta', 'Passat', 'Arteon', 'Tiguan', 'Atlas'] }
    }
  },
  'eu-car-database': {
    manufacturers: {
      'audi': { name: 'Audi', models: ['A1', 'A3', 'A4', 'A6', 'A8', 'Q2', 'Q3', 'Q5'] },
      'bmw': { name: 'BMW', models: ['1 Series', '3 Series', '5 Series', 'X1', 'X3', 'X5'] },
      'citroen': { name: 'Citroën', models: ['C1', 'C3', 'C4', 'C5', 'Berlingo'] },
      'fiat': { name: 'Fiat', models: ['500', 'Panda', 'Punto', 'Tipo', '500X'] },
      'ford': { name: 'Ford', models: ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Edge'] },
      'honda': { name: 'Honda', models: ['Jazz', 'Civic', 'Accord', 'CR-V', 'HR-V'] },
      'hyundai': { name: 'Hyundai', models: ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe'] },
      'kia': { name: 'Kia', models: ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento'] },
      'land-rover': { name: 'Land Rover', models: ['Evoque', 'Discovery Sport', 'Discovery', 'Defender'] },
      'mercedes-benz': { name: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC'] },
      'mini': { name: 'Mini', models: ['Cooper', 'Countryman', 'Clubman'] },
      'nissan': { name: 'Nissan', models: ['Micra', 'Note', 'Pulsar', 'Qashqai', 'X-Trail'] },
      'opel': { name: 'Opel', models: ['Corsa', 'Astra', 'Insignia', 'Crossland', 'Grandland'] },
      'peugeot': { name: 'Peugeot', models: ['108', '208', '308', '508', '2008', '3008'] },
      'renault': { name: 'Renault', models: ['Clio', 'Megane', 'Scenic', 'Captur', 'Kadjar'] },
      'seat': { name: 'Seat', models: ['Ibiza', 'Leon', 'Ateca', 'Tarraco'] },
      'skoda': { name: 'Skoda', models: ['Fabia', 'Octavia', 'Superb', 'Karoq', 'Kodiaq'] },
      'toyota': { name: 'Toyota', models: ['Yaris', 'Auris', 'Avensis', 'C-HR', 'RAV4'] },
      'volkswagen': { name: 'Volkswagen', models: ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg'] },
      'volvo': { name: 'Volvo', models: ['V40', 'S60', 'V60', 'XC40', 'XC60', 'XC90'] }
    }
  }
};

export const CarTab: React.FC<CarTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    mileage: '',
    mileageUnit: 'miles',
    vehicleDatabase: 'india-car-database',
    year: '2020',
    manufacturer: '',
    model: '',
    variant: 'aspire-mt',
    efficiency: '',
    efficiencyUnit: 'g/km'
  });

  const [result, setResult] = useState(0);
  const [geminiAdvice, setGeminiAdvice] = useState('');


const calculateEmissions = async () => {
  const mileage = Number(data.mileage);
  const efficiency = Number(data.efficiency);
  
  if (mileage === 0 || efficiency === 0) {
    setResult(0);
    onResultUpdate(0);
    return;
  }

  const totalEmissions = (mileage * efficiency) / 1000000; // tons
  const rounded = Math.round(totalEmissions * 100) / 100;
  setResult(rounded);
  onResultUpdate(rounded);

  // 💡 Gemini API call
  try {
    const res = await fetch('http://localhost:8000/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carbonEmission: rounded }),
    });
    const json = await res.json();
    setGeminiAdvice(json.summary || 'No suggestions received.');
  } catch (err) {
    console.error('Gemini error:', err);
    setGeminiAdvice('Failed to generate advice. Please try again.');
  }
};

  const currentDatabase = vehicleData[data.vehicleDatabase as keyof typeof vehicleData];
  const currentManufacturer = data.manufacturer ? currentDatabase.manufacturers[data.manufacturer as keyof typeof currentDatabase.manufacturers] : null;

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-[#e5e1d8]/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Car className="w-6 h-6 mr-3" />
            CAR TRANSPORTATION
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your personal vehicle use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="mileage" className="text-[#e5e1d8] font-semibold uppercase block mb-3">
                MILEAGE
              </Label>
              <div className="flex gap-2">
                <Input
                  id="mileage"
                  type="number"
                  placeholder="Enter mileage"
                  value={data.mileage}
                  onChange={(e) => setData({...data, mileage: e.target.value})}
                  className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.mileageUnit} onValueChange={(value) => setData({...data, mileageUnit: value})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    <SelectItem value="miles" className="text-black">miles</SelectItem>
                    <SelectItem value="km" className="text-black">km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-[#e5e1d8] font-semibold uppercase block mb-3">
                CHOOSE VEHICLE
              </Label>
              <div className="space-y-3">
                <Select value={data.vehicleDatabase} onValueChange={(value) => setData({...data, vehicleDatabase: value, manufacturer: '', model: ''})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    <SelectItem value="india-car-database" className="text-black">India car database</SelectItem>
                    <SelectItem value="us-car-database" className="text-black">US car database</SelectItem>
                    <SelectItem value="eu-car-database" className="text-black">EU car database</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={data.year} onValueChange={(value) => setData({...data, year: value})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    <SelectItem value="2024" className="text-black">2024</SelectItem>
                    <SelectItem value="2023" className="text-black">2023</SelectItem>
                    <SelectItem value="2022" className="text-black">2022</SelectItem>
                    <SelectItem value="2021" className="text-black">2021</SelectItem>
                    <SelectItem value="2020" className="text-black">2020</SelectItem>
                    <SelectItem value="2019" className="text-black">2019</SelectItem>
                    <SelectItem value="2018" className="text-black">2018</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={data.manufacturer} onValueChange={(value) => setData({...data, manufacturer: value, model: ''})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50 max-h-60">
                    {Object.entries(currentDatabase.manufacturers).map(([key, manufacturer]) => (
                      <SelectItem key={key} value={key} className="text-black">{manufacturer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={data.model} onValueChange={(value) => setData({...data, model: value})} disabled={!data.manufacturer}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    {currentManufacturer?.models.map((model) => (
                      <SelectItem key={model} value={model.toLowerCase().replace(/\s+/g, '-')} className="text-black">{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={data.variant} onValueChange={(value) => setData({...data, variant: value})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    <SelectItem value="aspire-mt" className="text-black">Aspire MT</SelectItem>
                    <SelectItem value="aspire-at" className="text-black">Aspire AT</SelectItem>
                    <SelectItem value="titanium" className="text-black">Titanium</SelectItem>
                    <SelectItem value="ambiente" className="text-black">Ambiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="efficiency" className="text-[#e5e1d8] font-semibold uppercase block mb-3">
                OR ENTER EFFICIENCY
              </Label>
              <div className="flex gap-2">
                <Input
                  id="efficiency"
                  type="number"
                  placeholder="155.2356"
                  value={data.efficiency}
                  onChange={(e) => setData({...data, efficiency: e.target.value})}
                  className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60 flex-[3]"
                />
                <Select value={data.efficiencyUnit} onValueChange={(value) => setData({...data, efficiencyUnit: value})}>
                  <SelectTrigger className="bg-[#e5e1d8]/20 border-[#e5e1d8]/50 text-[#e5e1d8] flex-[2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e5e1d8] border-[#e5e1d8]/60 z-50">
                    <SelectItem value="g/km" className="text-black">g/km</SelectItem>
                    <SelectItem value="mpg" className="text-black">mpg</SelectItem>
                    <SelectItem value="l/100km" className="text-black">l/100km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-[#e5e1d8] hover:bg-[#e5e1d8]/90 text-black uppercase font-semibold"
          >
            CALCULATE CAR EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-[#e5e1d8]/30 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                CAR TRANSPORTATION FOOTPRINT
              </h3>
              <div className="text-3xl font-bold text-[#e5e1d8] mb-2">{result} tons</div>
              <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
              <p className="text-[#e5e1d8]/60 text-xs mt-2">
                Based on {data.mileage} {data.mileageUnit} with {data.efficiency} {data.efficiencyUnit} efficiency
              </p>
            </div>
          )}

          {geminiAdvice && (
  <div className="text-left bg-white/10 border border-white/20 p-4 rounded-lg text-[#e5e1d8] mt-4 whitespace-pre-line">
    <h4 className="text-lg font-semibold uppercase mb-2">EcoSystem Suggests You To:</h4>
    {geminiAdvice}
  </div>
)}

        </CardContent>
      </Card>
    </div>
  );
};
