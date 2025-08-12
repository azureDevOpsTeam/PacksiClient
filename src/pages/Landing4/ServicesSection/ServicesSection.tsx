import React, { useEffect, useRef, useState } from 'react';
import drivingImage from '../../../assets/images/DrivingTraining.png';
import houseImage from '../../../assets/images/HouseRentPic.png';
import travelerImage from '../../../assets/images/travelerPerson.png';

function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: 'حمل بار مسافر',
      description: 'سفر می‌کنی؟ با حمل بارهای کوچک و امن دیگران، هزینه سفرت رو جبران کن. هم به مقصد می‌رسی، هم پول به جیبت میاد.',
      icon: '🚚',
      image: travelerImage,
      color: 'from-[#39c1ad] to-[#33b8bf]',
      bgColor: 'from-[#39c1ad]/10 to-[#33b8bf]/10',
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'آموزش رانندگی',
      description: 'از مربیان مطمئن و نزدیک خودت آموزش رانندگی رو یاد بگیر. با تمرین‌های اصولی و پشتیبانی کامل، آماده شو تا با اعتمادبه‌نفس کامل پشت فرمان بشینی.',
      icon: '🚗',
      image: drivingImage,
      color: 'from-[#2f97cc] to-[#33b8bf]',
      bgColor: 'from-[#2f97cc]/10 to-[#33b8bf]/10',
      delay: 'delay-300'
    },
    {
      id: 3,
      title: 'اجاره کوتاه‌مدت اتاق',
      description: 'برای سفر یا اقامت کوتاه، راحت و سریع اتاق مورد نیازت رو پیدا و رزرو کن—بدون واسطه و دردسر.',
      icon: '🏠',
      image: houseImage,
      color: 'from-[#33b8bf] to-[#2b4d61]',
      bgColor: 'from-[#33b8bf]/10 to-[#2b4d61]/10',
      delay: 'delay-500'
    }
  ];

  const additionalServices = [
    {
      icon: '🛠️',
      title: 'خدمات شخصی',
      description: 'از کارهای اداری مثل بیمه و گواهینامه تا پیگیری امور شخصی',
      color: 'from-[#39c1ad] to-[#2f97cc]'
    },
    {
      icon: '📱',
      title: 'پشتیبانی ۲۴/۷',
      description: 'تیم پشتیبانی ما همیشه آماده کمک به شماست',
      color: 'from-[#33b8bf] to-[#39c1ad]'
    },
    {
      icon: '💳',
      title: 'پرداخت امن',
      description: 'سیستم پرداخت امن و رمزگذاری شده برای تراکنش‌های شما',
      color: 'from-[#2f97cc] to-[#2b4d61]'
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12344d] to-[#2b4d61]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#39c1ad]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#33b8bf]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
              سرویس‌های ما
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] mx-auto rounded-full mb-6"></div>
          <p className="text-[#c2d9e1] text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای از خدمات نوآورانه برای تسهیل زندگی روزمره شما
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${service.delay}`}
            >
              <div className="relative h-full">
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/80 to-[#12344d]/80 rounded-3xl backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300"></div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl text-white">{service.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#39c1ad] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#c2d9e1] leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Image */}
                  <div className="relative mt-auto">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.bgColor} rounded-2xl blur-lg`}></div>
                    <div className="relative bg-[#c2d9e1]/10 rounded-2xl p-4 backdrop-blur-sm">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className={`mt-6 w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}>
                    اطلاعات بیشتر
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {additionalServices.map((service, index) => (
            <div key={index} className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/60 to-[#12344d]/60 rounded-2xl backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl text-white">{service.icon}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#39c1ad] transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-[#c2d9e1] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;