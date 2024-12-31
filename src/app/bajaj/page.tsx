"use client"
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Bajaj = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        mobileNumber: '',
        amount: '',
        tenure: '',
        schemeId: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Secret Key and IV (replace with actual key and IV provided by BFL)
    const secretKey = 'WWGAPVHYC2110422102233YPM80M36CZ';  // Example key, replace with actual one
    const iv = CryptoJS.enc.Utf8.parse('1234567887654321');
    // Function to handle encryption, API request, and response handling
    const initiateOTP = async (e: any) => {
        e.preventDefault();

        // Prepare the plaintext request body
        const requestBody = {
            DEALERID: '194',
            CARDNUMBER: formData.cardNumber,  // from form
            REQUESTID: 'AZBFLRTEUAT12345iii',
            ORDERNO: 'AZBFLRTEUAT12345',
            PINCODE: '111111',
            LOANAMT: formData.amount,  // from form
            VALIDATIONKEY: '6384075253966928',
            TncACCEPT: 'Y',
            SchemeId: formData.schemeId,  // from form
            Tenure: formData.tenure,  // from form
            SMSFLAG: 'Y',
            ProductDesc: 'iphone'
        };

        // Convert the request body to a string (JSON string)
        const requestString = JSON.stringify(requestBody);

        // Secret Key and IV (replace with actual key and IV provided by BFL)
        const secretKey = 'WWGAPVHYC2110422102233YPM80M36CZ';  // Example key, replace with actual one
        const iv = CryptoJS.enc.Utf8.parse('1234567887654321');  // Example IV, replace with actual one

        // Encrypt the request string using AES CBC mode
        const encryptedData = CryptoJS.AES.encrypt(requestString, CryptoJS.enc.Utf8.parse(secretKey), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        // Convert the encrypted data to Base64
        const base64EncryptedData = encryptedData.ciphertext.toString(CryptoJS.enc.Base64);

        // Seal Value generation: Encrypt request + Encryption Secret Key
        const sealString = base64EncryptedData + secretKey;
        const sealValue = CryptoJS.MD5(sealString).toString(CryptoJS.enc.Base64);

        // Define API URL and headers
        const apiUrl = 'https://bfluat.in.worldline-solutions.com/wlbflEcomRest/WLECOMRest.svc/InitiateOTP';
        const headers = {
            'Content-Type': 'application/json',
            'SealValue': sealValue,
            'SupplierID': '194',
        };

        // Send the encrypted request to the API
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ encryptedRequest: base64EncryptedData }),
            });

            // Handle the response
            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);
                // Process the response data (e.g., decrypt and display)
                decryptResponse(data);  // Assume response is in Base64 encrypted format
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error making the API call:', error);
        }
    };

    // Function to decrypt the response (Base64 to plaintext)
    const decryptResponse = (encryptedResponse: any) => {
        const base64Response = encryptedResponse.data;  // Adjust based on actual response structure
        const decrypted = CryptoJS.AES.decrypt(base64Response, CryptoJS.enc.Utf8.parse(secretKey), {
            iv: CryptoJS.enc.Utf8.parse('1234567887654321'),  // Use the same IV as used during encryption
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted Response:', decryptedText);

        const jsonResponse = JSON.parse(decryptedText);  // Parse the decrypted text to JSON
        console.log('Final Plaintext Response:', jsonResponse);
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center mb-4">Bajaj Payment Gateway</div>

            <form onSubmit={initiateOTP} className="w-96">
                <div className="mb-4">
                    <label htmlFor="cardNumber" className=" text-sm font-medium text-gray-700">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobileNumber" className=" text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className=" text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tenure" className=" text-sm font-medium text-gray-700">Tenure</label>
                    <input
                        type="number"
                        id="tenure"
                        name="tenure"
                        className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.tenure}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="schemeId" className=" text-sm font-medium text-gray-700">Scheme ID</label>
                    <input
                        type="text"
                        id="schemeId"
                        name="schemeId"
                        className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.schemeId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Initiate OTP</button>
            </form>
        </div>
    );
};

export default Bajaj;
