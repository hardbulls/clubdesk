import {DOMcreateElement} from "./jsx";

export const WideVideo = (videoPrefix: string) => {
    return (
        <div id="hardbulls-banner-video-wrapper">
            <video id="hardbulls-banner-video"
                   playsInline
                   autoPlay
                   muted
                   loop
                   poster={`https://www.hardbulls.com/clubdesk/wwwfiles/${videoPrefix}_poster.webp`}>
                <source src={`https://www.hardbulls.com/clubdesk/wwwfiles/${videoPrefix}_c_med25.webm`} type="video/webm"/>
                <source src={`https://www.hardbulls.com/clubdesk/wwwfiles/${videoPrefix}_c_med25.mp4`} type="video/mp4"/>
            </video>
            <div className="bulls-banner-logo"></div>
        </div>
    )
}
