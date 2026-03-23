import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function MangalTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#854d0e";
    const bg = theme?.background || "#fefce8";

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
            {/* Elegant Golden Border */}
            <div className="absolute inset-4 border opacity-20 pointer-events-none" style={{ borderColor: primary }} />
            <div className="absolute inset-6 border-2 opacity-10 pointer-events-none" style={{ borderColor: primary, borderStyle: 'double' }} />

            {/* Content Container */}
            <div className="flex-1 flex flex-col z-10 w-full max-w-2xl mx-auto px-8 py-4">

                {/* Invocation */}
                <div className="text-center mb-6 min-h-[1.5em] flex flex-col items-center">
                    <p className="font-bold tracking-widest uppercase opacity-70" style={{ fontSize: fontSize * 0.85, color: primary }}>
                        {invocation}
                    </p>
                    <div className="h-0.5 w-12 mt-2" style={{ background: primary, opacity: 0.2 }} />
                </div>

                {/* Main Header */}
                <div className="flex items-start gap-8 mb-10">
                    {photo && (
                        <div className="relative shrink-0 flex-1">
                            <div className="w-full h-full rounded-2xl border-2 border-white shadow-2xl overflow-hidden aspect-[4/5]" style={{ borderColor: `${primary}33` }}>
                                <img src={photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}

                    <div className="flex-[2] flex flex-col justify-center h-full py-4">
                        <h1
                            className="font-black text-left leading-none mb-4 uppercase tracking-tighter"
                            style={{ fontSize: nameSize * 1.3, color: primary, fontFamily: 'inherit' }}
                        >
                            {name || t.labels.name}
                        </h1>
                        <div className="flex flex-col gap-1 border-l-4 pl-4" style={{ borderColor: primary }}>
                            <span className="font-bold opacity-40 uppercase tracking-widest text-[9px]">{t.title}</span>
                            <span className="font-black opacity-20 text-[11px] tracking-tight">Verified Royal Profile</span>
                        </div>
                    </div>
                </div>

                {/* Fields Section with List Style */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {fields.map((field) => (
                        <div key={field.id} className="flex flex-col gap-1 group">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: primary, opacity: 0.3 }} />
                                <span
                                    className="font-bold uppercase tracking-[0.2em] opacity-40"
                                    style={{ fontSize: fontSize * 0.8, color: primary }}
                                >
                                    {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                                </span>
                            </div>
                            <span className="font-bold text-slate-900 border-b border-slate-200 pb-1 pl-3 transition-colors group-hover:border-amber-300" style={{ fontSize: fontSize * 1.1 }}>
                                {field.value || "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Minimalist Footer */}
            <div className="mt-auto px-8 pb-4 flex justify-between items-center opacity-30 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: primary }}>Mangal</span>
                    <div className="w-1 h-3 rounded-full" style={{ background: primary }} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Premium Selection</span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest">MB • © 2025</span>
            </div>
        </div>
    );
}
