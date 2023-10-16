import {DOMcreateElement} from "./jsx";

interface Props {
    venue: string,
    label?: string,
}

export const GoogleMapsLink = ({venue, label}: Props): JSX.Element => {
    const mapsBaseUrl = "https://www.google.com/maps?q="

    return (
        <a href={`${mapsBaseUrl}${encodeURIComponent(venue)}`} target="_blank">
          {label || venue}
        </a>
    )
}
