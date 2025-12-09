import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* HEADER - distinct white container */}
      <header className="w-full bg-white p-6 text-center z-10">
        <p className="text-xs tracking-widest text-gray-500 uppercase font-sans">
          Choose Your Experience
        </p>
      </header>

      <div className="flex flex-1 flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Left Section - Get Legal Support */}
        <section className="group flex flex-1 flex-col items-center justify-center bg-white p-10 text-center transition-colors duration-300 hover:bg-[#F2FFF2]">
          <div className="max-w-md space-y-6">
            <h1 className="font-serif text-5xl text-black">
              Get Legal Support
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Book legal advice or connect with mentors.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/client">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-transparent bg-transparent text-black transition-all group-hover:border-green-900 group-hover:bg-green-900 group-hover:text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-900">
                  <ArrowRight className="h-8 w-8" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Right Section - Give Legal Support */}
        <section className="group flex flex-1 flex-col items-center justify-center bg-white p-10 text-center transition-colors duration-300 hover:bg-[#F2FFF2]">
          <div className="max-w-md space-y-6">
            <h1 className="font-serif text-5xl text-black">
              Give Legal Support
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Join as a verified lawyer
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/lawyer">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-transparent bg-transparent text-black transition-all group-hover:border-green-900 group-hover:bg-green-900 group-hover:text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-900">
                  <ArrowRight className="h-8 w-8" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
