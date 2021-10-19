// custom function to select elements dinamically
function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    } else {
        throw new Error(
            `Please check "${selection}" selector, no such element exists.`
        );
    }
}

class Gallery {
    constructor(element) {
        this.container = element;
        this.list = [...element.querySelectorAll(".img")];

        // target
        this.modal = getElement(".modal");
        this.modalImg = getElement(".main-img");
        this.imageName = getElement(".image-name");
        this.modalImages = getElement(".modal-images");
        this.closeBtn = getElement(".close-btn");
        this.prevBtn = getElement(".prev-btn");
        this.nextBtn = getElement(".next-btn");
        // self reference
        // const self = this;

        // bind functions
        // this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.chooseModalImage = this.chooseModalImage.bind(this);

        // functionality
        this.container.addEventListener(
            "click",
            function (event) {
                // self.openModal();
                if (event.target.classList.contains("img")) {
                    this.openModal(event.target, this.list);
                }
            }.bind(this) // binding the callback function to the Gallery object
        );
    }

    // open modal
    openModal(selectedImage, list) {
        this.setMainImage(selectedImage);
        this.modalImages.innerHTML = this.list
            .map(function (image) {
                return `<img
                        src="${image.src}"
                        title="${image.title}"
                        class="${
                            selectedImage.dataset.id === image.dataset.id
                                ? "modal-img selected"
                                : "modal-img"
                        }"
                        data-id="${image.dataset.id}"
                        alt="city"
                    />`;
            })
            .join("");

        this.modal.classList.toggle("open");
        this.closeBtn.addEventListener("click", this.closeModal);
        this.nextBtn.addEventListener("click", this.nextImage);
        this.prevBtn.addEventListener("click", this.prevImage);
        this.modalImages.addEventListener("click", this.chooseModalImage);
    }

    // set main image in modal
    setMainImage(selectedImage) {
        this.modalImg.src = selectedImage.src;
        this.imageName.textContent = selectedImage.title;
    }

    // close modal
    closeModal() {
        this.modal.classList.remove("open");

        // removing the event listener after closing the modal
        this.closeBtn.removeEventListener("click", this.closeModal);
        this.nextBtn.removeEventListener("click", this.nextImage);
        this.prevBtn.removeEventListener("click", this.prevImage);
        this.modalImages.removeEventListener("click", this.chooseModalImage);
    }

    // next button
    nextImage() {
        const selected = this.modalImages.querySelector(".selected");

        // if selected is the last image, it set it backs to the first image
        const next =
            selected.nextElementSibling || this.modalImages.firstElementChild;
        selected.classList.remove("selected");
        next.classList.add("selected");
        this.setMainImage(next);
    }

    // prev button
    prevImage() {
        const selected = this.modalImages.querySelector(".selected");

        // if selected is the first image, it set it backs to the last image
        const prev =
            selected.previousElementSibling ||
            this.modalImages.lastElementChild;
        selected.classList.remove("selected");
        prev.classList.add("selected");
        this.setMainImage(prev);
    }

    // changing the modal main image
    chooseModalImage(event) {
        if (event.target.classList.contains("modal-img")) {
            const selected = this.modalImages.querySelector(".selected");
            selected.classList.remove("selected");
            this.setMainImage(event.target);
            event.target.classList.add("selected");
        }
    }
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
