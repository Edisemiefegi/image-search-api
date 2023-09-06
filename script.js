const accesskey = "3r9xZ1RYHx-PnE6Ly3OqcDGpyY3ileQdr7Kp1OrbvKU"

const form = document.querySelector('form')
const searchInput = document.getElementById('search-inp')
const searchBtn = document.getElementById('search-btn')
const ShowMoreBtn = document.getElementById('showmore-btn')
const SearchResults = document.querySelector('.search-results')

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if(page == 1){
        SearchResults.innerHTML = ""
    }

    results.map((result) => {
        const imagewrapper = document.createElement('div')
        imagewrapper.classList.add('search-result')
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description


        imagewrapper.appendChild(image)
        imagewrapper.appendChild(imageLink)
        SearchResults.appendChild(imagewrapper)
    })

    page++
    if(page > 1){
        ShowMoreBtn.style.display = 'block'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1
    searchImages()
})

ShowMoreBtn.addEventListener('click', (event) => {
    searchImages()
})

