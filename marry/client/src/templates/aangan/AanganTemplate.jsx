import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function AanganTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#4a6c8c";
    const bg = theme?.background || "#f9f9f9";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden items-center p-8"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Outfit', sans-serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
            }}
        >
            {/* Soft decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full -m-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-100/50 rounded-full -m-16 pointer-events-none" />

            <div className="z-10 mb-8 flex flex-col items-center">
                <p className="text-[10px] font-black tracking-widest uppercase mb-4 opacity-30 italic min-h-[1em]" style={{ color: primary }}>{invocation}</p>
                <div className="flex flex-col items-center gap-4 mb-6 relative">
                    {photo ? (
                        <div className="relative shrink-0 border-8 border-white shadow-xl rounded-full overflow-hidden" style={{ width: photoSize, height: photoSize }}>
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-1.5 h-16 rounded-full opacity-20" style={{ backgroundColor: primary }} />
                    )}
                </div>
                <h1
                    className="font-black tracking-tight leading-none text-slate-800 drop-shadow-sm mb-2"
                    style={{ fontSize: nameSize * 1.1, fontFamily: 'inherit' }}
                >
                    {name || t.labels.name}
                </h1>
                <p className="font-bold opacity-30 uppercase tracking-[0.3em] text-[9px]">{t.title}</p>
            </div>

            <div className="flex-1 z-10 w-full overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100 group transition-all"
                    >
                        <span
                            className="font-black uppercase tracking-[0.1em] text-[9px] opacity-40 group-hover:opacity-100 transition-opacity"
                            style={{ color: primary }}
                        >
                            {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                        </span>
                        <div className="flex-1 mx-4 h-px border-b border-dashed border-slate-100" />
                        <span className="font-bold text-slate-800" style={{ fontSize: fontSize }}>
                            {field.value || "-"}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-6 flex justify-between items-center opacity-30 z-10 w-full px-4">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[8px]">M</div>
                    <span className="text-[10px] uppercase font-black tracking-tighter" style={{ color: '#0f172a' }}>MarryBuilder</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Soft Minimal Indian Signature</span>
            </div>
        </div>
    );
}
