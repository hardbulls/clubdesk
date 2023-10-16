import {DOMcreateElement} from "../jsx";

interface Props {
    value: string
}

export const CooperationIcon = ({value}: Props): JSX.Element => {
    return (
        <div className="hardbulls-player-card-cooperation">
            <span className="has-tooltip" title={`Kooperationsspieler von den ${value}`}>
                <span className="fas fa-handshake">
                </span>
            </span>
        </div>
    )
}
