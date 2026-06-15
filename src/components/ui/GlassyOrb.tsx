"use client";

export default function GlassyOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <svg width="600" height="600" viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          <radialGradient id="glow-grad" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shine-grad" cx="35%" cy="30%" r="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="orb-blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <circle cx="300" cy="300" r="250" fill="url(#glow-grad)" filter="url(#orb-blur)" />
        <circle cx="260" cy="240" r="150" fill="url(#shine-grad)" filter="url(#orb-blur)" />
        <ellipse cx="350" cy="380" rx="180" ry="80" fill="rgba(16,185,129,0.035)" filter="url(#orb-blur)" />
      </svg>
    </div>
  );
}
