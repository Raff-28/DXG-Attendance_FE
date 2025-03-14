import Cookies from "js-cookie";
import { ArrowLeftFromLine, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOutDialog } from "../dialog/Logout.Dialog";

export type SidebarMenu = {
  title: string;
  icon: React.ReactNode;
  link: string;
};
interface SidebarProps {
  children: React.ReactNode;
  menus: SidebarMenu[];
}

export const Sidebar = ({ children, menus }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {isModalOpen && (
        <LogOutDialog
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onConfirmLogout={() => {
            Cookies.remove("access_token");
            navigate("/login", { replace: true });
          }}
        />
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="cursor-pointer inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 
        focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-100 dark:bg-gray-800 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
          <h2 className="text-xl ms-1">DXG Attendance</h2>
          <ul className="space-y-2 font-medium">
            {menus.map((menu) => (
              <li key={menu.title}>
                <Link
                  to={menu.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  {menu.icon}
                  <span className="ms-3">{menu.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="flex items-center cursor-pointer p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <LogOut />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
          <div>
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
            >
              <ArrowLeftFromLine className="size-6" />
            </button>
          </div>
        </div>
      </aside>

      <div className={`px-4 transition-all ${isOpen ? "ml-64" : "ml-0"}`}>
        {children}
      </div>
    </>
  );
};
