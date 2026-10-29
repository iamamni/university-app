import { useState } from "react";
import "./StudentCard.css";
import defaultImage from "../assets/react.svg";

function StudentCard(props) {
  // Chaque fiche a SON PROPRE état : au départ les coordonnées sont masquées
  const [coordonneesVisibles, setCoordonneesVisibles] = useState(false);

  const ville = props.ville || "Non renseignée";
  const image = props.image || defaultImage;

  function basculerCoordonnees() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  return (
    <div className="card">
      <img src={image} alt={`Photo de ${props.prenom}`} />

      <h2>Fiche étudiant</h2>

      <p>
        <strong>Nom & Prénom :</strong> {props.prenom} {props.nom}
      </p>

      {/* Affichage conditionnel avec && */}
      {coordonneesVisibles && (
        <>
          <p>
            <strong>Email :</strong> {props.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {props.telephone}
          </p>
        </>
      )}

      <p>
        <strong>Filière :</strong> {props.filiere}
      </p>
      <p>
        <strong>Année d'étude :</strong> {props.anneeEtude}
      </p>
      <p>
        <strong>Groupe :</strong> {props.groupe}
      </p>
      <p>
        <strong>Ville :</strong> {ville}
      </p>

      <div className="card-buttons">
        {/* Texte du bouton avec un ternaire */}
        <button onClick={basculerCoordonnees}>
          {coordonneesVisibles
            ? "Masquer les coordonnées"
            : "Afficher les coordonnées"}
        </button>
        <a className="btn" href={`mailto:${props.email}`}>
          Contacter
        </a>
        <button onClick={props.onModifier}>Modifier</button>
        <button className="danger" onClick={props.onSupprimer}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default StudentCard;