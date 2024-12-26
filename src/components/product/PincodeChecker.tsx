"use client";
import { useFormState } from "react-dom";
import { checkPincode } from "./actions";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import Loading from "../ui/Loading";

export default function PinCodeChecker() {
  const [isDisable, setIsDisable] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [state, action] = useFormState(
    async (currentState: any, formData: any) => {
      const pincode = formData.get("pincode") as string;
      if (pincode) {
        const response = await checkPincode(pincode);
        return {
          ...currentState, // Maintain the current state
          data: response?.data || [],
          message: response?.message || null,
        };
      }
      return {
        ...currentState,
        message: "Invalid pincode",
      };
    },
    { data: null, message: null }
  );

  const getDeliveryDate = (deliveryDays: number): string => {
    const today = new Date();
    today.setDate(today.getDate() + deliveryDays);
    return today.toDateString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsDisable(inputValue.trim() === "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData); // Trigger the form action
    });
  };



  return (
    <div>
      <div className="items-center mb-4">
        <div className="w-full max-w-md p-2 rounded-lg shadow-md border-b-2 border-[#ab2c50]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                name="pincode"
                placeholder="Enter Pincode to Check Serviceability"
                className="w-full sm:w-auto font-semibold flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-[#ab2c50] text-[#c21a4a]"
                onChange={handleInputChange}
              />

              <button
                disabled={isDisable || isPending} // Disable during loading
                type="submit"
                className={`px-6 py-2 font-semibold rounded-md transition ${isDisable || isPending
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#c21a4a] hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  }`}
              >
                {isPending ? <Loading className="spinner-border-sm text-white" /> : "Check"} {/* Show loading text */}
              </button>
            </div>
          </form>
        </div>

        <div>
          {state?.data?.length === 0 && (
            <div className="mt-4 p-4 bg-red-100 rounded-md text-black">
              <p>
                Sorry, we could not find the information for the entered pincode. Please contact our sales team, they will help you place the order.
              </p>
              <div className="mt-4 px-4 py-2 text-center bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                <Link href="https://wa.me/9990233227" target="_blank" rel="noopener noreferrer">
                  Click Here To Start Chat
                </Link>
              </div>
            </div>
          )}

          {state.data && state.data.length > 0 && (
            // <div className="mt-4 p-4 bg-gray-100 rounded-md">
            //   <p className="text-gray-700">
            //     It will take approximately {state.data[0].delivery_day} days to deliver in{" "}
            //     {state.data[0].city_name}. It will be delivered on{" "}
            //     <strong>{getDeliveryDate(Number(state.data[0].delivery_day))}</strong>.
            //   </p>
            // </div>
            <div className="w-full max-w-md flex items-center bg-green-100 text-green-700 rounded-lg px-4 py-2 shadow-md mt-2">
              <div className="text-green-700 text-xl font-bold mr-2">✔</div>
              <span className="text-sm font-medium">Pincode is Serviceable</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
