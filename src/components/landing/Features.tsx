import { Shield, MessageSquare, Clock, Star } from "lucide-react";

const features = [
    {
        icon: <Shield className="w-6 h-6 text-green-600" />,
        title: "Verified Professionals",
        description: "Every lawyer on our platform is vetted and verifies their Bar membership."
    },
    {
        icon: <Clock className="w-6 h-6 text-blue-600" />,
        title: "Instant Booking",
        description: "See real-time availability and book sessions that fit your schedule instantly."
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
        title: "Secure Messaging",
        description: "Discuss sensitive matters with end-to-end encrypted chat and video calls."
    },
    {
        icon: <Star className="w-6 h-6 text-yellow-500" />,
        title: "Mentorship",
        description: "New to law? Connect with experienced partners for career guidance."
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-serif font-bold text-black mb-4">Why choose Lawyer Up?</h2>
                    <p className="text-gray-500">We bridge the gap between legal needs and expert advice with technology that puts you first.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
