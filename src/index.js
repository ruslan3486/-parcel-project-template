import card from './templates/card.hbs';
import './sass/main.scss';
import NewsApiService from './new-serviece'
import LoadMoreBtn from './load-more-btn'

fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=1&per_page=12&key=22968189-f518494d66d88c5d71c698a06').then(r => r.json()).then(console.log());

const refs = {
     searchForm: document.querySelector('#search-form'),
     artieclesContainer: document.querySelector('.gallery'),
     loadMoreBtn: document.querySelector('.label')
}
const newsApiServiece = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({

     selector: '[data-action="load-more"]',

     hidden: true,

})
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = ''
function onSearch(e) {

     loadMoreBtn.disable()
     loadMoreBtn.show()
     e.preventDefault()
     clearHitsContainer()
     newsApiServiece.resetPage()
     newsApiServiece.query = e.currentTarget.elements.query.value
     newsApiServiece.fetchArtiecles().then(hits => {
          hitsContainer(hits);
          loadMoreBtn.enable;
          scroll()
     })
     loadMoreBtn.enable();



}

function onLoadMore() {

     loadMoreBtn.disable()
     newsApiServiece.fetchArtiecles().then(hits => {
          hitsContainer(hits)
          loadMoreBtn.enable()
          scroll()
     })



}

function hitsContainer(hits) {
     refs.artieclesContainer.insertAdjacentHTML('beforeend', card(hits))

}

function clearHitsContainer() {

     refs.artieclesContainer.innerHTML = ''
}



function scroll() {

     refs.loadMoreBtn.scrollIntoView({

          behavior: 'smooth',
          block: 'end',

     });

}