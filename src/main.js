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

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
      event.currentTarget.reset();
      iziToast.error({
        message: 'Please enter your request',
        position: 'topRight',
      });
      return;
    }
      
    page = 1;

    loadBtn.classList.add('is-hidden');
    loader.classList.remove('is-hidden');

      
    const response = await fetchPhotosByQuery(searchedQuery, page);
    const data = response.data;

      if (data.totalHits === 0) {
        loader.classList.add('is-hidden');
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }

    if (data.totalHits > page * 15) {
      loadBtn.classList.remove('is-hidden');
    }

    galleryEl.innerHTML = data.hits.map(el => createGalleryCardTemplate(el)).join('');
    loader.classList.add('is-hidden');
    scrollDown();
    lightbox.refresh();
    searchFormEl.reset();
  } catch (error) {
      loader.classList.add('is-hidden');
    // loader.style.display = 'none';
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching photos:', error);
  }
};

const onLoadMoreBtn = async () => {
  try {
    page++;
    const response = await fetchPhotosByQuery(searchedQuery, page);
    const data = response.data;

    const postCardsTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
    galleryEl.insertAdjacentHTML('beforeend', postCardsTemplate);
    scrollDown();
    lightbox.refresh();

    if (page * 15 >= data.totalHits) {
      loadBtn.classList.add('is-hidden');
    }
  } catch (error) {
      loader.classList.add('is-hidden');
      iziToast.error({
      message: 'Error loading more images',
      position: 'topRight',
    });
    console.error('Error loading more images:', error);
  }
};

function scrollDown() {
    const firstCard = document.querySelector('.gallery-card');
if (!firstCard) return;
    const cardHeight = firstCard.getBoundingClientRect().height;
    
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadBtn.addEventListener('click', onLoadMoreBtn);

     