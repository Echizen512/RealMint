"use client";

import { LockKeyhole, HeartHandshake } from "lucide-react";
import React from "react";

export default function PrivacyPage() {
    return (
        <div className="p-4 sm:p-8">
            <div className="hero bg-base-200 rounded-xl mb-6">
                <div className="hero-content flex-col">
                    <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
                        <LockKeyhole className="w-6 h-6" />
                        Privacy Policy
                    </h1>
                    <p className="py-4 text-base-content">
                        This privacy policy outlines how RWS-Forge handles user data during the hackathon phase.
                    </p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <ul className="list-disc list-inside space-y-2">
                        <li>RWS-Forge does not collect or store personal data off-chain.</li>
                        <li>All interactions occur via public blockchain transactions.</li>
                        <li>Wallet addresses are used only for contract execution and UI personalization.</li>
                        <li>No cookies, trackers, or analytics tools are embedded in this prototype.</li>
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
