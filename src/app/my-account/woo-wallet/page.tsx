"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getWalletBalance, getWalletTransacttions } from '@/components/checkout/actions';
import { useCart } from '@/components/cart/cart-context';
import Loading from '@/components/ui/Loading';
import { top } from '@popperjs/core';

interface Transaction {
    user_id: string;
    type: "credit" | "debit";
    amount: string;
    details: string;
    date: string;
}


const Wallet = () => {
    const { user } = useCart();
    const userId = user?.ID ?? "";
    const userEmail = user?.user_email ?? "";
    const [balance, setBalance] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balanceError, setBalanceError] = useState("");
    const [balanceLoading, setBalanceLoading] = useState(true);
    const [transactionError, setTransactionError] = useState("");
    const [transactionLoading, setTransactionLoading] = useState(true);
    const [currentView, setCurrentView] = useState<"transactions" | "topup">("transactions");
    const [topupAmount, setTopupAmount] = useState("");

    console.log("ter", transactions)

    useEffect(() => {
        async function fetchWalletBalance() {
            if (!userId) {
                setBalanceError("User ID is missing");
                return;
            }
            setBalanceLoading(true);
            try {
                const response = await getWalletBalance(userId);
                setBalance(response);
            } catch (err) {
                console.error("Failed to fetch wallet balance:", err);
                setBalanceError("Failed to fetch wallet balance");
            } finally {
                setBalanceLoading(false);
            }
        }
        fetchWalletBalance();
    }, [userId]);

    useEffect(() => {
        async function fetchWalletTransactions() {
            if (!userEmail) {
                setTransactionError("User email is missing");
                return;
            }
            setTransactionLoading(true);
            try {
                const response = await getWalletTransacttions(userEmail);
                setTransactions(response);
            } catch (err) {
                console.error("Failed to fetch wallet balance:", err);
                setTransactionError("Failed to fetch wallet balance");
            } finally {
                setTransactionLoading(false);
            }
        }
        fetchWalletTransactions();
    }, [userEmail]);

    const handleAddTopup = () => {
        if (!topupAmount) {
            alert("Please enter an amount");
            return;
        }
        if (topupAmount < "500") {
            alert("Topup Amount must be greater than or equals to 500");
            return;
        }
        console.log("Topup Amount:", topupAmount);
        // Add your topup logic here
        setTopupAmount(""); // Clear the input after adding
    };




    return (
        <div className="w-full ">
            <div className="flex flex-col md:flex-row max-w-4xl mx-auto  border rounded-lg shadow-md ">
                <div className="flex flex-col w-full md:w-1/3 space-y-4 bg-gray-200 p-6">
                    <p className='text-center text-[#000055] font-semibold'>My Wallet</p>
                    <button onClick={() => setCurrentView("topup")}
                        className="bg-white text-[#334862] py-2 px-4 rounded hover:shadow-2xl  hover:scale-105 flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            className=''
                        >
                            <circle cx="12" cy="12" r="12" fill="#333333" />
                            <line x1="12" y1="6" x2="12" y2="18" stroke="#FFFFFF" stroke-width="2" />
                            <line x1="6" y1="12" x2="18" y2="12" stroke="#FFFFFF" stroke-width="2" />
                        </svg>
                        Wallet Topup
                    </button>
                    <button onClick={() => setCurrentView("transactions")}
                        className="bg-white text-[#334862] py-2 px-4 rounded hover:shadow-2xl hover:scale-105 flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            width="20"
                            height="20"
                        >
                            <rect width="100" height="100" fill="#333333" />

                            <circle cx="10" cy="20" r="4" fill="#FFFFFF" />
                            <line x1="20" y1="20" x2="90" y2="20" stroke="#FFFFFF" stroke-width="2" />

                            <circle cx="10" cy="50" r="4" fill="#FFFFFF" />
                            <line x1="20" y1="50" x2="90" y2="50" stroke="#FFFFFF" stroke-width="2" />

                            <circle cx="10" cy="80" r="4" fill="#FFFFFF" />
                            <line x1="20" y1="80" x2="90" y2="80" stroke="#FFFFFF" stroke-width="2" />
                        </svg>
                        Transactions
                    </button>
                </div>

                <div className="flex-1 mt-6 md:mt-0 md:p-6 bg-white">
                    <p className="text-[#000055] font-semibold text-center md:text-left">
                        Balance
                    </p>
                    <div className="text-2xl font-semibold text-gray-800 mt-2">
                        {balanceLoading ? (
                            <div className="flex justify-center">
                                {/* Replace with your actual loading component */}
                                <Loading />
                            </div>
                        ) : balanceError ? (
                            <div className="error">
                                {/* Replace with your actual error component */}
                                Error: {balanceError}
                            </div>
                        ) : (
                            <p className='text-center'>₹{balance}</p>
                        )}
                    </div>

                    {currentView === "transactions" ? (
                        transactionLoading ? (
                            <div className='flex justify-center items-center h-96'>
                                <Loading />
                            </div>
                        ) : transactionError ? (
                            <div className="error">Error: {transactionError}</div>
                        ) : transactions?.length > 0 ? (
                            <div className="font-semibold mt-2">
                                {transactions.map((transaction, index) => (
                                    <div key={index} className="rounded-2xl bg-gray-200 m-2">
                                        <div className="p-6">
                                            <p className="text-[#334862]">Date: {transaction.date}</p>
                                            <p>{transaction.details}</p>
                                            <div className="flex justify-between">
                                                <p
                                                    className={`${transaction.type === "credit"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                        } rounded-md p-1 text-white`}
                                                >
                                                    {transaction.type}
                                                </p>
                                                <p>₹{parseFloat(transaction.amount).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No transactions found</p>
                        )
                    ) : (
                        <div className="flex flex-col space-y-4 mt-4">
                            <p className='font-semibold'>Enter Amount</p>
                            <input
                                type="number"
                                value={topupAmount}
                                onChange={(e) => setTopupAmount(e.target.value)}
                                className="border rounded-md px-4 py-2"
                            />
                            <button
                                onClick={handleAddTopup}
                                className="bg-[#ff0044] hover:bg-[#cf2e2e] text-white py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Wallet
