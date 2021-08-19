const API_KEY = '22968189-f518494d66d88c5d71c698a06';
const BASE_URL = 'https://pixabay.com/api/'
export default class NewsApiService{

    constructor(){
        this.searchQuery = '';
        this.page = 1;
    
    }
    fetchArtiecles() {
console.log(this)
      return  fetch(`${BASE_URL}?image_type=photo&q=${this.searchQuery}&orientation=horizontal&page=${this.page}&per_page=12&key=${API_KEY}`).then(response => response.json()).then(({hits}) => {
          this.page += 1;
          return hits
         });
    }

    get query() {
    this.searchQuery

}

    set query(newQuery) {
    this.searchQuery = newQuery

}

    resetPage() {
    this.page = 1
}

}