import {DOMcreateElement} from "../jsx";

export const Positions = ({positions}: {positions: string[]}) => {
    return (
        <div>
            <strong>{positions.length > 1 ? "Positions: " : "Position: "}</strong>
            <br/>
            <ul className="unstyled-list">
                {positions.map(position => (<li>{position}</li>))}
            </ul>
        </div>
    )
}
