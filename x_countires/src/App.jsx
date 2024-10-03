import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [image, setImage] = useState([]);
  async function fetchCountryImages() {
    try{ 
    const data = await fetch(
      "https://xcountries-backend.azurewebsites.net/all"
    );
    const countryDetails = await data.json();
    setImage(countryDetails);
  }
  catch(e){
   console.error("Error fetching data: ", e);
  }
  }
  useEffect(() => {
    fetchCountryImages();
  }, []);
  return (
    <div className="flag-container">
      {image.map((country, index) => (
        <div key={index} className="flag-item">
          <img src={country.flag} alt={`${country.name} flag`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
