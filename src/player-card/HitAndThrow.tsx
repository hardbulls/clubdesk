import {DOMcreateElement} from "../jsx";

export const HitAndThrow = ({hitting, throwing}: {hitting?: string|undefined, throwing?: string|undefined}) => {
    return (
        <ul className="unstyled-list horizontal-list">
            {hitting && (<li><strong>Hits:</strong> {hitting}</li>) }
            {throwing && (<li><strong>Throws:</strong> {throwing}</li>) }

        </ul>
    )
}
