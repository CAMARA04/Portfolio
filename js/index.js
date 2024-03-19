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
  // Événement pour afficher la modale lors du clic sur une carte de projet
  let projects;
  fetchProjects();

  document.addEventListener("click", (event) => {
    const clickedProjectCard = event.target.closest(".project-card");
    if (clickedProjectCard) {
      const projectId = clickedProjectCard.dataset.projectId;
      if (projects) {
        // Vérification que les projets sont disponibles
        const projectData = projects.find(
          (project) => project.id === projectId
        );
        if (projectData) {
          displayModal(projectData);
        }
      }
    }
  });
});

// Fonction pour afficher la modale avec les détails du projet
function displayModal(projectData) {
  // Création de la modale
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Contenu de la modale
  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;"; // × pour symboliser la fermeture
  closeButton.addEventListener("click", () => {
    modal.remove(); // Fermer la modale lors du clic sur le bouton de fermeture
  });
  modal.appendChild(closeButton);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Ajout des éléments de détails du projet à afficher dans la modale
  const projectImage = document.createElement("img");
  projectImage.src = projectData.image;
  modalContent.appendChild(projectImage);

  const projectName = document.createElement("h2");
  projectName.textContent = projectData.name;
  modalContent.appendChild(projectName);

  const projectDescription = document.createElement("p");
  projectDescription.textContent = projectData.description;
  modalContent.appendChild(projectDescription);

  const projectInfo = document.createElement("p");
  projectInfo.textContent = `Année: ${projectData.year}, Catégorie: ${projectData.category}`;
  modalContent.appendChild(projectInfo);

  const projectLanguages = document.createElement("div");
  projectLanguages.textContent = "Langages utilisés: ";
  projectData.languages.forEach((language) => {
    const languageIcon = document.createElement("img");
    languageIcon.src = language;
    projectLanguages.appendChild(languageIcon);
  });
  modalContent.appendChild(projectLanguages);

  const visitButton = document.createElement("button");
  visitButton.textContent = "Visiter le site";
  visitButton.addEventListener("click", () => {
    window.open(projectData.website, "_blank");
  });
  modalContent.appendChild(visitButton);

  modal.appendChild(modalContent);

  // Ajout de la modale au corps du document
  document.body.appendChild(modal);
}

function fetchProjects() {
  const projectsContainer = document.querySelector(".projects");

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

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectCard.appendChild(projectDescription);

        const languagesContainer = document.createElement("div");
        languagesContainer.classList.add("languages");

        project.languages.forEach((languageIcon) => {
          const languageLogo = document.createElement("img");
          languageLogo.src = languageIcon;

          languagesContainer.appendChild(languageLogo);
        });

        projectCard.appendChild(languagesContainer);
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

// document.addEventListener("DOMContentLoaded", fetchProjects);

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

      const formData = new FormData(contactForm);

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
