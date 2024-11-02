// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach.apply((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a [href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // sticky navbar
  let header = document.querySelector("header");
  header.classList.toggle("stiky", window.scrollY > 100);

  // toggle icon navbar
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

// typed js
const typed = new Typed(".multiple-text", {
  strings: ["Data Analyst", "Business Analyst"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

//contact us

// Fungsi untuk mengirim email
function sendMail() {
  var params = {
    from_name: document.getElementById("name_id").value,
    email_id: document.getElementById("email_id").value,
    phone_id: document.getElementById("phone_id").value,
    subject_id: document.getElementById("subject_id").value,
    message_id: document.getElementById("message_id").value,
  };

  // Kirim email
  emailjs
    .send("service_jvn2r38", "template_6baq3gh", params)
    .then((res) => {
      alert(
        "thank you" + params["from_name"] + "! Your message has been sent."
      );
    })
    .catch();
}
