import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.js-load-btn');

let page = 1;
let searchedQuery = '';
let perPage = 15;
let totalHits = 0;

loadBtn.classList.add('is-hidden');


const lightbox = new SimpleLightbox('.js-gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

const onSearchFormSubmit = async event => {
    try {
        event.preventDefault();
    
        searchedQuery = searchFormEl.elements[0].value.trim();

        if (searchedQuery === '') {
            iziToast.error({
                message: 'Please enter your request',
                position: 'topRight',
            });
            return;
        };

        page = 1;
        loadBtn.classList.add('is-hidden');
        loader.classList.add('show-loader');

        const { data } = await fetchPhotosByQuery(searchedQuery, page);
        totalHits = data.totalHits;

        if (data.total === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });

            galleryEl.innerHTML = '';
            searchFormEl.reset();

            return;
        }

        if (data.totalHits > 1) {
            loadBtn.classList.remove('is-hidden');
            loadBtn.addEventListener('click', onLoadMoreBtn);
        }

        const galleryTemplate = data.hits
            .map(el => createGalleryCardTemplate(el))
            .join('');
        
        galleryEl.innerHTML = galleryTemplate;
        lightbox.refresh();
    
    } catch (err) {
        console.log(err);
    } finally {
        loader.classList.remove('show-loader');
    }
}
  
searchFormEl.addEventListener('submit', onSearchFormSubmit);




const onLoadMoreBtn = async () => {
    try {
        loader.classList.add('show-loader');
        page++;

        const { data } = await fetchPhotosByQuery(searchedQuery, page);

        const galleryTemplate = data.hits
            .map(el => createGalleryCardTemplate(el))
            .join('');
        galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
        lightbox.refresh();
        loader.classList.remove('show-loader');

        const imgBox = document.querySelector('.gallery-card').getBoundingClientRect();
        let imgHeight = imgBox.height;

        window.scrollBy({
            top: imgHeight * 2,
            behavior: 'smooth',
        });

        if (page * perPage >= totalHits) {
            loadBtn.classList.add('is-hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });

            if (!loadBtn.classList.contains('is-hidden')) {
                loadBtn.removeEventListener('click', onLoadMoreBtn);
            }
        }
    } catch (err) {
        console.log(err);
    }
};
