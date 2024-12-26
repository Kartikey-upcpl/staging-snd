"use client"
import React, { useState } from 'react'
import { useSearchParams } from "next/navigation";
import { updateUser } from '@/components/checkout/actions';
import { indianStatesAndUTs } from '../component/stateData';

const EditShippingAddressDetails = () => {
    const searchParams = useSearchParams();
    const userDetails = searchParams.get("shipping")
        ? JSON.parse(searchParams.get("shipping") as string)
        : null;
    const userId = searchParams.get("id")
        ? JSON.parse(searchParams.get("id") as string)
        : null;
    const [formValues, setFormValues] = useState(userDetails || {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [errormessage, setErrorMessage] = useState("");

    console.log("userDetails", userDetails)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormValues((prev: any) => ({ ...prev, [id]: value })); // Update state
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            // Call the updateUser function
            const response = await updateUser(userId, { shipping: formValues });
            console.log("response", response);

            // Check if the response contains any errors
            if (response && response.id) {
                setMessage("Address updated successfully!");
            } else {
                setErrorMessage("Unexpected response from the server.");
            }
        } catch (err: any) {
            console.error("Error updating user:", err);
            setErrorMessage(`Failed to update address: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
            <p className="text-2xl font-semibold text-[#000055]">Edit Address</p>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                    {/* First Name */}
                    <div>
                        <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Enter your first name"
                            value={formValues.first_name || ""}
                            onChange={handleInputChange} // Make editable
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Enter your last name"
                            value={formValues.last_name || ""}
                            onChange={handleInputChange} // Make editable
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Company name (optional)
                        </label>
                        <input
                            type="text"
                            id="company"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Enter company name"
                            value={formValues.company || ""}
                            onChange={handleInputChange} // Make editable
                        />
                    </div>

                    {/* Country/Region */}
                    <div>
                        <label htmlFor="country" className="text-sm font-medium text-gray-700">
                            Country / Region <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="country"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={formValues.country || ""}
                            onChange={handleInputChange} // Make editable
                        >
                            <option value="India">India</option>
                            {/* Add more countries as options */}
                        </select>
                    </div>
                </div>
                <div className='flex justify-between space-x-5'>
                    {/* Street Address */}
                    <div className="mt-6 w-1/2">
                        <label htmlFor="address_1" className="text-sm font-medium text-gray-700">
                            Street address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="address_1"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="House number and street name"
                            value={formValues.address_1 || ""}
                            onChange={handleInputChange} // Make editable
                        />
                    </div>
                    <div className="mt-6 w-1/2">
                        <div className='h-5'>
                        </div>
                        <input
                            type="text"
                            id="address_2"
                            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            value={formValues.address_2 || ""}
                            onChange={handleInputChange} // Make editable
                        />
                    </div>
                </div>

                {/* City */}
                <div className="mt-6">
                    <label htmlFor="city" className="text-sm font-medium text-gray-700">
                        Town / City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        placeholder="Enter your city"
                        value={formValues.city || ""}
                        onChange={handleInputChange} // Make editable
                    />
                </div>

                {/* State */}
                <div className="mt-6">
                    <label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="state"
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        value={formValues.state || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">Select State</option>
                        {indianStatesAndUTs.map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-6">
                    <label htmlFor="city" className="text-sm font-medium text-gray-700">
                        Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="postcode"
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        value={formValues.postcode || ""}
                        onChange={handleInputChange} // Make editable
                    />
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:ring focus:ring-red-500 focus:outline-none"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "SAVE ADDRESS"}
                    </button>
                </div>
            </form>

            {/* Display Success/Error Message */}
            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            {errormessage && <p className="mt-4 text-center text-red-600">{errormessage}</p>}

        </div>
    );
}

export default EditShippingAddressDetails

