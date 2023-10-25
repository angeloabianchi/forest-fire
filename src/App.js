// This is the main React component for the application.
// It manages the state and rendering of the application.

import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Component/NavBar/NavBar';
import Table from './Pages/Table/Table';
import Map from './Pages/Map/Map';
import { GetData } from './Component/GetData/GetData';



const App = () => {

  const [selectedFilters, setSelectedFilters] = useState({});
  const [nivels, setNivels] = useState();
  const [currentlySituations, setCurrentlySituations] = useState();
  const [probableCauses, setProbableCauses] = useState();
  const [provincias, setProvincias] = useState();
  const group_by = ['causa_probable', 'provincia', 'situacion_actual', 'nivel_maximo_alcanzado'];
  const [activeTab, setActiveTab] = useState('Table');
  const [animate, setAnimate] = useState(true);
  /* const [filterStorage, setFilterStorage] = useState(); */



  /* const saveSelectedFiltersToLocalStorage = () => {
    console.log(`selected filters - ${JSON.stringify(selectedFilters)}`)
    localStorage.setItem('selectedFilters', selectedFilters);
    setFilterStorage(localStorage.selectedFilters);
    console.log(`filterStorage - ${JSON.stringify(filterStorage)}`)
    console.log(`localStorage - ${JSON.stringify(localStorage)}`)
  }; */


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

    setAnimate(true);
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 1000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);

}, [activeTab])

  /* console.log(`selectedFilters - ${JSON.stringify(selectedFilters)}`) */

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
          provincias={provincias}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          /* saveSelectedFiltersToLocalStorage={saveSelectedFiltersToLocalStorage} */
          />
        </header>
      </div>
      
      <div className="Content">
        <main>
          <div className='container'>
            {activeTab === 'Map' ? (
              <div className={animate ? 'display' : ''}><Map /></div>
            ) : (
              <div>
                <div className='storageFilters'>
                  {/* <ul>
                    {filterStorage && filterStorage.map((filter) => (
                      <li>{JSON.stringify(filter)}</li>
                    ))}
                  </ul> */}
                </div>              
                <div className={animate ? 'display' : ''}><Table selectedFilters={selectedFilters} /></div>

              </div>
            )}
            </div>
        </main>
      </div>
      <div className="footer"> </div>
    </div>
  );
}

export default App;
