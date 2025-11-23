import Header from "./Header";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-16 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute top-1/3 -left-16 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/20 blur-[180px]" />
      </div>

      <div className="relative flex min-h-screen">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-10">
            <div className="mx-auto min-h-full max-w-7xl rounded-[32px] border border-white/30 bg-white/90 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.2)] backdrop-blur">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
