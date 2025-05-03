
export default function templateTags(name, type, oStateFilter, displayCards) {
    // Remplacer includes() par une boucle native
    const tags = oStateFilter.getTags();
    let existingTags = false;

    for (let i = 0; i < tags.length; i++) {
        if (tags[i] === name) {
            existingTags = true;
            break;
        }
    }

    if (existingTags) return null;

    oStateFilter.setTags(name);

    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.setAttribute('data-id', name);
    tag.setAttribute('data-type', type);

    const tagTitle = document.createElement('span');
    tagTitle.textContent = name;

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.style.cursor = 'pointer';

    tag.append(tagTitle, closeBtn);

    closeBtn.addEventListener('click', async (e) => {
        const target = e.target.closest('.tag');
        const targetId = target.dataset.id;
        const targetType = target.dataset.type;

        oStateFilter.unsetTags(targetId);

        if (targetType === 'ingredients') {
            oStateFilter.unsetIngredients(name);
        } else if (targetType === 'appliances') {
            oStateFilter.unsetAppliances();
        } else if (targetType === 'ustensils') {
            oStateFilter.unsetUstensils(name);
        }

        tag.remove();
        await displayCards();
    });

    return tag;
}