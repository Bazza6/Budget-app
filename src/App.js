import { useState, useEffect } from "react";
import './App.css';
import StylePanell from "./components/StylePanell";
import NumericInput from "./components/NumericInput";
import InfoButton from "./components/InfoButton";
import { Lista, SortLista } from "./components/Lista";
import { useSearchParams } from "react-router-dom";

function App() {

  const [option, setOption] = useState(() => {
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

  let [preu, setPreu] = useState(0);  //es necesario crear un state por el precio?

  // lista es la lista de presupuestos. Es igual al state option + fecha + preu
  let [lista, setLista] = useState(() => {
    let def = [];
    let local = JSON.parse(localStorage.getItem("lista pressuposts"));
    return local ? local : def;
  })

  //como viene ordenada la lista de presupustos(original, alphabetic, fecha)
  let [order, setOrder] = useState("original");

  let [filterText, setFilterText] = useState("");  //el testo de la busqueda

  function handleChange(event) {   // se ocupa de actualizar option
    let { checked, name, type, value } = event.target;
    setOption(prev => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  function addPressupost() {   // esta funcion agrega un presupuesto a la lista de presupuestos
    const currentDate = new Date();
    let pressupost = {
      ...option,
      fecha: currentDate,
      preu: preu,
    }
    setLista(prev => [...prev, pressupost])
    // una vez agregado un nuevo presupuesto a la lista volvemos a los valores por defecto de option
    setOption({
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
    //se podria hacer sin usar useEffect? Porqué se llamo setPreu despues de actualizar 
    //option con setOption coje los valores no actualizados de option
    setPreu(0);
    //updatePreu();

    option.web && setPreu(previus => previus + 500);
    option.seo && setPreu(previus => previus + 300);
    option.ads && setPreu(previus => previus + 200);
    option.web && setPreu(previus => previus + (option.numPag * option.numIdiomas * 30))
  }, [option]
  );

  // LOCALSTORAGE SET
  useEffect(() => {
    localStorage.setItem("pressupost", JSON.stringify(option))
  }, [option]);

  useEffect(() => {
    localStorage.setItem("lista pressuposts", JSON.stringify(lista))
  })


  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(option)
  }, [option])


  return (

    <div className='container'>

      <div className="izquierda">

        <p>¿Qué quieres hacer?</p>
        <input type="checkbox" id='paginaWeb' name="web" checked={option.web} onChange={handleChange} />
        <label htmlFor="paginaWeb">Una pagina web {"("}500€{")"}</label><br />

        {option.web && <StylePanell>
          <NumericInput description="Numero de paginas" name="numPag" onChange={handleChange} value={option.numPag} setOption={setOption} />
          <InfoButton message="esto indica el numero de paginaaaaaas" />

          <NumericInput description="Numero de idiomas" name="numIdiomas" onChange={handleChange} value={option.numIdiomas} setOption={setOption} />
          <InfoButton message="esto indica el numero de idiomaaaaas" />
        </StylePanell>}

        <input type="checkbox" id='consultoriaSEO' name="seo" checked={option.seo} onChange={handleChange} />
        <label htmlFor="consultoriaSEO">Una consultoria SEO {"("}300€{")"}</label><br />

        <input type="checkbox" id='campanyaGoogle' name="ads" checked={option.ads} onChange={handleChange} />
        <label htmlFor="campanyaGoogle">Una campanya Google Ads {"("}200€{")"}</label><br />

        <p>Preu: {preu}€ </p>

        <div>
          <span>Nombre pressupost </span><input className="inputInput" size="50" type="text" name="nombrePresupuesto" onChange={handleChange} value={option.nombrePresupuesto} />
          <br />
          <span>Nombre usuario </span><input className="inputInput" type="text" name="nombreUsuario" onChange={handleChange} value={option.nombreUsuario} />
          <br />
          <br />

          <button onClick={addPressupost}>guardar</button>
          <button onClick={delateLista}>Borrar todos los presupuestos</button>
        </div>

      </div>


      <div className="derecha">

        <SortLista changeOrder={setOrder} text={filterText} setText={setFilterText} />

        <Lista lista={lista} order={order} text={filterText} />

      </div>
    </div>

  );
}

export default App;