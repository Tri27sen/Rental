// FilterAndGridSections.tsx

"use client"
import React, { useState } from 'react';
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Filter, 
  Globe, 
  Zap, 
  Star,
  Heart,
  Utensils,
  Waves,
  Tent,
  Mountain,
  Camera,
  Wine,
  Bike,
  Ship,
  Compass,
  BrainCircuit,
  Bot,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
//import { toast } from "@/components/ui/use-toast";
import { toast } from "sonner";
const FilterAndGridSections: React.FC = () => {
  // State for filters and preferences
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(null);
 // import { useToast } from "@/components/ui/use-toast";

  const toggleFavorite = (id: string) => {
    if (favoriteItems.includes(id)) {
      setFavoriteItems(favoriteItems.filter(item => item !== id));
    } else {
      setFavoriteItems([...favoriteItems, id]);
    }
  };

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(item => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Sample AI responses for the cards
  const aiResponses = [
    {
      id: "ai1",
      title: "Travel Itinerary Generator",
      description: "Get a customized travel plan based on your preferences",
      rating: 4.8,
      responseTime: "2s",
      usage: "8.2k users"
    },
    {
      id: "ai2",
      title: "Local Cuisine Expert",
      description: "Discover hidden food gems in any location",
      rating: 4.7,
      responseTime: "1.4s",
      usage: "12.5k users"
    },
    {
      id: "ai3",
      title: "Adventure Planner",
      description: "Find exciting activities for your trip",
      rating: 4.5,
      responseTime: "1.8s",
      usage: "6.9k users"
    },
    {
      id: "ai4",
      title: "Language Assistant",
      description: "Learn essential phrases for your destination",
      rating: 4.9,
      responseTime: "1.2s",
      usage: "15.3k users"
    }
  ];

  // Holiday activities data
  const holidayActivities = [
    { id: "beach", icon: <Waves className="h-8 w-8 mb-2 text-blue-500" />, name: "Beach Day" },
    { id: "hiking", icon: <Mountain className="h-8 w-8 mb-2 text-emerald-600" />, name: "Hiking" },
    { id: "dining", icon: <Utensils className="h-8 w-8 mb-2 text-amber-500" />, name: "Fine Dining" },
    { id: "tours", icon: <Compass className="h-8 w-8 mb-2 text-indigo-500" />, name: "Tours" },
    { id: "photos", icon: <Camera className="h-8 w-8 mb-2 text-rose-500" />, name: "Photography" },
    { id: "wine", icon: <Wine className="h-8 w-8 mb-2 text-purple-600" />, name: "Wine Tasting" },
    { id: "cycling", icon: <Bike className="h-8 w-8 mb-2 text-green-500" />, name: "Cycling" },
    { id: "cruise", icon: <Ship className="h-8 w-8 mb-2 text-cyan-600" />, name: "Cruises" }
  ];

  // Function to generate content based on selected filters
  const generateContent = async (aiModelId: string) => {
    setGeneratingContent(true);
    
    try {
      const payload = {
        region: selectedRegion,
        priceRange,
        features: selectedFeatures,
        activities: selectedActivities,
        modelId: aiModelId
      };
      
      // Make API call to backend
      const response = await fetch('/api/generate-travel-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate content');
      }
      
      const data = await response.json();
      setGeneratedResponse(data.content);
      
      toast.success("Your personalized travel content has been created successfully!", {
        description: "Content Generated"
      });
    } catch (error) {
      console.error('Error generating content:', error);
      
      // Replace this:
      // toast({
      //   title: "Error",
      //   description: "Failed to generate content. Please try again.",
      //   variant: "destructive",
      // });
      
      // With this:
      toast.error("Failed to generate content. Please try again.", {
        description: "Error"
      });
    } finally {
      
      setGeneratingContent(false);
    }
  };

  // Features list
  const features = [
    "Beachfront", "Mountain view", "Private pool", "Pet friendly", "Ski access"
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-8 my-8">
      {/* Location-Based Filters with fancy elements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <MapPin className="text-indigo-500" />
            Location-Based Filters
          </h2>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={16} />
            Advanced
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Region</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{selectedRegion}</span>
                  <Globe size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["All Regions", "North America", "Europe", "Asia", "Africa", "Oceania", "South America"].map((region) => (
                  <DropdownMenuItem key={region} onClick={() => setSelectedRegion(region)}>
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="pt-4 px-2">
              <Slider 
                defaultValue={[50, 500]}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Popular Features</label>
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <Badge 
                  key={feature}
                  variant="outline" 
                  className={`cursor-pointer transition-colors ${
                    selectedFeatures.includes(feature) 
                      ? "bg-indigo-100 text-indigo-700" 
                      : "bg-white"
                  } hover:bg-indigo-50`}
                  onClick={() => toggleFeature(feature)}
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Holiday Activities Section with fancy elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-100 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <Zap className="text-amber-500" />
            Activities
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {holidayActivities.map((activity) => (
            <Button 
              key={activity.id}
              variant="ghost" 
              className={`flex-col h-24 transition-all ${
                selectedActivities.includes(activity.id) 
                  ? "bg-white shadow-md ring-2 ring-indigo-200" 
                  : "hover:bg-white hover:shadow-md"
              }`}
              onClick={() => toggleActivity(activity.id)}
            >
              {activity.icon}
              <span>{activity.name}</span>
            </Button>
          ))}
        </div>
      </motion.div>
      
      {/* Generated response display */}
      {generatedResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-md border border-indigo-100"
        >
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-medium">Generated Travel Suggestion</h3>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{generatedResponse}</p>
        </motion.div>
      )}
      
      {/* AI Responses Grid with fancy cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiResponses.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <BrainCircuit className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleFavorite(item.id)}
                    className={favoriteItems.includes(item.id) ? "text-rose-500" : "text-gray-400"}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Rating</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center gap-1 text-emerald-500">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">{item.responseTime}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Response</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center gap-1 text-indigo-500">
                      <Bot className="h-4 w-4" />
                      <span className="font-medium">{item.usage}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Users</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  onClick={() => generateContent(item.id)}
                  disabled={generatingContent}
                >
                  {generatingContent ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Suggestion"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
       
      </div>
    </div>
  );
};

export default FilterAndGridSections;