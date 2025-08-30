import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "RWS-Forge",
  description: "Modular Web3 marketplace for tokenized real-world assets",
});

const RWSForgeApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col items-center justify-start min-h-screen bg-black text-white">
        <div className="w-full flex justify-center mt-6 z-30">
          <img
            src="/logo.png"
            alt="RWS-Forge Logo"
            className="w-20 h-20 md:w-28 md:h-28"
          />
        </div>

        {/* App content */}
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RWSForgeApp;
