import React from 'react';
import { fontMap } from '../utils/fontMap';
import { getScaleParams } from '../utils/scaleParams';
import { translations } from '../utils/lang';

export default function RoyalTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    // Deep traditional colors
    const primary = theme?.primary || "#b45309";
    const bg = theme?.background || "#fffbeb";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Playfair Display', serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
            }}
        >
            {/* Traditional Mandir Border */}
            <div className="absolute inset-0 border-[12px] opacity-10 pointer-events-none" style={{ borderColor: primary, borderStyle: 'double' }} />

            {/* Invocation */}
            <div className="text-center mb-2 z-10 min-h-[1em]">
                <p className="font-bold tracking-widest text-[#92400e] opacity-80" style={{ fontSize: fontSize * 0.9 }}>
                    {invocation}
                </p>
            </div>

            {/* Header with Photo and Name */}
            <div className="flex flex-col items-center gap-4 mb-4 z-10">
                {photo && (
                    <div className="relative" style={{ width: photoSize, height: photoSize }}>
                        <div className="absolute inset-[-4px] border-2 rounded-full opacity-40" style={{ borderColor: primary }} />
                        <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <h1
                        className="font-bold uppercase tracking-tight drop-shadow-sm mb-1"
                        style={{ color: primary, fontSize: nameSize, fontFamily: 'inherit' }}
                    >
                        {name || t.labels.name}
                    </h1>
                    <div className="h-1 w-24 mx-auto opacity-40 rounded-full" style={{ background: primary }} />
                </div>
            </div>

            {/* Details Grid */}
            <div className="flex-1 z-10 mx-auto w-full max-w-2xl px-4">
                <div className="grid grid-cols-2" style={{ gap: `${gap * 0.8}px ${gap * 2.5}px` }}>
                    {fields.map((field) => (
                        <div key={field.id} className="flex flex-col border-b border-amber-900/10 pb-1">
                            <span
                                className="font-bold uppercase tracking-widest text-amber-900/60"
                                style={{ fontSize: fontSize * 0.75 }}
                            >
                                {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                            </span>
                            <span className="font-semibold text-slate-800" style={{ fontSize: fontSize }}>
                                {field.value || "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 flex justify-between items-center opacity-40 border-t border-amber-900/10 z-10">
                <span className="text-[10px] uppercase font-bold tracking-tighter" style={{ color: primary }}>{t.title}</span>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-[#b45309] text-white flex items-center justify-center font-bold text-[8px]">M</div>
                    <span className="text-[8px] font-bold uppercase tracking-widest">MarryBuilder</span>
                </div>
            </div>
        </div>
    );
}
