
// OPEN/CLOSE DROPDOWNS MENUS

export function toggleBtn(event) {
    const container = event.target.closest('.select-container')
    const target = container.querySelector('.dropdown-btn')

    if (event.target.closest('form')) {
        return;
    } 
    // comme container.addEventListener('click', toggleBtn) => chaque clic toggle bloc.
    // Sauf que input dans container => bloquer toggle avec if. 
    target.classList.contains('fa-chevron-down') ? target.classList.replace('fa-chevron-down', 'fa-chevron-up') : target.classList.replace('fa-chevron-up', 'fa-chevron-down');

    stateDropdowns(target)
    closeOtherMenus(target)
}

function stateDropdowns(target) {

    const container = target.closest('.select-container')
    const input = container.querySelector('input')
    const menu = container.querySelector('.select-content-dropdown')
    const cross = input.closest('form').querySelector('.cross')
    const isOpening = target.classList.contains('fa-chevron-up') //renvoie booléen

    if (isOpening) {
        menu.classList.add('open-dropdown') 
        menu.style.display = 'block'
    } else {
        menu.classList.remove('open-dropdown')
        menu.style.display = 'none'
        input.value = '';
        cross.style.visibility = 'hidden';
    }
}


function closeOtherMenus(target) {
    const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
    allDropdownBtns.forEach((btn) => {
        if (btn !== target) {
            closeMenus(btn)
        }
    })
}

function closeMenus(btn) {

    const container = btn.closest('.select-container')
    const input     = container.querySelector('input')
    const menu      = container.querySelector('.select-content-dropdown')
    const cross     = input.closest('form').querySelector('.cross')

    btn.classList.add('fa-chevron-down')
    btn.classList.remove('fa-chevron-up')
    menu.classList.remove('open-dropdown')
    menu.style.display ='none'
    input.value = ''
    cross.style.visibility = 'hidden'
}

document.addEventListener('click', (event) => {
     if (!event.target.closest('.select-container')) {
        const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
        allDropdownBtns.forEach((btn) => {
            closeMenus(btn)
        })
    }
})


// INPUTS
export function displayCross(event) {
    const target = event.target
    const cross = target.closest('form').querySelector('.cross')
    target.value === "" ? cross.style.visibility ='hidden' : cross.style.visibility ='visible';
}

// CLEAR INPUTS
export function clearInputs(e) {
    const target = e.target
    const input = target.closest("form").querySelector("input")
    target.style.visibility ='hidden'
    input.value = ''
}