function NumericInput(props) { //esto gestiona el panel con numero paginas y numero idiomas

    // las funciones mas y menos suman o restan numero paginas y numero idiomas
    function mas(event) {
        let { value, name } = event.target;
        value = Number(value);
        props.setBudget(prev => {
            return {
                ...prev,
                [name]: value + 1
            }
        })
    }

    function menos(event) {
        let { value, name } = event.target;
        value = Number(value);
        if (value > 0) {
            props.setBudget(prev => {
                return {
                    ...prev,
                    [name]: value - 1
                }
            })
        }
    }
    return (
        <div className='input'>

            <span>{props.description} </span>

            <button className='inputButton' onClick={mas} value={props.value} name={props.name}> + </button>

            <input className="inputInput" type="number" id="numPag" name={props.name} onChange={props.onChange} value={props.value} />

            <button className='inputButton' onClick={menos} value={props.value} name={props.name}> - </button>

        </div >
    )
}

export default NumericInput;