import { useState } from "react";
import "./StudentForm.css";

// Valeurs vides : utilisées en mode ajout et pour vider le formulaire
const formulaireVide = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  filiere: "",
  anneeEtude: "",
  groupe: "",
  ville: "",
  image: "",
};

function StudentForm({
  onAjouterEtudiant,
  etudiantAModifier,
  onModifierEtudiant,
  onAnnuler,
}) {
  // Un seul état pour tous les champs.
  // Si on modifie un étudiant, les champs sont préremplis avec ses infos.
  const [formData, setFormData] = useState({
    nom: etudiantAModifier?.nom || "",
    prenom: etudiantAModifier?.prenom || "",
    email: etudiantAModifier?.email || "",
    telephone: etudiantAModifier?.telephone || "",
    filiere: etudiantAModifier?.filiere || "",
    anneeEtude: etudiantAModifier?.anneeEtude || "",
    groupe: etudiantAModifier?.groupe || "",
    ville: etudiantAModifier?.ville || "",
    image: etudiantAModifier?.image || "",
  });

  // Les messages d'erreur ({} = aucune erreur au départ)
  const [erreurs, setErreurs] = useState({});

  // Met à jour UN champ en gardant les autres
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Image choisie depuis l'ordinateur
  function handleImage(e) {
    const fichier = e.target.files[0];
    if (fichier) {
      setFormData({ ...formData, image: URL.createObjectURL(fichier) });
    }
  }

  function validerFormulaire() {
    const nouvellesErreurs = {};

    if (!formData.nom.trim()) {
      nouvellesErreurs.nom = "Le nom est obligatoire";
    }
    if (!formData.prenom.trim()) {
      nouvellesErreurs.prenom = "Le prénom est obligatoire";
    }
    if (!formData.email.trim()) {
      nouvellesErreurs.email = "L'email est obligatoire";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nouvellesErreurs.email = "L'email n'est pas valide";
    }
    if (!formData.telephone.trim()) {
      nouvellesErreurs.telephone = "Le téléphone est obligatoire";
    }
    if (!formData.filiere) {
      nouvellesErreurs.filiere = "Choisir une filière";
    }

    setErreurs(nouvellesErreurs);
    // true si aucune erreur
    return Object.keys(nouvellesErreurs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault(); // empêche le rechargement de la page

    if (!validerFormulaire()) {
      return; // il y a des erreurs : on s'arrête
    }

    if (etudiantAModifier) {
      onModifierEtudiant({ ...etudiantAModifier, ...formData });
    } else {
      onAjouterEtudiant(formData);
      setFormData(formulaireVide); // on vide le formulaire après l'ajout
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form" noValidate>
      <h2>{etudiantAModifier ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>

      <div className="form-group">
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          placeholder="Saisir le nom"
          value={formData.nom}
          onChange={handleChange}
        />
        {erreurs.nom && <p className="error-msg">{erreurs.nom}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Saisir le prénom"
          value={formData.prenom}
          onChange={handleChange}
        />
        {erreurs.prenom && <p className="error-msg">{erreurs.prenom}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="exemple@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {erreurs.email && <p className="error-msg">{erreurs.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="+216 ..."
          value={formData.telephone}
          onChange={handleChange}
        />
        {erreurs.telephone && <p className="error-msg">{erreurs.telephone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          name="filiere"
          value={formData.filiere}
          onChange={handleChange}
        >
          <option value="">Choisir une filière</option>
          <option value="GLSI">GLSI</option>
          <option value="DSI">DSI</option>
          <option value="RSI">RSI</option>
          <option value="LCS">LCS</option>
          <option value="LBC">LBC</option>
        </select>
        {erreurs.filiere && <p className="error-msg">{erreurs.filiere}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="anneeEtude">Année d'étude :</label>
        <input
          type="text"
          id="anneeEtude"
          name="anneeEtude"
          placeholder="ex : 2ème année"
          value={formData.anneeEtude}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="groupe">Groupe :</label>
        <input
          type="text"
          id="groupe"
          name="groupe"
          placeholder="ex : GLSI 2"
          value={formData.groupe}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ville">Ville :</label>
        <input
          type="text"
          id="ville"
          name="ville"
          placeholder="ex : Sousse"
          value={formData.ville}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image :</label>
        <input type="file" id="image" accept="image/*" onChange={handleImage} />
        {formData.image && (
          <img className="apercu" src={formData.image} alt="Aperçu" />
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {etudiantAModifier ? "Modifier" : "Ajouter"}
        </button>
        {etudiantAModifier && (
          <button type="button" className="btn-cancel" onClick={onAnnuler}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;