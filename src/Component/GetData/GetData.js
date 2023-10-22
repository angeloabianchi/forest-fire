// This module handles data fetching from an external API.
// It constructs the URL for the API request and fetches the data.

const generateURL = (group, limit, selectedFilter) => {
    const baseURL = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?';

    let url = '';
    

    if (group && selectedFilter === null) {
        url = `${baseURL}group_by=${group}&limit=${limit}&offset=0&timezone=UTC&include_links=false&include_app_metas=false`;
    } else if (!group && selectedFilter.length === 0) {
        url = `${baseURL}limit=${limit}`;
    } else if (selectedFilter.length > 0) {
        url =  `${baseURL}where=`;
        let isFirstFilter = true;
        let andOrOr = 'AND';
        const keyCount = {};
        for (const filters of selectedFilter) {
            const key = Object.keys(filters.selectedCheckbox);
            const values = JSON.stringify(Object.values(filters.selectedCheckbox)).slice(2, -2);
            let stringValues = values.replaceAll(' ', '%20');

            if (!keyCount[key]) {
                keyCount[key] = 1;
                andOrOr = 'AND';
            } else {
                keyCount[key]++;
                andOrOr = keyCount[key] % 2 === 0 ? 'OR' : 'AND';
            }


            console.log(`filters.selectedCheckbox - ${filters}`)
            if (!isFirstFilter) {
                url += `%20${andOrOr}%20search(${key}%2C%20%22${stringValues}%22)`;  
            } else {
                url += `search(${key}%2C%20%22${stringValues}%22)`;
                isFirstFilter = false;
        }
        }

        url += `&limit=${limit}`
        console.log(`url - ${url}`)
        
    }

    return url;
}

    // Fetch data from an external API based on the provided parameters.
    // group: Grouping parameter for data retrieval (null for no grouping).
    // limit: The maximum number of records to fetch.
    // selectedFilter: An array of selected filters for data refinement.
    // Returns the fetched data as an array.
const GetData = async (group, limit, selectedFilter) => {

    const fetch = require('node-fetch'); 
    const url = generateURL(group, limit, selectedFilter);


    return await fetch(url)
    .then(res => res.json())
    .then(data => {
        const results = data.results;
            return results;
    })
    .catch(err => console.error('error:' + err));

}

export {GetData};