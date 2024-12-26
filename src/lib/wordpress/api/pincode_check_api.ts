import { useState } from "react";
import { wcClient, wordpressClient } from "../http";
import { PincodeCheckerResponse } from "../types/pincode_type";
import { ApiError } from "@/lib/type-guards";
import { isWordpressError } from "@/lib/type-guards";

export async function fetchPincodeCheck(
  zipcode: string
): Promise<PincodeCheckerResponse[] | ApiError> {

  const res = await wordpressClient({
    endpoint: `/snd/v1/pincode-checker?zipcode=${zipcode}`, 
    method: "GET", // Use GET method
    headers: {
      "Content-Type": "application/json",
    },
  });

    // console.log("respppp", res);

  // Handle WordPress error if any
  if (isWordpressError(res)) {
    return {
      message: res.message,
      status: res.data.status,
    } 
  }

  // Parse and return the successful response as an array of PincodeCheckerResponse
  return await res.json();
}