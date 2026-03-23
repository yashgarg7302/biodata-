import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function ShagunTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);
    const t = translations[lang] || translations.en;

    const primary = theme?.primary || "#ef4444";
    const bg = theme?.background || "#fef6e4";

    return (
        <div
            className="w-full h-full relative flex flex-col transition-all duration-500 overflow-hidden items-center justify-center p-8 bg-slate-50"
            style={{
                fontFamily: fontMap[font] || "'Playfair Display', serif",
                fontSize: `${fontSize}px`,
            }}
        >
            {/* Decorative Cultural Backdrop */}
            <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none opacity-40 -skew-x-12 translate-x-1/2">
                <div className="w-[80vw] h-full" style={{ background: bg }} />
            </div>

            <div
                className="w-full h-full relative z-10 p-8 shadow-2xl rounded-3xl overflow-hidden border-2 flex flex-col items-center"
                style={{ backgroundColor: bg, borderColor: `${primary}11` }}
            >
                <div className="absolute top-0 inset-x-0 h-2 opacity-60" style={{ backgroundColor: primary }} />

                <div className="text-center mb-6">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-3 opacity-60 italic min-h-[1em]" style={{ color: primary }}>{invocation}</p>
                    <div className="w-16 h-0.5 mx-auto bg-slate-200 mb-4" />
                    <h1
                        className="font-black tracking-tighter leading-none mb-1 text-slate-800 drop-shadow-sm"
                        style={{ fontSize: nameSize * 1.2, fontFamily: 'inherit' }}
                    >
                        {name || t.labels.name}
                    </h1>
                </div>

                {photo && (
                    <div className="relative mb-6 shrink-0 border-4 border-white shadow-xl rounded-full overflow-hidden" style={{ width: photoSize * 1.5, height: photoSize * 1.5 }}>
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ring-4 ring-slate-100/20 rounded-full" />
                    </div>
                )}

                <div className="flex-1 w-full max-w-lg mx-auto overflow-hidden">
                    <div className="grid grid-cols-2" style={{ gap: `${gap * 0.8}px ${gap * 2.5}px` }}>
                        {fields.map((field) => (
                            <div key={field.id} className="group transition-all flex flex-col items-center text-center">
                                <span
                                    className="font-black uppercase tracking-[0.1em] text-[9px] mb-1 opacity-40"
                                    style={{ color: primary }}
                                >
                                    {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                                </span>
                                <span className="font-bold text-slate-700 leading-tight" style={{ fontSize: fontSize }}>
                                    {field.value || "-"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-6 flex justify-between items-center opacity-30 z-10 w-full px-4 border-t border-slate-200">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">MarryBuilder Signature</span>
                </div>
            </div>
        </div>
    );
}
