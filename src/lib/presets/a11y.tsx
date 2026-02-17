import React from 'react';

export const useA11y = () => {
    const skipToContent = (targetId: string = 'main-content') => {
        const target = document.getElementById(targetId);
        if (target) {
            target.focus();
            target.scrollIntoView();
        }
    };

    return { skipToContent };
};

export const SkipLink: React.FC = () => (
    <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-bold"
    >
        Skip to content
    </a>
);

export const AriaLabel = (label: string) => ({
    'aria-label': label,
});
