"use client";

export default function GlassyOrbVideo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain scale-125"
        style={{
          mixBlendMode: "screen",
          filter: "hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)",
        }}
      >
        <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-surface-950/20 pointer-events-none" />
    </div>
  );
}
