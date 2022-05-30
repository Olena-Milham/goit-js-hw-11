const imageGallery = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <div class="photo-card">
        <a href="${largeImageURL}" class="gallery-link">
         <img class="gallery-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
         <p class="info-item">
             <b class="info-item__lable">Likes:</b>${likes}
         </p>
         <p class="info-item">
             <b class="info-item__lable">Views:</b>${views}
         </p>
            <p class="info-item">
            <b class="info-item__lable">Comments:</b>${comments}
         </p>
         <p class="info-item">
            <b class="info-item__lable">Downloads:</b>${downloads}
         </p>
        </div> 
        </a>
    </div>`;
};

export default imageGallery;
