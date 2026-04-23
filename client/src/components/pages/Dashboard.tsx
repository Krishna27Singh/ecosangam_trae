import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Car, Home, Plane, Utensils, Globe, Target, Zap, Loader2, Plus, Calendar, CheckCircle, Leaf, Bike, Recycle, TreePine, Droplets, Sun, Battery, ShoppingBag, Trash2, Crown, Star, Sparkles, CloudRain, Lightbulb, PackageCheck, ThermometerSun, Footprints, Droplet } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '../../context/AuthContext';


// Enhanced Streak Card Component
const StreakCard = ({ goal }) => {
  const today = new Date();
  const startDate = new Date(goal.createdAt || today);
  const days = [];
  
  // Generate array of dates for the goal duration
  for (let i = 0; i < goal.days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  // Check if a day has activities
  const hasActivityOnDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return goal.activities.some(activity => activity.date === dateStr);
  };

  // Check if day is past, current, or future
  const getDayStatus = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    
    if (dateStr < todayStr) return 'past';
    if (dateStr === todayStr) return 'today';
    return 'future';
  };

  // Calculate streak statistics
  const completedDays = goal.activities.filter(a => {
    const uniqueDates = [...new Set(goal.activities.map(act => act.date))];
    return uniqueDates.includes(a.date);
  }).length;
  
  const streakPercentage = (completedDays / goal.days) * 100;
  const isCompleted = goal.progress >= goal.target;

  return (
    <div className={`relative overflow-hidden rounded-xl p-5 ${
      isCompleted 
        ? 'bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 border-2 border-green-400/50' 
        : 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 border border-white/20'
    } backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}>
      
      {/* Completion Crown */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 animate-pulse">
            <Crown className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            isCompleted ? 'bg-green-500/20' : 'bg-blue-500/20'
          }`}>
            <Sparkles className={`w-4 h-4 ${
              isCompleted ? 'text-green-400' : 'text-blue-400'
            }`} />
          </div>
          <div>
            <h4 className="text-[#e5e1d8] font-bold text-sm uppercase tracking-wider">
              {goal.days}-Day Challenge
            </h4>
            <p className={`text-xs font-medium ${
              isCompleted ? 'text-green-400' : 'text-blue-400'
            }`}>
              {isCompleted ? 'COMPLETED!' : 'IN PROGRESS'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${
            isCompleted ? 'text-green-400' : 'text-[#e5e1d8]'
          }`}>
            {completedDays}/{goal.days}
          </div>
          <div className="text-xs text-[#e5e1d8] opacity-60 uppercase">
            Days
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={isCompleted ? '#10b981' : '#3b82f6'}
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - streakPercentage / 100)}`}
              className="transition-all duration-500 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${
              isCompleted ? 'text-green-400' : 'text-blue-400'
            }`}>
              {Math.round(streakPercentage)}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {days.map((date, index) => {
          const hasActivity = hasActivityOnDay(date);
          const dayStatus = getDayStatus(date);
          const dayNumber = index + 1;
          
          return (
            <div
              key={index}
              className={`
                relative w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                transition-all duration-200 hover:scale-110
                ${hasActivity 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30' 
                  : dayStatus === 'today' 
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white ring-2 ring-blue-300/50 shadow-lg shadow-blue-500/30' 
                    : dayStatus === 'past'
                      ? 'bg-white/10 text-[#e5e1d8] opacity-50'
                      : 'bg-white/5 text-[#e5e1d8] opacity-30 hover:opacity-60'
                }
              `}
            >
              {hasActivity ? (
                <CheckCircle className="w-4 h-4" />
              ) : dayStatus === 'today' ? (
                <Star className="w-4 h-4" />
              ) : (
                dayNumber
              )}
              
              {/* Completion sparkle effect */}
              {hasActivity && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Status Message */}
      <div className="text-center">
        {isCompleted ? (
          <div className="space-y-2">
            <p className="text-green-400 text-sm font-bold uppercase tracking-wide flex items-center justify-center">
              <Crown className="w-4 h-4 mr-2" />
              Challenge Completed! 
              <Crown className="w-4 h-4 ml-2" />
            </p>
            <p className="text-green-300 text-xs opacity-80">
              Outstanding dedication to sustainability! 🌟
            </p>
          </div>
        ) : completedDays > 0 ? (
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wide">
            Keep the momentum going! 💪
          </p>
        ) : (
          <p className="text-[#e5e1d8] text-sm opacity-60 uppercase">
            Start your journey today! 🚀
          </p>
        )}
      </div>

      {/* Animated background glow */}
      {isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const { user, isLoggedIn, logout } = useAuth();
  console.log(user);

  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [sustainabilityTip, setSustainabilityTip] = useState('');

  // EcoGoals state with localStorage persistence
  const [ecoGoals, setEcoGoals] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('ecoGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setEcoGoals(parsedGoals);
      } catch (error) {
        console.error('Error loading saved goals:', error);
        localStorage.removeItem('ecoGoals'); // Clear corrupted data
      }
    }
  }, []);

  // Save data to localStorage whenever ecoGoals changes
  useEffect(() => {
    if (ecoGoals.length > 0) {
      localStorage.setItem('ecoGoals', JSON.stringify(ecoGoals));
    }
  }, [ecoGoals]);

  // Function to calculate carbon saved based on goal type and progress
  const calculateCarbonSaved = (goal) => {
    const carbonSavingsMap = {
      carbon: goal.progress, // Direct carbon reduction
      bicycle: goal.progress * 0.15, // ~0.15 kg CO2 per km by bike vs car
      plants: goal.progress * 22, // ~22 kg CO2 absorbed per plant per year
      recycle: goal.progress * 0.5, // ~0.5 kg CO2 saved per recycled item
      water: goal.progress * 0.0003, // ~0.0003 kg CO2 per liter water saved
      energy: goal.progress * 0.5, // ~0.5 kg CO2 per kWh saved
      waste: goal.progress * 2, // ~2 kg CO2 per waste item avoided
      solar: goal.progress * 3, // ~3 kg CO2 per day of renewable energy
      reusable: goal.progress * 1, // ~1 kg CO2 per reusable item
      shortshowers: goal.progress * 0.01, // ~0.01 kg CO2 per minute water saved
      lessmeat: goal.progress * 2.5, // ~2.5 kg CO2 per meat meal avoided
      compost: goal.progress * 0.8, // ~0.8 kg CO2 per kg composted
      publictransport: goal.progress * 0.12, // ~0.12 kg CO2 per km public transport vs car
      coldwash: goal.progress * 0.6, // ~0.6 kg CO2 per cold wash load
      ecopackaging: goal.progress * 0.3, // ~0.3 kg CO2 per eco package vs conventional
      energyefficient: goal.progress * 1.5, // ~1.5 kg CO2 per efficient device
      collectrainwater: goal.progress * 0.0002, // ~0.0002 kg CO2 per liter rainwater collected
      custom: goal.progress * 0.5 // Default estimate for custom goals
    };
    
    return carbonSavingsMap[goal.type] || goal.progress * 0.5;
  };

  // Function to calculate streak (number of unique days with activities)
  const calculateStreak = (goal) => {
    const uniqueDates = [...new Set(goal.activities.map(activity => activity.date))];
    return uniqueDates.length;
  };

  // Function to send completion notification to backend
  const sendCompletionNotification = async (goal, completionDate) => {
    try {
      const backendUri = import.meta.env.VITE_BACKEND_URI;
      if (!backendUri) {
        console.warn('Backend URI not configured, skipping completion notification');
        return;
      }

      const carbonSaved = calculateCarbonSaved(goal);
      const streak = calculateStreak(goal);

      const payload = {
        name: user.name,
        email: user.email,
        startDate: goal.createdAt,
        endDate: completionDate,
        carbonSaved: parseFloat(carbonSaved.toFixed(2)),
        streak: streak
      };

      console.log('Sending completion notification with payload:', payload);

      await fetch(`${backendUri}/completedecogoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error sending completion notification:', error);
      // Don't show error to user, just log it
    }
  };

  // Function to check and handle goal completion
  const checkGoalCompletion = (updatedGoal, originalGoal) => {
    const wasCompleted = originalGoal.progress >= originalGoal.target;
    const isNowCompleted = updatedGoal.progress >= updatedGoal.target;

    if (!wasCompleted && isNowCompleted) {
      // Goal just completed!
      const completionDate = new Date().toISOString();
      
      // Update goal with completion status
      updatedGoal.completedAt = completionDate;
      updatedGoal.isCompleted = true;

      // Send completion notification to backend
      sendCompletionNotification(updatedGoal, completionDate);

      // Show celebration toast
      toast.success(
        `🎉 CONGRATULATIONS! You've completed your goal: "${updatedGoal.title}"! 
        Outstanding dedication to sustainability! 🌟`,
        {
          duration: 6000,
        }
      );
    }

    return updatedGoal;
  };

  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [selectedGoalForActivity, setSelectedGoalForActivity] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'carbon',
    target: '',
    days: '',
    customType: ''
  });
  const [newActivity, setNewActivity] = useState({
    activity: '',
    impact: '',
    customActivity: ''
  });

  const monthlyEmissions = [
    { month: 'Jan', emissions: 2.4 },
    { month: 'Feb', emissions: 2.1 },
    { month: 'Mar', emissions: 2.8 },
    { month: 'Apr', emissions: 2.3 },
    { month: 'May', emissions: 1.9 },
    { month: 'Jun', emissions: 2.0 },
  ];

  const categories = [
    { name: 'Transportation', icon: Car, emissions: 1.2, percentage: 45, color: 'text-blue-400' },
    { name: 'Food', icon: Utensils, emissions: 0.8, percentage: 30, color: 'text-green-400' },
    { name: 'Home Energy', icon: Home, emissions: 0.5, percentage: 18, color: 'text-purple-400' },
    { name: 'Purchases', icon: Zap, emissions: 0.2, percentage: 7, color: 'text-orange-400' },
  ];

  const standardGoalTypes = [
    { value: 'carbon', label: 'Reduce Carbon Footprint', unit: 'kg CO₂', icon: Leaf },
    { value: 'plants', label: 'Grow Plants', unit: 'plants', icon: TreePine },
    { value: 'bicycle', label: 'Travel by Bicycle', unit: 'km', icon: Bike },
    { value: 'recycle', label: 'Recycle Items', unit: 'items', icon: Recycle },
    { value: 'water', label: 'Save Water', unit: 'liters', icon: Droplets },
    { value: 'energy', label: 'Save Energy', unit: 'kWh', icon: Battery },
    { value: 'waste', label: 'Reduce Waste', unit: 'items', icon: Trash2 },
    { value: 'solar', label: 'Use Renewable Energy', unit: 'days', icon: Sun },
    { value: 'reusable', label: 'Use Reusable Products', unit: 'items', icon: ShoppingBag },
    { value: 'custom', label: 'Custom Goal', unit: '', icon: Target },
    { value: 'shortshowers', label: 'Take Short Showers', unit: 'minutes saved', icon: Droplet },
    { value: 'lessmeat', label: 'Reduce Meat Consumption', unit: 'meals', icon: Utensils },
    { value: 'compost', label: 'Compost Waste', unit: 'kg', icon: Trash2 },
    { value: 'publictransport', label: 'Use Public Transport', unit: 'km', icon: Footprints },
    { value: 'coldwash', label: 'Use Cold Water for Washing', unit: 'loads', icon: ThermometerSun },
    { value: 'ecopackaging', label: 'Buy Eco-Friendly Products', unit: 'items', icon: PackageCheck },
    { value: 'energyefficient', label: 'Use Energy Efficient Devices', unit: 'devices', icon: Lightbulb },
    { value: 'collectrainwater', label: 'Collect Rainwater', unit: 'liters', icon: CloudRain },

  ]; 

  const standardActivities = {
    shortshowers: [
  { label: 'Took a 5-minute shower', impact: 30 },
  { label: 'Used a low-flow showerhead', impact: 20 },
  { label: 'Turned off water while shampooing', impact: 15 },
  { label: 'Skipped shower today', impact: 50 },
  { label: 'Showered with a bucket instead of tap', impact: 25 }
],

lessmeat: [
  { label: 'Ate a vegetarian meal', impact: 2 },
  { label: 'Ate a vegan meal', impact: 3 },
  { label: 'Avoided beef in one meal', impact: 4 },
  { label: 'Had a meat-free day', impact: 5 },
  { label: 'Cooked a plant-based recipe', impact: 2.5 }
],

compost: [
  { label: 'Composted kitchen scraps', impact: 0.5 },
  { label: 'Started a compost bin', impact: 1.0 },
  { label: 'Used compost in garden', impact: 0.4 },
  { label: 'Separated wet and dry waste', impact: 0.3 },
  { label: 'Taught someone to compost', impact: 0.6 }
],

publictransport: [
  { label: 'Took the metro instead of car', impact: 1.0 },
  { label: 'Used the bus for commuting', impact: 0.8 },
  { label: 'Avoided driving for the day', impact: 2.0 },
  { label: 'Used shared mobility (e.g. cabpool)', impact: 0.6 },
  { label: 'Walked to the station or stop', impact: 0.3 }
],

coldwash: [
  { label: 'Used cold water for washing clothes', impact: 1.2 },
  { label: 'Reduced washing machine cycles', impact: 1.0 },
  { label: 'Used eco mode on washing machine', impact: 1.5 },
  { label: 'Did full load instead of half', impact: 0.8 },
  { label: 'Air-dried clothes instead of using dryer', impact: 2.0 }
],

ecopackaging: [
  { label: 'Bought product with eco packaging', impact: 0.5 },
  { label: 'Avoided single-use packaging', impact: 0.4 },
  { label: 'Reused boxes or containers', impact: 0.3 },
  { label: 'Chose plastic-free groceries', impact: 0.6 },
  { label: 'Refilled old containers', impact: 0.5 }
],

energyefficient: [
  { label: 'Replaced bulb with LED', impact: 2.0 },
  { label: 'Used energy-efficient appliance', impact: 1.5 },
  { label: 'Turned off appliances not in use', impact: 1.0 },
  { label: 'Enabled power-saving mode', impact: 0.7 },
  { label: 'Unplugged chargers overnight', impact: 0.5 }
],

collectrainwater: [
  { label: 'Collected rainwater in a bucket', impact: 10 },
  { label: 'Used rainwater for watering plants', impact: 5 },
  { label: 'Washed car with rainwater', impact: 8 },
  { label: 'Installed a rain barrel', impact: 20 },
  { label: 'Harvested rooftop rainwater', impact: 25 }
],

    carbon: [
      { label: 'Biked to work', impact: 0.5 },
      { label: 'Used public transport', impact: 0.8 },
      { label: 'Worked from home', impact: 1.2 },
      { label: 'Carpooled', impact: 0.3 },
      { label: 'Used renewable energy', impact: 1.0 },
      { label: 'Walked instead of driving', impact: 0.4 },
      { label: 'Electric vehicle usage', impact: 1.5 }
    ],
    plants: [
      { label: 'Planted seeds', impact: 1 },
      { label: 'Watered plants', impact: 0 },
      { label: 'Added compost', impact: 0 },
      { label: 'Transplanted seedlings', impact: 2 },
      { label: 'Started herb garden', impact: 3 },
      { label: 'Planted tree sapling', impact: 1 }
    ],
    bicycle: [
      { label: 'Commute to work', impact: 10 },
      { label: 'Grocery shopping', impact: 5 },
      { label: 'Leisure ride', impact: 15 },
      { label: 'Errands around town', impact: 8 },
      { label: 'Weekend long ride', impact: 25 },
      { label: 'School pickup/drop', impact: 6 }
    ],
    recycle: [
      { label: 'Recycled plastic bottles', impact: 5 },
      { label: 'Recycled paper', impact: 3 },
      { label: 'Recycled electronics', impact: 1 },
      { label: 'Composted organic waste', impact: 2 },
      { label: 'Recycled glass containers', impact: 4 },
      { label: 'Recycled cardboard', impact: 2 }
    ],
    water: [
      { label: 'Shorter shower', impact: 10 },
      { label: 'Fixed leaky faucet', impact: 50 },
      { label: 'Collected rainwater', impact: 20 },
      { label: 'Used water-efficient appliances', impact: 30 },
      { label: 'Turned off tap while brushing', impact: 5 },
      { label: 'Full dishwasher loads only', impact: 15 }
    ],
    energy: [
      { label: 'Switched to LED bulbs', impact: 2 },
      { label: 'Unplugged unused devices', impact: 1 },
      { label: 'Used natural light', impact: 0.5 },
      { label: 'Adjusted thermostat', impact: 3 },
      { label: 'Air-dried clothes', impact: 2.5 },
      { label: 'Used energy-efficient appliances', impact: 4 }
    ],
    waste: [
      { label: 'Avoided single-use packaging', impact: 3 },
      { label: 'Brought reusable bags', impact: 2 },
      { label: 'Refused plastic straws', impact: 1 },
      { label: 'Used refillable water bottle', impact: 1 },
      { label: 'Composted food scraps', impact: 2 },
      { label: 'Donated instead of throwing away', impact: 3 }
    ],
    solar: [
      { label: 'Used solar panels', impact: 1 },
      { label: 'Solar water heating', impact: 1 },
      { label: 'Solar garden lights', impact: 1 },
      { label: 'Solar phone charger', impact: 1 },
      { label: 'Community solar program', impact: 1 }
    ],
    reusable: [
      { label: 'Used reusable shopping bags', impact: 1 },
      { label: 'Used reusable water bottle', impact: 1 },
      { label: 'Used reusable food containers', impact: 1 },
      { label: 'Used reusable coffee cup', impact: 1 },
      { label: 'Used cloth napkins', impact: 1 },
      { label: 'Used rechargeable batteries', impact: 1 }
    ]
  };

  const fetchSustainabilityTip = async () => {
    setIsLoadingTip(true);
    try {
      const backendUri = import.meta.env.VITE_BACKEND_URI;
      if (!backendUri) {
        throw new Error('Backend URI not configured');
      }

      const response = await fetch(`${backendUri}/api/tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Give me one detailed, everyday sustainability tip that is practical and easy to follow. The tip should not be concise—explain the reasoning behind it, how it positively impacts the environment, and offer actionable steps to implement it in daily life. Keep the response clear, educational, and under 100 words. Avoid technical jargon. This is meant for a general audience trying to adopt eco-friendly habits.'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sustainability tip');
      }

      const data = await response.json();
      setSustainabilityTip(data.tip || data.response || 'No tip received');
      toast.success('New sustainability tip generated!');
    } catch (error) {
      console.error('Error fetching sustainability tip:', error);
      toast.error('Failed to get sustainability tip. Please try again.');
    } finally {
      setIsLoadingTip(false);
    }
  };

  const handleCreateGoal = () => {
    // Fix validation logic - different checks for custom vs standard goals
    if (newGoal.type === 'custom') {
      if (!newGoal.title || !newGoal.target || !newGoal.days) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else {
      if (!newGoal.target || !newGoal.days) {
        toast.error('Please fill in all required fields');
        return;
      }
    }

    const goalType = standardGoalTypes.find(type => type.value === newGoal.type);
    const goal = {
      id: Date.now(),
      title: newGoal.type === 'custom' ? newGoal.title : `${goalType.label} by ${newGoal.target}`,
      type: newGoal.type === 'custom' ? newGoal.customType : newGoal.type,
      target: parseFloat(newGoal.target),
      unit: newGoal.type === 'custom' ? 'units' : goalType.unit,
      days: parseInt(newGoal.days),
      progress: 0,
      activities: [],
      icon: goalType.icon,
      createdAt: new Date().toISOString(),
      color: goalType.value === 'carbon' ? 'text-green-400' : 
             goalType.value === 'plants' ? 'text-green-500' : 
             goalType.value === 'bicycle' ? 'text-blue-400' :
             goalType.value === 'water' ? 'text-blue-500' :
             goalType.value === 'energy' ? 'text-yellow-400' :
             goalType.value === 'waste' ? 'text-red-400' :
             goalType.value === 'solar' ? 'text-orange-400' :
             goalType.value === 'reusable' ? 'text-purple-400' : 'text-gray-400'
    };

    // Check if goal is completed upon creation (unlikely but possible)
    const goalWithCompletion = checkGoalCompletion(goal, { progress: -1, target: goal.target });

    setEcoGoals([...ecoGoals, goalWithCompletion]);
    setNewGoal({ title: '', type: 'carbon', target: '', days: '', customType: '' });
    setIsCreateGoalOpen(false);
    toast.success('Eco goal created successfully!');
  };

  const handleLogActivity = () => {
    if ((!newActivity.activity && !newActivity.customActivity) || !newActivity.impact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const activityName = newActivity.customActivity || newActivity.activity;
    const impactValue = parseFloat(newActivity.impact);
    const today = new Date().toISOString().split('T')[0];
    
    const updatedGoals = ecoGoals.map(goal => {
      if (goal.id === selectedGoalForActivity.id) {
        const newProgress = Math.min(goal.progress + impactValue, goal.target);
        const hasActivityToday = goal.activities.some(a => a.date === today);
        
        const updatedGoal = {
          ...goal,
          progress: newProgress,
          activities: [...goal.activities, {
            date: today,
            activity: activityName,
            impact: impactValue
          }]
        };

        // Check for goal completion and handle it
        const goalWithCompletion = checkGoalCompletion(updatedGoal, goal);

        // Congratulate user if this is their first activity today
        if (!hasActivityToday) {
          toast.success(`🎉 Day completed! Keep up the great work on your ${goal.title}!`);
        }

        return goalWithCompletion;
      }
      return goal;
    });

    setEcoGoals(updatedGoals);
    setNewActivity({ activity: '', impact: '', customActivity: '' });
    setIsLogActivityOpen(false);
    setSelectedGoalForActivity(null);
    toast.success('Activity logged successfully!');
  };

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">YOUR CARBON DASHBOARD</h1>
          <p className="text-[#e5e1d8] text-lg opacity-90 uppercase">TRACK YOUR ENVIRONMENTAL IMPACT AND PROGRESS</p>
        </div>

        {/* AI Sustainability Tip Section */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
              <Target className="w-5 h-5 mr-2" />
              AI SUSTAINABILITY COACH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchSustainabilityTip}
              disabled={isLoadingTip}
              className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide mb-4"
            >
              {isLoadingTip ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  GETTING TIP...
                </>
              ) : (
                'GET AI BASED SUSTAINABILITY TIP'
              )}
            </Button>
            {sustainabilityTip && (
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-[#e5e1d8] leading-relaxed">{sustainabilityTip}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily/Weekly Carbon Footprint */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
              
              🌍 YOUR DAILY CARBON FOOTPRINT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">3.2 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ TODAY</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm uppercase">↓ 0.3kg from yesterday</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">19.8 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ THIS WEEK</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-blue-400 text-sm uppercase">↑ 1.2kg from last week</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingUp className="w-5 h-5 mr-2" />
                MONTHLY TOTAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300 mb-2 uppercase">2.8 TONS</div>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ EQUIVALENT THIS MONTH</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingDown className="w-5 h-5 mr-2 text-blue-400" />
                VS LAST MONTH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2 uppercase">-12%</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE IMPROVING!</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">GLOBAL AVERAGE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#e5e1d8] mb-2 uppercase">4.1 TONS</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE 32% BELOW AVERAGE</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Emissions by Category */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">
                📊 EMISSIONS BY CATEGORY
              </CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">BREAKDOWN OF YOUR CARBON FOOTPRINT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        <span className="text-sm font-medium text-[#e5e1d8] uppercase">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              category.color === 'text-blue-400' ? 'bg-blue-400' :
                              category.color === 'text-green-400' ? 'bg-green-400' :
                              category.color === 'text-purple-400' ? 'bg-purple-400' : 'bg-orange-400'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#e5e1d8] w-16 uppercase">{category.percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Text-based accessibility summary */}
              <div className="mt-4 p-3 bg-white/10 rounded border border-white/20">
                <p className="text-[#e5e1d8] text-sm">
                  <span className="font-semibold uppercase">Summary:</span> Transportation: 45%, Food: 30%, Energy: 18%, Purchases: 7%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">MONTHLY TREND</CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">YOUR CARBON EMISSIONS OVER TIME</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEmissions.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#e5e1d8] uppercase">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(month.emissions / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-green-300 w-16 uppercase">{month.emissions}T</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ECO GOALS SECTION - SINGLE COLUMN WITH STREAK CARDS */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  🎯 YOUR ECO GOALS
                </CardTitle>
                <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">SET AND TRACK YOUR SUSTAINABILITY GOALS</CardDescription>
              </div>
              <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide">
                    <Plus className="w-4 h-4 mr-2" />
                    ADD GOAL
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border border-white/20 text-[#e5e1d8]">
                  <DialogHeader>
                    <DialogTitle className="text-[#e5e1d8] uppercase">CREATE NEW ECO GOAL</DialogTitle>
                    <DialogDescription className="text-[#e5e1d8] opacity-80">
                      Set a new sustainability goal to track your progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Goal Type</label>
                      <select 
                        value={newGoal.type}
                        onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                        className="w-full mt-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[#e5e1d8]"
                      >
                        {standardGoalTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-black text-[#e5e1d8]">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {newGoal.type === 'custom' && (
                      <div>
                        <label className="text-sm font-medium text-[#e5e1d8] uppercase">Custom Goal Title</label>
                        <Input
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                          placeholder="Enter your custom goal"
                          className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Target Amount</label>
                      <Input
                        type="number"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                        placeholder="Enter target amount"
                        className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Days to Complete</label>
                      <Input
                        type="number"
                        value={newGoal.days}
                        onChange={(e) => setNewGoal({...newGoal, days: e.target.value})}
                        placeholder="Enter number of days"
                        className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreateGoal} className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold">
                        CREATE GOAL
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateGoalOpen(false)} className="border-white/20 text-[#e5e1d8] hover:bg-white/10">
                        CANCEL
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {ecoGoals.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-[#e5e1d8] opacity-50 mx-auto mb-4" />
                <h3 className="text-[#e5e1d8] text-xl font-semibold uppercase mb-2">NO ECO GOALS CURRENTLY</h3>
                <p className="text-[#e5e1d8] opacity-80 uppercase text-sm mb-6">Click "Add Goal" to create your first sustainability goal</p>
                <div className="flex justify-center">
                  <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide">
                        <Plus className="w-4 h-4 mr-2" />
                        CREATE YOUR FIRST GOAL
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {ecoGoals.map((goal) => {
                  const Icon = goal.icon;
                  const progressPercentage = (goal.progress / goal.target) * 100;
                  return (
                    <div key={goal.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg">
                      {/* Goal Details - Left Side */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="text-[#e5e1d8] font-semibold uppercase text-sm">{goal.title}</h3>
                              <p className="text-[#e5e1d8] opacity-60 text-xs uppercase">{goal.days} days goal</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedGoalForActivity(goal);
                              setIsLogActivityOpen(true);
                            }}
                            className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase text-xs font-semibold"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            LOG
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#e5e1d8] opacity-80 uppercase">Progress</span>
                            <span className="text-[#e5e1d8] font-semibold uppercase">
                              {goal.progress} / {goal.target} {goal.unit}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2 bg-white/10" />
                          <div className="text-center">
                            <span className={`text-lg font-bold ${progressPercentage >= 100 ? 'text-green-400' : 'text-[#e5e1d8]'} uppercase`}>
                              {Math.round(progressPercentage)}% COMPLETE
                            </span>
                          </div>
                        </div>

                        {goal.activities.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <h4 className="text-[#e5e1d8] font-semibold text-xs uppercase mb-2">Recent Activities</h4>
                            <div className="space-y-1 max-h-20 overflow-y-auto">
                              {goal.activities.slice(-3).map((activity, idx) => (
                                <div key={idx} className="flex justify-between text-xs">
                                  <span className="text-[#e5e1d8] opacity-80">{activity.activity}</span>
                                  <span className="text-green-400">+{activity.impact} {goal.unit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Streak Card - Right Side */}
                      <div className="lg:col-span-1">
                        <StreakCard goal={goal} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Log Activity Dialog */}
        <Dialog open={isLogActivityOpen} onOpenChange={setIsLogActivityOpen}>
          <DialogContent className="bg-black/90 border border-white/20 text-[#e5e1d8]">
            <DialogHeader>
              <DialogTitle className="text-[#e5e1d8] uppercase">LOG ACTIVITY</DialogTitle>
              <DialogDescription className="text-[#e5e1d8] opacity-80">
                {selectedGoalForActivity && `Log progress for: ${selectedGoalForActivity.title}`}
              </DialogDescription>
            </DialogHeader>
            {selectedGoalForActivity && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#e5e1d8] uppercase">Select Activity</label>
                  <select 
                    value={newActivity.activity}
                    onChange={(e) => {
                      setNewActivity({...newActivity, activity: e.target.value});
                      const selectedStandardActivity = standardActivities[selectedGoalForActivity.type]?.find(a => a.label === e.target.value);
                      if (selectedStandardActivity) {
                        setNewActivity(prev => ({...prev, activity: e.target.value, impact: selectedStandardActivity.impact.toString()}));
                      }
                    }}
                    className="w-full mt-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[#e5e1d8]"
                  >
                    <option value="" className="bg-black text-[#e5e1d8]">Select an activity...</option>
                    {standardActivities[selectedGoalForActivity.type]?.map((activity, idx) => (
                      <option key={idx} value={activity.label} className="bg-black text-[#e5e1d8]">
                        {activity.label} (+{activity.impact} {selectedGoalForActivity.unit})
                      </option>
                    ))}
                    <option value="custom" className="bg-black text-[#e5e1d8]">Custom Activity</option>
                  </select>
                </div>

                {newActivity.activity === 'custom' && (
                  <div>
                    <label className="text-sm font-medium text-[#e5e1d8] uppercase">Custom Activity</label>
                    <Input
                      value={newActivity.customActivity}
                      onChange={(e) => setNewActivity({...newActivity, customActivity: e.target.value})}
                      placeholder="Describe your activity"
                      className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-[#e5e1d8] uppercase">Impact Amount</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newActivity.impact}
                    onChange={(e) => setNewActivity({...newActivity, impact: e.target.value})}
                    placeholder={`Impact in ${selectedGoalForActivity.unit}`}
                    className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleLogActivity} className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold">
                    LOG ACTIVITY
                  </Button>
                  <Button variant="outline" onClick={() => setIsLogActivityOpen(false)} className="border-white/20 text-[#e5e1d8] hover:bg-white/10">
                    CANCEL
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
};

export default Dashboard;