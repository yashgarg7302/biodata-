import React from 'react';
import BloomTemplate from './bloom/BloomTemplate';
import ClassicTemplate from './ClassicTemplate';
import RoyalTemplate from './RoyalTemplate';
import ModernTemplate from './ModernTemplate';
import SanskritiTemplate from './sanskriti/SanskritiTemplate';
import VedikaTemplate from './vedika/VedikaTemplate';
import UtsavTemplate from './utsav/UtsavTemplate';
import ShagunTemplate from './shagun/ShagunTemplate';
import AanganTemplate from './aangan/AanganTemplate';
import MangalTemplate from './mangal/MangalTemplate';
import SanskritiPremium from './sanskriti/SanskritiPremium';

export default function TemplateRenderer({ data, template, theme, font, lang = 'en', invocation = '' }) {
    const props = { data, theme, font, lang, invocation };

    switch (template) {
        case "bloom":
            return <BloomTemplate {...props} />;
        case "classic":
            return <ClassicTemplate {...props} />;
        case "royal":
            return <RoyalTemplate {...props} />;
        case "modern":
            return <ModernTemplate {...props} />;
        case "sanskriti":
            return <SanskritiTemplate {...props} />;
        case "vedika":
            return <VedikaTemplate {...props} />;
        case "utsav":
            return <UtsavTemplate {...props} />;
        case "shagun":
            return <ShagunTemplate {...props} />;
        case "aangan":
            return <AanganTemplate {...props} />;
        case "mangal":
            return <MangalTemplate {...props} />;
        case "sanskriti-premium":
            return <SanskritiPremium {...props} />;
        default:
            return (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                    <span className="text-lg font-medium">Select a template to begin</span>
                </div>
            );
    }
}
