import React, { useState, useEffect } from "react";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [prefixes, setPrefixes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phoneNumber: "",
    phonePrefix: "",
    email: "",
    password: "",
    inviteCode: "",
  });

  useEffect(() => {

    setLoading(true);
    setTimeout(() => {
      setPrefixes([
        { value: "+98", label: "+98" },
        { value: "+1", label: "+1" },
        { value: "+44", label: "+44" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form values:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-right">ثبت‌نام</h1>
        <p className="mb-5 text-sm text-gray-500 text-right">
          برای ثبت‌نام، اطلاعات زیر را وارد کنید
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-right">
 
          <div>
            <label className="block mb-1">نام نمایشی *</label>
            <input
              type="text"
              name="displayName"
              placeholder="نام نمایشی را وارد کنید"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">شماره تلفن *</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="شماره تلفن"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-1">پیش شماره *</label>
              <select
                name="phonePrefix"
                value={formData.phonePrefix}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">انتخاب کنید</option>
                {prefixes.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

     
          <div>
            <label className="block mb-1">ایمیل *</label>
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

      
          <div>
            <label className="block mb-1">کد دعوت</label>
            <input
              type="text"
              name="inviteCode"
              placeholder="کد دعوت"
              value={formData.inviteCode}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

  
          <div>
            <label className="block mb-1">رمز عبور *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="رمز عبور"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-sm text-blue-500"
              >
                {showPassword ? "مخفی" : "نمایش"}
              </span>
            </div>
          </div>

    
          <p className="text-xs text-gray-500">
            با ساخت حساب کاربری، شما با قوانین و حریم خصوصی موافقت می‌کنید.
          </p>

  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            ثبت‌نام
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;


