import { QrCode, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FloatingScannerButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/eco-scanner")}
      className="fixed bottom-28 right-5 z-[70] group"
      aria-label="Open Eco Scanner"
      title="Open Eco Scanner"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-green-400/35 blur-lg group-hover:blur-xl transition-all duration-300" />
        <div className="relative flex items-center gap-2 rounded-2xl border border-white/30 bg-gradient-to-br from-emerald-500/90 to-green-700/90 px-4 py-3 text-[#e5e1d8] shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <QrCode className="h-5 w-5" />
          <span className="text-xs font-bold tracking-wide uppercase">Eco Scanner</span>
          <Sparkles className="h-4 w-4 text-yellow-300" />
        </div>
      </div>
    </button>
  );
};

export default FloatingScannerButton;
