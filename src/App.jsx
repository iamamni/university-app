import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentForm from "./components/StudentForm.jsx";
import StudentCard from "./components/StudentCard.jsx";
import Footer from "./components/Footer.jsx";

import me from "./assets/me.png";
import lala from "./assets/lala.png";

function App() {
  const [etudiants, setEtudiants] = useState([
    {
      id: 1,
      prenom: "Amani",
      nom: "Awainia",
      email: "amaniawainia@gmail.com",
      telephone: "+216 25 470 273",
      filiere: "GLSI",
      anneeEtude: "2ème année",
      groupe: "GLSI 2",
      ville: "Mahdia",
      image: me,
    },
    {
      id: 2,
      prenom: "Sarra",
      nom: "Trabelsi",
      email: "sarra.trabelsi@gmail.com",
      telephone: "+216 22 345 678",
      filiere: "LCS",
      anneeEtude: "1ère année",
      groupe: "LCS 1",
      image: lala,
    },
    {
      id: 3,
      prenom: "Mariem",
      nom: "Khalfallah",
      email: "mariem.khalfallah@gmail.com",
      telephone: "+216 27 567 890",
      filiere: "LBC",
      anneeEtude: "2ème année",
      groupe: "LBC 2",
    },
  ]);

  const [filtre, setFiltre] = useState("");

  // null = mode ajout, sinon = l'étudiant qu'on est en train de modifier
  const [etudiantAModifier, setEtudiantAModifier] = useState(null);

  // AJOUTER : reçoit les données du formulaire et ajoute un id
  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, id: Date.now() };
    setEtudiants((anciensEtudiants) => [...anciensEtudiants, etudiantAvecId]);
  }

  // SUPPRIMER
  function supprimerEtudiant(id) {
    setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
    if (etudiantAModifier?.id === id) {
      setEtudiantAModifier(null); // on supprimait celui qu'on modifiait
    }
  }

  // MODIFIER (étape 1) : clic sur "Modifier" dans une carte
  function modifierEtudiant(etudiant) {
    setEtudiantAModifier(etudiant);
    window.scrollTo({ top: 0, behavior: "smooth" }); // remonter vers le formulaire
  }

  // MODIFIER (étape 2) : le formulaire renvoie l'étudiant modifié
  function enregistrerModification(etudiantModifie) {
    setEtudiants((anciensEtudiants) =>
      anciensEtudiants.map((etudiant) =>
        etudiant.id === etudiantAModifier.id
          ? { ...etudiantModifie, id: etudiant.id } // on garde le même id
          : etudiant
      )
    );
    setEtudiantAModifier(null); // retour au mode ajout
  }

  const etudiantsFiltres = etudiants.filter((etudiant) =>
    etudiant.filiere.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Navbar />

      <StudentForm
        key={etudiantAModifier ? etudiantAModifier.id : "nouveau"}
        onAjouterEtudiant={ajouterEtudiant}
        etudiantAModifier={etudiantAModifier}
        onModifierEtudiant={enregistrerModification}
        onAnnuler={() => setEtudiantAModifier(null)}
      />

      <div className="actions">
        <input
          type="text"
          className="search"
          placeholder="Filtrer par filière..."
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
      </div>

      <main className="container">
        {etudiantsFiltres.length === 0 && (
          <p className="vide">Aucun étudiant trouvé.</p>
        )}

        {etudiantsFiltres.map((etudiant) => (
          <StudentCard
            key={etudiant.id}
            prenom={etudiant.prenom}
            nom={etudiant.nom}
            email={etudiant.email}
            telephone={etudiant.telephone}
            filiere={etudiant.filiere}
            anneeEtude={etudiant.anneeEtude}
            groupe={etudiant.groupe}
            ville={etudiant.ville}
            image={etudiant.image}
            onSupprimer={() => supprimerEtudiant(etudiant.id)}
            onModifier={() => modifierEtudiant(etudiant)}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;