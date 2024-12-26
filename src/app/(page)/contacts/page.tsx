import React from 'react';
import ContactItem from './component/card';
import ContactForm from './component/form/contactusForm';
import QuickSupportForm from './component/form/quicksupportForm';

const ContactUs = () => {
    return (
        <div className='xl:px-60'>
            <div className='sm:mb-32 mt-10 border-2 border-gray-200 rounded-xl'>
                <p className='text-center underline text-[#000055] text-2xl font-bold pt-10'>StarAndDaisy – Contact Us</p>
                <div className="sm:flex flex-col md:flex-row  items-center justify-center  sm:pb-8 pt-4 rounded-lg w-full">
                    <ContactItem
                        heading="Email Us"
                        text="Have some suggestions or just want to say hi? Contact us:"
                        imageSrc="/assets/images/contact-us/contact-1.png"
                        actionText="help@staranddaisy.in"
                        actionLink="mailto:help@staranddaisy.in"
                    />
                    <ContactItem
                        heading="IVR Support"
                        text="10AM to 5PM"
                        imageSrc="/assets/images/contact-us/contact-2.png"
                        actionText="+91 98723-99399"
                        actionLink="tel:+919872399399"
                    />
                </div>
                <div className="flex flex-col md:flex-row space-y-8 sm:space-y-0 justify-center  py-8 rounded-lg w-full">
                    <ContactForm />
                    <QuickSupportForm />
                </div>
                <div className="max-w-2xl mx-4  p-6 border-2 border-gray-200 shadow-md rounded-md my-2 mb-5 ">
                    <h2 className="text-xl font-semibold text-blue-900">SND Digital Private Limited</h2>
                    <div className="w-10 h-1 bg-black mt-1 mb-4"></div>
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold text-blue-900">Address</h3>
                        <p className="text-sm text-gray-700">
                            1, G.T.ROAD NEAR BHATIA MORH, GHAZIABAD, Ghaziabad, Uttar Pradesh, 201001
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-blue-900">Support</h3>
                        <p className="text-sm text-gray-700">+91 98723-99399</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
