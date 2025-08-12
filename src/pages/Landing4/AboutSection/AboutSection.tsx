import React, { useEffect, useRef, useState } from 'react';
import businessImage from '../../../assets/images/bussiness.png';
import airplaneImage from '../../../assets/images/airplane.png';
import logoImage from '../../../assets/images/packsi-Logo.png';

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    services: 0,
    cities: 0,
    satisfaction: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    const targets = { users: 50000, services: 15, cities: 25, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets];
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });
  };

  const features = [
    {
      icon: '🎯',
      title: 'هدفمند و دقیق',
      description: 'خدمات ما بر اساس نیازهای واقعی کاربران طراحی شده',
      color: 'from-[#39c1ad] to-[#33b8bf]'
    },
    {
      icon: '⚡',
      title: 'سریع و کارآمد',
      description: 'پلتفرم ما با سرعت بالا و کارایی مطلوب عمل می‌کند',
      color: 'from-[#2f97cc] to-[#39c1ad]'
    },
    {
      icon: '🔒',
      title: 'امن و قابل اعتماد',
      description: 'امنیت اطلاعات و تراکنش‌های شما اولویت اصلی ماست',
      color: 'from-[#33b8bf] to-[#2b4d61]'
    },
    {
      icon: '🌟',
      title: 'تجربه کاربری عالی',
      description: 'رابط کاربری ساده و جذاب برای استفاده آسان',
      color: 'from-[#2b4d61] to-[#2f97cc]'
    }
  ];

  const stats = [
    { label: 'کاربر فعال', value: counters.users, suffix: '+', icon: '👥' },
    { label: 'سرویس متنوع', value: counters.services, suffix: '+', icon: '🛠️' },
    { label: 'شهر پوشش', value: counters.cities, suffix: '+', icon: '🏙️' },
    { label: 'رضایت کاربران', value: counters.satisfaction, suffix: '%', icon: '⭐' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b4d61] to-[#12344d]"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#39c1ad]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#2f97cc]/5 rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-[#39c1ad] rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-[#33b8bf] rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#2f97cc] rounded-full animate-ping"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
              درباره پکسی
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] mx-auto rounded-full mb-6"></div>
          <p className="text-[#c2d9e1] text-lg max-w-3xl mx-auto leading-relaxed">
            پکسی پلتفرمی نوآورانه است که با هدف تسهیل زندگی روزمره و ایجاد فرصت‌های جدید برای کاربران طراحی شده است
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Logo */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#39c1ad] to-[#33b8bf] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <img src={logoImage} alt="Packsi Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">پکسی</h3>
                  <p className="text-[#39c1ad] font-medium">Packsi Platform</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-6">
                ماموریت ما
              </h3>
              
              <p className="text-[#c2d9e1] leading-relaxed mb-6">
                ما در پکسی بر این باوریم که فناوری باید زندگی را آسان‌تر کند. هدف ما ایجاد پلتفرمی است که 
                نه تنها نیازهای روزمره شما را برطرف کند، بلکه فرصت‌های جدیدی برای کسب درآمد و رشد شخصی فراهم آورد.
              </p>
              
              <p className="text-[#c2d9e1] leading-relaxed mb-8">
                از حمل بار مسافر گرفته تا آموزش رانندگی و اجاره کوتاه‌مدت، تمام خدمات ما با تمرکز بر کیفیت، 
                امنیت و رضایت کاربران ارائه می‌شود.
              </p>

              {/* CTA Button */}
              <button className="bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                بیشتر بدانید
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39c1ad]/20 to-[#33b8bf]/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-[#c2d9e1]/10 rounded-3xl p-8 backdrop-blur-sm border border-[#39c1ad]/20">
                  <img
                    src={businessImage}
                    alt="Business"
                    className="w-full h-64 object-contain"
                  />
                </div>
              </div>

              {/* Floating Airplane */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#2f97cc] to-[#33b8bf] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <img src={airplaneImage} alt="Airplane" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/60 to-[#12344d]/60 rounded-2xl backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl text-white">{feature.icon}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#39c1ad] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  
                  <p className="text-[#c2d9e1] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-800 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39c1ad]/10 to-[#33b8bf]/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-[#0e2544]/60 rounded-2xl p-6 backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-[#c2d9e1] font-medium">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;