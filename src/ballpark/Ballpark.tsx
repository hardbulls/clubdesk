import {DOMcreateElement} from "../jsx";
import "./ballpark.css"


export const Ballpark = () => {

    return (
        <div className="map-wrapper">
        <div className="overlay-map">
            <div className="overlay-map-item" style={{top: '423px', left: '863px'}}>Clubheim/Kiosk</div>
            <div className="overlay-map-item" style={{top: '282px', left: '403px'}}>Kiosk</div>
            <div className="overlay-map-item" style={{top: '496px', left: '801px'}}>Gäste Dugout</div>
            <div className="overlay-map-item" style={{top: '373px', left: '781px'}}>Heim Dugout</div>
            <div className="overlay-map-item" style={{top: '421px', left: '1301px'}}>Parkplätze</div>
            <div className="overlay-map-item" style={{top: '288px', left: '481px'}}>Cage 1/2</div>
            <div className="overlay-map-item" style={{top: '561px', left: '781px'}}>Cage 3</div>
            <div className="overlay-map-item" style={{top: '328px', left: '581px'}}>Heim Bullpens</div>
            <div className="overlay-map-item" style={{top: '632px', left: '631px'}}>Gäste Bullpens</div>
            <div className="overlay-map-item" style={{top: '441px', left: '601px'}}>Hauptfeld</div>
            <div className="overlay-map-item" style={{top: '334px', left: '71px'}}>Nachwuchsfeld/Softballfeld 1</div>
            <div className="overlay-map-item" style={{top: '353px', left: '300px'}}>Gäste Dugout</div>
            <div className="overlay-map-item" style={{top: '284px', left: '284px'}}>Heim Dugout</div>
            <div className="overlay-map-item" style={{top: '646px', left: '397px'}}>Leftfield/Softballfeld 2</div>
            <div className="overlay-map-item" style={{top: '723px', left: '359px'}}>Gäste Dugout</div>
            <div className="overlay-map-item" style={{top: '701px', left: '591px'}}>Heim Dugout</div>
            <div className="overlay-map-item" style={{top: '271px', left: '701px'}}>WC/Umkleide</div>
        </div>
        <img src="./wwwfiles/field.webp" className="field-map" />
    </div>
    );
}
