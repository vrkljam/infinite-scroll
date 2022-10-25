const imagContainer = document.querySelector('.image-container')
// const loader = document.querySelector()

let photosArray =[];

// Unsplash api

const count=10;
const apiKey='rIzqgWgyTKImpGrBsvlxzRrQvrHd0QtDZUcM_kSzog4';

const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// elements for links/photos and add to DOM

function displayPhotos(){
    // need for Each for this array
    photosArray.forEach((photo) => {
        // create anchor to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute ('target', '_blank');
        // create title
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imagContainer.appendChild(item)

    });

}

// get photos from unsplash with async function

async function getPhotos(){
    try{
        const res = await fetch(apiUrl);
        photosArray =await res.json();
        displayPhotos();
      
    }
    catch(error){

    }
}

// on load

getPhotos()

