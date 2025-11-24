import { useState } from "react";
import { Country, State, City } from "country-state-city";

export default function From() {
  const countries = Country.getAllCountries(); // 🌍 All countries

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [searchCountry, setSearchCountry] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // Dynamic states + cities
  const states = country ? State.getStatesOfCountry(country) : [];
  const cities = state ? City.getCitiesOfState(country, state) : [];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        Where are you from?
      </h2>

      {/* COUNTRY */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Country</p>

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Search country..."
          value={
            countries.find((c) => c.isoCode === country)?.name ||
            searchCountry
          }
          onChange={(e) => {
            setCountry("");
            setState("");
            setCity("");
            setSearchCountry(e.target.value);
          }}
        />

        {!country && (
          <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
            {countries
              .filter((c) =>
                c.name.toLowerCase().includes(searchCountry.toLowerCase())
              )
              .map((c) => (
                <div
                  key={c.isoCode}
                  onClick={() => {
                    setCountry(c.isoCode);
                    setSearchCountry("");
                  }}
                  className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {c.name}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* STATE */}
      {country && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">State</p>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Search state..."
            value={
              states.find((s) => s.isoCode === state)?.name || searchState
            }
            onChange={(e) => {
              setState("");
              setCity("");
              setSearchState(e.target.value);
            }}
          />

          {!state && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
              {states
                .filter((s) =>
                  s.name.toLowerCase().includes(searchState.toLowerCase())
                )
                .map((s) => (
                  <div
                    key={s.isoCode}
                    onClick={() => {
                      setState(s.isoCode);
                      setSearchState("");
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {s.name}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* CITY */}
      {state && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">City</p>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Search city..."
            value={city || searchCity}
            onChange={(e) => {
              setCity("");
              setSearchCity(e.target.value);
            }}
          />

          {!city && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
              {cities
                .filter((ct) =>
                  ct.name.toLowerCase().includes(searchCity.toLowerCase())
                )
                .map((ct) => (
                  <div
                    key={ct.name}
                    onClick={() => {
                      setCity(ct.name);
                      setSearchCity("");
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {ct.name}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
