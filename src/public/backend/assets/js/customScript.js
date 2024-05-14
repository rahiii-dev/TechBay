const inputImagePreviewer = document.getElementById("input-image-previewer");
const productImageInput = document.querySelector(".productImageInput");

if (productImageInput) {
    let MINIMUM_IMAGE_INPUT = productImageInput.getAttribute('data-min-files')? parseInt(productImageInput.getAttribute('data-min-files')) : 1;
    productImageInput.addEventListener("change", function (event) {
        const croppedFileArray = [];
        inputImagePreviewer.innerHTML = "";
        const files = event.target.files;
        let MAXIMUM_IMAGE_INPUT = productImageInput.getAttribute('data-max-files')? parseInt(productImageInput.getAttribute('data-max-files')) : files.length;

        if (files && files.length < MINIMUM_IMAGE_INPUT) {
            const errorEl = document.getElementById(productImageInput.getAttribute('data-error-el'));
            console.log(errorEl);
            if(errorEl){
                errorEl.textContent = `Please add atleast ${MINIMUM_IMAGE_INPUT} images`
            }
            return;
        }

        if (files && files.length > 0) {
            for (let i = 0; i < MAXIMUM_IMAGE_INPUT; i++) {
                const file = files[i];
                const imageList = document.createElement("li");
                imageList.innerHTML = `<div class="p-2 border rounded">
                            <div class="productviewsimg">
                                <img src="${URL.createObjectURL(file)}" alt="image" />
                            </div>
                            <div class="pt-2">
                                <p>${file.name}</p>
                            </div>
                        </div>`;

                inputImagePreviewer.appendChild(imageList);
                const image = imageList.querySelector(".productviewsimg img");

                const cropper = new Cropper(image, {
                    aspectRatio: 1,
                    viewMode: 3,
                    crop: function (e) {
                        const croppedCanvas = cropper.getCroppedCanvas({
                            width: 500,
                            height: 500,
                        });

                        croppedCanvas.toBlob(function (blob) {
                            const croppedFile = new File([blob], `croped-${file.name}`, { type: "image/jpeg" });
                            image.src = URL.createObjectURL(blob);
                            croppedFileArray[i] = croppedFile;

                            if (croppedFileArray.length === files.length) {
                                const fileList = new DataTransfer();
                                croppedFileArray.forEach((croppedFile) => {
                                    fileList.items.add(croppedFile);
                                });

                                productImageInput.files = fileList.files;
                            }
                        }, "image/jpeg");
                    }
                });
            }
        }
    });
}

  // confirmDelete
  function confirmDelete(URL, message = "") {
    Swal.fire({
      title: "Are you sure?",
      text: `${message}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9f43",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = URL;
      }
    });
  }