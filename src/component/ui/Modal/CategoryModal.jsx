import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

/** Base reusable modal with centered positioning + directional enter animation */
export default function CategoryModal({
  open,
  onClose,
  title,
  children,
  footer, // React node; pass undefined to hide area
  size = "max-w-lg", // e.g. max-w-lg / max-w-xl
  from = "center", // "center" | "left" | "right" | "top" | "bottom"
}) {
  const [mounted, setMounted] = useState(open); // keep mounted during exit
  const [visible, setVisible] = useState(open); // toggles CSS transition

  // lock body scroll when open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // handle mount/unmount + play animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true)); // play enter
    } else {
      setVisible(false); // play exit then unmount
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const fromClass =
    {
      center: "scale-95",
      left: "-translate-x-8",
      right: "translate-x-8",
      top: "-translate-y-8",
      bottom: "translate-y-8",
    }[from] ?? "scale-95";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
                  ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300
                    ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${size} rounded-xl bg-white shadow-xl
                    transform transition-all duration-300 ease-out
                    ${
                      visible
                        ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                        : `opacity-0 ${fromClass}`
                    }`}
        onMouseDown={(e) => e.stopPropagation()}
        onTransitionEnd={() => {
          if (!visible) setMounted(false); // unmount after exit animation
        }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-4">{children}</div>

        {footer !== undefined && (
          <div className="border-t px-5 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}
