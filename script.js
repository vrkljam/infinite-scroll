const imagContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// check if images are loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log(`ready :`, ready);
  }
}

// Unsplash api

const count = 30;
const apiKey = "rIzqgWgyTKImpGrBsvlxzRrQvrHd0QtDZUcM_kSzog4";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function for the setattributes

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// elements for links/photos and add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(totalImages);
  // need for Each for this array
  photosArray.forEach((photo) => {
    // create anchor to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create title
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener check when each is finished loading
    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imagContainer.appendChild(item);
  });
}

// get photos from unsplash with async function

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {}
}

// check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// on load

getPhotos();
