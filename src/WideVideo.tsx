import {DOMcreateElement} from "./jsx";

export const WideVideo = () => {
    return (
        <div id="hardbulls-banner-video-wrapper">
            <video id="hardbulls-banner-video"
                   playsInline
                   autoPlay
                   muted
                   loop
                   poster="https://www.hardbulls.com/clubdesk/wwwfiles/pitch_poster.webp">
                <source src="https://www.hardbulls.com/clubdesk/wwwfiles/pitch_med.webm" type="video/webm" />
            </video>
        </div>
    )
}
