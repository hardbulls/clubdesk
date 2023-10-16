import './field-section.css'
import {DOMcreateElement} from "../jsx";
import ballparkInfo from '../../config/ballpark.json'
import {IconMapping} from "../icons";

export const FieldSection = () => {
    return (
        <div className="hardbulls-ballpark-info">
            {ballparkInfo.map((info) => {
                const icon = IconMapping[info.icon];

                if (!icon) {
                    throw new Error(`Icon ${info.icon} not found.`);
                }

                return (
                    <div className="hardbulls-field-section-item">
                        <img src={icon} width={32} height={32}/>
                        <span>{info.name}</span>
                    </div>
                )
            })}

        </div>

    )

}
