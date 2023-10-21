import React from 'react';
import './NavBar.css';


const NavBar = ({ selectedFilters, setSelectedFilters, nivels, currentlySituations, probableCauses, provincias, activeTab, setActiveTab}) => {



    const handleCheckboxChange = (selectedCheckbox) => {
        const existingFilterIndex = selectedFilters.findIndex(filter => filter.selectedCheckbox === selectedCheckbox);
    
        if (existingFilterIndex !== -1) {
            // Filter already exists, so remove it
            const updatedFilters = selectedFilters.filter(filter => filter.selectedCheckbox !== selectedCheckbox);
            setSelectedFilters(updatedFilters);
        } else {
            // Filter doesn't exist, so add it
            setSelectedFilters([...selectedFilters, { selectedCheckbox }]);
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
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
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
                                            onChange={() => handleCheckboxChange(nivel)}/>
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
                        <button class="btn btn-danger nav-item">
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