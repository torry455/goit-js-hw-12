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

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function createGallery(hits) {
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
            }) => `
                <li class="gallery-item">
                    <a class="item-link" href="${largeImageURL}">
                        <img
                            src="${webformatURL}"
                            alt="${tags}"
                            width="360"
                            height="200"
                        />
                    </a>
                    <ul class="mini-list">
                        <!-- (existing code for mini-list) -->
                    </ul>
                </li>`
        )
        .join('');

    loaderAnimation.remove();
    gallery.insertAdjacentHTML('beforeend', markup);

    if (hits.length < 30) {
        loadMoreBtn.style.display = 'none';
        if (currentPage === 1) {
            iziToast.show({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                color: '#EF4040',
                messageColor: '#FAFAFB',
                iconUrl: bixOctagonSvg,
            });
        } else {
            iziToast.show({
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'topRight',
                color: '#EF4040',
                messageColor: '#FAFAFB',
                iconUrl: bixOctagonSvg,
            });
        }
    } else {
        loadMoreBtn.style.display = 'block';
    }

    instanceOfLightbox.refresh();
}

async function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = '';
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
                per_page: 30,
            },
        });

        const { hits } = response.data;

        createGallery(hits);
    } catch (error) {
        loaderAnimation.remove();
        iziToast.show({
            message: `${error}`,
            position: 'topRight',
            color: '#EF4040',
            messageColor: '#FAFAFB',
            iconUrl: '/img/bi_x-octagon.svg',
        });
    }
}

async function onLoadMore() {
    formInput.value = '';
    form.after(loaderAnimation);

    try {
        currentPage++;
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: userKey,
                q: inputQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 30,
                page: currentPage,
            },
        });

        const { hits } = response.data;
        createGallery(hits);
    } catch (error) {
        loaderAnimation.remove();
        iziToast.show({
            message: `${error}`,
            position: 'topRight',
            color: '#EF4040',
            messageColor: '#FAFAFB',
            iconUrl: '/img/bi_x-octagon.svg',
        });
    }
}