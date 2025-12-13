import { useState } from "react";
import { X } from "lucide-react";

interface StartDiscussionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; category: string; content: string; isAnonymous: boolean }) => void;
}

export default function StartDiscussionModal({ isOpen, onClose, onSubmit }: StartDiscussionModalProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("General");
    const [content, setContent] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, category, content, isAnonymous });
        // Reset form
        setTitle("");
        setCategory("General");
        setContent("");
        setIsAnonymous(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-black">Start a Discussion</h2>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            placeholder="What's on your mind?"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="General">General</option>
                            <option value="Legal Advice">Legal Advice</option>
                            <option value="Career">Career</option>
                            <option value="Bar Exam">Bar Exam</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Share your thoughts, questions, or experiences..."
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded border-gray-300 text-[#006056] focus:ring-[#006056]"
                        />
                        <span className="text-sm text-gray-600">Post anonymously</span>
                    </label>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-[#004d45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#003a34]"
                        >
                            Post Discussion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
