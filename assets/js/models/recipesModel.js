/*********************************************************************************
*
* Link to JSON file
*
/*********************************************************************************/

export default function dataRecipes() {

    async function getData() {
        try {
            const url = new URL('../../assets/data/recipes.json', import.meta.url);
            const res = await fetch(url);
            return await res.json();
        } catch (err) {
            console.log("Une erreur s'est produite dans la récupération des données json :", err);
            return { recipes: [] };
        }
    }

    async function getAllRecipes() {
        let data = await getData()
        return data.recipes
    }

    return { getAllRecipes }
}