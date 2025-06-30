import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-xl font-black text-gray-900 select-none">
              REST<span className="text-indigo-600">Explorer</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Countries
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/fetcher-demo"
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Fetcher Demo
            </NavLink>
            <NavLink
              to="/countdown-demo"
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Countdown Demo
            </NavLink>
            <NavLink
              to="/countdown-provider-demo"
              className={({ isActive }) =>
                `mr-5 font-medium hover:text-gray-900 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Countdown Provider Demo
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
