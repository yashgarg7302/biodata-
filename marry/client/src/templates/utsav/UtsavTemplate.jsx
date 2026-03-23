import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function UtsavTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#ff7043";
    const bg = theme?.background || "#fff";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden"
            style={{
                backgroundColor: bg,
                fontFamily: fontMap[font] || "'Outfit', sans-serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
                border: `2px solid ${primary}22`
            }}
        >
            {/* Header section with standout highlight */}
            <div className="z-10 mb-12 flex flex-col items-center">
                <div
                    className="w-full py-5 px-6 rounded-2xl shadow-xl flex flex-col items-center justify-center mb-10 relative"
                    style={{ background: `linear-gradient(to bottom right, ${primary}, ${primary}ee)`, color: '#fff' }}
                >
                    <p className="text-[10px] font-black tracking-widest uppercase mb-2 opacity-80 min-h-[1em]">{invocation}</p>
                    <h1 className="font-black uppercase text-center tracking-tight leading-tight" style={{ fontSize: nameSize * 1.25, fontFamily: 'inherit' }}>
                        {name || t.labels.name}
                    </h1>
                </div>

                {photo ? (
                    <div className="relative shrink-0 border-4 border-white shadow-2xl rounded-2xl overflow-hidden -mt-12 z-20" style={{ width: photoSize * 1.5, height: photoSize * 1.5 }}>
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-12 h-1 rounded-full opacity-20" style={{ backgroundColor: primary }} />
                )}
            </div>

            <div className="flex-1 w-full max-w-2xl mx-auto z-10 px-4">
                <div className="grid grid-cols-2" style={{ gap: `${gap * 0.8}px ${gap * 2.5}px` }}>
                    {fields.map((field) => (
                        <div key={field.id} className="flex gap-4 items-center bg-slate-50 p-2 rounded-xl transition-transform hover:scale-105">
                            <div className="w-2 h-8 rounded-full shadow-sm" style={{ backgroundColor: primary }} />
                            <div className="flex flex-col">
                                <span
                                    className="font-bold uppercase tracking-[0.1em] text-[9px] opacity-40"
                                    style={{ color: primary }}
                                >
                                    {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                                </span>
                                <span className="font-black text-slate-800" style={{ fontSize: fontSize }}>
                                    {field.value || "-"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-6 flex justify-center opacity-30 z-10">
                <div className="flex items-center gap-1 border py-1.5 px-4 rounded-full border-slate-200">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">MarryBuilder Signature</span>
                </div>
            </div>
        </div>
    );
}
