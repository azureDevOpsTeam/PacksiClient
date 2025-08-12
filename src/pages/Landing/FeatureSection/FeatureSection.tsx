import React from 'react';

const features = [
  {
    icon: "🚚",
    title: 'حمل بار مسافر',
    description: 'سفر می‌کنی؟ با حمل بارهای کوچک و امن دیگران، هزینه سفرت رو جبران کن. هم به مقصد می‌رسی، هم پول به جیبت میاد.',
    bgGradient: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100',
    borderGradient: 'border-gradient-to-r from-blue-200 to-indigo-300',
    textColor: 'text-slate-700',
    titleColor: 'text-indigo-800',
    iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    corners: "rounded-3xl",
    shadow: 'shadow-lg hover:shadow-2xl',
    layout: { span: 'col-span-1' }
  },
  {
    icon: "🚗",
    title: 'آموزش رانندگی',
    description: 'از مربیان مطمئن و نزدیک خودت آموزش رانندگی رو یاد بگیر. با تمرین‌های اصولی و پشتیبانی کامل، آماده شو تا با اعتمادبه‌نفس کامل پشت فرمان بشینی.',
    bgGradient: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100',
    borderGradient: 'border-gradient-to-r from-emerald-200 to-teal-300',
    textColor: 'text-slate-700',
    titleColor: 'text-emerald-800',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    corners: "rounded-3xl",
    shadow: 'shadow-lg hover:shadow-2xl',
    layout: { span: 'col-span-1 md:col-span-2' }
  },
  {
    icon: "🏠",
    title: 'اجاره کوتاه‌مدت اتاق',
    description: 'برای سفر یا اقامت کوتاه، راحت و سریع اتاق مورد نیازت رو پیدا و رزرو کن—بدون واسطه و دردسر.',
    bgGradient: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-100',
    borderGradient: 'border-gradient-to-r from-amber-200 to-orange-300',
    textColor: 'text-slate-700',
    titleColor: 'text-amber-800',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    corners: "rounded-3xl",
    shadow: 'shadow-lg hover:shadow-2xl',
    layout: { span: 'col-span-1' }
  },
  {
    icon: "🛠️",
    title: 'خدمات شخصی',
    description: 'از کارهای اداری مثل بیمه و گواهینامه تا پیگیری امور شخصی، افراد متخصص رو پیدا کن تا وقتت آزاد بشه.',
    bgGradient: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100',
    borderGradient: 'border-gradient-to-r from-violet-200 to-purple-300',
    textColor: 'text-slate-700',
    titleColor: 'text-violet-800',
    iconBg: 'bg-gradient-to-br from-violet-400 to-purple-500',
    corners: "rounded-3xl",
    shadow: 'shadow-lg hover:shadow-2xl',
    layout: { span: 'col-span-1' }
  },
];

function FeatureSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-4">
            سرویس‌های ما
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای از خدمات نوآورانه برای تسهیل زندگی روزمره شما
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className={`
                  ${feature.bgGradient} ${feature.shadow} ${feature.corners} ${feature.layout.span}
                  border border-white/50 backdrop-blur-sm
                  transform transition-all duration-500 ease-out
                  group cursor-pointer overflow-hidden
                  relative p-8
                `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-right">
                  {/* Icon */}
                  <div className={`
                    ${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center
                    mb-6 shadow-lg
                    mr-auto
                  `}>
                    <span className="text-2xl filter drop-shadow-sm">{feature.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-2xl font-bold mb-4 ${feature.titleColor}
                  `}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`
                    text-base leading-relaxed ${feature.textColor}
                  `}>
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 flex justify-end">
                    <div className={`
                      w-12 h-1 ${feature.iconBg} rounded-full
                      transform transition-all duration-500
                      group-hover:w-16
                    `}></div>
                  </div>
                </div>


              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </section>
  );
}


export default FeatureSection;
