import './tag-component.css'
import {DOMcreateElement} from "../jsx";

type Props = {
    text: string
    size?: 'small'|'large'
}

export const TagComponent = ({text, size = 'small'}: Props) => {
    const CN = 'hb-tag-component';

    return (
        <div className={`${CN} ${size === 'large' ? `${CN}-large` : ''}`}>
            {text}
        </div>
    )
}
