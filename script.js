// Fonction principale pour calculer les tailles
function convertirTaille() {
  const tailleEntree = parseFloat(document.getElementById("tailles").value);
  const typeTaille = document.getElementById("type-taille").value;
  const sexe = document.getElementById("sexe").value;
  if (!sexe)
    return alert("Veuillez sélectionner votre sexe avant de continuer.");

  if (!tailleEntree || !typeTaille || !sexe) {
    document.getElementById("resultat").style.display = "none";
    return;
  }

  let tailleEur = 0,
    tailleUk = 0,
    tailleUs = 0,
    longueurPiedCm = 0,
    mondopoint = 0;

  switch (typeTaille) {
    case "eur":
      tailleEur = tailleEntree;
      longueurPiedCm = tailleEur * 0.667 - 2 * 0.667;
      break;
    case "cm":
      longueurPiedCm = tailleEntree;
      tailleEur = (longueurPiedCm + 2 * 0.667) / 0.667;
      break;
    case "mondopoint":
      mondopoint = tailleEntree;
      longueurPiedCm = mondopoint / 10;
      tailleEur = (longueurPiedCm + 2 * 0.667) / 0.667;
      break;
    case "uk":
      if (sexe === "homme" || sexe === "femme") {
        tailleUk = tailleEntree;
        longueurPiedCm = (tailleUk + 25) * 0.847 - 2 * 0.847;
      } else if (sexe === "enfant") {
        tailleUk = tailleEntree;
        longueurPiedCm = ((tailleUk + 12 - 0.4) * 0.847) / 1.08;
      }
      tailleEur = (longueurPiedCm + 2 * 0.667) / 0.667;
      break;
    case "us":
      if (sexe === "homme") {
        tailleUs = tailleEntree;
        longueurPiedCm = (tailleUs + 24) * 0.847 - 2 * 0.847;
      } else if (sexe === "femme") {
        tailleUs = tailleEntree;
        longueurPiedCm = (tailleUs + 23) * 0.847 - 2 * 0.847;
      } else if (sexe === "enfant") {
        tailleUs = tailleEntree;
        longueurPiedCm = ((tailleUs + 11.5 - 0.4) * 0.847) / 1.08;
      }
      tailleEur = (longueurPiedCm + 2 * 0.667) / 0.667;
      break;
  }

  // Calcul des tailles manquantes
  if (typeTaille !== "uk") {
    if (sexe === "homme" || sexe === "femme") {
      tailleUk = (longueurPiedCm + 2 * 0.847) / 0.847 - 25;
    } else if (sexe === "enfant") {
      tailleUk = (longueurPiedCm * 1.08) / 0.847 - 12 + 0.4;
    }
  }
  if (typeTaille !== "us") {
    if (sexe === "homme") {
      tailleUs = (longueurPiedCm + 2 * 0.847) / 0.847 - 24;
    } else if (sexe === "femme") {
      tailleUs = (longueurPiedCm + 2 * 0.847) / 0.847 - 23;
    } else if (sexe === "enfant") {
      tailleUs = (longueurPiedCm * 1.08) / 0.847 - 11.5 + 0.4;
    }
  }
  if (typeTaille !== "mondopoint") {
    mondopoint = longueurPiedCm * 10;
  }

  // Affichage des résultats
  document.getElementById("resultat").style.display = "block";
  document.getElementById(
    "resultat-eur"
  ).textContent = `Taille EUR : ${Math.round(tailleEur)} EU`;
  document.getElementById(
    "resultat-uk"
  ).textContent = `Taille UK : ${Math.round(tailleUk)} UK`;
  document.getElementById(
    "resultat-us"
  ).textContent = `Taille US : ${Math.round(tailleUs)} US`;
  document.getElementById(
    "resultat-cm"
  ).textContent = `Longueur du pied : ${longueurPiedCm.toFixed(1)} cm`;
  document.getElementById(
    "resultat-mondopoint"
  ).textContent = `Mondopoint : ${Math.round(mondopoint)}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const sliderValue = document.getElementById("slider-value");
  const taillesInput = document.getElementById("tailles");
  const typeTailleSelect = document.getElementById("type-taille");

  // Définir "eur" comme taille par défaut
  typeTailleSelect.value = "eur";

  // Fonction pour ajuster le slider en fonction du type de taille
  function ajusterSlider() {
    const typeTaille = typeTailleSelect.value;

    switch (typeTaille) {
      case "eur":
        slider.min = 10;
        slider.max = 60;
        slider.step = 0.5;
        break;
      case "uk":
      case "us":
        slider.min = 1;
        slider.max = 25;
        slider.step = 1;
        break;
      case "mondopoint":
        slider.min = 50;
        slider.max = 370;
        slider.step = 5;
        break;
      case "cm":
        slider.min = 10;
        slider.max = 60;
        slider.step = 0.5;
        break;
      default:
        slider.min = 1;
        slider.max = 57;
        slider.step = 0.5;
    }

    // Met à jour la valeur actuelle du slider
    slider.value = slider.min;
    sliderValue.textContent = slider.value;
    taillesInput.value = slider.value;
  }

  // Synchronisation slider -> champ numérique
  slider.addEventListener("input", function () {
    sliderValue.textContent = this.value;
    taillesInput.value = this.value;
    convertirTaille();
  });

  // Synchronisation champ numérique -> slider
  taillesInput.addEventListener("input", function () {
    const value = parseFloat(this.value);
    if (value >= parseFloat(slider.min) && value <= parseFloat(slider.max)) {
      slider.value = value;
      sliderValue.textContent = value;
      convertirTaille();
    }
  });

  // Mise à jour du slider lorsque le type de taille change
  typeTailleSelect.addEventListener("change", function () {
    ajusterSlider();
    convertirTaille();
  });

  // Déclenchement avec le bouton Calculer
  document
    .getElementById("btn-calculer")
    .addEventListener("click", convertirTaille);

  ajusterSlider();
});
