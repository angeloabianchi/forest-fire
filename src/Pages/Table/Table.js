import React, { useState, useEffect } from 'react';
import './Table.css';
import { GetData } from '../../Component/GetData/GetData';

const Table = ({ selectedFilters }) => {

    const [data, setData] = useState('');
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(false);
    const [initialLoadDone, setInitialLoadDone] = useState(false);
    const maxLimit = 100;


    const fetchData = async () => {
        try {
            const newData = await GetData(null, limit, selectedFilters);
            setData(newData);
            setInitialLoadDone(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        console.log(`selectedFilters - ${selectedFilters}`)

        fetchData();

        const loadMoreData = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                if (!loading && initialLoadDone) {
                    setLoading(true);
                    GetData(null, limit, selectedFilters)
                        .then((result) => {
                            setData((prevData) => [...prevData, ...result]);
                            setLimit(maxLimit);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching more data:', error);
                            setLoading(false);
                        });
                }
            }
        };

        window.addEventListener('scroll', loadMoreData);

        return () => {
            window.removeEventListener('scroll', loadMoreData);
        };

    }, [selectedFilters, limit, initialLoadDone]);
    

    return (
        <div class="container-fluid table-responsive ">
            <table class="table table-hover shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <thead class="table-dark">
                    <tr class="align-middle">
                        <th scope="col">Fecha del Parte</th>
                        <th scope="col">Hora del Parte</th>
                        <th scope="col">Provincia</th>
                        <th class="text-center" scope="col">Causa Probable</th>
                        <th scope="col">Termino Municipal</th>
                        <th scope="col">Nivel</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Hora Inicio</th>
                        <th scope="col">Medios de Extioncion</th>
                        <th scope="col">Situacion Actual</th>
                        <th scope="col">Tipo y Has de Superficie Afectada</th>
                        <th scope="col">Fecha Extinguido</th>
                        <th scope="col">Hora Extinguido</th>
                        <th scope="col">Código INE</th>
                        <th scope="col">Nivel Maximo Alcanzado</th>
                        <th scope="col">Posicion</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    {data && data.map((item) => (
                        <tr class="align-middle">
                            <th class="text-nowrap" scope="row">{item.fecha_del_parte}</th>
                            <th scope="row">{`${item.hora_del_parte}`}</th>
                            <th scope="row">{`${item.provincia}`}</th>
                            <th scope="row">{`${item.causa_probable}`}</th>
                            <th scope="row">{`${item.termino_municipal}`}</th>
                            <th scope="row">{`${item.nivel}`}</th>
                            <th class="text-nowrap" scope="row">{`${item.fecha_inicio}`}</th>
                            <th scope="row">{`${item.hora_ini}`}</th>
                            <th scope="row">{`${item.medios_de_extincion}`}</th>
                            <th scope="row">{`${item.situacion_actual}`}</th>
                            <th scope="row">{`${item.tipo_y_has_de_superficie_afectada}`}</th>
                            <th class="text-nowrap" scope="row">{`${item.fecha_extinguido}`}</th>
                            <th scope="row">{`${item.hora_extinguido}`}</th>
                            <th scope="row">{`${item.codigo_municipio}`}</th>
                            <th scope="row">{`${item.nivel_maximo_alcanzado}`}</th>   
                            <th scope="row">{`${item.posicion}`}</th>           
                    </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default Table;