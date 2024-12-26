import { Suspense, use } from "react";

interface UxImageProps {
    options: Record<string, any>; // Options from the backend
}

const url = process.env.WORDPRESS_URL;
async function fetchMedia(id: number) {
    return await fetch(`${url}/wp-json/wp/v2/media/${id}`).then((res) => res.json());
}

export function UxImageElement({ options }: UxImageProps) {
    const getMedia = fetchMedia(options.id);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UxImage getMedia={getMedia} />
        </Suspense>
    )
}

function UxImage({ getMedia }: {getMedia: Promise<any>}) {
    const media = use(getMedia);
    return (
        <img src={media?.guid?.rendered} alt={media.alt_text} loading="lazy" />
    )
}