"use client";

import { ScrollText, HeartHandshake } from "lucide-react";
import React from "react";

export default function TermsPage() {
    return (
        <div className="p-4 sm:p-8">
            <div className="hero bg-base-200 rounded-xl mb-6">
                <div className="hero-content flex-col">
                    <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
                        <ScrollText className="w-6 h-6" />
                        Terms & Conditions
                    </h1>
                    <p className="py-4 text-base-content">
                        These terms govern the use of RWS-Forge. As this is a hackathon prototype, terms may evolve post-submission.
                    </p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <ul className="list-disc list-inside space-y-2">
                        <li>RWS-Forge is built for demonstration and educational purposes only.</li>
                        <li>Users interact with smart contracts at their own risk.</li>
                        <li>Assets listed are simulated and do not represent real ownership.</li>
                        <li>No financial advice or guarantees are provided by the platform.</li>
                        <li>By using the dApp, you agree to these terms and acknowledge its experimental nature.</li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8 text-sm text-base-content opacity-70 flex items-center justify-center gap-2">
                <HeartHandshake className="w-4 h-4" />
                Built with ❤️ by Echizen512 & NightmareFox12
            </div>
        </div>
    );
}
