import React from 'react';

interface TabBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

function TabBar({ activeTab = 'home', onTabChange }: TabBarProps) {
  const tabs = [
    {
      id: 'home',
      label: 'خانه',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'travel',
      label: 'سفر',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: 'search',
      label: 'جستجو',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'پروفایل',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'menu',
      label: 'منو',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient overlay for smooth transition */}
      <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
      
      {/* Main TabBar */}
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-3">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 transform
                  ${isActive 
                    ? 'bg-gradient-to-br from-[#11354D] to-[#1e5a7a] text-white scale-110 shadow-lg' 
                    : 'text-gray-600 hover:text-[#11354D] hover:bg-gray-100/50 active:scale-95'
                  }
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Icon */}
                <div className={`transition-all duration-300 ${isActive ? 'transform -translate-y-1' : ''}`}>
                  {tab.icon}
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium mt-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {tab.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
                
                {/* Ripple effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10' : 'bg-transparent'}`}></div>
              </button>
            );
          })}
        </div>
        
        {/* Bottom safe area for devices with home indicator */}
        <div className="h-2 bg-white/95"></div>
      </div>
    </div>
  );
}

export default TabBar;