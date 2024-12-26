import { wcClient } from "../http";
import { isWordpressError } from "@/lib/type-guards";

export async function fetchOrderTrackingDetails(
  orderID: string
)  {

  const res = await wcClient({
    endpoint: `/wc/v3/orders/${orderID}`, 
    method: "GET", // Use GET method
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (isWordpressError(res)) {
    return {
      message: res.message,
      status: res.data.status,
    } 
  }
  return await res.json();
}