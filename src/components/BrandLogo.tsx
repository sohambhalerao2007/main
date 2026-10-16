import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true, onClick }) => {
  const heightClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-24'
  };

  return (
    <div 
      className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer group' : ''}`}
      onClick={onClick}
    >
      <svg 
        className={`${heightClasses[size]} w-auto overflow-visible select-none`} 
        viewBox="0 0 640 130" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        role="img"
        aria-label="4OURSIGHT Brand Logo"
      >
        <defs>
          <radialGradient id="foursightBrandGradGlobal" cx="12%" cy="18%" r="92%" fx="8%" fy="12%">
            <stop offset="0%" stopColor="#fae8ff" />
            <stop offset="16%" stopColor="#e879f9" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="76%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>
          <filter id="brandGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#9333ea" floodOpacity="0.32"/>
          </filter>
        </defs>
        <g filter="url(#brandGlowFilter)" fill="url(#foursightBrandGradGlobal)">
          {/* '4' aligned to cap-height with flared lower stem */}
          <path d="M52 18 L60 18 L60 72 L73 72 L71 80 L60 80 L60 106 L48 110 L50 80 L16 80 L16 74 Z M50 32 L24 72 L50 72 Z" />
          {/* 'O' classical high-contrast serif */}
          <path d="M114 20 C142 20 160 39 160 63 C160 87 142 106 114 106 C86 106 68 87 68 63 C68 39 86 20 114 20 Z M114 24 C92 24 80 41 80 63 C80 85 92 102 114 102 C136 102 148 85 148 63 C148 41 136 24 114 24 Z" />
          {/* 'U' with top bracket serifs */}
          <path d="M164 22 L188 22 L188 25 L181 26 L181 74 C181 92 192 101 208 101 C224 101 233 91 233 73 L233 26 L225 25 L225 22 L244 22 L244 25 L237 26 L237 74 C237 95 224 106 205 106 C185 106 171 95 171 74 L171 26 L164 25 Z" />
          {/* 'R' with sweeping descender tail curving under 'S' */}
          <path d="M250 22 L286 22 C306 22 318 32 318 46 C318 59 307 68 292 70 C301 73 307 82 314 95 C322 110 332 118 348 118 C362 118 372 111 375 102 L378 103 C374 115 362 123 345 123 C324 123 312 112 302 93 C295 79 290 72 278 72 L268 72 L268 101 L276 102 L276 105 L250 105 L250 102 L258 101 L258 26 L250 25 Z M268 26 L268 68 L283 68 C298 68 306 59 306 46 C306 33 298 26 283 26 Z" />
          {/* 'S' connected visually above the R tail */}
          <path d="M356 20 C366 20 374 23 379 25 L377 39 L374 39 C372 30 365 24 355 24 C344 24 337 31 337 40 C337 50 347 55 360 61 C375 68 385 76 385 91 C385 108 371 120 350 120 C338 120 329 115 326 106 C324 100 327 93 333 91 L335 94 C331 97 330 102 332 107 C335 113 342 116 351 116 C366 116 375 107 375 94 C375 81 365 75 351 68 C337 61 327 54 327 42 C327 29 339 20 356 20 Z" />
          {/* 'I' pillar */}
          <path d="M394 22 L420 22 L420 25 L412 26 L412 101 L420 102 L420 105 L394 105 L394 102 L402 101 L402 26 L394 25 Z" />
          {/* 'G' */}
          <path d="M472 20 C486 20 497 24 504 28 L502 44 L499 44 C495 31 485 24 471 24 C449 24 436 41 436 63 C436 86 450 102 472 102 C481 102 488 100 492 97 L492 71 L482 70 L482 67 L510 67 L510 70 L502 71 L502 100 C493 104 482 106 470 106 C441 106 424 87 424 63 C424 39 442 20 472 20 Z" />
          {/* 'H' & 'T' Monogram Ligature */}
          <path d="M530 22 L552 22 L552 25 L545 26 L545 55 C552 52 560 52 567 56 C575 60 580 69 580 82 L580 101 L586 102 L586 105 L566 105 L566 102 L571 101 L571 80 C571 67 565 59 555 59 C551 59 548 60 545 62 L545 101 L552 102 L552 105 L528 105 L528 102 L535 101 L535 90 C523 89 515 81 515 71 C515 61 523 54 535 53 L535 26 L530 25 Z M535 57 C527 58 523 63 523 71 C523 79 527 85 535 86 Z" />
          {/* 'T' double-stem & wave bar */}
          <path d="M582 26 C598 17 615 17 632 21 C646 24 658 25 668 18 L670 20 C659 31 644 32 626 28 C619 27 613 26 607 26 L607 101 L615 102 L615 105 L580 105 L580 102 L587 101 L587 28 C585 28 583 29 580 30 Z M595 26 L595 101 L599 101 L599 26 Z" />
        </g>
      </svg>
      {showSubtitle && (
        <span className="text-[10px] font-bold tracking-wider uppercase text-fuchsia-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-800/60 hidden sm:inline-block">
          B2B Surplus
        </span>
      )}
    </div>
  );
};
