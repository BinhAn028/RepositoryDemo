import { useFetcher } from "react-router";
import { useState } from "react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  // Demo: pretend to save and return a message
  return { message: `Hello, ${name || "stranger"}!` };
}

export default function FetcherDemo() {
  const fetcher = useFetcher();
  const [input, setInput] = useState("");

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Demo Fetcher Action</h2>
      <fetcher.Form method="post" className="flex flex-col gap-4">
        <input
          name="name"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your name"
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Greet Me
        </button>
      </fetcher.Form>
      {fetcher.data?.message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          {fetcher.data.message}
        </div>
      )}
    </div>
  );
}
