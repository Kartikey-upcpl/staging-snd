//  "use client";
//  import React, { useState, useTransition } from 'react';
//  import { useFormState } from 'react-dom';
// import { ContactUsAction } from '@/components/contacts/action';
// import Loading from '@/components/ui/Loading';


// const ContactForm = () => {
//     const [isPending, startTransition] = useTransition();
//     const [isDisable, setIsDisable] = useState(true);

//     const [state, action] = useFormState(
//         async (currentState: any, formData: FormData) => {
//             try {
//                 const response = await ContactUsAction(formData);
//                 console.log("response", response)

//                 return {
//                     ...currentState,
//                     message: response?.data?.message || 'Message sent successfully!',
//                 };
//             } catch (error) {
//                 console.error('Form submission error:', error);
//                 return {
//                     ...currentState,
//                     message: 'Failed to send the message. Please try again.',
//                 };
//             }
//         },
//         { message: "" }
//     );

//     // Handle input change to enable/disable the submit button
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setIsDisable(e.target.value.trim() === "");
//     };

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget); // Extract form data from the event
//         startTransition(() => {
//             action(formData); // Trigger the form action with FormData
//         });

//     };




//     return (
//         <div className="sm:w-2/4 mx-4 py-4 px-4 border-2 border-gray-200 shadow-md rounded-md">
//             <h2 className="text-center text-lg font-semibold text-blue-900 mb-2">
//                 Contact Us
//             </h2>
//             <p className="text-center text-sm text-gray-600 mb-6">
//                 Have some suggestions or just want to say hi? Contact us:
//             </p>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//                 <input type="hidden" name="_wpcf7" value="47273" />
//                 <input type="hidden" name="_wpcf7_version" value="5.9.2" />
//                 <input type="hidden" name="_wpcf7_locale" value="en_US" />
//                 <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f47273-p14585-o1" />
//                 <input type="hidden" name="_wpcf7_container_post" value="14585" />

//                 <div>
//                     <label
//                         className="block text-sm font-semibold mb-1 text-center"
//                         htmlFor="name"
//                     >
//                         Your name
//                     </label>
//                     <input
//                         type="text"
//                         name="your-name"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Your name"
//                         value={state.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         className="block text-sm font-semibold mb-1 text-center"
//                         htmlFor="email"
//                     >
//                         Your email
//                     </label>
//                     <input
//                         type="email"
//                         name="your-email"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Your email"
//                         value={state.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         className="block text-sm font-semibold mb-1 text-center"
//                         htmlFor="phone"
//                     >
//                         Your Phone
//                     </label>
//                     <input
//                         type="tel"
//                         name="your-phone"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Your Phone"
//                         value={state.phone}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         className="block text-sm font-semibold mb-1 text-center"
//                         htmlFor="subject"
//                     >
//                         Subject
//                     </label>
//                     <input
//                         type="text"
//                         name="your-subject"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Subject"
//                         value={state.subject}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         className="block text-sm font-semibold mb-1 text-center"
//                         htmlFor="message"
//                     >
//                         Your message (optional)
//                     </label>
//                     <textarea
//                         name="your-message"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Your message (optional)"
//                         rows={4}
//                         value={state.messages}
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>

//                 <div className="text-center">
//                     <button
//                         type="submit"
//                         className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-700"
//                     >
//                         {isPending ? <Loading className="spinner-border-sm text-white" /> : "Submit"}
//                     </button>
//                 </div>

//                 {state.message && (
//                     <p className="text-center mt-4 text-green-500">
//                         {state.message}
//                     </p>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default ContactForm;



"use client";
import React, { useRef, useState, useTransition } from 'react';
import { QuickSupportAction } from '@/components/contactus/action';
import Loading from '@/components/ui/Loading';
const QuickSupportForm = () => {
    const [isPending, startTransition] = useTransition();
    const [file, setFile] = useState<File | null>(null); // State for file upload
    const [message, setMessage] = useState("")
    const formRef = useRef<HTMLFormElement>(null); // Ref to the form element

    const [formData, setFormData] = useState({
        'your-name': '',
        'your-email': '',
        'your-phone': '',
        'your-subject': '',
        'your-message': '',
    });



    // Handle input change to enable/disable the submit button
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); // Extract form data from the event

        if (file) {
            formData.append('fileupload', file);
        } else {
            formData.delete('fileupload'); // Ensure fileupload is not sent if no file
        }

        startTransition(() => {
            QuickSupportAction(formData)
                .then((response) => {
                    console.log("response", response)
                    const message =
                        response?.data &&
                            response?.data?.invalid_fields?.length >= 1
                            ? response.data.invalid_fields[0].message
                            : response.data.message;

                    setMessage(message);
                    resetForm(); // Reset form after successful submission
                })
                .catch((error) => {
                    console.error('Form submission error:', error);
                });
        });
    };


    const resetForm = () => {
        formRef.current?.reset(); // Reset the form fields
        setFile(null); // Clear file input state
        setFormData({
            'your-name': '',
            'your-email': '',
            'your-phone': '',
            'your-subject': '',
            'your-message': '',
        });
    };

    return (
        <div className="sm:w-2/4 mx-4 py-4 px-2 border-2 border-gray-200 shadow-md rounded-md">
            <h2 className="text-center text-lg font-semibold text-blue-900 mb-2">
                Contact Us
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
                Have some suggestions or just want to say hi? Contact us:
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="hidden" name="_wpcf7" value="47273" />
                <input type="hidden" name="_wpcf7_version" value="5.9.2" />
                <input type="hidden" name="_wpcf7_locale" value="en_US" />
                <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f47273-p14585-o1" />
                <input type="hidden" name="_wpcf7_container_post" value="14585" />

                <div>
                    <label
                        className="block text-sm font-semibold mb-1 text-center"
                        htmlFor="name"
                    >
                        Your name
                    </label>
                    <input
                        type="text"
                        name="your-name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your name"
                        value={formData['your-name']}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold mb-1 text-center"
                        htmlFor="email"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        name="your-email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your email"
                        value={formData['your-email']}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold mb-1 text-center"
                        htmlFor="phone"
                    >
                        Your Phone
                    </label>
                    <input
                        type="tel"
                        name="your-phone"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your Phone"
                        value={formData['your-phone']}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold mb-1 text-center"
                        htmlFor="subject"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        name="your-subject"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Subject"
                        value={formData['your-subject']}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold mb-1 text-center"
                        htmlFor="message"
                    >
                        Your message (optional)
                    </label>
                    <textarea
                        name="your-message"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your message (optional)"
                        rows={4}
                        value={formData['your-message']}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-700"
                    >
                        {isPending ? <Loading className="spinner-border-sm text-white" /> : "Submit"}
                    </button>
                </div>

                {message && (
                    <p className="text-center mt-4 text-green-500">
                        {message}
                    </p>
                )}
            </form>
        </div >
    );
};

export default QuickSupportForm;