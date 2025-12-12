"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, review: string) => void;
    lawyerName: string;
}

export default function ReviewModal({ isOpen, onClose, onSubmit, lawyerName }: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(rating, review);
        // Reset state
        setRating(0);
        setReview("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <h3 className="font-serif text-lg font-medium text-black">
                        Rate your session
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <p className="mb-6 text-center text-sm text-gray-600">
                        How was your session with <span className="font-bold text-black">{lawyerName}</span>?
                    </p>

                    {/* Star Rating */}
                    <div className="mb-8 flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    size={32}
                                    className={`${star <= (hoveredRating || rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-100 text-gray-200"
                                        } transition-colors`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Review Text */}
                    <div className="mb-6">
                        <label htmlFor="review" className="mb-2 block text-xs font-medium text-gray-700">
                            Write a review (optional)
                        </label>
                        <textarea
                            id="review"
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your experience..."
                            className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-black placeholder:text-gray-400 focus:border-[#004d45] focus:outline-none focus:ring-1 focus:ring-[#004d45]"
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={rating === 0}
                            className="flex-1 rounded-lg bg-[#004d45] py-2.5 text-sm font-medium text-white hover:bg-[#003a34] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
