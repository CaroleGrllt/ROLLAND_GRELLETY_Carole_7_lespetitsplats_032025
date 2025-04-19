

export default function templateFilters(data, datatype) {

    const li = document.createElement('li')
    li.setAttribute('data-id', data)
    li.setAttribute('data-type', datatype)
    li.textContent = data


    return li
}


// const container = document.createElement('div');
// container.classList.add('select-container', 'select-ingredients-container', 'py-2', 'py-md-4');

// const label = document.createElement('div');
// label.classList.add('select-label', 'bg-white', 'rounded', 'd-flex', 'justify-content-between', 'align-items-center');

// const title = document.createElement('span');
// title.classList.add('title', 'ingredients-title');
// title.textContent = 'Ingrédients';

// const dropdownBtn = document.createElement('span');
// dropdownBtn.classList.add('dropdown-btn', 'fa-solid', 'fa-chevron-down');
// dropdownBtn.style.cursor = 'pointer';

// label.append(title, dropdownBtn);

// const dropdown = document.createElement('div');
// dropdown.classList.add('select-content-dropdown', 'bg-white', 'rounded-bottom');
// dropdown.style.display = 'none';

// const form = document.createElement('form');
// form.classList.add('select-input', 'rounded', 'd-flex', 'justify-content-between', 'border', 'bg-white', 'p-1', 'mx-3', 'mb-4', 'mb-md-3');

// const input = document.createElement('input');
// input.classList.add('input', 'search-ingredients', 'border-0', 'col-10', 'col-md-8');
// input.type = 'text';

// const searchActions = document.createElement('div');
// searchActions.classList.add('d-flex', 'col-2', 'col-md-4', 'justify-content-around', 'align-items-center');

// const clearBtn = document.createElement('span');
// clearBtn.classList.add('clear-button-ingredients', 'd-flex', 'justify-content-center', 'align-items-center');

// const xIcon = document.createElement('i');
// xIcon.classList.add('cross', 'xmark-ingredients', 'fa-solid', 'fa-xmark');
// clearBtn.appendChild(xIcon);

// const glassIcon = document.createElement('i');
// glassIcon.classList.add('glass-ingredients', 'fa-solid', 'fa-magnifying-glass');

// searchActions.append(clearBtn, glassIcon);
// form.append(input, searchActions);

// const selectIngredients = document.createElement('div');
// selectIngredients.classList.add('select-ingredients');

// const ul = document.createElement('ul');
// ul.classList.add('p-0', 'm-0', 'list-unstyled');

// const li = document.createElement('li')
// li.setAttribute('data-id', data)
// li.textContent = data

// ul.appendChild(li)
// selectIngredients.appendChild(ul);
// dropdown.append(form, selectIngredients);

// container.append(label, dropdown);