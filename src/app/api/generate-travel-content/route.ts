// app/api/generate-travel-content/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

//const apiKey = process.env.GEMINI_API_KEY!;
const apiKey = "AIzaSyCmB76EFfe0GOlEY5Yoklu3a9T9vFKveCM";
//const apiKey ="AIzaSyATfWtJDW2gqdyW6aeTEwM4fzbN-Ktt6BE";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { region, priceRange, features, activities, modelId } = await req.json();
    
    // Log the received data
    console.log('Received generation request:', {
      region,
      priceRange,
      features,
      activities,
      modelId
    });
    
    // Construct a detailed prompt based on the user's selections
    const prompt = `
      Generate a personalized travel suggestion with the following details:
      
      Region: ${region !== 'All Regions' ? region : 'A global destination of your choice'}
      Budget Range: $${priceRange[0]} - $${priceRange[1]}
      Preferred Features: ${features.length > 0 ? features.join(', ') : 'No specific features selected'}
      Desired Activities: ${activities.length > 0 ? activities.join(', ') : 'No specific activities selected'}
      
      Format the response with emoji icons and sections for:
      1. Destination recommendation (be specific with city/region)
      2. Best time to visit
      3. Accommodation suggestions that match the selected features
      4. Activity recommendations based on selected activities
      5. Budget breakdown (accommodation, food, activities, transportation)
      6. One unique local experience that travelers shouldn't miss
      
      Keep the response concise but informative, around 250-300 words total.
    `;
    
    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    
    // Generate content
    const result = await model.generateContent(prompt);
    
    if (result.response.text) {
      const suggestion = result.response.text();
      console.log("Travel suggestion generated successfully");
      return NextResponse.json({ content: suggestion });
    } else {
      // Fallback response if generation fails
      console.log("Using fallback travel suggestion");
      return NextResponse.json({ 
        content: generateFallbackSuggestion(region, priceRange, features, activities) 
      });
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Extract error details if available
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    // Return fallback suggestion in case of any error
    return NextResponse.json({ 
      content: "We're sorry, but we couldn't generate a travel suggestion at this time. Please try again later."
    });
  }
}

// Generate a fallback suggestion when the API fails
function generateFallbackSuggestion(
  region: string, 
  priceRange: number[], 
  features: string[], 
  activities: string[]
): string {
  const regionText = region !== 'All Regions' ? region : 'your preferred destination';
  const featuresText = features.length > 0 
    ? `accommodations with ${features.join(' and ')}` 
    : 'comfortable accommodations';
  
  const activitiesMapping: Record<string, string> = {
    beach: "relaxing beach days",
    hiking: "scenic hiking trails",
    dining: "exquisite dining experiences",
    tours: "guided local tours",
    photos: "photography opportunities",
    wine: "wine tasting excursions",
    cycling: "cycling adventures",
    cruise: "scenic cruises"
  };
  
  const activitiesText = activities.length > 0 
    ? activities.map(act => activitiesMapping[act] || act).join(', ') 
    : 'exploring local attractions';
  
  return `
🌍 **Destination Recommendation**
Consider exploring ${regionText} for your next adventure!

⏰ **Best Time to Visit**
Spring or fall typically offers the best balance of good weather and smaller crowds.

🏨 **Accommodation**
Look for ${featuresText} within your budget range of $${priceRange[0]}-$${priceRange[1]}.

🎯 **Activities**
Your trip can include ${activitiesText} based on your preferences.

💰 **Budget Breakdown**
- Accommodation: ~40% of your budget
- Food & Dining: ~25% of your budget
- Activities & Excursions: ~20% of your budget
- Transportation: ~15% of your budget

✨ **Don't Miss Experience**
Whatever destination you choose, try to connect with locals for authentic experiences beyond the typical tourist attractions.
  `;
}