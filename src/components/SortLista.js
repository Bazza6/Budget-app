function SortLista(props) {

    function orderAlphabetic() {
        props.changeOrder("alphabetic");
    }

    function orderFecha() {
        props.changeOrder("fecha");
    }

    function orderReset() {
        props.changeOrder("original")
    }

    function handleSearch(e) {
        props.setText(e.target.value);
    }

    return (
        <>
            <button onClick={orderAlphabetic}>ordenar alphabeticamente</button>
            <button onClick={orderFecha}>ordenar fecha (ultimo primero)</button>
            <button onClick={orderReset}>reset orden</button>

            <input type="text" value={props.text} onChange={handleSearch} placeholder="search..." />
        </>
    )
}

export { SortLista };