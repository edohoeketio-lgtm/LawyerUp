"use client";

import { useState, useEffect } from "react";
import { User, auth } from "@/utils/auth";
import { DollarSign, Clock, Check, AlertCircle, Plus, X, Trash2, Globe, CreditCard } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface PaymentMethod {
    id: string;
    type: 'bank' | 'stripe' | 'paypal' | 'wise';
    name: string; // Provider Name (e.g. "Stripe", "PayPal") or Bank Name
    details: string; // Account #, Email, or Handle
    isPrimary: boolean;
}

export default function EarningsPage() {
    const [user, setUser] = useState<User | null>(null);
    const { success } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Payment Method State
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: "PM-1", type: 'bank', name: "Guaranty Trust Bank", details: "**** 1234", isPrimary: true }
    ]);
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [newMethodType, setNewMethodType] = useState<PaymentMethod['type']>('bank');
    const [newMethodDetails, setNewMethodDetails] = useState({
        bankName: "",
        accountNumber: "",
        email: "",
        handle: "" // For generic usage if needed
    });

    // Mock Data
    const totalEarnings = 150000;
    const availableBalance = 45000;
    const pendingClearance = 15000;
    const transactions = [
        { id: "TXN-015", date: "2024-03-20", type: "Booking", description: "Consultation with Alice Brown", amount: 25000, status: "completed" },
        { id: "TXN-014", date: "2024-03-19", type: "Booking", description: "Mentorship with David Wilson", amount: 15000, status: "completed" },
        { id: "TXN-013", date: "2024-03-18", type: "Booking", description: "Consultation with Emma Davis", amount: 25000, status: "completed" },
        { id: "TXN-012", date: "2024-03-17", type: "Withdrawal", description: "Transfer to Zenith Bank ****5678", amount: -75000, status: "completed" },
        { id: "TXN-011", date: "2024-03-16", type: "Booking", description: "Quick Chat with James Miller", amount: 10000, status: "completed" },
        { id: "TXN-010", date: "2024-03-15", type: "Booking", description: "Consultation with John Doe", amount: 25000, status: "completed" },
        { id: "TXN-009", date: "2024-03-14", type: "Booking", description: "Mentorship with Sarah Smith", amount: 15000, status: "completed" },
        { id: "TXN-008", date: "2024-03-12", type: "Withdrawal", description: "Transfer to GTBank ****1234", amount: -50000, status: "completed" },
        { id: "TXN-007", date: "2024-03-10", type: "Booking", description: "Consultation with Mike Ross", amount: 25000, status: "completed" },
        { id: "TXN-006", date: "2024-03-08", type: "Booking", description: "Consultation with Jane Doe", amount: 25000, status: "pending" },
        { id: "TXN-005", date: "2024-03-05", type: "Booking", description: "Document Review for TechCorp", amount: 50000, status: "completed" },
        { id: "TXN-004", date: "2024-03-03", type: "Booking", description: "Legal Advice for Startup Inc.", amount: 30000, status: "completed" },
        { id: "TXN-003", date: "2024-03-01", type: "Withdrawal", description: "Monthly Withdrawal", amount: -120000, status: "completed" },
        { id: "TXN-002", date: "2024-02-28", type: "Booking", description: "Retainer Fee - February", amount: 100000, status: "completed" },
        { id: "TXN-001", date: "2024-02-25", type: "Booking", description: "Initial Consultation", amount: 25000, status: "completed" }
    ];

    useEffect(() => {
        setUser(auth.getSession());
    }, []);

    const handleWithdraw = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const primary = paymentMethods.find(pm => pm.isPrimary);
            success(`Withdrawal of ₦45,000 to ${primary?.name} initiated!`);
        }, 1500);
    };

    const handleSetPrimary = (id: string) => {
        setPaymentMethods(prev => prev.map(pm => ({
            ...pm,
            isPrimary: pm.id === id
        })));
        success("Primary payout method updated.");
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
        success("Payment method removed.");
    };

    const handleAddMethod = () => {
        let name = "";
        let details = "";

        if (newMethodType === 'bank') {
            if (!newMethodDetails.bankName || !newMethodDetails.accountNumber) return;
            name = newMethodDetails.bankName;
            details = `**** ${newMethodDetails.accountNumber.slice(-4)}`;
        } else if (newMethodType === 'stripe') {
            name = "Stripe";
            details = "Connected";
        } else if (newMethodType === 'paypal') {
            if (!newMethodDetails.email) return;
            name = "PayPal";
            details = newMethodDetails.email;
        } else if (newMethodType === 'wise') {
            if (!newMethodDetails.email) return;
            name = "Wise";
            details = newMethodDetails.email;
        }

        const newPM: PaymentMethod = {
            id: `PM-${Date.now()}`,
            type: newMethodType,
            name,
            details,
            isPrimary: paymentMethods.length === 0
        };

        setPaymentMethods([...paymentMethods, newPM]);
        setNewMethodDetails({ bankName: "", accountNumber: "", email: "", handle: "" });
        setShowAddModal(false);
        success(`${name} added successfully.`);
    };

    const getIcon = (type: PaymentMethod['type']) => {
        switch (type) {
            case 'stripe': return <div className="font-bold text-[#635BFF]">S</div>;
            case 'paypal': return <div className="font-bold text-[#003087]">P</div>; // Simple fallback
            case 'wise': return <div className="font-bold text-[#9FE870]">W</div>; // Simple fallback
            case 'bank': return <Globe size={20} />;
            default: return <CreditCard size={20} />;
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div>
                <h1 className="font-serif text-3xl font-medium text-black">Transactions & Payments</h1>
                <p className="text-sm text-gray-500">Manage your income, withdrawals, and payment methods.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">₦{totalEarnings.toLocaleString()}</h3>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Available Balance</p>
                    <h3 className="text-2xl font-bold text-green-600 mt-2">₦{availableBalance.toLocaleString()}</h3>
                    <div className="mt-4">
                        <button
                            onClick={handleWithdraw}
                            disabled={isLoading || paymentMethods.length === 0}
                            className={`w-full flex items-center justify-center gap-2 rounded-lg bg-[#004d45] py-2 text-sm font-medium text-white transition-colors hover:bg-[#003a34] disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isLoading ? "Processing..." : <><DollarSign size={16} /> Withdraw Funds</>}
                        </button>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Pending Clearance</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">₦{pendingClearance.toLocaleString()}</h3>
                    <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        <Clock size={14} />
                        <span>Funds clear 48hrs after session</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Transaction History */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-serif text-xl font-medium text-black">Transaction History</h3>
                    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            <table className="w-full text-sm text-left relative">
                                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Date & Description</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{txn.description}</p>
                                                <p className="text-xs text-gray-500">{txn.date} • {txn.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${txn.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                    {txn.status === 'completed' ? <Check size={10} /> : <Clock size={10} />}
                                                    {txn.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-right font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                {txn.amount > 0 ? '+' : ''}₦{Math.abs(txn.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                    <h3 className="font-serif text-xl font-medium text-black">Payout Methods</h3>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className={`group relative flex items-center justify-between p-4 rounded-lg border transition-all ${method.isPrimary ? "border-[#006056] bg-[#E6F0EE]" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-lg border flex items-center justify-center ${method.isPrimary ? "bg-white border-[#006056] text-[#006056]" : "bg-gray-50 border-gray-100 text-gray-500"}`}>
                                            {getIcon(method.type)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{method.name}</p>
                                            <p className="text-xs text-gray-500">{method.details}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {method.isPrimary ? (
                                            <span className="text-[10px] font-bold bg-[#006056] text-white px-2 py-0.5 rounded-full">PRIMARY</span>
                                        ) : (
                                            <button
                                                onClick={() => handleSetPrimary(method.id)}
                                                className="opacity-0 group-hover:opacity-100 text-[10px] font-bold bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-50 transition-all"
                                            >
                                                Set Primary
                                            </button>
                                        )}
                                        {!method.isPrimary && (
                                            <button onClick={() => handleDelete(method.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {paymentMethods.length === 0 && (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                    No payout methods added.
                                </div>
                            )}

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-[#006056] hover:text-[#006056] hover:bg-[#E6F0EE] transition-all"
                            >
                                <Plus size={16} /> Add New Payout Method
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex gap-3">
                                <AlertCircle size={18} className="text-gray-400 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-900">Payment Security</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Your earnings are held in a secure escrow account until the session is completed + 48hrs clearance period.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Method Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Add Payout Method</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-black">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Provider Selection */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {(['bank', 'stripe', 'paypal', 'wise'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setNewMethodType(type)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${newMethodType === type ? 'border-[#006056] bg-[#E6F0EE] text-[#006056]' : 'border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <div className="mb-1">{getIcon(type)}</div>
                                        <span className="text-[10px] font-bold capitalize">{type}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Fields */}
                            {newMethodType === 'bank' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-[#006056] bg-white"
                                            value={newMethodDetails.bankName}
                                            onChange={(e) => setNewMethodDetails({ ...newMethodDetails, bankName: e.target.value })}
                                        >
                                            <option value="">Select Bank</option>
                                            <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                                            <option value="Zenith Bank">Zenith Bank</option>
                                            <option value="Access Bank">Access Bank</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                        <input
                                            type="text" maxLength={10} placeholder="0123456789"
                                            className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-[#006056]"
                                            value={newMethodDetails.accountNumber}
                                            onChange={(e) => setNewMethodDetails({ ...newMethodDetails, accountNumber: e.target.value.replace(/\D/g, '') })}
                                        />
                                    </div>
                                </>
                            )}

                            {(newMethodType === 'paypal' || newMethodType === 'wise') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email" placeholder="you@example.com"
                                        className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-[#006056]"
                                        value={newMethodDetails.email}
                                        onChange={(e) => setNewMethodDetails({ ...newMethodDetails, email: e.target.value })}
                                    />
                                </div>
                            )}

                            {newMethodType === 'stripe' && (
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                                    <p className="text-sm text-gray-500 mb-3">Connect your Stripe account to receive payouts directly.</p>
                                    <button className="px-4 py-2 bg-[#635BFF] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#5349e0] transition-colors">
                                        Connect with Stripe
                                    </button>
                                </div>
                            )}

                            {newMethodType !== 'stripe' && (
                                <button
                                    onClick={handleAddMethod}
                                    className="w-full mt-2 rounded-lg bg-[#004d45] py-2.5 text-sm font-bold text-white hover:bg-[#003a34]"
                                >
                                    Save Method
                                </button>
                            )}

                            {/* Stripe Fake Add Handler for Demo */}
                            {newMethodType === 'stripe' && (
                                <button
                                    onClick={handleAddMethod}
                                    className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600"
                                >
                                    (Demo: Simulate Successful Connection)
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
