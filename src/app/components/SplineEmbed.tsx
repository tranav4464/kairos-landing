"use client";

export default function SplineEmbed() {
  return (
    <div
      className="relative w-full h-[800px] overflow-hidden mt-20"
      aria-hidden
    >
      <iframe
        src="https://my.spline.design/portaltotheunknown-T8PMbYcwAcIyUNwWP3os7bh1/"
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        allow="fullscreen; autoplay; xr-spatial-tracking; geolocation; microphone; camera"
        style={{ border: 0, pointerEvents: 'none' }}
        title="Decorative 3D portal"
      />
      {/* Overlay to hide watermark - matching background color */}
      <div className="absolute bottom-0 left-0 right-0 h-[75px] bg-[#0a0a0a]" />
    </div>
  );
}


