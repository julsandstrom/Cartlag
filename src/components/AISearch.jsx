import { useState, useMemo } from "react";

const allowedSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const BRANDS = [
  "Nike",
  "Adidas",
  "Puma",
  "Under Armour",
  "New Balance",
  "Reebok",
  "Asics",
  "H&M",
  "Zara",
  "Uniqlo",
  "Levi's",
  "Gap",
  "Patagonia",
  "The North Face",
  "Columbia",
  "Carhartt",
  "Arcteryx",
  "COS",
  "Everlane",
  "Lululemon",
  "Gymshark",
  "Bershka",
  "Pull&Bear",
  "Monki",
  "Weekday",
  "Peak Performance",
  "Gant",
  "Filippa K",
];
const AISearch = ({ selected, setSelected, partNames }) => {
  const [valueCm, setValueCm] = useState(90);
  const [brand, setBrand] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const sliderMin = 30;
  const sliderMax = 180;

  const cacheKey = useMemo(
    () => `${brand.toLowerCase()}|${selected}|${valueCm}`,
    [brand, selected, valueCm]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setResult("");
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/ai-size", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brand.trim(),
          bodyPart: selected,
          valueCm: Number(valueCm),
          allowed: allowedSizes,
        }),
      });
      const data = await res.json();
      const size = data?.size ?? "X";
      if (size === "X") {
        console.log("error. stop");
        setErr("AI is unavailable right now.");
        return;
      }
      sessionStorage.setItem(cacheKey, size);
      setResult(size);
    } catch (e) {
      setErr("AI is unavailable right now.");
      setResult("X");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center gap-5 lg:gap-9 border border-yellow-900  py-5 px-11 rounded-xl">
      <h3 className="font-semibold text-xl md:text-2xl">
        Find your size with AI
      </h3>

      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-6 md:gap-11 lg:gap-12  w-full"
      >
        <label className="flex items-center gap-2  md:text-xl">
          <span>Body part</span>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border px-2 py-1 bg-white text-[#232121] md:text-xl"
          >
            {partNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col items-center md:text-xl">
          <span className="mb-1">
            Measurement (cm): <b>{valueCm}</b>
          </span>
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={1}
            value={valueCm}
            onChange={(e) => setValueCm(e.target.value)}
            className="max-w-[260px]"
          />
        </label>
        <label className="flex items-center gap-2  md:text-xl">
          <span>Brand</span>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-md border px-2 w-52 py-1 bg-white text-[#232121] md:text-xl"
          >
            {BRANDS.map((name) => (
              <option key={name} value={name} className="w-20">
                {name}
              </option>
            ))}
          </select>
        </label>
        {/* <label className="flex items-center gap-2 mb-5 md:text-xl">
          <span>Brand</span>
          <input
            type="text"
            placeholder="e.g. Nike"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-md border px-2 py-1 md:text-xl md:py-5"
          />
        </label> */}

        <button
          className={`inline-flex items-center justify-center
            h-11 px-4  rounded-xl bg-white text-[#232121]
            shadow-sm hover:shadow-lg transition duration-200 ease-out
            hover:scale-105 active:scale-95 hover:-translate-y-0.5
            focus-visible:outline-none focus-visible:ring-4
            focus-visible:ring-[#BE9C3D]/60 focus-visible:ring-offset-2
            focus-visible:ring-offset-black transform-gpu
            disabled:opacity-50 disabled:pointer-events-none md:text-xl`}
          disabled={loading || !brand}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="min-h-6">
        {err && <p className="text-red-600">{err}</p>}
        {!err && result && result !== "X" && (
          <div className="flex flex-col justify-center items-center py-5 md:text-xl">
            <p>{brand}</p>
            <p>
              Recommended size: <b>{result}</b>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AISearch;
