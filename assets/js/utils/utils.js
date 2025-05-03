// ESCAPE INJECTIONS

export function escapeInjection(value) {
    const replacements = [
        { regex: /&/g, replacement: '&amp;' },
        { regex: /</g, replacement: '&lt;' },
        { regex: />/g, replacement: '&gt;' },
        { regex: /"/g, replacement: '&quot;' },
        { regex: /'/g, replacement: '&#39;' },
        { regex: /`/g, replacement: '&#96;' }
    ];

    for (let i = 0; i < replacements.length; i++) {
        value = value.replace(replacements[i].regex, replacements[i].replacement);
    }

    return value;
}

// OPEN/CLOSE DROPDOWNS MENUS

export function toggleBtn(event) {
    const container = event.target.closest('.select-container')
    const target = container.querySelector('.dropdown-btn')

    if (event.target.closest('form')) return

    if (target.classList.contains('fa-chevron-down')) {
        target.classList.replace('fa-chevron-down', 'fa-chevron-up')
    } else {
        target.classList.replace('fa-chevron-up', 'fa-chevron-down')
    }

    stateDropdowns(target)
    closeOtherMenus(target)
}

function stateDropdowns(target) {
    const container = target.closest('.select-container')
    const input = container.querySelector('input')
    const menu = container.querySelector('.select-content-dropdown')
    const cross = input.closest('form').querySelector('.cross')
    const isOpening = target.classList.contains('fa-chevron-up')

    if (isOpening) {
        menu.classList.add('open-dropdown')
        menu.style.display = 'block'
    } else {
        menu.classList.remove('open-dropdown')
        menu.style.display = 'none'
        input.value = ''
        cross.style.visibility = 'hidden'
    }
}

function closeOtherMenus(target) {
    const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
    for (let i = 0; i < allDropdownBtns.length; i++) {
        const btn = allDropdownBtns[i]
        if (btn !== target) {
            closeMenus(btn)
        }
    }
}

function closeMenus(btn) {
    const container = btn.closest('.select-container')
    const input = container.querySelector('input')
    const menu = container.querySelector('.select-content-dropdown')
    const cross = input.closest('form').querySelector('.cross')

    btn.classList.add('fa-chevron-down')
    btn.classList.remove('fa-chevron-up')
    menu.classList.remove('open-dropdown')
    menu.style.display = 'none'
    input.value = ''
    cross.style.visibility = 'hidden'
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.select-container')) {
        const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
        for (let i = 0; i < allDropdownBtns.length; i++) {
            closeMenus(allDropdownBtns[i])
        }
    }
})

// INPUTS
export function filterList(e, ul) {
    const string = e.target.value.toLowerCase().trim();
    const value = escapeInjection(string);    
    const filterItems = ul.querySelectorAll('li')

    for (let i = 0; i < filterItems.length; i++) {
        const filter = filterItems[i]
        const textFilter = filter.textContent
        const words = textFilter.split(' ')
        let matchingValue = false

        for (let j = 0; j < words.length; j++) {
            if (words[j].toLowerCase().startsWith(value)) {
                matchingValue = true
                break
            }
        }

        filter.style.display = matchingValue ? 'block' : 'none'
    }
}

export function displayCross(event) {
    const target = event.target
    const cross = target.closest('form').querySelector('.cross')
    cross.style.visibility = target.value === "" ? 'hidden' : 'visible'
}

// CLEAR INPUTS
export function clearInputs(e) {
    const target = e.target
    const input = target.closest("form").querySelector("input")
    target.style.visibility = 'hidden'
    input.value = ''

    const dropdown = target.closest('.select-content-dropdown')
    if (dropdown) {
        const ul = dropdown.querySelector('ul')
        const filterItems = ul.querySelectorAll('li')
        for (let i = 0; i < filterItems.length; i++) {
            filterItems[i].style.display = 'block'
        }
    }
}

// REMOVE TAGS
export function removeAllTags() {
    const tagsContainer = document.querySelector('.tags-container')
    const tags = tagsContainer.querySelectorAll('.tag')
    for (let i = 0; i < tags.length; i++) {
        tags[i].remove()
    }
}