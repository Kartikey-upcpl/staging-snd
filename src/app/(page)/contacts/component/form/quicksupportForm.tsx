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
        'YourPhoneNumber': '',
        'your-subject': '',
        'ProductName': '',
        'OrderID': '',
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
            'YourPhoneNumber': '',
            'your-subject': '',
            'ProductName': '',
            'OrderID': '',
            'your-message': '',
        });
    };

    return (
        <div className="sm:w-2/4 mx-4 py-4 px-2 border-2 border-gray-200 shadow-md rounded-md">
            <h2 className="text-center text-lg font-semibold text-blue-900 mb-2">Quick Support</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
                Have some suggestions or just want to say hi? Contact us:
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>

                <input type="hidden" name="_wpcf7" value="47271" />
                <input type="hidden" name="_wpcf7_version" value="5.9.2" />
                <input type="hidden" name="_wpcf7_locale" value="en_US" />
                <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f47271-p14585-o2" />
                <input type="hidden" name="_wpcf7_container_post" value="14585" />

                <div>
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="name">Your name</label>
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
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="email">Your email</label>
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
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="phone">Your Phone</label>
                    <input
                        type="tel"
                        name="YourPhoneNumber"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your Phone"
                        value={formData['YourPhoneNumber']}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="subject">Subject</label>
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
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="productName">Product Name (Optional)</label>
                    <input
                        type="text"
                        name="ProductName"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Product Name"
                        value={formData['ProductName']}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="orderId">Order ID (optional)</label>
                    <input
                        type="text"
                        name="OrderID"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Order ID"
                        value={formData['OrderID']}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="file">File Upload (Optional)</label>
                    <input
                        type="file"
                        name="fileupload"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-center" htmlFor="message">Your Issue</label>
                    <textarea
                        name="your-message"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your message"
                        rows={4}
                        value={formData['your-message']}
                        onChange={handleChange}
                        required
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
        </div>
    );
};

export default QuickSupportForm;