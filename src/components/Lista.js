// Lista se ocupa de renderizar lo que le pasamos
function Lista(props) {

    let arrayPressupost = [];  //el arrey de presupuesto ordenado segun especificado por el state order
    if (props.order === "original") {
        arrayPressupost = props.lista;
    } else if (props.order === "alphabetic") {
        arrayPressupost = [...props.lista].sort((a, b) => (a.nombrePresupuesto > b.nombrePresupuesto) ? 1 : ((b.nombrePresupuesto > a.nombrePresupuesto) ? -1 : 0));
    } else if (props.order === "fecha") {
        arrayPressupost = [...props.lista].sort((a, b) => (b.fecha > a.fecha) ? 1 : ((a.fecha > b.fecha) ? -1 : 0));
    }

    let displayLista = [];
    if (props.lista.length == 0) {
        displayLista = <p>lista pressuposts buida</p>
    } else {
        arrayPressupost.forEach(pressupost => {
            if (pressupost.nombrePresupuesto.toLowerCase().indexOf(props.text.toLowerCase()) === -1) {
                return;
            } else {
                if (typeof pressupost.fecha === "string") {  //esto para solucionar el problema que cuando guardamos en localsotrage la fecha se pasa a string
                    pressupost.fecha = new Date(pressupost.fecha);
                }

                let date = `${pressupost.fecha.getDate()}/${pressupost.fecha.getMonth() + 1}/${pressupost.fecha.getFullYear()} ${pressupost.fecha.getHours()}:${pressupost.fecha.getMinutes()}:${pressupost.fecha.getSeconds()}`;

                displayLista.push(
                    <div className="listaPresupuesto">
                        <p> <br />
                            Presupuesto <b>{pressupost.nombrePresupuesto}</b><br />
                            fecha: {date} <br />
                            Usuario: {pressupost.nombreUsuario}<br />

                            {pressupost.web ? <>Pagina web: sí</> : <>Pagina web: no</>} <br />
                            {pressupost.web && <>&nbsp;&nbsp;&nbsp;numero paginas:  {pressupost.numPag}<br /></>}
                            {pressupost.web && <>&nbsp;&nbsp;&nbsp;numero idiomas:  {pressupost.numIdiomas}<br /></>}
                            {pressupost.seo ? <>Consltoria SEO: sí</> : <>Consltoria SEO: no</>}<br />
                            {pressupost.ads ? <>Google ADS: sí</> : <>Google ADS: no</>}<br />
                            Precio total: {pressupost.preu}€<br />
                        </p>
                        <hr />
                    </div>
                )
            }
        })
    }

    return (
        <>
            <div>
                {displayLista}
            </div>
        </>
    )
}

export { Lista };