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
  fetchProjects();
});

function fetchProjects() {
  const projectsContainer = document.querySelector(".projects");

  // Fetching project data from projects.json
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      data.projects.forEach((project) => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard); // Append the projectCard to the projects container
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

function createProjectCard(project) {
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

  const projectLanguages = createLanguageList(project.langages);
  projectCard.appendChild(projectLanguages);

  const learnMoreButton = document.createElement("button");
  learnMoreButton.textContent = "En savoir plus";
  learnMoreButton.classList.add("learn-more-button");
  learnMoreButton.addEventListener("click", () => {
    displayProjectModal(project); // Appeler la fonction pour afficher les détails du projet dans la modal
  });

  projectCard.appendChild(learnMoreButton);

  return projectCard;
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

function displayProjectModal(project) {
  const modal = document.getElementById("projectModal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".text-description");
  const modalImg = modal.querySelector(".modal-img");
  const modalGeneral = modal.querySelector(".infos-modal-general");
  const modalLanguages = modal.querySelector(".languages-list-modal");
  const modalLiens = modal.querySelector(".modal-liens");

  // Fermer la modal lorsque le bouton de fermeture est cliqué
  const closeButton = document.querySelector(".close");

  closeButton.addEventListener("click", () => {
    console.log("je ferme la modale");
    modal.style.display = "none";
  });

  // Fermer la modal lorsque l'utilisateur clique en dehors de la modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  modalTitle.textContent = project.name;
  modalDescription.textContent = project["description-modal"];
  modalImg.src = project.image;

  modalGeneral.innerHTML = "";
  const yearElement = document.createElement("p");
  yearElement.textContent = "Année : " + project.year;
  modalGeneral.appendChild(yearElement);

  const categoryElement = document.createElement("p");
  categoryElement.textContent = "Catégorie : " + project.category;
  modalGeneral.appendChild(categoryElement);

  // Effacer les anciens langages
  modalLanguages.innerHTML = "";

  const languageListModal = createLanguageList(project.langages, true);
  modalLanguages.appendChild(languageListModal);

  displayProjectLinks(project);

  modal.style.display = "block"; // Afficher la modal
}

function createLanguageList(languages, includeIcons = true) {
  const languageList = document.createElement("ul");
  languageList.classList.add("language-list");

  languages.forEach((language) => {
    const languageItem = document.createElement("li");

    if (includeIcons && language.icone) {
      const languageIcon = document.createElement("img");
      languageIcon.src = language.icone;
      languageIcon.alt = language.langage;
      languageIcon.classList.add("language-icon");
      languageItem.appendChild(languageIcon);
    }

    const languageName = document.createElement("span");
    languageName.textContent = language.langage;
    languageItem.appendChild(languageName);

    languageList.appendChild(languageItem);
  });

  return languageList;
}
function displayProjectLinks(project) {
  const modalLiens = document.querySelector(".lien-container-modal");

  modalLiens.innerHTML = "";

  // Pour Vérifier si le projet a des liens
  if (project.liens && project.liens.length > 0) {
    // Boucler à travers les liens du projet
    project.liens.forEach((lien) => {
      const lienElement = document.createElement("a");
      lienElement.href = lien.url;
      lienElement.classList.add("lien-modal");
      lienElement.target = "_blank";

      // Créer un élément <img> pour l'icône
      const iconeElement = document.createElement("img");
      iconeElement.src = lien.icone;
      iconeElement.alt = "Icône";
      iconeElement.classList.add("icone-lien-modal");

      const texteElementLienModal = document.createElement("p");
      texteElementLienModal.textContent = lien["lien vers"];
      texteElementLienModal.classList.add("texte-lien-modal");

      lienElement.appendChild(iconeElement);
      lienElement.appendChild(texteElementLienModal);

      // Ajouter l'élément <a> à la div modal-liens
      modalLiens.appendChild(lienElement);
    });
  }
}
