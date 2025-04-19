// Gallery filter function
function filterCategory(category) {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    item.style.display = item.classList.contains(category) ? 'block' : 'none';
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Image preview logic if ?sample= is present in URL
  const urlParams = new URLSearchParams(window.location.search);
  const sampleImageURL = urlParams.get("sample");

  if (sampleImageURL) {
    const decodedURL = decodeURIComponent(sampleImageURL);
    const previewImg = document.getElementById("preview-img");
    const previewDiv = document.getElementById("image-preview");
    const hiddenInput = document.getElementById("selectedImage");

    if (previewImg && previewDiv && hiddenInput) {
      previewImg.src = decodedURL;
      previewDiv.style.display = "block";
      hiddenInput.value = decodedURL;
    }
  }

  // Book button logic
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach(item => {
    const viewBtn = item.querySelector(".overlay-btn:nth-child(1)");
    const bookBtn = item.querySelector(".overlay-btn:nth-child(2)");
    const imageSrc = item.querySelector("img").src;

    viewBtn.addEventListener("click", () => {
      const popup = document.createElement("div");
      popup.style = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `;

      const popupImage = document.createElement("img");
      popupImage.src = imageSrc;
      popupImage.style = "max-width: 80%; max-height: 80%; box-shadow: 0 4px 8px rgba(0,0,0,0.2);";

      popup.appendChild(popupImage);
      popup.addEventListener("click", () => document.body.removeChild(popup));
      document.body.appendChild(popup);
    });

    bookBtn.addEventListener("click", () => {
      const encodedImage = encodeURIComponent(imageSrc);
      window.location.href = `../booking.html?sample=${encodedImage}`;
    });
  });

  // WhatsApp form submission
  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const date = document.getElementById("date").value;
      const sessionType = document.getElementById("sessionType").value;
      const notes = document.getElementById("notes").value;
      const selectedImage = document.getElementById("selectedImage").value;

      let message = `Hello! I would like to book a session.\n\n` +
                    `Full Name: ${fullName}\n` +
                    `Email: ${email}\n` +
                    `Phone: ${phone}\n` +
                    `Preferred Date: ${date}\n` +
                    `Session Type: ${sessionType}\n` +
                    `Additional Notes: ${notes}`;

      if (selectedImage) {
        message += `\n\nThis is the Style i want:\n${selectedImage}`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "2349028796688";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");
    });
  }
});
