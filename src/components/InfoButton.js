import { useState } from "react";

function InfoButton(props) {
    const [click, setClick] = useState(false);

    const toggleInfo = (event) => {
        (event.target.attributes.class.value !== "infoPopUp") && setClick(() => !click)
        // esto sirve a que no se cierre el popup si clicamos en el mensaje
    }

    return (
        <>
            <button className="inLine" onClick={toggleInfo}>i</button>

            {click && <div onClick={toggleInfo} className="containerInfo">
                <div className="infoPopUp">{props.message}</div>
            </div>}
        </>
    )
}

export default InfoButton; 