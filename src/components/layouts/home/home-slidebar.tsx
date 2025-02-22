import BgSideBarHome from '@/assets/backgrounds/bg-home-sidebar.png';
import IcAnalytics from '@/assets/icons/ic-analytics.svg';
import IcBanking from '@/assets/icons/ic-banking.svg';
import IcBlog from '@/assets/icons/ic-blog.svg';
import IconBooking from '@/assets/icons/ic-booking.svg';
import IcCalendar from '@/assets/icons/ic-calendar-fill.svg';
import IcCupStarBold from '@/assets/icons/ic-cup-star-bold.svg';
import IcDashBoard from '@/assets/icons/ic-dashboard.svg';
import IcEcommerce from '@/assets/icons/ic-ecommerce.svg';
import IcFileSidebar from '@/assets/icons/ic-file-sidebar.svg';
import IcMenu from '@/assets/icons/ic-filled-menu.svg';
import IcFlashFill from '@/assets/icons/ic-flash-fill.svg';
import IcFolder from '@/assets/icons/ic-folder.svg';
import IcHeartbeat from '@/assets/icons/ic-hearbeat.svg';
import IcHeartBold from '@/assets/icons/ic-heart-bold.svg';
import IcJob from '@/assets/icons/ic-job.svg';
import IcKanban from '@/assets/icons/ic-kanban.svg';
import IcMailCheckMark from '@/assets/icons/ic-mail-checkmark-24-filled.svg';
import IcMail from '@/assets/icons/ic-mail.svg';
import IcOrder from '@/assets/icons/ic-order.svg';
import IcTagHorizontalBold from '@/assets/icons/ic-tag-horizontal-bold-duotone.svg';
import IcTour from '@/assets/icons/ic-tour.svg';
import IcUserIdBold from '@/assets/icons/ic-user-id-bold.svg';
import IcUserGroupRounedBold from '@/assets/icons/ic-users-group-rouned-bold.svg';
import { useGlobalStore } from '@/stores';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface ISideBar {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function HomeSlideBar({ isOpen, setIsOpen }: ISideBar) {
  const { nhomDoiTuongCD, nhomDoiTuongDN } = useGlobalStore();
  const [isZoomed, setIsZoomed] = useState(false);

  const IconCongDan = [
    IcDashBoard,
    IcEcommerce,
    IcJob,
    IcHeartBold,
    IconBooking,
    IcUserIdBold,
    IcFlashFill,
    IcHeartbeat,
    IcFileSidebar,
    IcUserGroupRounedBold,
    IcFolder,
  ];

  const IconDoanhNghiep = [
    IcBlog,
    IcAnalytics,
    IcTour,
    IcOrder,
    IcCupStarBold,
    IcMail,
    IcBanking,
    IcMailCheckMark,
    IcTagHorizontalBold,
    IcKanban,
    IcCalendar,
  ];

  useEffect(() => {
    const checkZoom = () => {
      const scale = window.visualViewport?.scale || 1; // Nếu undefined, mặc định là 1
      setIsZoomed(scale > 1);
    };

    window.visualViewport?.addEventListener('resize', checkZoom);
    window.addEventListener('scroll', checkZoom);

    return () => {
      window.visualViewport?.removeEventListener('resize', checkZoom);
      window.removeEventListener('scroll', checkZoom);
    };
  }, []);

  if (isZoomed) return null;

  const getRoutePath = (id: number) => {
    return `/chi-tiet-danh-muc?maDanhMuc=${id}`;
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={IcMenu} alt='icon' />
      </button>
      <div
        style={{
          transform: isOpen ? 'translateX(0)' : `translateX(-${window.innerWidth}px)`,
        }}
        className={`scrollbar-custom fixed px-4 top-[var(--header-height)] left-0 h-[calc(100vh-var(--header-height))]  w-full md:w-[280px]  shadow-lg border-r border-gray-300 z-50 bg-white transform transition-transform duration-300 `}
      >
        <div
          style={{
            backgroundImage: `url(${BgSideBarHome})`,
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
            backgroundPosition: 'center bottom, center center, center bottom',
            backgroundSize: 'cover, cover, cover',
          }}
          className='h-full '
        >
          <h6 className='text-[14px] uppercase text-[#919EAB] font-weight-bold py-3 bg-white'>Cho cá nhân</h6>
          <ul>
            {nhomDoiTuongCD.map((item, index) => (
              <li key={item.nhomDoiTuongID} className='flex items-center gap-2' onClick={() => setIsOpen(false)}>
                <Link to={getRoutePath(item.nhomDoiTuongID)} className='py-2 px-1 flex items-center gap-2'>
                  <img src={IconCongDan[index]} alt='' className='w-5 h-5' />
                  <span className='pl-2 text-sm font-normal text-[#637381]'>{item.tenNhomDoiTuong}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h6 className='text-[14px] uppercase text-[#919EAB] font-weight-bold py-3 bg-white'>Cho doanh nghiệp</h6>
          <ul>
            {nhomDoiTuongDN.map((item, index) => (
              <li key={item.nhomDoiTuongID} className='flex items-center gap-2' onClick={() => setIsOpen(false)}>
                <Link to={getRoutePath(item.nhomDoiTuongID)} className='py-2 px-1 flex items-center gap-2'>
                  <img src={IconDoanhNghiep[index]} alt='' className='w-5 h-5' />
                  <span className='pl-2 text-sm font-normal text-[#637381]'>{item.tenNhomDoiTuong}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 top-[var(--header-height)] bg-black bg-opacity-50 z-40'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
