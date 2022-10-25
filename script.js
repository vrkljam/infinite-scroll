const e = require("cors");

const imagContainer = document.querySelector('.image-container')
// const loader = document.querySelector()

let photosArray =[];

// Unsplash api

const count=10;
const apiKey='rIzqgWgyTKImpGrBsvlxzRrQvrHd0QtDZUcM_kSzog4';

const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// helper function for the setattributes

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}





// elements for links/photos and add to DOM

function displayPhotos(){
    // need for Each for this arrayß
    photosArray.forEach((photo) => {
        // create anchor to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create title
        const img = document.createElement('img');
        setAttributes(item, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

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

