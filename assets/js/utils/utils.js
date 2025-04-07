
// VIDER INPUTS
export function clearInput(event, callback) {
    // console.log(event)
    const cross = event.currentTarget
    // console.log(cross)
    const input = cross.closest("form").querySelector("input"); 
    // console.log(input)
    input.value = ''
    callback() //remplace la fonction displaySearch passée en callback dans le eventListener de l'index.js
            // permet donc remise à 0 des cards recettes
}