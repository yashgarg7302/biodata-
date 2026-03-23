import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function SanskritiTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#8b4513";
    const bg = theme?.background || "#fff8f0";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Playfair Display', serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
                border: `2px solid ${primary}33`
            }}
        >
            {/* Traditional Header */}
            <div className="text-center z-10 mb-4">
                <p className="text-[10px] font-bold opacity-50 mb-1 min-h-[1em]" style={{ color: primary, fontFamily: 'inherit' }}>{invocation}</p>
                <h1 className="font-black uppercase tracking-tighter border-b-2 inline-block px-8 pb-1" style={{ color: primary, borderColor: primary, fontSize: nameSize * 0.8, fontFamily: 'inherit' }}>
                    {t.title}
                </h1>
            </div>

            <div className="flex flex-col items-center gap-4 mb-6 z-10">
                {photo && (
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border-4 border-white" style={{ width: photoSize * 1.2, height: photoSize * 1.2 }}>
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h2 className="font-bold tracking-wide" style={{ color: '#432616', fontSize: nameSize, fontFamily: 'inherit' }}>
                    {name || t.labels.name}
                </h2>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto z-10 px-4">
                <div className="space-y-3">
                    {fields.map((field) => (
                        <div key={field.id} className="flex justify-between items-center bg-white/40 p-2 rounded border-l-4" style={{ borderColor: primary }}>
                            <span className="font-bold opacity-60 uppercase text-[10px]" style={{ color: primary }}>
                                {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                            </span>
                            <span className="font-bold text-[#432616]" style={{ fontSize }}>{field.value || "-"}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-4 flex justify-center opacity-30 z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">MarryBuilder Premium</span>
            </div>
        </div>
    );
}
