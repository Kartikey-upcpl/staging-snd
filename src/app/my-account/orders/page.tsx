import OrderDashboard from "@/components/account/OrderDashboard";

export default function Orders(
  { searchParams }:
  {
      searchParams?: { [key: string]: string | string[] | undefined },
  }
) {
    const pageUrl = typeof searchParams?.page === "string" ?  parseInt(searchParams.page) : 1; 
    
    const page = Number.isInteger(pageUrl)  && pageUrl > 0 ? pageUrl: 1;

    return (
      <OrderDashboard page={page} />
    );
  }
  