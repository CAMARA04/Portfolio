document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".navbar ul li");
  const txtAnim = document.querySelector(".title");
  const linksBelowTitle = document.querySelectorAll(
    ".bar-liens .lien-etiquette"
  );

  navItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      removeActiveClass();
      item.classList.add("active");
    });
  });

  const removeActiveClass = () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
  };

  // Animation du titre h1
  function animateTitle() {
    new Typewriter(txtAnim, {})
      .changeDelay(15)
      .typeString("Loic CAMARA ")
      .pauseFor(100)
      .typeString("<br/>")
      .typeString("Développeur web")
      .pauseFor(100)
      .typeString("<br/>")
      .typeString("Tel: 06 13 77 61 88")
      .start();

    txtAnim.style.lineHeight = "2";
    txtAnim.classList.add("align-left");
  }

  animateTitle(); // Appel de la fonction pour démarrer l'animation

  // Ajout d'une classe aux liens situés en dessous du titre h1 pour l'effet d'apparition
  function animateLinks() {
    linksBelowTitle.forEach((link) => {
      link.classList.add("appear");
    });
  }

  // Ajouter un délai pour que les liens apparaissent après l'animation du titre h1
  setTimeout(animateLinks, 1500);
});

fetchProjects();

function fetchProjects() {
  const projectsContainer = document.querySelector(".projects");

  // Fetching project data from projects.json
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      data.projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const projectImage = document.createElement("img");
        projectImage.src = project.image;
        projectImage.classList.add("project-image");
        projectCard.appendChild(projectImage);

        const projectName = document.createElement("h3");
        projectName.textContent = project.name;
        projectCard.appendChild(projectName);
        projectName.classList.add("titre-carte");

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectCard.appendChild(projectDescription);

        const projectLanguages = document.createElement("div");
        projectLanguages.textContent = " ";
        projectLanguages.classList.add("languages-list-container");

        const languageList = document.createElement("ul");
        languageList.classList.add("language-list");

        project.languages.forEach((language) => {
          const languageItem = document.createElement("li"); // Z
          languageItem.textContent = language;
          languageList.appendChild(languageItem);
        });
        projectLanguages.appendChild(languageList);
        projectCard.appendChild(projectLanguages);

        const learnMoreButton = document.createElement("button");
        learnMoreButton.textContent = "En savoir plus";
        learnMoreButton.classList.add("learn-more-button");

        projectCard.appendChild(learnMoreButton);

        projectsContainer.appendChild(projectCard); // Append the projectCard to the projects container
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

//fontion pour initialiser email.js et gerer l'envoi des mails par le formulaire contzact

const initializeContactForm = () => {
  document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("7rxKpYQupmY49awrf");

    const contactForm = document.getElementById("contact-form");

    const sendEmail = (event) => {
      event.preventDefault();

      // Vérifiez si l'élément de formulaire est trouvé
      if (!contactForm) {
        console.error("Le formulaire de contact n'a pas été trouvé.");
        return;
      }

      emailjs
        .sendForm("service_gaeq7jf", "template_17a6d5k", "#contact-form")
        .then((response) => {
          console.log("Email envoyé avec succès:", response);
          alert("Votre message a été envoyé avec succès!");
          // Réinitialiser le formulaire après l'envoi réussi
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi de l'email:", error);
          alert("Une erreur s'est produite lors de l'envoi de votre message.");
        });
    };

    // Vérifiez si l'élément de formulaire est trouvé avant d'ajouter l'événement de soumission
    if (contactForm) {
      contactForm.addEventListener("submit", sendEmail);
    } else {
      console.error("Le formulaire de contact n'a pas été trouvé.");
    }
  });
};

initializeContactForm();
