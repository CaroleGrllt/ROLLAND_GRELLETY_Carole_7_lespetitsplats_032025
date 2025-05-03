const tagsArray = []

export default function templateTags(name, type, oStateFilter, displayCards) {

    // const existingTags = tagsArray.includes(name)
    const existingTags = oStateFilter.getTags().includes(name)
    if (existingTags) return null

    oStateFilter.setTags(name)
    // tagsArray.push(name)
    // console.log(tagsArray)

    const tag = document.createElement('div')
    tag.classList.add('tag')
    tag.setAttribute('data-id', name)
    tag.setAttribute('data-type', type)
 
    const tagTitle = document.createElement('span')
    tagTitle.textContent = name
 
    const closeBtn = document.createElement('span')
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    closeBtn.style.cursor = 'pointer'

    tag.append(tagTitle, closeBtn)

    // closeBtn.addEventListener('click', async (e) => {
    //     console.log(e.target.closest('.tag'))
    //     const target = e.target.closest('.tag')
    //     const targetId = target.dataset.id
    //     const index = tagsArray.indexOf(targetId)

    //     tagsArray.splice(index, 1) // index de l'élément + nombre élément à suppr. (cf. MDN)
    //     console.log(tagsArray)

    //     tag.remove() //méthode retire l'élément courant du DOM (cf. MDN).

    //     if (type === 'ingredients') {
    //         oStateFilter.unsetIngredients(name);
    //     } else if (type === 'appliances') {
    //         oStateFilter.unsetAppliances();
    //     } else if (type === 'ustensils') {
    //         oStateFilter.unsetUstensils(name);
    //     }

    //     await displayCards()
    // })

    return tag
}