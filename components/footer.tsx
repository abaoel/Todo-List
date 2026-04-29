import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/60 bg-white/80 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
              <CheckSquare className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-gray-700 tracking-tight text-sm">TODO List</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <span>Developer:</span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-transparent hover:opacity-80 transition-opacity">
              Emmanuel L. Abao
            </span>
          </div>

          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
