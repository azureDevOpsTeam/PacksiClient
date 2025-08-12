import React, { useEffect, useRef, useState } from 'react';

function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('پیام شما با موفقیت ارسال شد!');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'آدرس دفتر مرکزی',
      info: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      color: 'from-[#39c1ad] to-[#33b8bf]'
    },
    {
      icon: '📞',
      title: 'تلفن تماس',
      info: '۰۲۱-۱۲۳۴۵۶۷۸',
      color: 'from-[#2f97cc] to-[#39c1ad]'
    },
    {
      icon: '📧',
      title: 'ایمیل',
      info: 'info@packsi.com',
      color: 'from-[#33b8bf] to-[#2b4d61]'
    },
    {
      icon: '🕒',
      title: 'ساعات کاری',
      info: 'شنبه تا پنج‌شنبه: ۸ تا ۱۸',
      color: 'from-[#2b4d61] to-[#2f97cc]'
    }
  ];

  const services = [
    'حمل بار مسافر',
    'آموزش رانندگی',
    'اجاره کوتاه‌مدت اتاق',
    'خدمات شخصی',
    'سایر موارد'
  ];

  const socialLinks = [
    { icon: '📱', name: 'تلگرام', color: 'from-[#39c1ad] to-[#33b8bf]' },
    { icon: '📘', name: 'اینستاگرام', color: 'from-[#2f97cc] to-[#39c1ad]' },
    { icon: '🐦', name: 'توییتر', color: 'from-[#33b8bf] to-[#2b4d61]' },
    { icon: '💼', name: 'لینکدین', color: 'from-[#2b4d61] to-[#2f97cc]' }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e2544] to-[#12344d]"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#39c1ad]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#2f97cc]/5 rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-[#39c1ad] rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-[#33b8bf] rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#2f97cc] rounded-full animate-ping"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
              تماس با ما
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] mx-auto rounded-full mb-6"></div>
          <p className="text-[#c2d9e1] text-lg max-w-2xl mx-auto leading-relaxed">
            سوالی دارید یا نیاز به راهنمایی؟ ما اینجا هستیم تا کمکتان کنیم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/80 to-[#12344d]/80 rounded-3xl backdrop-blur-sm border border-[#39c1ad]/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#39c1ad]/5 to-[#33b8bf]/5 rounded-3xl blur-xl"></div>
              
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  پیام خود را ارسال کنید
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[#c2d9e1] font-medium mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white placeholder-[#c2d9e1]/50 focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[#c2d9e1] font-medium mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white placeholder-[#c2d9e1]/50 focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[#c2d9e1] font-medium mb-2">
                      شماره تماس
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white placeholder-[#c2d9e1]/50 focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-[#c2d9e1] font-medium mb-2">
                      سرویس مورد نظر
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300"
                    >
                      <option value="">انتخاب کنید</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-[#12344d]">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#c2d9e1] font-medium mb-2">
                      پیام شما *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white placeholder-[#c2d9e1]/50 focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300 resize-none"
                      placeholder="پیام خود را اینجا بنویسید..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isSubmitting ? 'animate-pulse' : ''
                    }`}
                  >
                    {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/60 to-[#12344d]/60 rounded-2xl backdrop-blur-sm border border-[#39c1ad]/20 group-hover:border-[#39c1ad]/40 transition-all duration-300"></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${info.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative p-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-xl text-white">{info.icon}</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#39c1ad] transition-colors duration-300">
                          {info.title}
                        </h4>
                        
                        <p className="text-[#c2d9e1] leading-relaxed">
                          {info.info}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/80 to-[#12344d]/80 rounded-3xl backdrop-blur-sm border border-[#39c1ad]/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#39c1ad]/5 to-[#2f97cc]/5 rounded-3xl blur-xl"></div>
                
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#39c1ad] to-[#33b8bf] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🗺️</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-2">
                    موقعیت ما روی نقشه
                  </h4>
                  
                  <p className="text-[#c2d9e1] mb-4">
                    برای مشاهده موقعیت دقیق دفتر مرکزی ما کلیک کنید
                  </p>
                  
                  <button className="bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    مشاهده در نقشه
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544]/60 to-[#12344d]/60 rounded-2xl backdrop-blur-sm border border-[#39c1ad]/20"></div>
                
                <div className="relative p-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    ما را در شبکه‌های اجتماعی دنبال کنید
                  </h4>
                  
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                        title={social.name}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;