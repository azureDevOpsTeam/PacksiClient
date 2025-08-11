import React from 'react';

const features = [
  {
    icon: "🚚",
    title: 'حمل بار مسافر',
    description: 'سفر می‌کنی؟ با حمل بارهای کوچک و امن دیگران، هزینه سفرت رو جبران کن. هم به مقصد می‌رسی، هم پول به جیبت میاد.',
    bgColor: 'bg-[#b8c5d2]',
    textColor: 'text-[#11354D]',
    corners: "rounded-tl-[40px] rounded-br-[40px]",
    layout: { horizontal: false, wide: false }
  },
  {
    icon: "🚗",
    title: 'آموزش رانندگی',
    description: 'از مربیان مطمئن و نزدیک خودت آموزش رانندگی رو یاد بگیر. با تمرین‌های اصولی و پشتیبانی کامل، آماده شو تا با اعتمادبه‌نفس کامل پشت فرمان بشینی و تمام نکات آزمون شهری و تئوری رو یاد بگیری.',
    bgColor: 'bg-[#58b6e1]',
    textColor: 'text-white',
    corners: "rounded-tr-[40px] rounded-bl-[40px]",
    layout: { horizontal: false, wide: true }
  },
  {
    icon: "🏠",
    title: 'اجاره کوتاه‌مدت اتاق',
    description: 'برای سفر یا اقامت کوتاه، راحت و سریع اتاق مورد نیازت رو پیدا و رزرو کن—بدون واسطه و دردسر.',
    bgColor: 'bg-[#a3d1f1]',
    textColor: 'text-[#11354D]',
    corners: "rounded-tr-[40px] rounded-bl-[40px]",
    layout: { horizontal: false, wide: true }
  },
  {
    icon: "🛠️",
    title: 'خدمات شخصی',
    description: 'از کارهای اداری مثل بیمه و گواهینامه تا پیگیری امور شخصی، افراد متخصص رو پیدا کن تا وقتت آزاد بشه.',
    bgColor: 'bg-[#3F91A6]',
    textColor: 'text-white',
    corners: "rounded-tr-[40px] rounded-bl-[40px]",
    layout: { horizontal: false, wide: false }
  },
];

function FeatureSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#11354D] mb-12">سرویس‌های ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const { horizontal, wide } = feature.layout;
            return (
              <div
                key={index}
                className={`
                  ${feature.bgColor} shadow-md transition-shadow duration-300 hover:shadow-xl
                  ${horizontal ? "flex items-center p-8 col-span-2" : "flex flex-col items-center p-6"}
                  ${wide ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                  ${feature.corners}
                  text-right
                `}
              >
                <div
                  className={`
                    mb-4
                    ${horizontal ? "mr-4 mb-0" : ""}
                    ${wide ? "text-7xl mb-6" : "text-5xl"}
                  `}
                >
                  {feature.icon}
                </div>
                <div className={`text-right ${wide ? "ml-6" : ""}`}>
                  <h3 className={`text-xl font-extrabold mb-3 ${feature.textColor}`}>
                    {feature.title}
                  </h3>
                  <p
                    className={`text-base font-medium ${
                      wide ? "leading-loose" : "leading-relaxed"
                    } ${feature.textColor}`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default FeatureSection;
