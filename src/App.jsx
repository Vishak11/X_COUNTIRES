import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  async function fetchCountryImages() {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const countryDetails = await data.json();
      setImage(countryDetails);
    } catch (e) {
      console.error("Error fetching data: ", e);
    }
  }

  useEffect(() => {
    fetchCountryImages();
  }, []);

  // Filter countries based on search term
  const filteredCountries = image.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Country flags and names */}
      <div className="flag-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div key={index} className="countryCard">
              <img src={country.flags.png} alt={`${country.name.common} flag`} />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No matching countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
