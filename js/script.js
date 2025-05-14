// === Gallery Filter Function ===
function filterCategory(category) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.style.display = item.classList.contains(category) ? 'block' : 'none';
  });
}

document.addEventListener("DOMContentLoaded", function () {

  // === Sample Image Preview via URL ===
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

  // === Chat Option Buttons (FAQ Bot) ===
  const qaPairs = {
    "📅 Book a photo session": "You can book a session on our booking page. Just click 'Book a Session' in the menu!",
    "📸 View our gallery": "Sure! Head over to the gallery section to see our recent work.",
    "🎓 Learn about our training": "We offer hands-on training in photography and editing. Visit the About page to learn more.",
    "📞 Contact us": "You can reach us via WhatsApp, phone call, or the contact form on our website.",
    "💰 How much is a studio session?": "Studio sessions start at ₦10,000 depending on the package.",
    "👕 What should I wear?": "Wear what makes you feel confident! Avoid busy patterns and neon colors for best results.",
    "👨‍👩‍👧 Can I bring family members?": "Absolutely! Let us know during booking if you're bringing others.",
    "📍 Where are you located?": "We’re located in Damaturu, Yobe State, Nigeria.",
    "🕓 What are your hours?": "Open Monday–Saturday, 9:00AM to 6:00PM.",
    "🖼 Can I choose the photo background?": "Yes, we offer various backgrounds and sets for selection.",
    "📦 Do you deliver soft/hard copies?": "Yes! You get both digital and printed copies based on your package.",
    "💬 I want to speak with a real person": "human-request",
    "💡 Tips for first-time photo shoots?": "Be yourself, stay relaxed, and let us guide you. You've got this!",
    "🧒 Can I book for my child?": "Yes, we love working with kids. Choose 'Child session' when booking.",
    "🎥 Do you offer video coverage?": "Yes, we do full video coverage for events. Ask us for a quote!",
    "🗓 How far in advance can I book?": "As early as 1 month or even same-day if available.",
    "📄 Can I cancel or reschedule?": "Yes, just notify us at least 24 hours before your session.",
    "👩‍🏫 Do you offer training classes?": "Yes, beginner to advanced photography programs are available.",
    "🎓 How long is the photography course?": "4 to 6 months depending on your track.",
    "🌐 Do you have an online training option?": "Currently on-site only, but online options are coming soon!",
    "👋 Hi": "Hello! how can I assist you today?"
  };
  // === Navbar Mobile Menu Toggle ===
  window.toggleMenu = function () {
    const menu = document.getElementById('navbarMenu');
    if (menu) {
      menu.classList.toggle('show');
    }
  };
  document.querySelectorAll(".chat-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const question = btn.textContent.trim();
      addUserMessage(question);
      const response = qaPairs[question];

      if (response === "human-request") {
        addBotMessage("Connecting you to a human agent via WhatsApp. 📱");
        const encoded = encodeURIComponent(`A user wants to speak with a real person:\n\n${question}`);
        window.open(`https://wa.me/2349028796688?text=${encoded}`, "_blank");
      } else {
        addBotMessage(response || "Sorry, I don't have a response for that yet. Try another option.");
      }
    });
  });

  function addUserMessage(text) {
    const chatbox = document.querySelector(".chatbox");
    const msg = document.createElement("div");
    msg.className = "msg user-msg";
    msg.innerHTML = `<p>${text}</p>`;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  function addBotMessage(text) {
    const chatbox = document.querySelector(".chatbox");
    const msg = document.createElement("div");
    msg.className = "msg bot-msg";
    msg.innerHTML = `<p>${text}</p>`;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // === Gallery View/Book Buttons ===
  document.querySelectorAll(".gallery-item").forEach(item => {
    const viewBtn = item.querySelector(".overlay-btn:nth-child(1)");
    const bookBtn = item.querySelector(".overlay-btn:nth-child(2)");
    const imageSrc = item.querySelector("img")?.src;

    if (viewBtn && bookBtn && imageSrc) {
      viewBtn.addEventListener("click", () => {
        const popup = document.createElement("div");
        popup.style = `
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        `;

        const popupImage = document.createElement("img");
        popupImage.src = imageSrc;
        popupImage.style = "max-width: 90%; max-height: 90%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);";

        popup.appendChild(popupImage);
        popup.addEventListener("click", () => document.body.removeChild(popup));
        document.body.appendChild(popup);
      });

      bookBtn.addEventListener("click", () => {
        const encodedImage = encodeURIComponent(imageSrc);
        window.location.href = `../booking.html?sample=${encodedImage}`;
      });
    }
  });

  // === Booking Form Submission to WhatsApp ===
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const date = document.getElementById("date").value;
      const sessionType = document.getElementById("sessionType").value;
      const notes = document.getElementById("notes").value.trim();
      const selectedImage = document.getElementById("selectedImage").value;

      let message = `Hello! I would like to book a session.\n\n` +
                      `Full Name: ${fullName}\n` +
                      `Email: ${email}\n` +
                      `Phone: ${phone}\n` +
                      `Preferred Date: ${date}\n` +
                      `Session Type: ${sessionType}\n` +
                      `Additional Notes: ${notes}`;

      if (selectedImage) {
        message += `\n\nThis is the Style I want:\n${selectedImage}`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/2349028796688?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");
    });
  }


  // === Chatbot Widget (Manual Input) ===
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatBody = document.getElementById("chat-body");

  if (chatToggle && chatWindow && sendBtn && userInput && chatBody) {
    chatToggle.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
    });

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const msg = userInput.value.trim();
      if (!msg) return;

      // Add user message
      const userMsg = document.createElement("div");
      userMsg.className = "user-msg";
      userMsg.textContent = msg;
      chatBody.appendChild(userMsg);

      userInput.value = "";

      // Prepare bot response
      const botMsg = document.createElement("div");
      botMsg.className = "bot-msg";

      // Typing delay simulation
      botMsg.textContent = "Typing...";
      const defaultDelay = 10000; // Set your default delay time in ms
      setTimeout(() => {
        if (/book|session|schedule/i.test(msg)) {
          botMsg.textContent = "You can book a session on our Booking page. Just click 'Book a Session' in the menu!";
        } else if (/academy|student|training|course|learn/i.test(msg)) {
          botMsg.textContent = "Check out our training programs on the About or Students page!";
        } else if (/hi|hello|whatsup|hey|good evening|good afternoon|good morning/i.test(msg)) {
          botMsg.textContent = "Hello! how can I assist you today?";
        } else if (/price|cost|rate|fee|charge/i.test(msg)) {
          botMsg.textContent = "Our pricing starts at ₦10,000. You can view detailed pricing on the Booking page.";
        } else if (/location|where|address/i.test(msg)) {
          botMsg.textContent = "We're located in Damaturu, Yobe State, Nigeria.";
        } else if (/contact|call|reach|email/i.test(msg)) {
          botMsg.textContent = "You can contact us via phone, WhatsApp, or the contact form on our website.";
        } else if (/time|open|hours|when/i.test(msg)) {
          botMsg.textContent = "We are open Monday to Saturday, from 9:00 AM to 6:00 PM.";
        } else if (/help|human|real person|jabs|somebody|someone|the photographer|photographer|support/i.test(msg)) {
          botMsg.textContent = "Connecting you to a human via WhatsApp...";
          const encoded = encodeURIComponent("A user wants to speak with a real person:\n\n" + msg);
          const whatsappURL = `https://wa.me/2348108978369?text=${encoded}`;
          setTimeout(() => {
            window.open(whatsappURL, "_blank");
          }, 10000); // 10 seconds delay
        } else if (/photography|photo|camera|studio/i.test(msg)) {
          botMsg.textContent = "We offer professional photography services. Visit the Gallery page to see our work.";
        } else if (/video|videography|shoot/i.test(msg)) {
          botMsg.textContent = "Yes! We also offer videography sessions for events and promotions.";
        } else if (/event|wedding|birthday|occasion/i.test(msg)) {
          botMsg.textContent = "We cover weddings, birthdays, and all special events. Let's help you capture the moment!";
        } else if (/whatsapp|chat/i.test(msg)) {
          botMsg.textContent = "You can reach us on WhatsApp here: https://wa.me/2349028796688";
        } else if (/admin|dashboard|login/i.test(msg)) {
          botMsg.textContent = "If you're an admin, please log in using the Admin Login page.";
        } else if (/gallery|pictures|images/i.test(msg)) {
          botMsg.textContent = "You can view our previous works on the Gallery page.";
        } else if (/testimonials|reviews|feedback/i.test(msg)) {
          botMsg.textContent = "We value client feedback! You can read testimonials on our homepage.";
        } else if (/offer|promo|discount|deal/i.test(msg)) {
          botMsg.textContent = "Watch out for special discounts! Follow our social media pages for updates.";
        } else if (/social|instagram|facebook|handle/i.test(msg)) {
          botMsg.textContent = "Follow us on Instagram and Facebook for more updates!";
        } else if (/available|free|slot/i.test(msg)) {
          botMsg.textContent = "You can check available slots on our Booking page.";
        } else if (/how much|what is your rate/i.test(msg)) {
          botMsg.textContent = "Our session rates vary by package. Visit the Booking page for full details.";
        } else if (/thank/i.test(msg)) {
          botMsg.textContent = "You're welcome! Let us know if you need anything else.";
        } else {
          botMsg.textContent = "Thanks for reaching out! We'll get back to you shortly.";
        }
      }, 800 + Math.random() * 600); // 800-1400ms delay

      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

  }


  // === Hide Chatbox on Outside Click ===
  const chatbot = document.getElementById("chatbot"); // Assuming "chat-window" is the ID of your chatbox container

  document.addEventListener("click", function (event) {
    if (chatbot && !chatbot.contains(event.target) && event.target !== chatToggle) {
      chatbot.classList.add("hidden");
    }
  });

});