// This component displays the navigation bar and filter options.
// It handles user interactions with checkboxes and tab switching.

import React from 'react';
import './NavBar.css';


const NavBar = ({ selectedFilters, 
    setSelectedFilters, 
    nivels, 
    currentlySituations, 
    probableCauses, 
    provincias, 
    activeTab, 
    setActiveTab
    /* saveSelectedFiltersToLocalStorage */ }) => {


    // Add or remove the selected filter based on the checkbox state.
    const handleCheckboxChange = ( checkbox ) => {

        const key = Object.keys(checkbox)[0];
        const value = Object.values(checkbox)[0];

        // If object has same property key
        if (selectedFilters.hasOwnProperty(key) && selectedFilters[key] !== value) { 
            // If it's an array
            if (Array.isArray(selectedFilters[key])) {
                // If the array contains the value, remove it
                if (selectedFilters[key].includes(value)) {
                    const updatedArray = selectedFilters[key].filter((item) => item !== value);
                    if (updatedArray.length > 1) {
                         // If array has more than 1 element
                        setSelectedFilters({ ...selectedFilters, [key]: updatedArray });
                    } else if (updatedArray.length === 1) {
                        // If array has 1 element, transform array back into object
                        setSelectedFilters({
                            ...selectedFilters,
                            [key]: updatedArray[0]
                        })
                    }
                } else {
                    // If array does not contain the value, add new value
                    setSelectedFilters({
                        ...selectedFilters,
                        [key]: [...selectedFilters[key], value],
                      });
                }
                
            } else {
                // If it's not an array, convert it to an array and add the new value
                setSelectedFilters({
                    ...selectedFilters,
                    [key]: [selectedFilters[key], value],
                });
            }

        } else if (selectedFilters[key] === value) {
            // If object contains value, remove the key and value from object.
            const { [key]: deletedKey, ...rest } = selectedFilters;
            setSelectedFilters({ ...rest });
        } else {
            // If the key doesn't exist, add it with the value
            setSelectedFilters({
                ...selectedFilters,
                [key]: value,
            });
        }

    };
    

    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };


    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" className='navBar'>
                    <ul class="navbar-nav">
                        {/* <li class="nav-item dropdown-center">
                            <button class="btn nav-item" onClick={saveSelectedFiltersToLocalStorage}>Save Filters</button>
                        </li> */}
                        <li class="nav-item dropdown-center">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Nivel Maximo Alcanzado
                            </a>
                            <ul class="dropdown-menu">
                                {nivels && nivels.map((nivel) => (
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" 
                                            value={nivel.nivel_maximo_alcanzado} 
                                            id={nivel.nivel_maximo_alcanzado} 
                                            onChange={() => handleCheckboxChange({'nivel_maximo_alcanzado': nivel.nivel_maximo_alcanzado})}/>
                                            <label class="form-check-label" for="flexCheckDefault">
                                                {nivel.nivel_maximo_alcanzado}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li class="nav-item dropdown-center">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Situacion Actual
                            </a>
                            <ul class="dropdown-menu">
                                {currentlySituations && currentlySituations.map((situation) => (
                                    <li class='"w-50 p-3'>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox"
                                            value={situation.situacion_actual} 
                                            id={situation.situacion_actual} 
                                            onChange={() => handleCheckboxChange(situation)}
                                            />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                {situation.situacion_actual}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li class="nav-item dropdown-center">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Causa Probable
                            </a>
                            <ul class="dropdown-menu">
                                {probableCauses && probableCauses.map((cause) => (
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox"
                                            value={cause.causa_probable} 
                                            id={cause.causa_probable} 
                                            onChange={() => handleCheckboxChange(cause)}
                                            />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                {cause.causa_probable}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li class="nav-item dropdown-center">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Provincia
                            </a>
                            <ul class="dropdown-menu">
                                {provincias && provincias.map((provincia) => (
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox"
                                            value={provincia.provincia} 
                                            id={provincia.provincia} 
                                            onChange={() => handleCheckboxChange(provincia)}
                                            />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                {provincia.provincia}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <button class="btn nav-item">
                        <a class='nav-link' href="#"
                            onClick={() => {
                                if (activeTab === 'Table') {
                                    handleTabChange('Map')
                                } else {
                                    handleTabChange('Table')
                                }
                                }}> {activeTab} </a>
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default NavBar;