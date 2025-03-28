

export default function templateFilters(data) {

    const li = document.createElement('li')
    li.setAttribute('data-id', data)
    li.textContent = data


    return li
}
