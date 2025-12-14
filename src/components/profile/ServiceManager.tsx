"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import { Service } from "@/utils/auth";
import { User, auth } from "@/utils/auth";

interface ServiceManagerProps {
    user: User;
    onUpdate: (updatedUser: User) => void;
}

export default function ServiceManager({ user, onUpdate }: ServiceManagerProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({
        title: "",
        description: "",
        price: 50,
        duration: 30,
        type: "consultation"
    });

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: 50,
            duration: 30,
            type: "consultation"
        });
        setIsAdding(false);
        setEditingService(null);
    };

    const handleSave = () => {
        if (!formData.title || !formData.price || !formData.duration) return;

        let newServices = [...(user.services || [])];

        if (editingService) {
            // Update existing
            newServices = newServices.map(s =>
                s.id === editingService.id ? { ...s, ...formData } as Service : s
            );
        } else {
            // Add new
            const newService: Service = {
                id: crypto.randomUUID(),
                title: formData.title || "New Service",
                description: formData.description || "",
                price: Number(formData.price),
                duration: Number(formData.duration),
                type: formData.type as 'consultation' | 'mentorship'
            };
            newServices.push(newService);
        }

        const updatedUser = { ...user, services: newServices };
        auth.updateUser({ services: newServices });
        onUpdate(updatedUser);
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        const newServices = (user.services || []).filter(s => s.id !== id);
        const updatedUser = { ...user, services: newServices };
        auth.updateUser({ services: newServices });
        onUpdate(updatedUser);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[#004d45]">Service Offerings</h3>
                    <p className="text-sm text-gray-500">Create specific packages for clients to book directly.</p>
                </div>
                {!isAdding && !editingService && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34]"
                    >
                        <Plus size={16} /> Add Service
                    </button>
                )}
            </div>

            {/* Editor Form */}
            {(isAdding || editingService) && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <h4 className="mb-4 font-bold text-black">{editingService ? "Edit Service" : "New Service"}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Service Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Initial Consultation, Contract Review"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                placeholder="Describe what's included..."
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Duration (mins)</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                            >
                                <option value={15}>15 mins</option>
                                <option value={30}>30 mins</option>
                                <option value={45}>45 mins</option>
                                <option value={60}>1 hour</option>
                                <option value={90}>1.5 hours</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={resetForm}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34]"
                        >
                            Save Service
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid gap-4 md:grid-cols-2">
                {user.services?.map(service => (
                    <div key={service.id} className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="mb-2 flex items-start justify-between">
                            <h4 className="font-serif font-bold text-black">{service.title}</h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingService(service);
                                        setFormData(service);
                                    }}
                                    className="text-gray-400 hover:text-black"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="mb-4 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-[#004d45]">${service.price}</span>
                            <span className="text-gray-500">{service.duration} mins</span>
                        </div>
                    </div>
                ))}
            </div>

            {(!user.services || user.services.length === 0) && !isAdding && (
                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                    You haven&apos;t listed any services yet. Create one to get started!
                </div>
            )}
        </div>
    );
}
