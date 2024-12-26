import React from "react";

const maxLengthNumnber = 5;

export default function Pagination({ pagination, currentVisit = 1, onChangePagination }: { pagination: number, currentVisit?: number, onChangePagination: (visit: number) => void }) {
    let arrayPagination = pagination > maxLengthNumnber
        ? Array.apply(null, Array(maxLengthNumnber)).map(function (_, i) { return currentVisit > maxLengthNumnber ? currentVisit - (maxLengthNumnber - i) + 1 : i + 1; })
        : Array.apply(null, Array(pagination)).map(function (_, i) { return i + 1; });

    return (
        <nav>
            <ul className="inline-flex -space-x-px text-sm flex-wrap">
                <li>
                    <button
                        onClick={currentVisit !== 1 ? () => onChangePagination(1): undefined}
                        className={currentVisit === 1
                            ? "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            : "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }
                    >
                        <span className="sr-only">First</span>
                        <svg className="w-6 h-6 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button
                        onClick={currentVisit > 1 ? () => onChangePagination(currentVisit - 1): undefined}
                        className={currentVisit <= 1
                            ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-white border border-gray-300 hover:text-gray-300"
                            : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-900 hover:text-gray-700"
                        }
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {arrayPagination.map((pagi) => {
                    return (
                        <li key={pagi}>
                            <button
                                onClick={currentVisit !== pagi ? () => onChangePagination(pagi): undefined}
                                className={pagi === currentVisit
                                    ? "flex items-center justify-center px-3 h-8 text-red-600 border border-gray-300 bg-red-50 hover:bg-red-100 hover:text-red-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-900 hover:text-gray-700 "}
                            >{pagi}</button>
                        </li>
                    )
                })}
                <button
                    onClick={currentVisit < pagination ? () => onChangePagination(currentVisit + 1): undefined}
                    className={
                        currentVisit >= pagination
                        ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-white border border-gray-300 hover:text-gray-300"
                        : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-900 hover:text-gray-700"
                }
                >
                    <span className="sr-only">Next</span>
                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                </button>
                <button
                    onClick={currentVisit < pagination ? () => onChangePagination(pagination): undefined}
                    className={currentVisit >= pagination
                        ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-white border border-gray-300 rounded-e-lg hover:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                >
                    <span className="sr-only">Last</span>
                    <svg className="w-6 h-6 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                    </svg>
                </button>
            </ul>
        </nav>
    )
}