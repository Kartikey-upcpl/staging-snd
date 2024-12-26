import React from 'react';
interface ContactItemPropsType {
    heading: string;
    text: string;
    imageSrc: string;
    actionText: string;
    actionLink: string
}

const ContactItem = ({ heading, text, imageSrc, actionText, actionLink }: ContactItemPropsType) => {
    return (
        <div className="text-center sm:w-2/4 mx-4 my-4 sm:my-0 py-4 border-2 border-gray-200 shadow-md rounded-md">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">{heading}</h2>
            <p className="text-sm text-gray-600 mb-4">{text}</p>
            <div className="mb-2">
                <img
                    src={imageSrc}
                    alt={`${heading} Icon`}
                    className="w-14 h-14 mx-auto"
                />
            </div>
            <a
                href={actionLink}
                className="text-blue-900 font-bold hover:underline"
            >
                {actionText}
            </a>
        </div>
    );
};

export default ContactItem;
