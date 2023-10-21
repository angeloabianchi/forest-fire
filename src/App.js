import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Component/NavBar/NavBar';
import Table from './Pages/Table/Table';
import { GetData } from './Component/GetData/GetData';



const App = () => {

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [nivels, setNivels] = useState();
  const [currentlySituations, setCurrentlySituations] = useState();
  const [probableCauses, setProbableCauses] = useState();
  const [provincias, setProvincias] = useState();
  const group_by = ['causa_probable', 'provincia', 'situacion_actual', 'nivel_maximo_alcanzado'];


  useEffect(() => {
    const getNavData = async () => {
        const newData = {};
        for (const group of group_by) {
            try {
                const data = await GetData(group, 30, null);
                newData[group] = data;
            } catch (error) {
                console.error(`Error fetching ${group} data:`, error);
            }
        }

        setProbableCauses(newData['causa_probable']);
        setProvincias(newData['provincia']);
        setCurrentlySituations(newData['situacion_actual']);
        setNivels(newData['nivel_maximo_alcanzado']);
    }

    getNavData();

}, [])

  return(
    <div className="App">
      <div className="App-header">
        <header>
          <NavBar 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters}
          nivels={nivels}
          currentlySituations={currentlySituations}
          probableCauses={probableCauses}
          provincias={provincias} />
        </header>
      </div>
      
      <div className="Content">
        <main>
          <div>
            <Table 
            selectedFilters={selectedFilters} />
          </div>
        </main>
      </div>
      <div className="footer"> </div>
    </div>
  );
}

export default App;
