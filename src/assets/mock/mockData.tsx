import React from "react";
import TableCell from "../../components/tools/table/TableCell";
import Badge from "../../components/tools/tags/Badge";
import { Icon } from "leaflet";
import { ReactComponent as ArrowIcon } from "../../components/icons/svg/arrow-down.svg";

export const markers = [
    {
        lat: 35.6762,
        lng: 51.4231,
        popupContent: (
            <div className="relative bg-[#FF7959] p-4 m-0 rounded-xl scale-[100.5%] shadow-md w-fit text-white">
                <h3 className="text-lg font-semibold text-center text-white">
                    مختصات انتخابی:
                </h3>
                <button
                    className="mt-2 px-4 py-2  text-white rounded"
                    onClick={() => alert("Custom button clicked!")}
                >
                    Click Me
                </button>
            </div>
        ),
        iconUrl: "/images/pointer.png",
    },
    {
        lat: 35.6892,
        lng: 51.389,
        popupContent: (
            <div>
                <h3 className="font-bold">ممد</h3>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1iddXztbrxCWdPHo7ksUHakpDjPT7df-Kg&s"
                    alt="تصویر"
                />
                <p>در حال انتظار</p>
                <button onClick={() => alert("منتظرم!")} className="btn">
                    منتظر باش
                </button>
            </div>
        ),
        iconUrl: "/images/pointer.png",
    },
];
export const whiteChartData = [
    {name: 'MH1', value: 0},
    {name: 'MH2', value: 0},
    {name: 'MH3', value: 0},
    {name: 'MH4', value: 0},
    {name: 'MH5', value: 0},
    {name: 'MH6', value: 0},
    {name: 'MH7', value: 0},
    {name: 'MH8', value: 0},
    {name: 'MH9', value: 0},
    {name: 'MH10', value: 0},
    {name: 'MH11', value: 0},
]

export const redChartData =
    [
        {name: '1', value: 10},
        {name: '2', value: 20},
        {name: '3', value: 70},
        {name: '4', value: 23},
        {name: '5', value: 240},
        {name: '6', value: 180},
    ]

export const regions = [
    {
        coordinates: [
            [35.6961, 51.3560],
            [35.6997, 51.3800],
            [35.6943, 51.4140],
            [35.6861, 51.4231],
            [35.6800, 51.4000],
            [35.6761, 51.3640],
        ],
        color: 'red',
        fillColor: 'pink',
        fillOpacity: 0.5,
    },
    {
        coordinates: [
            [35.7200, 51.4500],
            [35.7300, 51.4600],
            [35.7400, 51.4700],
            [35.7350, 51.4600],
        ],
        color: 'red',
        fillColor: 'pink',
        fillOpacity: 0.6,
    },
];

export const messages = {
    all: [
        {
            id: '1',
            name: 'شهاب عظیمیان',
            message: 'سلام، من برای تغییر وضعیت سفارش با مشکل مواجه شدم. لطفاً راهنمایی کنید.',
            badge: 2
        },
        {
            id: '2',
            name: 'خشایار کرمانی',
            message: 'سلام، گزینه‌ای که فرمودید پیدا نمی‌کنم. لطفاً مسیر دقیق‌تر رو بفرمایید.',
            badge: 1
        },
        {
            id: '3',
            name: 'الهه ناصری',
            message: 'من کد تخفیف وارد کردم اما اعمال نمی‌شود. لطفاً بررسی کنید.',
            badge: 4
        }
    ],
    new: [
        {
            id: '4',
            name: 'امید رضایی',
            message: 'چطور می‌توانم سفارش خود را لغو کنم؟ گزینه‌ای برای این کار نمی‌بینم.',
            badge: 1
        },
        {
            id: '5',
            name: 'مینا عسگری',
            message: 'اپلیکیشن شما خیلی خوب است، اما در بخش پروفایل تغییرات ذخیره نمی‌شود.',
            badge: 3
        }
    ],
    saw: [
        {
            id: '6',
            name: 'رضا شریفی',
            message: 'پرداخت من انجام شده اما وضعیت سفارش هنوز به‌روزرسانی نشده است.',
            badge: 0
        },
        {
            id: '7',
            name: 'فرزانه ملکی',
            message: 'چرا گزینه‌های ارسال محدود است؟ آیا امکان ارسال سریع وجود ندارد؟',
            badge: 2
        }
    ]
};

export const cards = {
  zone: [
    {
      id: "1",
      title: "زون شرق",
      //   redTitle: "زون شرق",
      firstHeadValue: "زیر پل سید خندان، ضلع غربی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "پل سید خندان",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "2",
      title: "زون غرب",
      //   redTitle: "/زون غرب",
      firstHeadValue: "ضلع شرقی میدان آزادی",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "میدان آزادی",
      tags: [{ label: "غیرفعال", color: "#ffe2e2", borderColor: "#9f5b5b" }],
    },
    {
      id: "3",
      title: "زون شمال",
      //   redTitle: "زون شمال",
      firstHeadValue: "خیابان ولیعصر، بالاتر از پارک ملت",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "پارک ملت",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "4",
      title: "زون جنوب",
      //   redTitle: "زون جنوب",
      firstHeadValue: "ضلع شرقی پایانه جنوب",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "پایانه جنوب",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "5",
      title: "زون مرکزی",
      //   redTitle: "زون مرکزی",
      firstHeadValue: "خیابان انقلاب، ضلع غربی میدان انقلاب",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "میدان انقلاب",
      tags: [{ label: "در انتظار", color: "#fffbe2", borderColor: "#9f9f5b" }],
    },
    {
      id: "6",
      title: "زون غربی",
      //   redTitle: "زون غربی",
      firstHeadValue: "بلوار فردوس، ضلع شمالی خیابان شقایق",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "بلوار فردوس",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "7",
      title: "زون شرقی",
      //   redTitle: "زون شرقی",
      firstHeadValue: "خیابان پیروزی، روبروی مترو نبرد",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "خیابان پیروزی",
      tags: [{ label: "غیرفعال", color: "#ffe2e2", borderColor: "#9f5b5b" }],
    },
    {
      id: "8",
      title: "زون شمال غرب",
      //   redTitle: "زون شمال غرب",
      firstHeadValue: "خیابان مرزداران، ابتدای خیابان ایثارگران",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "خیابان مرزداران",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "9",
      title: "زون جنوب غرب",
      //   redTitle: "زون جنوب غرب",
      firstHeadValue: "خیابان قزوین، روبروی مترو زمزم",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "خیابان قزوین",
      tags: [{ label: "در انتظار", color: "#fffbe2", borderColor: "#9f9f5b" }],
    },
    {
      id: "10",
      title: "زون جنوب شرق",
      //   redTitle: "زون جنوب شرق",
      firstHeadValue: "خیابان شریعتی، نزدیکی پل صدر",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "پل صدر",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "11",
      title: "زون شمال شرق",
      //   redTitle: "زون شمال شرق",
      firstHeadValue: "خیابان پاسداران، میدان نوبنیاد",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "میدان نوبنیاد",
      tags: [{ label: "غیرفعال", color: "#ffe2e2", borderColor: "#9f5b5b" }],
    },
    {
      id: "12",
      title: "زون مرکزی جدید",
      //   redTitle: "زون مرکزی جدید",
      firstHeadValue: "خیابان مطهری، تقاطع سهروردی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "خیابان مطهری",
      tags: [{ label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" }],
    },
    {
      id: "13",
      title: "زون جنوبی جدید",
      //   redTitle: "زون جنوبی جدید",
      firstHeadValue: "خیابان شوش، نزدیکی میدان شوش",
      secondHead: "ماکروهاب",
      firstHead: "آدرس",
      thirdHead: "ند ها",
      thirdHeadValue: "سید خندان، عباس‌آباد، تهرانپارس، نارمک، رسالت",
      secondHeadValue: "میدان شوش",
      tags: [{ label: "در انتظار", color: "#fffbe2", borderColor: "#9f9f5b" }],
    },
  ],
  fleet: [
    {
      id: "1",
      title: "ناوگان منطقه بیست و دو",
      redTitle: "زون غرب",
      firstHeadValue: 150,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "علیرضا محمدی",
      tags: [
        { label: "ون", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "2",
      title: "ناوگان منطقه ده",
      redTitle: "زون شرق",
      firstHeadValue: 120,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "محمدرضا شریفی",
      tags: [
        { label: "سواری", color: "#e2ffe2", borderColor: "#00a500" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
    {
      id: "3",
      title: "ناوگان منطقه پانزده",
      redTitle: "زون شمال",
      firstHeadValue: 180,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "سارا احمدی",
      tags: [
        { label: "کامیون", color: "#fff3cd", borderColor: "#ffcc00" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "4",
      title: "ناوگان منطقه پنج",
      redTitle: "زون جنوب",
      firstHeadValue: 200,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "امیر کمالی",
      tags: [
        { label: "اتوبوس", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
    {
      id: "5",
      title: "ناوگان منطقه هشت",
      redTitle: "زون غرب",
      firstHeadValue: 90,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "زهرا صادقی",
      tags: [
        { label: "ون", color: "#e2ffe2", borderColor: "#00a500" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "6",
      title: "ناوگان منطقه هفده",
      redTitle: "زون شرق",
      firstHeadValue: 70,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "مهدی علوی",
      tags: [
        { label: "کامیون", color: "#fff3cd", borderColor: "#ffcc00" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
    {
      id: "7",
      title: "ناوگان منطقه یازده",
      redTitle: "زون شمال",
      firstHeadValue: 110,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "فاطمه عباسی",
      tags: [
        { label: "اتوبوس", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "8",
      title: "ناوگان منطقه سه",
      redTitle: "زون جنوب",
      firstHeadValue: 140,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "رضا ملکی",
      tags: [
        { label: "سواری", color: "#e2ffe2", borderColor: "#00a500" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "9",
      title: "ناوگان منطقه شانزده",
      redTitle: "زون غرب",
      firstHeadValue: 160,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "نگین رضایی",
      tags: [
        { label: "ون", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
    {
      id: "10",
      title: "ناوگان منطقه چهار",
      redTitle: "زون شرق",
      firstHeadValue: 130,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "محمدصادق نوروزی",
      tags: [
        { label: "کامیون", color: "#fff3cd", borderColor: "#ffcc00" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "11",
      title: "ناوگان منطقه نوزده",
      redTitle: "زون شمال",
      firstHeadValue: 100,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "حمید نصیری",
      tags: [
        { label: "اتوبوس", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
    {
      id: "12",
      title: "ناوگان منطقه شش",
      redTitle: "زون جنوب",
      firstHeadValue: 125,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "لیلا حیدری",
      tags: [
        { label: "سواری", color: "#e2ffe2", borderColor: "#00a500" },
        { label: "فعال", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "13",
      title: "ناوگان منطقه هفت",
      redTitle: "زون غرب",
      firstHeadValue: 95,
      secondHead: "پرسنل",
      firstHead: "ظرفیت",
      secondHeadValue: "فرزانه کریمی",
      tags: [
        { label: "ون", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "غیرفعال", color: "#fdecec", borderColor: "#FF7959" },
      ],
    },
  ],
  microhub: [
    {
      id: "1",
      title: "میدان نوبنیاد",
      redTitle: "نود نوبنیاد",
      firstHeadValue:
        "پایانه تاکسیرانی نوبنیاد، تقاطع اتوبان بابایی و خیابان پاسداران",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "1,3,4",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "2",
      title: "میدان آزادی",
      redTitle: "نود آزادی",
      firstHeadValue: "پایانه تاکسیرانی آزادی، خیابان آزادی",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "2,5,6",
      tags: [
        { label: "ثابت", color: "#ffe1e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "3",
      title: "میدان ولیعصر",
      redTitle: "نود ولیعصر",
      firstHeadValue: "میدان ولیعصر، خیابان ولیعصر",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "7,8,9",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#fff7e2", borderColor: "#bd9f5b" },
      ],
    },
    {
      id: "4",
      title: "میدان تجریش",
      redTitle: "نود تجریش",
      firstHeadValue: "میدان تجریش، خیابان شریعتی",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "10,11,12",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "5",
      title: "میدان ونک",
      redTitle: "نود ونک",
      firstHeadValue: "میدان ونک، خیابان ونک",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "13,14,15",
      tags: [
        { label: "ثابت", color: "#ffe2e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "6",
      title: "میدان هفت تیر",
      redTitle: "نود هفت تیر",
      firstHeadValue: "میدان هفت تیر، خیابان کریم‌خان",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "16,17,18",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "7",
      title: "میدان انقلاب",
      redTitle: "نود انقلاب",
      firstHeadValue: "میدان انقلاب، خیابان آزادی",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "19,20,21",
      tags: [
        { label: "ثابت", color: "#ffe1e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "8",
      title: "میدان فردوسی",
      redTitle: "نود فردوسی",
      firstHeadValue: "میدان فردوسی، خیابان فردوسی",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "22,23,24",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "9",
      title: "میدان شوش",
      redTitle: "نود شوش",
      firstHeadValue: "میدان شوش، خیابان شوش",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "25,26,27",
      tags: [
        { label: "ثابت", color: "#ffe2e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "10",
      title: "میدان شهرری",
      redTitle: "نود شهرری",
      firstHeadValue: "میدان شهرری، خیابان حرم",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "28,29,30",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "11",
      title: "میدان امام حسین",
      redTitle: "نود امام حسین",
      firstHeadValue: "میدان امام حسین، خیابان انقلاب",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "31,32,33",
      tags: [
        { label: "ثابت", color: "#ffe1e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "12",
      title: "میدان رسالت",
      redTitle: "نود رسالت",
      firstHeadValue: "میدان رسالت، خیابان دماوند",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "34,35,36",
      tags: [
        { label: "ثابت", color: "#e1effe", borderColor: "#7d97bd" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
    {
      id: "13",
      title: "میدان صنعت",
      redTitle: "نود صنعت",
      firstHeadValue: "میدان صنعت، بلوار فرحزادی",
      secondHead: "زون تحت پوشش",
      firstHead: "آدرس",
      secondHeadValue: "37,38,39",
      tags: [
        { label: "ثابت", color: "#ffe1e1", borderColor: "#bd7d7d" },
        { label: "متحرک", color: "#e2ffe2", borderColor: "#5b9f84" },
      ],
    },
  ],
  node: [
    {
      id: "1",
      title: "سید خندان",
      redTitle: "زون شرق",
      firstHeadValue: "پایانه تاکسیرانی نوبنیاد، تقاطع اتوبان بابایی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "پل سید خندان",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "2",
      title: "میدان آزادی",
      redTitle: "زون غرب",
      firstHeadValue: "پایانه تاکسیرانی آزادی، خیابان آزادی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان آزادی",
      tags: [{ label: "غیر فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "3",
      title: "میدان ولیعصر",
      redTitle: "زون مرکزی",
      firstHeadValue: "میدان ولیعصر، خیابان ولیعصر",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان ولیعصر",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "4",
      title: "میدان تجریش",
      redTitle: "زون شمال",
      firstHeadValue: "میدان تجریش، خیابان شریعتی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان تجریش",
      tags: [{ label: "غیر فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "5",
      title: "میدان هفت تیر",
      redTitle: "زون مرکزی",
      firstHeadValue: "میدان هفت تیر، خیابان کریم‌خان",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان هفت تیر",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "6",
      title: "میدان انقلاب",
      redTitle: "زون مرکزی",
      firstHeadValue: "میدان انقلاب، خیابان آزادی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان انقلاب",
      tags: [{ label: "غیر فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "7",
      title: "میدان فردوسی",
      redTitle: "زون مرکزی",
      firstHeadValue: "میدان فردوسی، خیابان فردوسی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان فردوسی",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "8",
      title: "میدان شوش",
      redTitle: "زون جنوب",
      firstHeadValue: "میدان شوش، خیابان شوش",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان شوش",
      tags: [{ label: "فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "9",
      title: "میدان شهرری",
      redTitle: "زون جنوب",
      firstHeadValue: "میدان شهرری، خیابان حرم",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان شهرری",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "10",
      title: "میدان امام حسین",
      redTitle: "زون شرق",
      firstHeadValue: "میدان امام حسین، خیابان انقلاب",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان امام حسین",
      tags: [{ label: "فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "11",
      title: "میدان رسالت",
      redTitle: "زون شرق",
      firstHeadValue: "میدان رسالت، خیابان دماوند",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان رسالت",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
    {
      id: "12",
      title: "میدان صنعت",
      redTitle: "زون غرب",
      firstHeadValue: "میدان صنعت، بلوار فرحزادی",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان صنعت",
      tags: [{ label: "فعال", color: "#fef4e1", borderColor: "#bd9f7d" }],
    },
    {
      id: "13",
      title: "میدان نوبنیاد",
      redTitle: "زون شمال شرق",
      firstHeadValue: "میدان نوبنیاد، خیابان پاسداران",
      secondHead: "میکروهاب",
      firstHead: "آدرس",
      secondHeadValue: "میدان نوبنیاد",
      tags: [{ label: "فعال", color: "#e6fee1", borderColor: "#9abd7d" }],
    },
  ],
};
export const buttons = {
  zone: [
    { id: "3", value: null, label: "همه", category: "" },
    { id: "1", value: 1, label: "فعال", category: "status" },
    { id: "2", value: 0, label: "غیر فعال", category: "status" },
  ],
  fleetReport: [
    { id: "2", value: 2, label: "همه", category: "status" },
    {
      id: "3",
      value: 3,
      label: "پرسنل ناوگان",
      icon: <ArrowIcon />,
      category: "status",
      options: [
        { id: "open", label: "علی رحیمی" },
        { id: "closed", label: "رضا صادقی" },
        { id: "pending", label: "محمد جعفر رضایی" },
      ],
    },
    { id: "5", value: 2, label: "تاریخ", category: "status" },
    { id: "6", value: 2, label: "ناحیه", category: "status" },
    {
      id: "6",
      value: 3,
      label: "وضعیت",
      icon: <ArrowIcon />,
      category: "status",
      options: [
        { id: "open", label: "فعال" },
        { id: "closed", label: "غیر فعال" },
      ],
    },
  ],
  parcel: [
    { id: "2", value: 2, label: "همه", category: "status" },
    {
      id: "3",
      value: 3,
      label: "نوع سرویس",
      icon: <ArrowIcon />,
      category: "status",
      options: [
        { id: "open", label: "بافر" },
        { id: "closed", label: "بافر حمل" },
        { id: "pending", label: "پودو" },
      ],
    },
    { id: "4", value: 2, label: "میکروهاب", category: "status" },
    { id: "5", value: 2, label: "تاریخ", category: "date" },
    {
      id: "6",
      value: 3,
      label: "وضعیت",
      icon: <ArrowIcon />,
      category: "status",
      options: [
        { id: "open", label: "فعال" },
        { id: "closed", label: "غیر فعال" },
      ],
    },
  ],
  bundle: [
    { id: "2", value: 2, label: "همه", category: "status" },
    { id: "1", value: 1, label: "وضعیت", category: "status" },
    {
      id: "3",
      value: 3,
      label: "پنجره زمانی",
      icon: <ArrowIcon />,
      category: "status",
      options: [
        { id: "open", label: "12 تا 14" },
        { id: "closed", label: "16 تا 18" },
        { id: "pending", label: "20 تا 22" },
      ],
    },
  ],
  fleet: [
    { id: "all", value: null, label: "همه", category: "isActive" },
    { id: "active", value: true, label: "فعال", category: "isActive" },
    { id: "inactive", value: false, label: "غیر فعال", category: "isActive" },
    { id: "van", value: 1, label: "ون", category: "fleetTypeId" },
    { id: "car", value: 2, label: "سواری", category: "fleetTypeId" },
    { id: "motorcycle", value: 3, label: "موتور", category: "fleetTypeId" },
  ],
  microhub: [
    { id: "all", value: null, label: "همه", category: "isActive" },
    { id: "active", value: true, label: "فعال", category: "isActive" },
    { id: "inactive", value: false, label: "غیر فعال", category: "isActive" },
    { id: "fix", value: 1, label: "میکروهاب", category: "nodeTypeId" },
    { id: "movable", value: 0, label: "نود", category: "nodeTypeId" },
    { id: "mova12ble", value: 2, label: "پودو", category: "nodeTypeId" },
    { id: "podo", value: 3, label: "دارک استور", category: "nodeTypeId" },
  ],
  node: [
    { id: "1", value: null, label: "همه", category: "isActive" },
    { id: "2", value: true, label: "فعال", category: "isActive" },
    { id: "3", value: false, label: "غیر فعال", category: "isActive" },
  ],
  personnel: [
    { id: "1", value: null, label: "همه", category: "isActive" },
    { id: "2", value: true, label: "فعال", category: "isActive" },
    { id: "3", value: false, label: "غیر فعال", category: "isActive" },
    { id: "4", value: "Fleet", label: "ناوگان", category: "listByRole" },
    { id: "5", value: "Hub", label: "میکروهاب", category: "listByRole" },
    { id: "7", value: "Admin", label: "ادمین", category: "listByRole" },
    {
      id: "6",
      value: "Supervisor",
      label: "مدیر زون",
      category: "personnelRole",
    },
  ],
};

export const personnelList =[
    {
        name: <TableCell>نوشین قدسی</TableCell>,
        role: <Badge text={'ادمین'} bgColor={'#fdf6b2'} borderColor={'#faca15'} textColor={'#8e4b10'}/>,
        phoneNumber: <TableCell>09913435678</TableCell>,
        createDate: <TableCell>1403/11/18</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>شهاب عظیمیان</TableCell>,
        role: <Badge text={'سوپروایزر'} bgColor={'#e0e7ff'} borderColor={'#6366f1'} textColor={'#3730a3'}/>,
        phoneNumber: <TableCell>09136563445</TableCell>,
        createDate: <TableCell>1400/02/15</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>محمد سید بابایی</TableCell>,
        role: <Badge text={'مدیر عملیات'} bgColor={'#fde2e1'} borderColor={'#f98080'} textColor={'#9b1c1c'}/>,
        phoneNumber: <TableCell>09984321667</TableCell>,
        createDate: <TableCell>1403/01/01</TableCell>,
        status: <Badge text={'غیرفعال'} bgColor={'#fde2e1'} borderColor={'#f98080'} textColor={'#9b1c1c'}/>
    },
    {
        name: <TableCell>خشایار کرمانی کفش</TableCell>,
        role: <Badge text={'ناوگان'} bgColor={'#ffedd5'} borderColor={'#fb923c'} textColor={'#9a3412'}/>,
        phoneNumber: <TableCell>09123410234</TableCell>,
        createDate: <TableCell>1403/10/11</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>علیرضا محمدی</TableCell>,
        role: <Badge text={'سوپروایزر'} bgColor={'#e0e7ff'} borderColor={'#6366f1'} textColor={'#3730a3'}/>,
        phoneNumber: <TableCell>09398745612</TableCell>,
        createDate: <TableCell>1403/05/19</TableCell>,
        status: <Badge text={'غیرفعال'} bgColor={'#fde2e1'} borderColor={'#f98080'} textColor={'#9b1c1c'}/>
    },
    {
        name: <TableCell>عرفان اختیاری</TableCell>,
        role:  <Badge text={'سوپروایزر'} bgColor={'#e0e7ff'} borderColor={'#6366f1'} textColor={'#3730a3'}/>,
        phoneNumber: <TableCell>09126846652</TableCell>,
        createDate: <TableCell>1403/01/13</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>سارا علیزاده</TableCell>,
        role: <Badge text={'ناوگان'} bgColor={'#ffedd5'} borderColor={'#fb923c'} textColor={'#9a3412'}/>,
        phoneNumber: <TableCell>09321450469</TableCell>,
        createDate: <TableCell>1403/05/10</TableCell>,
        status: <Badge text={'غیرفعال'} bgColor={'#fde2e1'} borderColor={'#f98080'} textColor={'#9b1c1c'}/>
    },
    {
        name: <TableCell>علی علی‌محمدی</TableCell>,
        role: <Badge text={'مدیر زون'} bgColor={'#dbeafe'} borderColor={'#60a5fa'} textColor={'#1e40af'}/>,
        phoneNumber: <TableCell>09921456012</TableCell>,
        createDate: <TableCell>1403/09/09</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>زهرا مسیحی</TableCell>,
        role: <Badge text={'ناوگان'} bgColor={'#ffedd5'} borderColor={'#fb923c'} textColor={'#9a3412'}/>,
        phoneNumber: <TableCell>09000123456</TableCell>,
        createDate: <TableCell>1403/09/09</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    },
    {
        name: <TableCell>سیمرا افتخاری</TableCell>,
        role: <Badge text={'سوپروایزر'} bgColor={'#e0e7ff'} borderColor={'#6366f1'} textColor={'#3730a3'}/>,
        phoneNumber: <TableCell>09988765432</TableCell>,
        createDate: <TableCell>1403/12/21</TableCell>,
        status: <Badge text={'فعال'} bgColor={'#def7ec'} borderColor={'#84e1bc'} textColor={'#046c4e'}/>
    }
]
