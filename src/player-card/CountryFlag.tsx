import {DOMcreateElement} from "../jsx";

export const CountryFlag = ({code }: {code: string}) => {
    return (
        <div className="hardbulls-player-card-flag">
            <div className={`hb-flag flag-${code} flag-38`}></div>
        </div>
    )
}
