import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/useAuth';
import NotificationBell from './NotificationBell';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const formattedRole = user?.role ? user.role.toLowerCase() : 'guest';

  return (
    <header className="border-b border-white/30 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-slate-800 sm:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-indigo-500">Control Center</p>
          <p className="text-xl font-semibold text-slate-900">Inventory overview</p>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 sm:flex-none">
          <NotificationBell />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{formattedRole}</p>
            <p className="text-xs text-slate-500">Stay focused & productive</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
