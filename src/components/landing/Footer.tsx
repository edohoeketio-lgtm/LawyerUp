import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#00221a] text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-6">
                            <Image
                                src="/logo_original.png"
                                alt="Lawyer Up"
                                width={120}
                                height={40}
                                className="brightness-0 invert opacity-80"
                            />
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                            Democratizing access to high-quality legal advice and mentorship for everyone, everywhere.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/client" className="hover:text-white">Find a Lawyer</Link></li>
                            <li><Link href="/lawyer" className="hover:text-white">For Lawyers</Link></li>
                            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">© 2025 Lawyer Up Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-gray-500">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
