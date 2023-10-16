import {DOMcreateElement} from "../jsx";

interface Props {
    name: string
}

export const CoachCardContent = ({name}: Props) => {
    return (
        <div className="hardbulls-player-card-content">
            <div className="hardbulls-player-card-name">
                {name}
            </div>
            <div>
                <p>
                    Head Coach
                </p>
            </div>
        </div>
    )
}
