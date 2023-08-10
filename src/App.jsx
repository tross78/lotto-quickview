import { useState, useEffect } from 'react';
import { fetchData } from './api/apiService';
import './App.css';
import DrawOverview from './components/DrawOverview';
function App() {
  const [lottoData, setLottoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLottoData() {
      try {
        const data = await fetchData({
          api_url: 'https://data.api.thelott.com/sales/vmax/web/data/lotto/',
          endpoint: 'latestresults',
          company_id: 'GoldenCasket',
          max_draw_count: 20,
          product_filter: [
            "OzLotto",
            "Powerball",
            "MonWedLotto",
            "setforlife744"
        ]
        });
        setLottoData(data);
      } catch (error) {
        console.error("Error fetching lotto data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLottoData();
  }, []);

  return (
    <div className="app-container">
      <h1>Lotto QuickView</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) :  (<DrawOverview allDraws={lottoData} />)}
    </div>
  );
}

export default App;
