import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books.slice();

//const starting = document.createDocumentFragment()

// for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
//     const element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `

//     starting.appendChild(element)
// }

/**
 * Renders a list of books to the page based on the provided data.
 * @param {Array} books - The list of book objects to render.
 */

function renderBooks(booksToRender) {
    const fragment = document.createDocumentFragment();

    for (const { author, id, image, title } of booksToRender) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);
}

// Initial render of the first page of books
renderBooks(matches.slice(0, BOOKS_PER_PAGE));



/* document.querySelector('[data-list-items]').appendChild(starting)

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)
*/

/**
 * Renders genre options to the genre dropdown menu.
 * @param {Object} genres - Object containing genre IDs and names.
 */
function renderGenres(genres) {
    const genreFragment = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreFragment.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreFragment.appendChild(element);
    }

    document.querySelector('[data-search-genres]').appendChild(genreFragment);
}

/**
 * Renders author options to the author dropdown menu.
 * @param {Object} authors - Object containing author IDs and names.
 */
function renderAuthors(authors) {
    const authorFragment = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorFragment.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorFragment.appendChild(element);
    }

    document.querySelector('[data-search-authors]').appendChild(authorFragment);
}

// Initial render of genre and author dropdown menus
renderGenres(genres);
renderAuthors(authors);


// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.querySelector('[data-settings-theme]').value = 'night'
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
// } else {
//     document.querySelector('[data-settings-theme]').value = 'day'
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
// }

/**
 * Sets the theme of the page based on the user's selection.
 * @param {string} theme - The theme to apply to the page.
 */
function setTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        document.querySelector('[data-settings-theme]').value = 'night';
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        document.querySelector('[data-settings-theme]').value = 'day';
    }
}

// Set initial theme based on user's preference
setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');


/** Toggles the visibility of an overlay.
* @param {string} selector - CSS selector for the overlay element.
* @param {boolean} isOpen - Determines if the overlay should be open or closed.
*/
function toggleOverlay(selector, isOpen) {
    document.querySelector(selector).open = isOpen;
}

/** Initializes event listeners for button interactions.
*/
function initializeEventListeners() {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => toggleOverlay('[data-search-overlay]', false));
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => toggleOverlay('[data-settings-overlay]', false));

    document.querySelector('[data-header-search]').addEventListener('click', () => {
        toggleOverlay('[data-search-overlay]', true);
        document.querySelector('[data-search-title]').focus();
    });

    document.querySelector('[data-header-settings]').addEventListener('click', () => toggleOverlay('[data-settings-overlay]', true));
    document.querySelector('[data-list-close]').addEventListener('click', () => toggleOverlay('[data-list-active]', false));
}

// Initialize event listeners
initializeEventListeners();


/** Filters books based on the provided filters.
 * @param {Object} filters - The filter criteria including title, author, and genre.
 * @returns {Array} - Array of books that match the filter criteria.
 */
function filterBooks(filters) {
    return books.filter(book => {
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;

        return genreMatch && titleMatch && authorMatch;
    });
}

/** Handles the search form submission, filters books, and updates the book display.
 * @param {Event} event - The form submission event.
 */
function handleSearchFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = filterBooks(filters);

    page = 1;
    matches = result;

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';
    renderBooks(result.slice(0, BOOKS_PER_PAGE));

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleOverlay('[data-search-overlay]', false);
}

// Attaach event listener to search form submission
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmission);


/** Handles pagination by displaying the next set of books.
*/
function handlePagination() {
    const fragment = document.createDocumentFragment();
    const start = page * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;

    renderBooks(matches.slice(start, end));

    page += 1;

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
}

// Attach the pagination event listener
document.querySelector('[data-list-button]').addEventListener('click', handlePagination);



// document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
// document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

// document.querySelector('[data-list-button]').innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
// `

// document.querySelector('[data-search-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-header-search]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = true 
//     document.querySelector('[data-search-title]').focus()
// })

// document.querySelector('[data-header-settings]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = true 
// })

// document.querySelector('[data-list-close]').addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = false
// })

// document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const { theme } = Object.fromEntries(formData)

//     if (theme === 'night') {
//         document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//         document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//     } else {
//         document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//         document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//     }
    
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     const result = []

//     for (const book of books) {
//         let genreMatch = filters.genre === 'any'

//         for (const singleGenre of book.genres) {
//             if (genreMatch) break;
//             if (singleGenre === filters.genre) { genreMatch = true }
//         }

//         if (
//             (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
//             (filters.author === 'any' || book.author === filters.author) && 
//             genreMatch
//         ) {
//             result.push(book)
//         }
//     }

//     page = 1;
//     matches = result

//     if (result.length < 1) {
//         document.querySelector('[data-list-message]').classList.add('list__message_show')
//     } else {
//         document.querySelector('[data-list-message]').classList.remove('list__message_show')
//     }

//     document.querySelector('[data-list-items]').innerHTML = ''
//     const newItems = document.createDocumentFragment()

//     for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         newItems.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(newItems)
//     document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

//     document.querySelector('[data-list-button]').innerHTML = `
//         <span>Show more</span>
//         <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
//     `

//     window.scrollTo({top: 0, behavior: 'smooth'});
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-list-button]').addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()

//     for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(fragment)
//     page += 1
// })

// document.querySelector('[data-list-items]').addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null

//     for (const node of pathArray) {
//         if (active) break

//         if (node?.dataset?.preview) {
//             let result = null
    
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             } 
        
//             active = result
//         }
//     }
    
//     if (active) {
//         document.querySelector('[data-list-active]').open = true
//         document.querySelector('[data-list-blur]').src = active.image
//         document.querySelector('[data-list-image]').src = active.image
//         document.querySelector('[data-list-title]').innerText = active.title
//         document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         document.querySelector('[data-list-description]').innerText = active.description
//     }
// })