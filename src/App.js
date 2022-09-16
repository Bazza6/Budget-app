import { useState, useEffect } from "react";
import StylePanell from "./components/StylePanell";
import NumericInput from "./components/NumericInput";
import InfoButton from "./components/InfoButton";
import { Lista } from "./components/Lista";
import { SortLista } from "./components/SortLista";
import { useSearchParams } from "react-router-dom";

function App() {

  const [budget, setBudget] = useState(() => {
    let def = {
      web: false,
      seo: false,
      ads: false,
      numPag: 1,
      numIdiomas: 1,
      nombrePresupuesto: "",
      nombreUsuario: ""
    };
    let local = JSON.parse(localStorage.getItem("pressupost"));
    return local ? local : def;
  })

  let [preu, setPreu] = useState(0);

  // lista es la lista de presupuestos (es igual al state budget + fecha + preu)
  let [lista, setLista] = useState(() => {
    let def = [];
    let local = JSON.parse(localStorage.getItem("lista pressuposts"));
    return local ? local : def;
  })

  //como viene ordenada la lista de presupustos(original, alphabetic, fecha)
  let [order, setOrder] = useState("original");

  let [filterText, setFilterText] = useState("");  //el testo de la busqueda

  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(event) {   // se ocupa de actualizar budget
    let { checked, name, type, value } = event.target;
    setBudget(prev => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  function addPressupost() {   // esta funcion agrega un presupuesto a la lista de presupuestos
    const currentDate = new Date();
    let pressupost = {
      ...budget,
      fecha: currentDate,
      preu: preu,
    }
    setLista(prev => [...prev, pressupost])
    // una vez agregado un nuevo presupuesto a la lista volvemos a los valores por defecto de budget
    setBudget({
      web: false,
      seo: false,
      ads: false,
      numPag: 1,
      numIdiomas: 1,
      nombrePresupuesto: "",
      nombreUsuario: ""
    })
  }

  function delateLista() {
    setLista([]);
  }

  useEffect(() => {  // SET PREU
    setPreu(0);
    budget.web && setPreu(previus => previus + 500);
    budget.seo && setPreu(previus => previus + 300);
    budget.ads && setPreu(previus => previus + 200);
    budget.web && setPreu(previus => previus + (budget.numPag * budget.numIdiomas * 30))
  }, [budget]
  );

  // LOCALSTORAGE SET
  useEffect(() => {
    localStorage.setItem("pressupost", JSON.stringify(budget))
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("lista pressuposts", JSON.stringify(lista))
  })

  useEffect(() => {
    setSearchParams(budget)
  }, [budget])


  return (

    <div className='container'>
      <div className="izquierda">

        <p>¿Qué quieres hacer?</p>
        <input type="checkbox" id='paginaWeb' name="web" checked={budget.web} onChange={handleChange} />
        <label htmlFor="paginaWeb">Una pagina web {"("}500€{")"}</label><br />

        {budget.web && <StylePanell>
          <NumericInput description="Numero de paginas" name="numPag" onChange={handleChange} value={budget.numPag} setBudget={setBudget} />
          <InfoButton message="esto indica el numero de paginaaaaaas" />

          <NumericInput description="Numero de idiomas" name="numIdiomas" onChange={handleChange} value={budget.numIdiomas} setBudget={setBudget} />
          <InfoButton message="esto indica el numero de idiomaaaaas" />
        </StylePanell>}

        <input type="checkbox" id='consultoriaSEO' name="seo" checked={budget.seo} onChange={handleChange} />
        <label htmlFor="consultoriaSEO">Una consultoria SEO {"("}300€{")"}</label><br />

        <input type="checkbox" id='campanyaGoogle' name="ads" checked={budget.ads} onChange={handleChange} />
        <label htmlFor="campanyaGoogle">Una campanya Google Ads {"("}200€{")"}</label><br />

        <p>Preu: {preu}€ </p>

        <div>
          <span>Nombre pressupost </span><input className="inputInput" size="50" type="text" name="nombrePresupuesto" onChange={handleChange} value={budget.nombrePresupuesto} /><br />
          <span>Nombre usuario </span><input className="inputInput" type="text" name="nombreUsuario" onChange={handleChange} value={budget.nombreUsuario} /><br /><br />

          <button onClick={addPressupost}>guardar</button>
          <button onClick={delateLista}>Borrar todos los presupuestos</button>
        </div><br />

      </div>

      <div className="derecha">

        <SortLista changeOrder={setOrder} text={filterText} setText={setFilterText} />

        <Lista lista={lista} order={order} text={filterText} />

      </div>
    </div>

  );
}

export default App;