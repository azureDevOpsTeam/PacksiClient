import React, { useState, useEffect } from 'react';
import logo from '../../../assets/images/packsi-Logo.png';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'خانه', href: '#home', icon: '🏠' },
    { name: 'خدمات', href: '#services', icon: '⚡' },
    { name: 'درباره ما', href: '#about', icon: '📋' },
    { name: 'نظرات', href: '#testimonials', icon: '💬' },
    { name: 'تماس', href: '#contact', icon: '📞' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0e2544]/95 backdrop-blur-xl shadow-2xl border-b border-[#39c1ad]/30' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-[#c2d9e1]/50">
                  <img src={logo} alt="Packsi" className="h-10 w-auto" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
                  پکسی
                </h1>
                <p className="text-xs text-[#c2d9e1] font-medium">پلتفرم هوشمند خدمات</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl transition-all duration-300 hover:bg-[#39c1ad]/20 hover:backdrop-blur-sm"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-[#c2d9e1] group-hover:text-[#39c1ad]' : 'text-white group-hover:text-[#39c1ad]'
                  }`}>
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <button className="group relative bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2 rtl:space-x-reverse">
                  <span>شروع کنید</span>
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">🚀</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-[#39c1ad]/20 backdrop-blur-sm border border-[#c2d9e1]/30 flex items-center justify-center transition-all duration-300 hover:bg-[#39c1ad]/30"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                } ${isScrolled ? 'bg-[#c2d9e1]' : 'bg-white'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                } ${isScrolled ? 'bg-[#c2d9e1]' : 'bg-white'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                } ${isScrolled ? 'bg-[#c2d9e1]' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-[#0e2544]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-gradient-to-b from-[#12344d] to-[#2b4d61] shadow-2xl transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-24">
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl bg-gradient-to-r from-[#39c1ad]/10 to-[#33b8bf]/10 hover:from-[#39c1ad]/20 hover:to-[#33b8bf]/20 transition-all duration-300 border border-[#c2d9e1]/20 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#39c1ad] to-[#33b8bf] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl text-white">{item.icon}</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-[#c2d9e1] group-hover:text-[#39c1ad] transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                </a>
              ))}
            </nav>
            
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1">
                <span className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>شروع کنید</span>
                  <span>🚀</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;