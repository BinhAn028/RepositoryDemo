import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/countries";
import { useState } from "react";

export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

// export async function loader() {
//   const lstUsers = [{
//     name: 'AAA',
//   }]
//   console.log("Lst User data loaded:", lstUsers);
//   return lstUsers;
// }

export async function loader() {
  // const res = await fetch("https://restcountries.com/v3.1/all");
  const data: any = null;
  console.log("Countries data loaded:", data);
  if (!Array.isArray(data)) {
    return [
      {
        name: { common: "N/A", official: "N/A" },
        region: "N/A",
        population: 0,
        flags: { png: "" },
      },
      {
        cca3: "N/A",
        population: 0,
        region: "N/A",
        name: { common: "N/A", official: "N/A" },
        flags: { png: "" }
      }
    ];
  }
  return data;
}

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const user = useLoaderData(); // Tự động lấy data từ loader trả về

  console.log("User data:", user);
  
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  loaderData = loaderData || [
    {
      name: { common: "N/A", official: "N/A" },
      region: "N/A",
      population: 0,
      flags: { png: "" },
    },
  ];
  const filteredCountries = loaderData?.filter((country: any) => {
    const matchesRegion =
      !region || country.region.toLowerCase() === region.toLowerCase();
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Regions</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {filteredCountries.length === 0 ? (
        <div> No countries match your filters. </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCountries.map((country: any) => (
            <li
              key={country.cca3}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <Link
                to={`/countries/${country.name.common}`}
                className="text-indigo-600 hover:underline text-lg font-semibold"
              >
                {country.name.common}
              </Link>
              <div className="text-gray-600 text-sm mt-1">
                Region: {country.region} <br />
                Population: {country.population}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
