
import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", withText = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="acidGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ccff00" />
            <stop offset="100%" stopColor="#b3ff00" />
          </linearGradient>
        </defs>

        {/* 
           Bold Geometric 'P' Monogram 
           Solid, high-contrast shape for maximum visibility.
           Static: No animations.
        */}
        <path 
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 15H70C83.8071 15 95 26.1929 95 40C95 53.8071 83.8071 65 70 65H50V85H25V15ZM50 35V45H68C70.7614 45 73 42.7614 73 40C73 37.2386 70.7614 35 68 35H50Z" 
          fill="url(#acidGradient)" 
        />
        
        {/* Tech/AI Accent Dot (The 'Period') */}
        <rect x="75" y="75" width="10" height="10" fill="#ccff00" />

      </svg>
      
      {withText && (
        <div className="flex flex-col justify-center">
          <span className="font-display font-black text-xl tracking-tighter leading-none text-white uppercase">
            PORTFOLI<span className="text-[#ccff00]">.AI</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
