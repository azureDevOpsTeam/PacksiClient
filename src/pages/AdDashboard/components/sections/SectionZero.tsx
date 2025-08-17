import React from 'react';
import ProgressBar from "../../../../components/icons/ProgressBar";
import ChartComponent from "../../../../components/chart/ChartLine";
import ChartLine from "../../../../components/chart/ChartLine";
import ChartBar from "../../../../components/chart/ChartBar";
import {useTheme} from "../../../../components/hooks/context/ThemeContext";
import TruncatedText from "../../../../components/tools/text/TruncatedText";
import {messages, redChartData, whiteChartData} from "../../../../assets/mock/mockData";
import DynamicTabs from "../../../../components/tools/tab/DynamicTabs";
import {Messages, ShippingDetails, TodayReport, TotalCapacity} from "../../../../setting/ApiUrl";
import {useFetch} from "../../../../components/hooks/fetch/useFetch";
import {HttpMethod} from "../../../../models/enums/HttpMethod";
import {AuthApiHeader} from "../../../../services/api/ApiHeader";
import SkeletonDiv from "../../../../components/tools/loading/SkeletonDiv";
import {Link} from "react-router-dom";

function SectionZero({
                         truckValue,
                         TruckLoadSvg,
                         ExtraRedIcon,
                         MapRedIcon,
                         PluseWhiteIcon,
                         UserAvatarIcon,
                         DownloadWhiteIcon,
                         LeftArowIcon,
                         BarIcon
                     }: any) {
    const totalCapacity = useFetch({
        key: 'totalCapacity',
        url: TotalCapacity,
        method: HttpMethod.GET,
        headers: AuthApiHeader
    },null)

    const shippingDetails = useFetch({
        key: 'shippingDetails',
        url: ShippingDetails,
        method: HttpMethod.GET,
        headers: AuthApiHeader
    },null)

    const message = useFetch({
        key: 'message',
        url: Messages,
        method: HttpMethod.GET,
        headers: AuthApiHeader
    },null)

    const todayReport = useFetch({
        key: 'todayReport',
        url: TodayReport,
        method: HttpMethod.GET,
        headers: AuthApiHeader
    },null)

    const {colors} = useTheme();

    const tabData = [
        {
            label: 'همه',
            content:
                <SkeletonDiv
                    loading={message.isLoading}
                    className={'flex flex-col items-center justify-start  w-full mt-[21px] gap-[25px] max-h-[190px] overflow-y-auto overflow-x-hidden'}>
                    {message.data?.data?.map((item: any, index: any) => (
                        <div
                            key={index}
                            className={'cursor-pointer flex hover:scale-95 active:scale-100 transition-all flex-col items-center justify-start h-[79px] p-2.5 rounded-2xl border w-full'}
                            style={{borderColor: colors.border.primary}}>
                            <div className={'flex self-start  items-center justify-between w-full'}>
                                <div className={'flex items-center gap-[10px] justify-center'}>
                                    <UserAvatarIcon/>
                                    <div className="text-right text-xs font-bold"
                                         style={{color: colors.text.primary}}>{item.fullName}
                                    </div>
                                </div>
                                <div
                                    className="w-[18px] h-[18px] px-[3px] py-[5px] rounded-[9px] flex-col justify-center items-center gap-2.5 inline-flex"
                                    style={{backgroundColor: colors.text.secondary}}>
                                    <div className="text-center text-white text-xs font-bold">1</div>
                                </div>
                            </div>
                            <div
                                className="text-right mt-[6px] px-[30px] text-gray-500 text-[10px] font-bold max-h-[30px]"
                                style={{color: colors.text.light}}>
                                <TruncatedText
                                    text={item.message}
                                    maxLength={80}/>
                            </div>
                        </div>
                    ))}
                </SkeletonDiv>
        },
        {
            label: 'جدید',
            content: <SkeletonDiv
                loading={message.isLoading}
                className={'flex flex-col items-center justify-start  w-full mt-[21px] gap-[25px] max-h-[190px] overflow-y-auto overflow-x-hidden'}>
                {message.data?.data?.filter((item: any) => item.status === 0)?.map((item: any, index: any) => (
                    <div
                        key={index}
                        className={'cursor-pointer flex hover:scale-95 active:scale-100 transition-all flex-col items-center justify-start h-[79px] p-2.5 rounded-2xl border w-full'}
                        style={{borderColor: colors.border.primary}}>
                        <div className={'flex self-start  items-center justify-between w-full'}>
                            <div className={'flex items-center gap-[10px] justify-center'}>
                                <UserAvatarIcon/>
                                <div className="text-right text-xs font-bold"
                                     style={{color: colors.text.primary}}>{item.fullName}
                                </div>
                            </div>
                            <div
                                className="w-[18px] h-[18px] px-[3px] py-[5px] rounded-[9px] flex-col justify-center items-center gap-2.5 inline-flex"
                                style={{backgroundColor: colors.text.secondary}}>
                                <div className="text-center text-white text-xs font-bold">1</div>
                            </div>
                        </div>
                        <div
                            className="text-right mt-[6px] px-[30px] text-gray-500 text-[10px] font-bold max-h-[30px]"
                            style={{color: colors.text.light}}>
                            <TruncatedText
                                text={item.message}
                                maxLength={80}/>
                        </div>
                    </div>
                ))}
            </SkeletonDiv>
        },
        {
            label: 'خوانده شده',
            content: <SkeletonDiv
                loading={message.isLoading}
                className={'flex flex-col items-center justify-start  w-full mt-[21px] gap-[25px] max-h-[190px] overflow-y-auto overflow-x-hidden'}>
                {message.data?.data?.filter((item: any) => item.status === 1).map((item: any, index: any) => (
                    <div
                        key={index}
                        className={'cursor-pointer flex hover:scale-95 active:scale-100 transition-all flex-col items-center justify-start h-[79px] p-2.5 rounded-2xl border w-full'}
                        style={{borderColor: colors.border.primary}}>
                        <div className={'flex self-start  items-center justify-between w-full'}>
                            <div className={'flex items-center gap-[10px] justify-center'}>
                                <UserAvatarIcon/>
                                <div className="text-right text-xs font-bold"
                                     style={{color: colors.text.primary}}>{item.fullName}
                                </div>
                            </div>
                            <div
                                className="w-[18px] h-[18px] px-[3px] py-[5px] rounded-[9px] flex-col justify-center items-center gap-2.5 inline-flex"
                                style={{backgroundColor: colors.text.secondary}}>
                                <div className="text-center text-white text-xs font-bold">1</div>
                            </div>
                        </div>
                        <div
                            className="text-right mt-[6px] px-[30px] text-gray-500 text-[10px] font-bold max-h-[30px]"
                            style={{color: colors.text.light}}>
                            <TruncatedText
                                text={item.message}
                                maxLength={80}/>
                        </div>
                    </div>
                ))}
            </SkeletonDiv>
        }
    ];
    return (
        <div className={'w-full flex flex-col justify-center items-center lg:items-stretch'}>
            <div className={'md:flex md:flex-nowrap flex-wrap items-center justify-center'}>
                <SkeletonDiv
                    loading={totalCapacity.isLoading}
                    className="w-[315px] h-[312px] shadow p-6 rounded-[28px] flex-col justify-center items-center mt-[25px]"
                    style={{backgroundColor: colors.paper}}>
                    <div className='flex items-center justify-between'>
                        <div className="text-sm font-bold" style={{color: colors.text.primary}}>ظرفیت فعلی
                            ناوگان
                        </div>
                        <div
                            className="text-right text-xs font-bold cursor-pointer underline"
                            style={{color: colors.text.secondary}}>مشاهده
                            همه
                        </div>
                    </div>
                    <div className='flex items-center justify-start mt-[20px]'>
                        <div className="text-right"><span
                            className=" text-sm font-bold"
                            style={{color: colors.text.primary}}>ناوگان </span><span
                            className=" text-sm font-bold"
                            style={{color: colors.text.secondary}}>منطقه ۳</span><span
                            className=" text-sm font-bold" style={{color: colors.text.primary}}>:</span>
                        </div>
                    </div>
                    <div className={'flex items-center justify-center mt-[20px]'}>
                        <div className={'relative'}>
                            <div className={'absolute z-10 text-[24px] font-bold top-[36px] right-[80px]'}>
                                {totalCapacity.data?.data?.percentage}%
                            </div>
                            <div className='w-[165px] absolute top-[7px] rotate-180 right-[17px]'>
                                <ProgressBar value={totalCapacity.data?.data?.percentage} height={'h-[89px]'}
                                             color="bg-red-400"
                                             borderRadius="rounded-[5px]"/>
                            </div>
                            <TruckLoadSvg/>
                        </div>
                    </div>
                    <div className="w-[267px] mt-[20px] justify-between items-start inline-flex">
                        <div className="text-right text-sm font-bold" style={{color: colors.text.primary}}>ظرفیت فعلی:
                        </div>
                        <div className="justify-start items-center gap-[5px] flex">
                            <div className="text-right"><span
                                className=" text-sm font-bold"
                                style={{color: colors.text.secondary}}>{totalCapacity.data?.data?.current} </span><span
                                className=" text-[10px] font-bold" style={{color: colors.text.light}}>واحد</span>
                            </div>
                            <div className="text-right  text-sm font-bold" style={{color: colors.text.light}}>/</div>
                            <div className="text-right"><span
                                className=" text-sm font-bold"
                                style={{color: colors.text.secondary}}>{totalCapacity.data?.data?.total} </span><span
                                className=" text-[10px] font-bold" style={{color: colors.text.light}}>واحد</span>
                            </div>
                        </div>
                    </div>
                </SkeletonDiv>
                <SkeletonDiv
                    loading={shippingDetails.isLoading}
                    className={'items-center md:w-full w-[315px] shadow min-w-[315px] justify-between md:mr-[25px] flex p-6  rounded-[28px] flex-col mt-[25px]'}
                    style={{backgroundColor: colors.paper}}>
                    <div className='flex items-center w-full justify-between'>
                        <div className=" text-sm font-bold" style={{color: colors.text.primary}}>
                            جزئیات حمل و نقل
                        </div>
                        <div
                            className="text-right text-xs font-bold cursor-pointer underline"
                            style={{color: colors.text.secondary}}>مشاهده
                            همه
                        </div>
                    </div>
                    <div
                        className={'xl:flex  items-center mt-[40px] w-full justify-center border rounded-[28px]'}
                        style={{borderColor: colors.border.primary}}>
                        <div className={'md:w-full min-w-[201px] min-h-[201px] p-[20px]'}>
                            <div className={'flex items-center justify-between'}>
                                <div className="text-right text-sm font-bold" style={{color: colors.text.primary}}>تعداد
                                    زون
                                </div>
                                <ExtraRedIcon/>
                            </div>
                            <div
                                className={'flex items-center justify-start mt-[15px] text-xl font-bold'}
                                style={{color: colors.text.secondary}}>{shippingDetails.data?.data?.zoneCount}
                            </div>
                            <div className={'flex items-center justify-start !mt-16'}>
                                <button
                                    className={'border flex items-center  hover:scale-95 active:scale-100 transition-all justify-between !h-[32px] text-sm  rounded-[12px]  p-2 min-w-[125px]'}
                                    style={{borderColor: colors.border.secondary, color: colors.text.secondary}}>
                                    <MapRedIcon className={'mx-1'}/>
                                    <Link to={'/zone'} className={'mx-1 font-bold '}>نقشه زون‌ها</Link>
                                </button>
                            </div>
                        </div>
                        <div
                            className={'md:w-full min-w-[201px] min-h-[201px] p-[20px] border-r-0 xl:border-r border-l-0 xl:border-l xl:border-t-0 border-t xl:border-b-0 border-b'}>
                            <div className={'flex items-center justify-between'}>
                                <div className="text-right text-sm font-bold" style={{color: colors.text.primary}}>تعداد
                                    ناوگان
                                </div>
                                <ExtraRedIcon/>
                            </div>
                            <div
                                className={'flex items-center justify-start mt-[15px] text-xl font-bold'}
                                style={{color: colors.text.secondary}}>{shippingDetails.data?.data?.fleetCount}
                            </div>
                            <div className={'flex flex-col w-4/5 items-start justify-center mt-[30px]'}>
                                {shippingDetails.data?.data?.fleetDetails?.map((item: any, index: any) => (
                                    <div key={index} className={'flex items-center w-full justify-between mt-[10px]'}>
                                        <div
                                            className="text-right text-xs font-bold" style={{color: colors.text.light}}>
                                            ناوگان {item.title}:
                                        </div>
                                        <div
                                            className="text-right text-xs  font-bold"
                                            style={{color: colors.text.secondary}}>{item.count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={'md:w-full min-w-[201px] min-h-[201px] p-[20px]'}>
                            <div className={'flex items-center justify-between'}>
                                <div className="text-right text-sm font-bold" style={{color: colors.text.primary}}>تعداد
                                    میکروهاب
                                </div>
                                <ExtraRedIcon/>
                            </div>
                            <div
                                className={'flex items-center justify-start mt-[15px] text-xl font-bold'}
                                style={{color: colors.text.secondary}}>{shippingDetails.data?.data?.microHubCount}
                            </div>
                            <div className={'flex flex-col w-4/5 items-start justify-center mt-[30px]'}>
                                <div className={'flex items-center w-full justify-between'}>
                                    <div
                                        className="text-right text-xs font-bold"
                                        style={{color: colors.text.light}}>میکروهاب فعال:
                                    </div>
                                    <div
                                        className="text-right text-xs  font-bold"
                                        style={{color: colors.text.secondary}}>{shippingDetails.data?.data?.microHubActiveCount}
                                    </div>
                                </div>
                            </div>
                            <div className={'flex items-center justify-start !mt-5'}>
                                <button
                                    className={'border  hover:scale-95 active:scale-100 transition-all  flex items-center justify-between !h-[32px] text-white text-sm  rounded-[12px]  p-2 min-w-[125px]'}
                                    style={{
                                        backgroundColor: colors.text.secondary,
                                        borderColor: colors.border.secondary
                                    }}>
                                    <PluseWhiteIcon className={'mx-1'}/>
                                    <Link to={'/micro-hub/new'} className={'mx-1 font-bold'}>میکروهاب جدید</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </SkeletonDiv>
            </div>
            <div
                className={'flex xl:flex-nowrap flex-wrap items-center w-full justify-start mt-[25px] gap-[25px] pb-[40px]'}>
                <div
                    className={'min-w-[315px] shadow w-full h-[315px] rounded-[28px] flex flex-col items-center justify-start p-[24px]'}
                    style={{backgroundColor: colors.paper}}>
                    <div className="text-right self-start text-sm font-bold"
                         style={{color: colors.text.primary}}>پیام‌ها
                    </div>
                    <DynamicTabs className={'-mt-2'} tabs={tabData}/>
                </div>
                <SkeletonDiv
                    loading={todayReport.isLoading}
                    className={'flex flex-col justify-start shadow  items-center p-[24px] min-w-[315px] w-full h-[315px] rounded-[28px]'}
                    style={{backgroundColor: colors.text.secondary}}>
                    <div className={'flex items-center justify-between w-full'}>
                        <div className="text-right text-white text-sm font-bold">گزارش‌های امروز</div>
                        <div className={'cursor-pointer'}>
                            <DownloadWhiteIcon/>
                        </div>
                    </div>
                    <div className={'flex items-center justify-between w-full mt-[21.5px]'}>
                        <div className="relative w-[216px] h-[116px]">
                            <div className="absolute top-1.5 left-1/3 text-white text-[10px] font-bold">بیشترین تعداد
                                ارسال
                            </div>
                            <div className="absolute flex items-center gap-[10px] flex-wrap justify-center">
                                {Array.from({length: 84}, (_, index) => (
                                    <div key={index} className="w-2 h-2 bg-white/30 rounded-full"/>
                                ))}
                            </div>
                            <ChartLine data={todayReport.data?.data?.charts}/>
                        </div>
                        <div className={'flex flex-col justify-center items-center'}>
                            <div
                                className=" text-white text-[32px] font-bold">{todayReport.data?.data?.percentage}٪
                            </div>
                            <div className="text-white text-sm font-bold">
                                تحویل&nbsp;موفق
                            </div>
                        </div>
                    </div>
                    <div className="text-right mt-[21.5px] max-h-[44px]"><span
                        className="text-white text-sm font-bold ">امروز، {todayReport.data?.data?.today} از </span><span
                        className="text-white font-extrabold">{todayReport.data?.data?.totalParcelToday}</span><span
                        className="text-white text-sm font-bold"> مرسوله پذیرفته شده، </span><span
                        className="text-white font-extrabold">{todayReport.data?.data?.activeParcelToday}</span><span
                        className="text-white text-sm font-bold"> مرسوله با موفقیت توزیع و تحویل شده‌اند.</span>
                    </div>
                    <div className={'flex items-center justify-end w-full mt-[21.5px] gap-2'}>
                        <div className="text-right text-white text-sm font-bold underline">گزارش‌گیری
                            دستی
                        </div>
                        <LeftArowIcon/>
                    </div>
                </SkeletonDiv>
                <div className={'min-w-[315px] shadow w-full h-[315px] rounded-[28px] flex flex-col p-[24px]'}
                     style={{backgroundColor: colors.paper}}>
                    <div className='flex items-center justify-between'>
                        <div className="  text-sm font-bold" style={{color: colors.text.primary}}>ظرفیت فعلی
                            ناوگان
                        </div>
                        <div
                            className="text-right text-xs font-bold cursor-pointer underline"
                            style={{color: colors.text.secondary}}>مشاهده
                            همه
                        </div>
                    </div>
                    <div className="text-right mt-[34.5px]"><span
                        className=" text-sm font-bold" style={{color: colors.text.primary}}>تاریخ امروز: </span><span
                        className=" text-sm font-bold "
                        style={{color: colors.text.secondary}}>{todayReport.data?.data?.today}</span>
                    </div>
                    <div className={'relative w-full h-[151px] mt-[34.5px]'}>
                        {/*<div className=" flex items-center gap-[9.7%] flex-wrap justify-center px-7">*/}
                        {/*    {Array.from({length: 10}, (_, index) => (*/}
                        {/*        <BarIcon key={index}/>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        <ChartBar data={whiteChartData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionZero;