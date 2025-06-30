import { Outlet } from "react-router";

export default function AboutLayout() {
  return (
    <div className="p-6 border-2 border-indigo-200 rounded-xl my-6">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">About Section Layout</h2>
      <Outlet />
    </div>
  );
}
