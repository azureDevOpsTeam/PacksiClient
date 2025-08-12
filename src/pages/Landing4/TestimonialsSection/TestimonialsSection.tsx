import React, { useEffect, useRef, useState } from 'react';

function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'احمد محمدی',
      role: 'کاربر حمل بار',
      avatar: '👨‍💼',
      rating: 5,
      text: 'با پکسی تونستم هزینه سفرهام رو کاهش بدم و در عین حال به دیگران هم کمک کنم. سیستم خیلی ساده و امنه.',
      service: 'حمل بار مسافر',
      color: 'from-[#39c1ad] to-[#33b8bf]'
    },
    {
      id: 2,
      name: 'فاطمه احمدی',
      role: 'دانشجوی آموزش رانندگی',
      avatar: '👩‍🎓',
      rating: 5,
      text: 'مربی‌های پکسی واقعاً حرفه‌ای هستن. با صبر و حوصله بهم آموزش دادن و الان با اعتماد به نفس کامل رانندگی می‌کنم.',
      service: 'آموزش رانندگی',
      color: 'from-[#2f97cc] to-[#39c1ad]'
    },
    {
      id: 3,
      name: 'علی رضایی',
      role: 'مسافر کاری',
      avatar: '👨‍💻',
      rating: 5,
      text: 'برای سفرهای کاری همیشه از اجاره کوتاه‌مدت پکسی استفاده می‌کنم. خیلی راحت و بدون دردسر اتاق پیدا می‌کنم.',
      service: 'اجاره کوتاه‌مدت',
      color: 'from-[#33b8bf] to-[#2b4d61]'
    },
    {
      id: 4,
      name: 'مریم کریمی',
      role: 'کارآفرین',
      avatar: '👩‍💼',
      rating: 5,
      text: 'پکسی فرصت‌های جدیدی برای کسب درآمد فراهم کرده. الان هم خدمات ارائه می‌دم و هم از خدمات استفاده می‌کنم.',
      service: 'ارائه‌دهنده خدمات',
      color: 'from-[#2b4d61] to-[#2f97cc]'
    },
    {
      id: 5,
      name: 'حسین نوری',
      role: 'راننده حرفه‌ای',
      avatar: '👨‍🔧',
      rating: 5,
      text: 'به عنوان مربی رانندگی، پکسی پلتفرم عالی‌ای برای پیدا کردن دانشجو و ارائه خدمات با کیفیت فراهم کرده.',
      service: 'مربی رانندگی',
      color: 'from-[#39c1ad] to-[#2f97cc]'
    }
  ];

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

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12344d] to-[#0e2544]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#39c1ad]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2f97cc]/5 rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-20 w-4 h-4 bg-[#33b8bf] rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-16 w-6 h-6 bg-[#39c1ad] rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-[#2f97cc] rounded-full animate-ping"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
              نظرات کاربران
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] mx-auto rounded-full mb-6"></div>
          <p className="text-[#c2d9e1] text-lg max-w-2xl mx-auto leading-relaxed">
            تجربیات واقعی کاربران ما از استفاده از خدمات پکسی
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className={`relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="relative max-w-4xl mx-auto">
                    {/* Background Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/80 to-[#12344d]/80 rounded-3xl backdrop-blur-sm border border-[#39c1ad]/20"></div>
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl blur-xl opacity-10`}></div>
                    
                    <div className="relative p-8 md:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* User Info */}
                        <div className="text-center lg:text-right">
                          <div className={`w-24 h-24 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg`}>
                            <span className="text-4xl text-white">{testimonial.avatar}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {testimonial.name}
                          </h3>
                          
                          <p className="text-[#39c1ad] font-medium mb-2">
                            {testimonial.role}
                          </p>
                          
                          <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-sm font-medium mb-4`}>
                            {testimonial.service}
                          </div>
                          
                          {/* Rating */}
                          <div className="flex justify-center lg:justify-start space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xl">⭐</span>
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <div className="lg:col-span-2">
                          <div className="relative">
                            {/* Quote Icon */}
                            <div className="absolute -top-4 -right-4 text-6xl text-[#39c1ad]/20 font-serif">
                              "
                            </div>
                            
                            <p className="text-[#c2d9e1] text-lg md:text-xl leading-relaxed relative z-10">
                              {testimonial.text}
                            </p>
                            
                            <div className="absolute -bottom-4 -left-4 text-6xl text-[#39c1ad]/20 font-serif rotate-180">
                              "
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            ←
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            →
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] w-8'
                    : 'bg-[#c2d9e1]/30 hover:bg-[#c2d9e1]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { icon: '🏆', label: 'برترین پلتفرم', value: '2024' },
            { icon: '⭐', label: 'امتیاز کاربران', value: '4.9/5' },
            { icon: '🔒', label: 'تراکنش امن', value: '100%' },
            { icon: '📱', label: 'پشتیبانی', value: '24/7' }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39c1ad]/10 to-[#33b8bf]/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-[#0e2544]/60 rounded-2xl p-4 backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-[#c2d9e1] text-sm">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;