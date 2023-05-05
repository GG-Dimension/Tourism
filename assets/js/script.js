/* Navbar */
const navbarLinks = document.querySelector(".navbar-links");
const burger = document.querySelector(".navbar-burger");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navbarLinks.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navbarLinks.classList.remove("active");
    burger.classList.remove("active");
  }
});

/* Carousel */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

setInterval(() => {
  plusSlides(1);
}, 4000);

/* Cards */
const objects = [
  {
    image: "assets/img/card_images/Clip1.png",
    title: "FLIGHT BOOKING",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
  {
    image: "assets/img/card_images/Clip2.png",
    title: "HOTEL & RESORT BOOKING",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
  {
    image: "assets/img/card_images/Clip3.png",
    title: "FAMILY TRIP PLANNER",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
  {
    image: "assets/img/card_images/Clip4.png",
    title: "CRUISE TOUR",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
  {
    image: "assets/img/card_images/Clip5.png",
    title: "FIRE CAMP",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
  {
    image: "assets/img/card_images/Clip6.png",
    title: "CORPORATE HOLIDAYS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
  },
];

const cardWrapper = document.querySelector(".cardWrapper");

objects.forEach((object) => {
  const card = `
    <div class="card">
    <div class="imageContainer">
        <div id="zoom">
        <figure>
      <img src="${object.image}" alt="${object.title}" class="imgHover">
      </figure>
      </div>
    </div>
      <div class="card-text">
      <h4>${object.title}</h4>
      <p>${object.description}</p>
      <div>
    </div>
  `;
  cardWrapper.innerHTML += card;
});


/* Fetch Data */
const fetchData = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=6");
    const data = await response.json();
    const results = data.results;

    cardWrapper.innerHTML = "";

    results.forEach((result) => {
      const card = `
        <div class="card">
        <div class="imageContainer">
        <div id="zoom">
        <figure>
          <img src="${result.picture.large}" alt="${result.name.first}" class="imgHover">
          </figure>
          </div>
        </div>
          <div class="card-text">
          <h4>${result.name.first} ${result.name.last}</h4>
          <p>${result.email}</p>
          <div>
        </div>
      `;
      cardWrapper.innerHTML += card;
    });

    
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        modalImage.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h4").textContent;
        modalDescription.textContent = card.querySelector("p").textContent;
        modal.style.display = "block";
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const apiButton = document.querySelector("#apiButton");
apiButton.addEventListener("click", fetchData);

const originalCards = cardWrapper.innerHTML;
const homeButton = document.querySelector('#home');
homeButton.addEventListener('click', function(event) {
  event.preventDefault(); 
  cardWrapper.innerHTML = originalCards;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modalImage.src = card.querySelector("img").src;
      modalTitle.textContent = card.querySelector("h4").textContent;
      modalDescription.textContent = card.querySelector("p").textContent;
      modal.style.display = "block";
    });
  });
});


/* Modal */
const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    modalImage.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h4").textContent;
    modalDescription.textContent = card.querySelector("p").textContent;
    modal.style.display = "block";
  });
});

const closeModal = () => {
  modal.style.display = "none";
};

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

/* Video */
const myVideo = document.getElementById("video");

function playpause() {
  if (myVideo.paused) {
    myVideo.play();
    document.getElementById("playpause_img").style.backgroundImage = "none";
  } else {
    myVideo.pause();
    document.getElementById("playpause_img").style.backgroundImage =
      "url('assets/img/video_images/playbtn.png')";
  }
}

/* Counters */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll(".box h3");
      counters.forEach((counter) => {
        let count = 0;
        const targetCount = parseInt(counter.innerText);
        const duration = 2000;
        const increment = targetCount / (duration / 16);
        const updateCount = () => {
          count += increment;
          if (count >= targetCount) {
            count = targetCount;
            clearInterval(counterInterval);
          }
          counter.innerText = Math.floor(count);
        };
        const counterInterval = setInterval(updateCount, 16);
      });
      observer.unobserve(entry.target);
    }
  });
});
const countersDiv = document.querySelector(".counters");
observer.observe(countersDiv);

/* Popular tour package */
const cardsData = [
  {
    type: "Honeymoon",
    image: "assets/img/tour_images/Clip.png",
    price: "$299/person",
    title: "Blue beauty of Greece",
    duration: "5 Dayes / 6 Night",
  },
  {
    type: "Holiday",
    image: "assets/img/tour_images/Clip1.png",
    price: "$178/person",
    title: "Nature of Phuket",
    duration: "3 Dayes / 4 Night",
  },
  {
    type: "Holiday",
    image: "assets/img/tour_images/Clip2.png",
    price: "$1111/person",
    title: "World Tour of Paris",
    duration: "7 Dayes / 8 Night",
  },
];

const tourContainer = document.querySelector(".tour");

cardsData.forEach((cardData) => {
  let cardHtml = `
    <div class="tour-card">
    <div class="imageContainer">
        <div id="zoom">
        <figure>
      <div class="corner">${cardData.type}</div>
      <img src="${cardData.image}" alt="" class="imgHover">
      </figure>
      </div>
    </div>
      <div class="card-info">
        <p>${cardData.price}</p>
        <h3>${cardData.title}</h3>
        <p>${cardData.duration}</p>
      </div>
    </div>
  `;
  tourContainer.insertAdjacentHTML("beforeend", cardHtml);
});

/* Form */
const emailInput = document.getElementById("email");
const subscribeBtn = document.getElementById("subscribeBtn");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

subscribeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (!isValidEmail(emailInput.value)) {
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
    return;
  }
  errorMsg.style.display = "none";
  successMsg.style.display = "block";
});

function isValidEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

/* Happy Travelers*/
const travelers = [
  {
    name: "Ribeca Singh",
    image: "assets/img/happy_travelers/girl1.png",
    description:
      "Lorem ipsum, is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard",
  },
  {
    name: "Jimmy dean",
    image: "assets/img/happy_travelers/girl2.png",
    description:
      "Lorem ipsum, is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard",
  },
  {
    name: "Theodule Terer",
    image: "assets/img/happy_travelers/boy.png",
    description:
      "Lorem ipsum, is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard",
  },
];

const cardContainer = document.querySelector(".card-container");

const cardsHtml = travelers
  .map(
    (traveler) => `
  <div class="traveler-card">
    <div class="inner">
      <img src="${traveler.image}" alt="${traveler.name}">
    </div>
    <h3>${traveler.name}</h3>
    <p>${traveler.description}</p>
    <img src="assets/img/happy_travelers/forma.png">
  </div>
`
  )
  .join("");

cardContainer.insertAdjacentHTML("beforeend", cardsHtml);

/* Form-2 */
const emailInput2 = document.querySelector(".input-field");
const addBtn = document.querySelector(".input-button");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const emailSuccessMsg = document.getElementById("emailSuccessMsg");

addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (!isValidEmail(emailInput2.value)) {
    emailErrorMsg.style.display = "block";
    emailSuccessMsg.style.display = "none";
    return;
  }
  emailErrorMsg.style.display = "none";
  emailSuccessMsg.style.display = "block";
});

function isValidEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

addBtn.addEventListener("click", function () {
  console.log("click");
});

/* Back to top */
const backToTopBtn = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});














