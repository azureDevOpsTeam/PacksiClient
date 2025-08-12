import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function HouseRent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [35.6892, 51.3890], // Tehran coordinates
        zoom: 11,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add rental properties markers
      const rentalProperties = [
        { lat: 35.7219, lng: 51.3347, name: 'آپارتمان لوکس شمال', price: '25 میلیون', type: 'apartment' },
        { lat: 35.6961, lng: 51.4231, name: 'خانه ویلایی شرق', price: '18 میلیون', type: 'house' },
        { lat: 35.6581, lng: 51.3656, name: 'استودیو مرکز شهر', price: '12 میلیون', type: 'studio' },
        { lat: 35.6892, lng: 51.3190, name: 'آپارتمان خانوادگی غرب', price: '20 میلیون', type: 'apartment' },
        { lat: 35.7500, lng: 51.4200, name: 'ویلا باغ شمال شرق', price: '35 میلیون', type: 'villa' },
        { lat: 35.6200, lng: 51.3800, name: 'آپارتمان نوساز جنوب', price: '15 میلیون', type: 'apartment' },
      ];

      rentalProperties.forEach(property => {
        const getIcon = (type: string) => {
          const icons = {
            apartment: '🏢',
            house: '🏠',
            studio: '🏡',
            villa: '🏰'
          };
          return icons[type as keyof typeof icons] || '🏠';
        };

        const getColor = (type: string) => {
          const colors = {
            apartment: 'bg-blue-500',
            house: 'bg-green-500',
            studio: 'bg-purple-500',
            villa: 'bg-amber-500'
          };
          return colors[type as keyof typeof colors] || 'bg-blue-500';
        };

        const customIcon = L.divIcon({
          className: 'custom-house-marker',
          html: `
            <div class="${getColor(property.type)} w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span class="text-white text-lg">${getIcon(property.type)}</span>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        L.marker([property.lat, property.lng], { icon: customIcon })
          .bindPopup(`
            <div class="text-right p-3 min-w-[200px]">
              <strong class="text-lg">${property.name}</strong><br>
              <span class="text-green-600 font-bold">${property.price} تومان</span><br>
              <small class="text-gray-500">ماهانه</small>
            </div>
          `)
          .addTo(mapInstanceRef.current!);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-24 px-4 my-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Section */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="mb-4 text-right">
                <h3 className="text-xl font-bold text-blue-800 mb-2">املاک موجود در تهران</h3>
                <p className="text-slate-600 text-sm">مکان خانه‌ها و آپارتمان‌های اجاره‌ای</p>
              </div>
              <div 
                ref={mapRef} 
                className="w-full h-80 rounded-2xl shadow-lg border border-white/30 overflow-hidden"
              ></div>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <span>🗺️ نقشه املاک</span>
                <span>🏠 {6} ملک موجود</span>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-xs opacity-90">ملک فعال</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs opacity-90">پشتیبانی</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-right space-y-8 order-1 lg:order-2">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                <span className="text-2xl">🏠</span>
                <span className="text-blue-700 font-semibold">اجاره خانه</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-xl font-bold text-blue-900 leading-relaxed">
                دنبال خونه‌ای هستی که واقعاً بهت بیاد؟
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                ما هزاران خونه و آپارتمان رو بر اساس بودجه، منطقه و سلیقه‌ت جمع‌آوری کردیم. از استودیو کوچیک تا ویلای لوکس، همه چیز اینجا هست.
              </p>
            </div>

            {/* Property Types */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏢', title: 'آپارتمان', desc: 'مدرن و شیک', color: 'from-blue-400 to-blue-600' },
                { icon: '🏠', title: 'خانه ویلایی', desc: 'فضای سبز دار', color: 'from-green-400 to-green-600' },
                { icon: '🏡', title: 'استودیو', desc: 'مناسب مجردها', color: 'from-purple-400 to-purple-600' },
                { icon: '🏰', title: 'ویلا لوکس', desc: 'امکانات کامل', color: 'from-amber-400 to-amber-600' }
              ].map((type, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center space-y-2">
                    <div className={`bg-gradient-to-br ${type.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mx-auto`}>
                      <span className="text-xl">{type.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{type.title}</h4>
                      <p className="text-slate-600 text-xs">{type.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: '🔍', title: 'جستجوی هوشمند', desc: 'فیلترهای پیشرفته برای یافتن بهترین گزینه' },
                { icon: '💰', title: 'قیمت‌های شفاف', desc: 'بدون هزینه‌های پنهان و مشاوره رایگان' },
                { icon: '📱', title: 'بازدید آنلاین', desc: 'تور مجازی قبل از بازدید حضوری' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-blue-800 text-sm">{feature.title}</h4>
                    <p className="text-slate-600 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-end">
              <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  <span>جستجوی خانه</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">🏠</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 to-transparent"></div>
    </section>
  );
}

export default HouseRent;
