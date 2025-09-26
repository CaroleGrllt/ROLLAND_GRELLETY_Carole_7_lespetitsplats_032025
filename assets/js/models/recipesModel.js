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
      if (!res.ok) throw new Error(`HTTP ${res.status} sur ${res.url}`);
      return await res.json();
    } catch (err) {
      console.error("Récupération JSON : ", err);
      return { recipes: [] }; // évite le TypeError après coup
    }    }

    async function getAllRecipes() {
        let data = await getData()
        return data.recipes
    }

    return { getAllRecipes }
}