const queryString = require('query-string');

const generateURL = (group, limit, selectedFilter) => {
    const baseURL = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?';

    let url;

    if (group && selectedFilter === null) {
        url = `${baseURL}group_by=${group}&limit=${limit}&offset=0&timezone=UTC&include_links=false&include_app_metas=false`;
    } else if (!group && selectedFilter.length === 0) {
        url = `${baseURL}limit=${limit}`;
    } else if (selectedFilter.length > 0) {
        const filterStrings = [];
        for (const filters of selectedFilter) {
            const key = Object.keys(filters.selectedCheckbox);
            const value = JSON.stringify(Object.values(filters)[0]).slice(1, -1);
            console.log(`value Get Data - ${value}`)
            const stringValue = value.replace(' ', '%20');

            filterStrings.push(stringValue.replace(/"/g, ''));
        }
        
        /* console.log(`Key Get Data - ${Object.keys(selectedFilter[0].selectedCheckbox)}`)
        console.log(`Value Get Data 1 - ${JSON.stringify(Object.values(selectedFilter))}`) */

        console.log(`filterStrings: ${filterStrings}`)

        url = `${baseURL}limit=${limit}&refine=${filterStrings.join('&')}`;
    }

    console.log(url)

    return url;
}


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