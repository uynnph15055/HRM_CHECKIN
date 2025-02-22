import { CONFIG } from '@/config';
import { useAuthStore, useNopThuTucStore, useThanhToanTrucTuyenStore } from '@/stores';
import { useHoSoCuaToiStore } from '@/stores/ho-so-ca-nhan.store';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const { chiTietHoSo } = useNopThuTucStore();
  const { ttThanhToanHSCaNhan } = useHoSoCuaToiStore();
  const { ttThanhToanTrucTuyen } = useThanhToanTrucTuyenStore();
  const navigate = useNavigate();

  const hasData = (obj: any) => obj && Object.keys(obj).length > 0;

  useEffect(() => {
    if (!user) {
      const redirectUri =
        CONFIG.IS_PRODUCTION === 'production'
          ? `${CONFIG.SSO_ENDPOINT}&redirect_uri=${window.origin}/oauth&scope=openid&response_type=code&redirect=${encodeURIComponent(window.location.origin)}`
          : `/oauth?code=code.default&redirect=${encodeURIComponent(window.location.origin)}`;

      window.location.href = redirectUri;
      return;
    }

    if (hasData(chiTietHoSo) || hasData(ttThanhToanHSCaNhan) || hasData(ttThanhToanTrucTuyen)) {
      if (window.location.pathname !== window.location.pathname) {
        navigate({ to: window.location.pathname });
      }
    }
    return;
  }, [user, chiTietHoSo, ttThanhToanHSCaNhan, ttThanhToanTrucTuyen, navigate]);

  if (!user) return null;

  return <>{children}</>;
}
