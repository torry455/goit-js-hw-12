import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import bixOctagonSvg from './img/bi_x-octagon.svg';

const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const gallery = document.querySelector('.gallery');
const loaderAnimation = document.createElement('div');
loaderAnimation.classList.add('loader');

const instanceOfLightbox = new simpleLightbox('li a', {
    captionsData: 'alt',
    captionClass: 'img-caption',
    captionDelay: 250,
});

const loadMoreBtn = document.querySelector('.load-more-btn');
let currentPage = 1;
let userKey = '41929636-e94244ac3daa63b74aaebcf18';
let inputQuery = '';

let isLoading = false;

function createGallery(hits, totalHits) {
    const markup = hits
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) =>
                `<li class="gallery-item">
                <a class="item-link" href="${largeImageURL}">
                    <img
                        src="${webformatURL}"
                        alt="${tags}"
                        width="360"
                        height="200"
                    />
                </a>
                <ul class="mini-list">
                    <li class="mini-header">
                        <h3>Likes</h3>
                        <p>${likes}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Views</h3>
                        <p>${views}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Comments</h3>
                        <p>${comments}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Downloads</h3>
                        <p>${downloads}</p>
                    </li>
                </ul>
                </li>`
        )
        .join('');

    loaderAnimation.remove();
    gallery.insertAdjacentHTML('beforeend', markup);

    if (currentPage * 40 >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            color: '#808080',
            messageColor: '#FAFAFB',
        });
    } else {
        loadMoreBtn.style.display = 'block';
    }

    instanceOfLightbox.refresh();
    isLoading = false;
}

async function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    form.after(loaderAnimation);

    inputQuery = formInput.value;
    currentPage = 1;

    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: userKey,
                q: inputQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
            },
        });

        const { hits, totalHits } = response.data;

        createGallery(hits, totalHits);
    } catch (error) {
        loaderAnimation.remove();
        console.error('Error during API request:', error.response);
        iziToast.show({
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
            color: '#EF4040',
            messageColor: '#FAFAFB',
            iconUrl: bixOctagonSvg,
        });
    }
}

async function onLoadMore(e) {
    e.preventDefault();

    if (isLoading) return;

    formInput.value = '';
    form.after(loaderAnimation);

    try {
        isLoading = true;

        const scrollPosition = window.scrollY || window.pageYOffset;

        currentPage++;
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: userKey,
                q: inputQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page: currentPage,
            },
        });

        const { hits, totalHits } = response.data;
        createGallery(hits, totalHits);

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
        });
    } catch (error) {
        loaderAnimation.remove();
        console.error('Error during API request:', error.response);
        iziToast.show({
            message: `${error}`,
            position: 'topRight',
            color: '#EF4040',
            messageColor: '#FAFAFB',
            iconUrl: bixOctagonSvg,
        });
    } finally {
        isLoading = false;
    }
}

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
