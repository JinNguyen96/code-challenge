import type { ReactNode } from "react";

interface SwapLayoutProps {
  children: ReactNode;
}

export const SwapLayout = ({ children }: SwapLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center gap-3 animate-slide-down">
            <h1 className="text-2xl font-bold text-white">Swap Token</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">{children}</div>
      </main>

      <footer className="py-6 px-4">
        <div className="container mx-auto text-center text-white/50 text-sm">
          <p>From Jin With ❤️</p>
        </div>
      </footer>
    </div>
  );
};
