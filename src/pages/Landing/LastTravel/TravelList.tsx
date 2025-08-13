// pages/TravelList.tsx
import React from 'react';
import TravelCard from './TravelCard';

interface TravelData {
  from: {
    code: string;
    city: string;
    airport: string;
    date: string;
    time: string;
  };
  to: {
    code: string;
    city: string;
    airport: string;
    date: string;
    time: string;
  };
  duration: string;
  flightType: string;
  airline: string;
  price: string;
}

// Add custom CSS for hiding scrollbar, drag functionality and animations
const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-grab:active {
    cursor: grabbing;
  }
  .select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 20;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  .animate-dash {
    border-style: dashed;
    animation: dash 2s linear infinite;
    background-image: linear-gradient(to right, #9ca3af 50%, transparent 50%);
    background-size: 10px 2px;
    background-repeat: repeat-x;
    background-position: 0 0;
    animation: moveDash 2s linear infinite;
  }
  @keyframes moveDash {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }
`;

const travelData = [

  {
    from: {
      code: 'IST',
      city: 'Istanbul',
      airport: 'Istanbul Airport',
      date: 'Wed 27 Jan',
      time: '01:00PM',
    },
    to: {
      code: 'ATH',
      city: 'Athens',
      airport: 'Eleftherios Venizelos Airport',
      date: 'Wed 27 Jan',
      time: '02:45PM',
    },
    duration: '1h 45m',
    flightType: 'non-stop',
    airline: 'TURKISH AIRLINES',
    price: '$620',
  },
  {
    from: {
      code: 'MAD',
      city: 'Madrid',
      airport: 'Barajas Airport',
      date: 'Thu 28 Jan',
      time: '06:45AM',
    },
    to: {
      code: 'ROM',
      city: 'Rome',
      airport: 'Fiumicino Airport',
      date: 'Thu 28 Jan',
      time: '08:30AM',
    },
    duration: '1h 45m',
    flightType: 'non-stop',
    airline: 'IBERIA',
    price: '$740',
  },
  {
    from: {
      code: 'DXB',
      city: 'Dubai',
      airport: 'Dubai International Airport',
      date: 'Fri 29 Jan',
      time: '11:00PM',
    },
    to: {
      code: 'DEL',
      city: 'Delhi',
      airport: 'Indira Gandhi International Airport',
      date: 'Sat 30 Jan',
      time: '03:15AM',
    },
    duration: '3h 45m',
    flightType: 'non-stop',
    airline: 'EMIRATES',
    price: '$980',
  },
];


export default function TravelList() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-4 shadow-2xl border border-white/30">
      {/* Header */}
      {/* Scrollable Travel Cards Container */}
      <div className="relative overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory cursor-grab select-none" 
          style={{scrollbarWidth: 'none', msOverflowStyle: 'none', width: '100%'}}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {travelData.map((travel, index) => (
            <div 
              key={index}
              className="flex-shrink-0 snap-start transform transition-all duration-500 hover:scale-[1.02]"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <TravelCard {...travel} />
            </div>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white/30 to-transparent w-8 h-full pointer-events-none rounded-l-3xl"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white/30 to-transparent w-8 h-full pointer-events-none rounded-r-3xl"></div>
      </div>


     </div>
     </>
   );
 }
