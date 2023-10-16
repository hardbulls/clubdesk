import {DOMcreateElement} from "../jsx";

export const CountryFlag = ({code }: {code: string}) => {
    return (
        <div className="hardbulls-player-card-flag">
            <span className={`hb-flag flag-${code} flag-38`}></span>
        </div>
    )
}
