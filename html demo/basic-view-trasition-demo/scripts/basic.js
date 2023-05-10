document.body.innerHTML = `
<div class="container">
  <aside>
    <h3 class="title">Basic View Transitions API demo</h3>
    <section class="thumbs"></section>
  </aside>
  <main>
    <section class="gallery-view">
      <figure>
        <img />
        <figcaption><div class="caption-text"></div></figcaption>
      </figure>
    </section>
  </main>
</div>
`;

const imageData = [
  {
    name: "Jungle coast",
    file: "jungle-coast",
  },
  {
    name: "Bird in the tree",
    file: "tree-bird",
  },
  {
    name: "A view from the sky",
    file: "view-from-the-sky",
  },
  {
    name: "The view across the water",
    file: "watery-view",
  },
];

const thumbs = document.querySelector(".thumbs");
const galleryImg = document.querySelector(".gallery-view img");
const galleryCaption = document.querySelector(".gallery-view figcaption");

function init() {
  imageData.forEach((data) => {
    const img = document.createElement("img");
    const a = document.createElement("a");
    a.href = "#";
    a.title = `Click to load ${data.name} in main gallery view`;
    img.alt = data.name;
    img.src = `images/${data.file}.jpg`;
    a.appendChild(img);
    thumbs.appendChild(a);

    a.addEventListener("click", updateView);
    a.addEventListener("keypress", updateView);
  });

  galleryImg.src = `images/${imageData[0].file}.jpg`;
  galleryCaption.textContent = imageData[0].name;
}

function updateView(event) {
  // Handle the difference in whether the event is fired on the <a> or the <img>
  const targetIdentifier = event.target.firstChild || event.target;

  const displayNewImage = () => {
    galleryImg.src = targetIdentifier.src.replace("_th", "");
    galleryCaption.textContent = targetIdentifier.alt;
  };

  // Fallback for browsers that don't support View Transitions:
  if (!document.startViewTransition) {
    displayNewImage();
    return;
  }

  // With View Transitions:
  const transition = document.startViewTransition(() => displayNewImage());
}

init();
