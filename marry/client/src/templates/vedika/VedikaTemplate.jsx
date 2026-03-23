import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function VedikaTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#334155";
    const bg = theme?.background || "#ffffff";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Inter', sans-serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
                border: `2px solid ${primary}11`
            }}
        >
            <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: primary, opacity: 0.2 }} />

            <div className="z-10 mb-6 border-b-2 tracking-tighter" style={{ borderColor: primary }}>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1 min-h-[1em]" style={{ color: primary, fontFamily: 'inherit' }}>{invocation}</p>
                <div className="flex justify-between items-end pb-2">
                    <h1 className="font-black uppercase text-3xl" style={{ color: primary, fontFamily: 'inherit' }}>{t.title}</h1>
                    <span className="font-bold uppercase tracking-widest text-[9px] opacity-40" style={{ color: primary, fontFamily: 'inherit' }}>ESTD 2026</span>
                </div>
            </div>

            <div className="flex gap-8 mb-8 z-10 items-start">
                {photo ? (
                    <div className="relative shrink-0 border-4 border-white shadow-lg overflow-hidden" style={{ width: photoSize * 1.5, height: photoSize * 1.5, borderRadius: '4px' }}>
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-12 h-1 rounded-full opacity-20" style={{ backgroundColor: primary }} />
                )}

                <div className="flex-1 flex flex-col justify-center">
                    <p className="font-bold opacity-40 uppercase tracking-[0.3em] text-[9px] mb-2" style={{ fontFamily: 'inherit' }}>{t.labels.name}</p>
                    <h2 className="font-black tracking-tighter border-b pb-2 mb-4" style={{ color: primary, fontSize: nameSize * 1.1, fontFamily: 'inherit' }}>
                        {name || t.labels.name}
                    </h2>
                    <div className="flex gap-4">
                        <div className="w-1 h-12 rounded-full opacity-20" style={{ backgroundColor: primary }} />
                        <p className="text-[11px] font-medium leading-relaxed opacity-60 max-w-xs">{t.title} - Professional Profile Crafted with Precision for the Occasion.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 z-10 w-full overflow-hidden">
                <div className="grid grid-cols-2" style={{ gap: `${gap * 0.8}px ${gap * 3.5}px` }}>
                    {fields.map((field) => (
                        <div key={field.id} className="flex flex-col border-b border-slate-100 pb-1">
                            <span
                                className="font-bold uppercase tracking-widest opacity-40"
                                style={{ fontSize: fontSize * 0.7 }}
                            >
                                {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                            </span>
                            <span className="font-bold text-slate-800" style={{ fontSize: fontSize }}>
                                {field.value || "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-6 flex justify-between items-center opacity-30 z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">MarryBuilder Signature</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">BIODATA - {lang.toUpperCase()}</span>
            </div>
        </div>
    );
}
