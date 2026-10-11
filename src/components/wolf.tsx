"use client";

import { useEffect, useRef } from "react";

export function Wolf({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width * 1.2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height * 1.2)));
        svg.style.setProperty("--look-x", `${x * 5}px`);
        svg.style.setProperty("--look-y", `${y * 4}px`);
        svg.style.setProperty("--turn", `${x * 3}deg`);
        svg.style.setProperty("--ear", `${Math.max(0, 1 - Math.abs(x)) * 2}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      svg.style.setProperty("--look-x", "0px");
      svg.style.setProperty("--look-y", "0px");
      svg.style.setProperty("--turn", "0deg");
      svg.style.setProperty("--ear", "0deg");
    };
    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", update); window.removeEventListener("blur", reset); document.removeEventListener("pointerleave", reset); };
  }, []);

  return <svg ref={ref} className={`wolf ${className}`} viewBox="0 0 500 540" role="img" aria-label="Original illustrated wolf mascot" xmlns="http://www.w3.org/2000/svg">
    <title>Original illustrated wolf mascot</title>
    <defs>
      <linearGradient id="fur" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#484652"/><stop offset=".55" stopColor="#25242e"/><stop offset="1" stopColor="#111219"/></linearGradient>
      <linearGradient id="face" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#77717a"/><stop offset=".55" stopColor="#49434d"/><stop offset="1" stopColor="#2d2b35"/></linearGradient>
      <linearGradient id="muzzle" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d7c7bf"/><stop offset="1" stopColor="#85757a"/></linearGradient>
      <radialGradient id="halo"><stop stopColor="#800020" stopOpacity=".55"/><stop offset="1" stopColor="#800020" stopOpacity="0"/></radialGradient>
    </defs>
    <circle cx="250" cy="256" r="230" fill="url(#halo)"/>
    <g className="wolf-breath">
      <path d="M83 524 135 388 71 420 120 329 71 341 133 245 113 159 177 182 248 159 323 182 386 159 369 246 428 341 380 327 430 420 366 387 418 524Z" fill="#14151d" stroke="#6f394b" strokeWidth="2"/>
      <path d="m129 414 57 30-16-65 44 38 35-32 36 32 45-38-17 65 58-30-38 110H166Z" fill="#2f2a33"/>
      <g className="wolf-head">
        <g className="wolf-ears">
          <path d="M102 235 97 54l75 73 71 82ZM398 235l5-181-75 73-71 82Z" fill="url(#fur)" stroke="#a04a61" strokeWidth="3"/>
          <path d="m122 191-8-98 77 108ZM378 191l8-98-77 108Z" fill="#713243"/>
          <path d="m133 177-11-52 45 62ZM367 177l11-52-45 62Z" fill="#b65870" opacity=".6"/>
        </g>
        <path d="M105 208q10-72 62-93l83 37 83-37q52 21 62 93l-14 105-51 94-80 48-80-48-51-94Z" fill="url(#fur)" stroke="#6a626a" strokeWidth="3"/>
        <path d="M250 152 191 130l-54 51 18 99 32 36 25-95Z" fill="url(#face)"/>
        <path d="m250 152 59-22 54 51-18 99-32 36-25-95Z" fill="url(#face)"/>
        <path d="m124 254 28 33-16 61 52 13-22 43 60 23 24 28-80-48-51-94ZM376 254l-28 33 16 61-52 13 22 43-60 23-24 28 80-48 51-94Z" fill="#827680"/>
        <path d="M250 158 219 221l31 151 31-151Z" fill="#aaa0a1" opacity=".7"/>
        <path d="m157 256 42-15 43 18-36 23-40-6ZM343 256l-42-15-43 18 36 23 40-6Z" fill="#191a23"/>
        <path d="m163 258 40-10 29 11-29 12Z" fill="#e1b777"/>
        <path d="m337 258-40-10-29 11 29 12Z" fill="#e1b777"/>
        <g className="wolf-blink"><path d="M166 260h64M270 260h64" stroke="#21202a" strokeWidth="17" strokeLinecap="round"/></g>
        <g className="wolf-pupils"><path d="m200 249 7 12-7 9-7-9ZM300 249l7 12-7 9-7-9Z" fill="#15151c"/><circle cx="197" cy="255" r="2" fill="#fff"/><circle cx="297" cy="255" r="2" fill="#fff"/></g>
        <path d="m177 292 73 52 73-52-26 74-47 62-47-62Z" fill="url(#muzzle)"/>
        <path d="m202 350 48 42 48-42-17 45-31 33-31-33Z" fill="#b2a2a1"/>
        <path d="m250 343-30-5 9-18 21-5 21 5 9 18Z" fill="#161720"/>
        <path d="M250 343v35m0 0-23 10m23-10 23 10" fill="none" stroke="#413b43" strokeWidth="4" strokeLinecap="round"/>
        <path d="m156 190 69 21m119-21-69 21" stroke="#211f29" strokeWidth="10" strokeLinecap="round"/>
        <path d="m135 325 44 31m186-31-44 31" stroke="#d3a6a5" strokeOpacity=".55" strokeWidth="2"/>
      </g>
    </g>
  </svg>;
}
