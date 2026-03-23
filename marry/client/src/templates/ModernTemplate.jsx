import React from 'react';
import { fontMap } from '../utils/fontMap';
import { getScaleParams } from '../utils/scaleParams';
import { translations } from '../utils/lang';

export default function ModernTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#10b981";
    const bg = theme?.background || "#f8fafc";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Outfit', sans-serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
            }}
        >
            {/* Minimal Background Element */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-white to-transparent opacity-50 skew-x-12 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-full pointer-events-none" style={{ backgroundColor: primary, opacity: 0.1 }} />

            {/* Header section with modern layout */}
            <div className="flex items-center gap-6 mb-8 z-10">
                {photo ? (
                    <div className="relative shrink-0" style={{ width: photoSize * 1.1, height: photoSize * 1.1 }}>
                        <div className="absolute inset-0 rounded-2xl rotate-3 opacity-20" style={{ background: primary }} />
                        <img
                            src={photo}
                            alt=""
                            className="w-full h-full object-cover rounded-2xl relative z-10 border-2 border-white shadow-md transition-transform hover:rotate-2"
                        />
                    </div>
                ) : (
                    <div className="w-16 h-1 rounded-full opacity-20" style={{ backgroundColor: primary }} />
                )}

                <div className="flex-1">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 opacity-50 min-h-[1em]" style={{ color: primary }}>
                        {invocation}
                    </p>
                    <h1
                        className="font-black tracking-tight leading-none mb-1"
                        style={{ color: '#0f172a', fontSize: nameSize, fontFamily: 'inherit' }}
                    >
                        {name || t.labels.name}
                    </h1>
                    <p className="font-bold opacity-30 uppercase tracking-[0.3em] text-[9px]" style={{ fontFamily: 'inherit' }}>
                        {t.title}
                    </p>
                </div>
            </div>

            {/* Grid layout with accent bars */}
            <div className="flex-1 z-10 w-full">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {fields.map((field) => (
                        <div key={field.id} className="group transition-all">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-0.5 w-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: primary }} />
                                    <span
                                        className="font-black uppercase tracking-widest opacity-40"
                                        style={{ fontSize: fontSize * 0.7 }}
                                    >
                                        {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                                    </span>
                                </div>
                                <span className="font-bold text-slate-700 ml-5" style={{ fontSize: fontSize }}>
                                    {field.value || "-"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic visual footer */}
            <div className="mt-auto pt-6 flex justify-between items-end z-10">
                <div className="flex gap-1 h-8 items-end">
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
                        <div key={val} className="w-1.5 rounded-t-sm" style={{ backgroundColor: primary, height: `${val * 100}%`, opacity: 0.2 }} />
                    ))}
                </div>
                <div className="flex items-center gap-2 opacity-30">
                    <span className="text-[10px] font-black tracking-tighter uppercase" style={{ color: '#0f172a' }}>MB</span>
                    <div className="w-1 h-3 rounded-full" style={{ backgroundColor: primary }} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Crafted Premium</span>
                </div>
            </div>
        </div>
    );
}
