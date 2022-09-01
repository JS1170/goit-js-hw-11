import { refs } from './index';

export function components(hits) {
    const markupHits = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300 hight=200/>
        <div class="info">
            <p class="info-item">
                <b>Likes ${likes} </b>
            </p>
            <p class="info-item">
                <b>Views ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${downloads}</b>
            </p>
        </div>
    </div>`
    })
    refs.div.insertAdjacentHTML('beforeend', markupHits.join(''));
}

