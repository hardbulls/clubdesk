import {DOMcreateElement} from "./jsx";

interface Props {
    onOpen: (container: HTMLElement, openTrigger: HTMLElement) => void
}

export interface Modal {
    handleClose: () => void
    handleOpen: (openTrigger: HTMLElement) => void
    container: JSX.Element
}

export const createModal = ({onOpen}: Props): Modal => {
    const handleClose = () => {
        const container = document.querySelector('.hardbulls-modal-container') as HTMLElement;

        if (container) {
            container.classList.remove("hardbulls-modal-open")
        }
    }
    const handleOpen = (openTrigger: HTMLElement) => {
        const container = document.querySelector('.hardbulls-modal-container') as HTMLElement;

        if (container) {
            container.classList.add("hardbulls-modal-open")

            const content = document.querySelector('.hardbulls-modal-container .hardbulls-modal-content') as HTMLElement;

            onOpen(content, openTrigger)
        }
    }

    const container = (
        <div className="hardbulls-modal-container">
            <div className="hardbulls-modal-background" onClick={handleClose}></div>
            <div className="hardbulls-modal-content-container">
                <button className="hardbulls-modal-close-button" onClick={handleClose}>X</button>
                <div className="hardbulls-modal-content"></div>
            </div>
        </div>
    )

    return {
        handleOpen,
        handleClose,
        container
    }
}
