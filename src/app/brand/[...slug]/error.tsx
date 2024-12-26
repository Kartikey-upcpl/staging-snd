'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <section className="page-not-found">
            <div className="content container">
                <h2 className="mb-3">ERROR!</h2>
                <h3 className="mb-3">Something went wrong!</h3>
                <p className="mb-3">
                    Please try again later or contact us if the problem persists.
                </p>
                <button
                    className="btn btn-primary d-flex align-items-center justify-content-center mx-auto"
                    onClick={
                        //Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </section>
    )
}