import "./App.css";
import me from "./assets/me.png";

const w = "Amani Awainia " ;
const y = "amaniawainia@gmail.com" ;
const z = "+216 25470273" ;
const x = "Génie Logiciel et Systèmes d'Information" ;
const v = "2ème année" ;
const u = "GLSI 2" ;
const t = "Mahdia" ;

function App() {

  return (
    <div className="App">
      <img src={me} alt="Photo de l'étudiant" />
      <h1 className="title">Fiche étudiant</h1>
      <p> <strong>Nom & Prénom :</strong> {w}</p>
      <p> <strong>Email :</strong> {y}</p>
      <p> <strong>Téléphone :</strong> {z}</p>
      <p> <strong>Fillière :</strong> {x}</p>
      <p> <strong>Année d'étude :</strong> {v}</p>
      <p> <strong>Groupe :</strong> {u}</p>
      <p> <strong>Ville :</strong> {t}</p>
      <a className="contact-btn" href="mailto:amaniawainia@gmail.com">contacter</a>

    </div>
  );
}

export default App;

