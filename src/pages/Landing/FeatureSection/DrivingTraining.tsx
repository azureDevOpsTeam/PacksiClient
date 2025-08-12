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

function DrivingTraining() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [35.6892, 51.3890], // Tehran coordinates
        zoom: 12,
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

      // Add driving school markers
      const drivingSchools = [
        { lat: 35.7219, lng: 51.3347, name: 'آموزشگاه رانندگی شمال' },
        { lat: 35.6961, lng: 51.4231, name: 'آموزشگاه رانندگی شرق' },
        { lat: 35.6581, lng: 51.3656, name: 'آموزشگاه رانندگی مرکز' },
        { lat: 35.6892, lng: 51.3190, name: 'آموزشگاه رانندگی غرب' },
      ];

      drivingSchools.forEach(school => {
        const customIcon = L.divIcon({
          className: 'custom-driving-marker',
          html: `
            <div class="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span class="text-white text-sm font-bold">🚗</span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        L.marker([school.lat, school.lng], { icon: customIcon })
          .bindPopup(`<div class="text-right p-2"><strong>${school.name}</strong></div>`)
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
    <section className="py-24 px-4 my-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-right space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                <span className="text-2xl">🚗</span>
                <span className="text-emerald-700 font-semibold">آموزش رانندگی</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-xl font-bold text-emerald-900 leading-relaxed">
                می‌خوای گواهینامه بگیری ولی نمی‌دونی از کجا شروع کنی؟
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                ما بهترین مربیان رانندگی رو بر اساس موقعیت و نیازت بهت معرفی می‌کنیم. از آموزش‌های پایه تا آمادگی برای امتحان، همه چیز با مربی‌های حرفه‌ای، صبور و مطمئن انجام میشه.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '👨‍🏫', title: 'مربیان مجرب', desc: 'آموزش با بهترین مربیان' },
                { icon: '📍', title: 'نزدیک به شما', desc: 'آموزشگاه‌های اطراف شما' },
                { icon: '🎯', title: 'آمادگی امتحان', desc: 'تضمین قبولی در آزمون' },
                { icon: '⏰', title: 'زمان‌بندی انعطاف‌پذیر', desc: 'ساعات مناسب شما' }
              ].map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 text-right">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-800 text-sm">{feature.title}</h4>
                      <p className="text-slate-600 text-xs">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-end">
              <button className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  <span>ثبت‌نام در دوره</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">🚗</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="mb-4 text-right">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">آموزشگاه‌های نزدیک شما</h3>
                <p className="text-slate-600 text-sm">مکان آموزشگاه‌های رانندگی در تهران</p>
              </div>
              <div 
                ref={mapRef} 
                className="w-full h-80 rounded-2xl shadow-lg border border-white/30 overflow-hidden"
              ></div>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <span>🗺️ نقشه تعاملی</span>
                <span>📍 {4} آموزشگاه فعال</span>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs opacity-90">دانش‌آموز موفق</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs opacity-90">نرخ قبولی</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 to-transparent"></div>
    </section>
  );
}

export default DrivingTraining;
