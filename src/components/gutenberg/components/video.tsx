"use client"
import { classnames } from "@/utlis/classnames";
import { randomGeneralKey } from "../uxbuilder/definitions";

export function VideoComponent({
    youtube,
    videoMp4,
    videoOgg,
    videoWebm,
    videoSound,
    videoLoop,
    videoVisibility,
}: {
    youtube: string;
    videoMp4: string;
    videoOgg: string;
    videoWebm: string;
    videoSound: string;
    videoLoop: string;
    videoVisibility: string;
}) {

    const key = "ytplayer-" + randomGeneralKey(3).toString();
    let child = undefined;

    const loop = videoLoop === "true" ? "1": "0";
    const sound = videoSound === "true" ? "1": "0";

    if (youtube) {

        let query: {[key: string]: string} = {
            html5: "1",
            autoplay: "1",
            controls: "0",            
            rel: "0",   
            modestbranding: "1",
            playsinline: "1",
            showinfo: "0",
            fs: "0",
            loop: loop,
            el: "0",
            enablejsapi: "1",
            origin: window.location.origin,
            widgetid: "1",
        }

        if (loop === "1") {
            query.playlist = youtube;
        }

        var queryString = Object.keys(query).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        }).join('&');

        child = (
            <iframe
                id={key}
                className={classnames(
                    "ux-youtube fill object-fit",
                    {
                        
                        [videoVisibility]: videoVisibility !== "",
                    }
                )}
                data-videoid={youtube}
                data-loop={loop}
                data-audio={sound}
                frameBorder={0}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtube}?${queryString}`}
                data-gtm-yt-inspected-9="true"
            />
        )
    }

    if (!!child) {
        return (
            <>
                <div className="section-bg-overlay absolute fill" />
                {child}
            </>
        )
    }
    // <div className="section-bg-overlay absolute fill" />
    // <iframe id="ytplayer-942" className="ux-youtube fill object-fit hide-for-medium" frameBorder={0} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="NÉT - Nhà TINH HOA (Tiết Mục NEW BEAT) Công Diễn 5 | ANH TRAI VƯỢT NGÀN CHÔNG GAI 2024" width="100%" height="100%" src="https://www.youtube.com/embed/72aCjqHa9hE?html5=1&amp;autoplay=1&amp;controls=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;fs=0&amp;loop=1&amp;el=0&amp;playlist=72aCjqHa9hE&amp;enablejsapi=1&amp;origin=https%3A%2F%2Ftest.snd.in&amp;widgetid=1" data-gtm-yt-inspected-9="true"></iframe>
    return undefined;
}
