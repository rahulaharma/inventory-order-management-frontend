import { HomeIcon, CubeIcon, UsersIcon, ShoppingCartIcon, ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../pages/useAuth";

const allNavigationLinks = [
    { name: 'DashBoard', to: '/', icon: HomeIcon, allowedRoles: ['SALESSTAFF', 'WAREHOUSESTAFF', 'ADMIN'] },
    { name: 'Products', to: '/products', icon: CubeIcon, allowedRoles: ['SALESSTAFF', 'ADMIN'] },
    { name: 'Inventory', to: '/inventory', icon: ArchiveBoxIcon, allowedRoles: ['WAREHOUSESTAFF', 'ADMIN'] },
    { name: 'Orders', to: '/orders', icon: ShoppingCartIcon, allowedRoles: ['SALESSTAFF', 'ADMIN'] },
    { name: 'Customers', to: '/customers', icon: UsersIcon, allowedRoles: ['SALESSTAFF', 'ADMIN'] }
];

const SideBar = () => {
  const { user } = useAuth();
  const activeRole = user?.role?.toUpperCase();

  const navigation = allNavigationLinks.filter(
    (link) => activeRole && link.allowedRoles.includes(activeRole)
  );

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-white/5 text-white shadow-2xl backdrop-blur-2xl">
      <div className="border-b border-white/10 px-6 py-8">
        <p className="text-xs uppercase tracking-[0.5em] text-slate-300">NEXUS</p>
        <p className="mt-2 text-2xl font-black tracking-tight">IMS Portal</p>
        <p className="text-sm text-slate-300">Everything in one view</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `${isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {activeRole && (
        <div className="border-t border-white/10 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Role</p>
          <p className="mt-2 font-semibold text-white">{activeRole.toLowerCase()}</p>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
