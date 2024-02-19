import type {MouseEvent} from "react";
import {DOMcreateElement} from "../jsx";
import type {Modal} from "../create-modal";

interface Props {
    name: string
    modal: Modal
}

export const Statistics = ({name, modal}: Props): JSX.Element => {
    const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        event.preventDefault()
        modal.handleOpen(event.currentTarget)
    }

    return (
        <div className="hardbulls-player-card-statistics">
            <a className="has-tooltip" data-tooltip="Statistik" onClick={handleClick} data-modal="hardbulls-statistics-modal" data-player={name}>
                <span className="fas fa-chart-bar">
                </span>
            </a>
        </div>
    )
}
