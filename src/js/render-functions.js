export const createGalleryCardTemplate = imgInfo => {
  const stats = [
    { title: 'Likes', value: imgInfo.likes },
    { title: 'Views', value: imgInfo.views },
    { title: 'Comments', value: imgInfo.comments },
    { title: 'Downloads', value: imgInfo.downloads },
  ];

  const statsMarkup = stats
    .map(
      stat => `
        <div class="gallery-item">
          <p class="gallery-title">${stat.title}</p>
          <p class="gallery-count">${stat.value}</p>
        </div>`
    )
    .join('');

  return `
    <li class="gallery-card">
      <article class="card">
        <a class="gallery-link" href="${imgInfo.largeImageURL}" target="_blank" rel="noopener noreferrer">
          <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
        </a>
        <div class="gallery-container">
          ${statsMarkup}
        </div>
      </article>
    </li>`;
};
