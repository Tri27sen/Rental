'use client';
/*
import { FC } from "react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSearchModal from "@/app/hooks/useSeachModal";
import useLoginModal from "@/app/hooks/useLoginModal"; // Make sure this import is correct
import { useCallback } from "react";
//import { User } from "@prisma/client";
import { SafeUser } from "../types/index"

interface LandingHeroProps {
  currentUser?: SafeUser | null
}

const LandingHero: FC<LandingHeroProps> = ({ currentUser }) => {
  console.log(currentUser)
  const router = useRouter();
  const searchModal = useSearchModal();
  const loginModal = useLoginModal();
  //if(currentUser)console.log("landing hero ............")

  const handleSearchProperties = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    console.log("user is logged in ");
    // User is logged in, open search modal
    searchModal.onOpen();
  }, [currentUser, loginModal, searchModal]);
  
  const handleHomeValue = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    
    // User is logged in, redirect to search page
    router.push('/search');
  }, [currentUser, loginModal, router]);

  return (
    <div className="relative h-[800px] mb-8">
      <div className="absolute inset-0 bg-[url('/images/rental2.jpg')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center space-y-8 px-4">
        <div className="flex space-x-4">
          <Button 
            variant="outline"
            className="bg-white/90 hover:bg-white text-black px-8 py-6"
            onClick={handleHomeValue}
          >
            AI RECOMMENDATIONS
          </Button>
          <Button 
            variant="outline"
            className="bg-white/90 hover:bg-white text-black px-8 py-6"
            onClick={handleSearchProperties}
          >
            SEARCH PROPERTIES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
*/
'use client';
import { FC, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSearchModal from "@/app/hooks/useSeachModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "../types/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LandingHeroProps {
  currentUser?: SafeUser | null
}

const LandingHero: FC<LandingHeroProps> = ({ currentUser }) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const loginModal = useLoginModal();
  
  // Images for the slider
  const images = [
    '/images/rental2.jpg',
    '/images/beach1.jpeg',
    '/images/lux3.jpeg',
    '/images/lux2.jpg',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };
  
  const goToSlide = (slideIndex:number) => {
    setCurrentIndex(slideIndex);
  };

  const handleSearchProperties = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    console.log("user is logged in ");
    // User is logged in, open search modal
    searchModal.onOpen();
  }, [currentUser, loginModal, searchModal]);
  
  const handleHomeValue = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    
    // User is logged in, redirect to search page
    router.push('/recommendations');
  }, [currentUser, loginModal, router]);

  return (
    <div className="relative h-[800px] mb-8 overflow-hidden">
      {/* Image Slider */}
      {images.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full z-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full z-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center space-y-8 px-4 z-10">
        <div className="flex space-x-4">
          <Button 
            variant="outline"
            className="bg-white/90 hover:bg-white text-black px-8 py-6"
            onClick={handleHomeValue}
          >
            AI RECOMMENDATIONS
          </Button>
          <Button 
            variant="outline"
            className="bg-white/90 hover:bg-white text-black px-8 py-6"
            onClick={handleSearchProperties}
          >
            SEARCH PROPERTIES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
