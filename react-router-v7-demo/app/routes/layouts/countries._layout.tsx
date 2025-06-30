import { Outlet } from "react-router";

export default function CountriesLayout() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Countries Section Layout</h2>
      <Outlet />
    </div>
  );
}
