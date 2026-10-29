import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentCard from "./components/StudentCard.jsx";
import Footer from "./components/Footer.jsx";

import me from "./assets/me.png";
import lala from "./assets/lala.png";

function App() {
  // 1. La liste des étudiants est maintenant un ÉTAT
  const [etudiants, setEtudiants] = useState([
    {
      id: 1,
      prenom: "Amani",
      nom: "Awainia",
      email: "amaniawainia@gmail.com",
      telephone: "+216 25 470 273",
      filiere: "Génie Logiciel et Systèmes d'Information",
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
      filiere: "Licence Computer Science",
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
      filiere: "Licence Business Computing",
      anneeEtude: "2ème année",
      groupe: "LBC 2",
    },
  ]);

  // 2. Le texte tapé dans la barre de filtre est aussi un état
  const [filtre, setFiltre] = useState("");

  // AJOUTER : on crée un NOUVEAU tableau (anciens étudiants + le nouveau)
  function ajouterEtudiant() {
    const nouvelEtudiant = {
      id: Date.now(), // identifiant unique
      prenom: "Yassine",
      nom: "Ben Salem",
      email: "yassine.bensalem@gmail.com",
      telephone: "+216 44 444 444",
      filiere: "Génie Logiciel et Systèmes d'Information",
      anneeEtude: "2ème année",
      groupe: "GLSI 1",
      ville: "Sfax",
    };
    setEtudiants([...etudiants, nouvelEtudiant]);
  }

  // SUPPRIMER : on garde tous les étudiants SAUF celui qui a cet id
  function supprimerEtudiant(id) {
    setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
  }

  // MODIFIER : on remplace seulement l'étudiant concerné par une copie modifiée
  function modifierPrenom(id) {
    const nouveauPrenom = prompt("Nouveau prénom :");
    if (!nouveauPrenom) return; // annulé ou vide : on ne change rien

    setEtudiants(
      etudiants.map((etudiant) =>
        etudiant.id === id ? { ...etudiant, prenom: nouveauPrenom } : etudiant
      )
    );
  }

  // FILTRER : on calcule la liste à afficher à partir de l'état
  const etudiantsFiltres = etudiants.filter((etudiant) =>
    etudiant.filiere.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Navbar />

      <div className="actions">
        <input
          type="text"
          className="search"
          placeholder="Filtrer par filière..."
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
        <button onClick={ajouterEtudiant}>+ Ajouter un étudiant</button>
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
            onModifier={() => modifierPrenom(etudiant.id)}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;