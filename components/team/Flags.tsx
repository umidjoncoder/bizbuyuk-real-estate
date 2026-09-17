/* Country flags drawn once and referenced with <use>, so seven roster cells do
   not each carry their own copy of the geometry. Kept as inline SVG rather than
   emoji: emoji flags render differently on every platform and vanish on Windows. */

export function FlagSprite() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0 overflow-hidden">
      <defs>
    <path id="star5" d="M0-1 .2245-.309.951-.309.363.118.588.809 0 .382-.588.809-.363.118-.951-.309-.2245-.309Z"/>
    <symbol id="f-ru" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect y="5.333" width="24" height="5.334" fill="#0039A6"/>
    <rect y="10.667" width="24" height="5.333" fill="#D52B1E"/>
    </symbol>
    <symbol id="f-gb" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#012169"/>
    <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.3"/>
    <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.9"/>
    <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.4"/>
    <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3.2"/>
    </symbol>
    <symbol id="f-uz" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#CE1126"/>
    <rect width="24" height="5.1" fill="#0099B5"/>
    <rect y="5.5" width="24" height="5" fill="#fff"/>
    <rect y="10.9" width="24" height="5.1" fill="#1EB53A"/>
    <circle cx="4.25" cy="2.55" r="1.8" fill="#fff"/>
    <circle cx="5.25" cy="2.55" r="1.8" fill="#0099B5"/>
    <g fill="#fff">
    <use href="#star5" transform="translate(8.5 1.15) scale(.55)"/><use href="#star5" transform="translate(10.4 1.15) scale(.55)"/><use href="#star5" transform="translate(12.3 1.15) scale(.55)"/>
    <use href="#star5" transform="translate(8.5 2.75) scale(.55)"/><use href="#star5" transform="translate(10.4 2.75) scale(.55)"/><use href="#star5" transform="translate(12.3 2.75) scale(.55)"/><use href="#star5" transform="translate(14.2 2.75) scale(.55)"/>
    <use href="#star5" transform="translate(8.5 4.35) scale(.55)"/><use href="#star5" transform="translate(10.4 4.35) scale(.55)"/><use href="#star5" transform="translate(12.3 4.35) scale(.55)"/><use href="#star5" transform="translate(14.2 4.35) scale(.55)"/><use href="#star5" transform="translate(16.1 4.35) scale(.55)"/>
    </g>
    </symbol>
    <symbol id="f-kz" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#00AFCA"/>
    <path d="M1.7 1.8V14.2" stroke="#FEC50C" strokeWidth="1.05" strokeDasharray="1.35 1.05"/>
    <circle cx="12.6" cy="6.5" r="2.25" fill="#FEC50C"/>
    <g stroke="#FEC50C" strokeWidth="0.5" strokeLinecap="round">
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(0 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(22.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(45 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(67.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(90 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(112.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(135 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(157.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(180 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(202.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(225 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(247.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(270 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(292.5 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(315 12.6 6.5)"/>
    <line x1="12.6" y1="3.75" x2="12.6" y2="2.85" transform="rotate(337.5 12.6 6.5)"/>
    </g>
    <path d="M7.4 12.35c1.15-1.5 3-2.3 5.2-2.3s4.05.8 5.2 2.3c-1.5-.85-3.1-1.25-5.2-1.25s-3.7.4-5.2 1.25Z" fill="#FEC50C"/>
    </symbol>
    <symbol id="f-tj" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect width="24" height="4" fill="#CC0000"/>
    <rect y="12" width="24" height="4" fill="#006600"/>
    <g fill="#F8C300">
    <path d="M9.45 9.5V7.35l1.1 1.15L12 6.65l1.45 1.85 1.1-1.15V9.5Z"/>
    <rect x="9.25" y="9.75" width="5.5" height="0.6"/>
    <use href="#star5" transform="translate(9.2 6.2) scale(.36)"/>
    <use href="#star5" transform="translate(10.1 5.7) scale(.36)"/>
    <use href="#star5" transform="translate(11.05 5.42) scale(.36)"/>
    <use href="#star5" transform="translate(12 5.33) scale(.36)"/>
    <use href="#star5" transform="translate(12.95 5.42) scale(.36)"/>
    <use href="#star5" transform="translate(13.9 5.7) scale(.36)"/>
    <use href="#star5" transform="translate(14.8 6.2) scale(.36)"/>
    </g>
    </symbol>
    <symbol id="f-ae" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#00732F"/>
    <rect y="5.333" width="24" height="5.334" fill="#fff"/>
    <rect y="10.667" width="24" height="5.333" fill="#0A0A0A"/>
    <rect width="6" height="16" fill="#FF0000"/>
    </symbol>
    <symbol id="f-cn" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#EE1C25"/>
    <g fill="#FFDE00">
    <use href="#star5" transform="translate(4.1 4.3) scale(2.05)"/>
    <use href="#star5" transform="translate(8.5 1.75) rotate(23) scale(.68)"/>
    <use href="#star5" transform="translate(10.2 3.5) rotate(46) scale(.68)"/>
    <use href="#star5" transform="translate(10.2 5.9) rotate(70) scale(.68)"/>
    <use href="#star5" transform="translate(8.5 7.6) rotate(23) scale(.68)"/>
    </g>
    </symbol>
<symbol id="f-af" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#046A38"/>
    <g fill="#F5C400">
    <use href="#star5" transform="translate(12.00 2.65) scale(.42)"/><use href="#star5" transform="translate(13.38 2.83) scale(.42)"/><use href="#star5" transform="translate(14.68 3.37) scale(.42)"/><use href="#star5" transform="translate(15.78 4.22) scale(.42)"/><use href="#star5" transform="translate(16.63 5.33) scale(.42)"/><use href="#star5" transform="translate(17.17 6.62) scale(.42)"/>
    <use href="#star5" transform="translate(17.35 8.00) scale(.42)"/><use href="#star5" transform="translate(17.17 9.38) scale(.42)"/><use href="#star5" transform="translate(16.63 10.67) scale(.42)"/><use href="#star5" transform="translate(15.78 11.78) scale(.42)"/><use href="#star5" transform="translate(14.68 12.63) scale(.42)"/><use href="#star5" transform="translate(13.38 13.17) scale(.42)"/>
    <use href="#star5" transform="translate(12.00 13.35) scale(.42)"/><use href="#star5" transform="translate(10.62 13.17) scale(.42)"/><use href="#star5" transform="translate(9.33 12.63) scale(.42)"/><use href="#star5" transform="translate(8.22 11.78) scale(.42)"/><use href="#star5" transform="translate(7.37 10.67) scale(.42)"/><use href="#star5" transform="translate(6.83 9.38) scale(.42)"/>
    <use href="#star5" transform="translate(6.65 8.00) scale(.42)"/><use href="#star5" transform="translate(6.83 6.62) scale(.42)"/><use href="#star5" transform="translate(7.37 5.32) scale(.42)"/><use href="#star5" transform="translate(8.22 4.22) scale(.42)"/><use href="#star5" transform="translate(9.32 3.37) scale(.42)"/><use href="#star5" transform="translate(10.62 2.83) scale(.42)"/>
    </g>
    <circle cx="12" cy="8" r="3.9" fill="#fff"/>
    <path d="M9.30 5.50 10.70 5.02 13.30 5.15 13.78 6.30 14.92 7.35 13.72 7.95 13.26 9.15 12.56 10.58 12.05 11.45 11.45 10.30 11.05 9.05 10.50 8.45 9.75 8.30 9.20 7.40 8.95 6.40 Z" fill="#046A38"/>
    </symbol>
    <symbol id="f-az" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#EF3340"/>
    <rect width="24" height="5.333" fill="#00B5E2"/>
    <rect y="10.667" width="24" height="5.333" fill="#509E2F"/>
    <circle cx="11.3" cy="8" r="2.15" fill="#fff"/>
    <circle cx="12.25" cy="8" r="2.15" fill="#EF3340"/>
    <g fill="#fff">
    <rect x="13.87" y="6.87" width="2.26" height="2.26"/>
    <rect x="13.87" y="6.87" width="2.26" height="2.26" transform="rotate(45 15 8)"/>
    </g>
    </symbol>
    <symbol id="f-ca" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect width="6" height="16" fill="#FF0000"/>
    <rect x="18" width="6" height="16" fill="#FF0000"/>
    <path d="M12 2.9 12.75 4.75 14.6 4.05 13.95 5.75 15.7 6.35 14 7 14.7 8.7 12.95 8.15 12.75 9.9 12 9.05 11.25 9.9 11.05 8.15 9.3 8.7 10 7 8.3 6.35 10.05 5.75 9.4 4.05 11.25 4.75Z" fill="#FF0000"/>
    <rect x="11.55" y="9" width="0.9" height="2.3" fill="#FF0000"/>
    </symbol>
    <symbol id="f-sg" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect width="24" height="8" fill="#EF3340"/>
    <circle cx="6.2" cy="4" r="2.7" fill="#fff"/>
    <circle cx="7.2" cy="4" r="2.7" fill="#EF3340"/>
    <g fill="#fff">
    <use href="#star5" transform="translate(6.2 2.4) scale(.3)"/>
    <use href="#star5" transform="translate(7.72 3.51) scale(.3)"/>
    <use href="#star5" transform="translate(7.14 5.29) scale(.3)"/>
    <use href="#star5" transform="translate(5.26 5.29) scale(.3)"/>
    <use href="#star5" transform="translate(4.68 3.51) scale(.3)"/>
    </g>
    </symbol>
    <symbol id="f-by" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#D22730"/>
    <rect y="10.67" width="24" height="5.33" fill="#00AF66"/>
    <rect width="4" height="16" fill="#fff"/>
    <g fill="#D22730">
    <rect x="0.5" y="1" width="0.8" height="0.8" transform="rotate(45 0.9 1.4)"/>
    <rect x="2.1" y="1" width="0.8" height="0.8" transform="rotate(45 2.5 1.4)"/>
    <rect x="1.3" y="2.4" width="0.8" height="0.8" transform="rotate(45 1.7 2.8)"/>
    <rect x="0.5" y="3.8" width="0.8" height="0.8" transform="rotate(45 0.9 4.2)"/>
    <rect x="2.1" y="3.8" width="0.8" height="0.8" transform="rotate(45 2.5 4.2)"/>
    <rect x="1.3" y="5.2" width="0.8" height="0.8" transform="rotate(45 1.7 5.6)"/>
    <rect x="0.5" y="6.6" width="0.8" height="0.8" transform="rotate(45 0.9 7)"/>
    <rect x="2.1" y="6.6" width="0.8" height="0.8" transform="rotate(45 2.5 7)"/>
    <rect x="1.3" y="8" width="0.8" height="0.8" transform="rotate(45 1.7 8.4)"/>
    <rect x="0.5" y="9.4" width="0.8" height="0.8" transform="rotate(45 0.9 9.8)"/>
    <rect x="2.1" y="9.4" width="0.8" height="0.8" transform="rotate(45 2.5 9.8)"/>
    <rect x="1.3" y="10.8" width="0.8" height="0.8" transform="rotate(45 1.7 11.2)"/>
    <rect x="0.5" y="12.2" width="0.8" height="0.8" transform="rotate(45 0.9 12.6)"/>
    <rect x="2.1" y="12.2" width="0.8" height="0.8" transform="rotate(45 2.5 12.6)"/>
    <rect x="1.3" y="13.6" width="0.8" height="0.8" transform="rotate(45 1.7 14)"/>
    </g>
    </symbol>
    <symbol id="f-ng" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect width="8" height="16" fill="#008751"/>
    <rect x="16" width="8" height="16" fill="#008751"/>
    </symbol>
      </defs>
    </svg>
  );
}

export function Flag({ code, className = "" }: { code: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden="true"
      className={`block shrink-0 rounded-[2.5px] bg-ink shadow-[0_0_0_1px_rgba(255,255,255,0.18)] ${className}`}
    >
      <use href={`#f-${code}`} />
    </svg>
  );
}
