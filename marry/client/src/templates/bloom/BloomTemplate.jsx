import React from 'react';
import { fontMap } from '../../utils/fontMap';
import { getScaleParams } from '../../utils/scaleParams';
import { translations } from '../../utils/lang';

export default function BloomTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const dynamicBg = theme?.background || "#fffaff";
    const dynamicPrimary = theme?.primary || "#db2777";
    const t = translations[lang] || translations.en;

    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);

    return (
        <div
            className="w-full h-full relative overflow-hidden transition-all duration-700 flex flex-col cursor-default"
            style={{
                backgroundColor: dynamicBg,
                fontFamily: fontMap[font] || "'Playfair Display', serif",
                padding: `${padding}px`,
                fontSize: `${fontSize}px`,
            }}
        >
            {/* Floral Decorative SVGs */}
            <div className="absolute top-[-2%] right-[-5%] w-[40%] text-pink-200/40 rotate-12 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="currentColor"><path d="M100,20 C120,50 150,50 180,20 C150,80 150,110 180,170 C140,140 110,140 70,170 C100,110 100,80 70,20 C90,50 110,50 130,20" /></svg>
            </div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[50%] text-sky-200/30 -rotate-12 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="currentColor"><path d="M100,20 C120,50 150,50 180,20 C150,80 150,110 180,170 C140,140 110,140 70,170 C100,110 100,80 70,20 C90,50 110,50 130,20" /></svg>
            </div>

            {/* Inner Border Frame */}
            <div className="absolute inset-4 border border-pink-100 rounded-[2rem] pointer-events-none z-0" />

            {/* Invocation */}
            <div className="text-center mb-4 z-10 relative">
                <p className="font-bold tracking-[0.3em] uppercase opacity-40 text-[9px]" style={{ color: dynamicPrimary }}>
                    {invocation}
                </p>
            </div>

            {/* Header: Photo and Name */}
            <div className="flex flex-col items-center text-center mb-8 z-10 relative">
                {photo && (
                    <div className="relative mb-6" style={{ width: photoSize * 1.4, height: photoSize * 1.4 }}>
                        <div className="absolute inset-0 bg-pink-100 rounded-full scale-110 blur-xl opacity-50" />
                        <div className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative z-10">
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                <h1
                    className="font-black tracking-tighter leading-none mb-1 drop-shadow-sm italic"
                    style={{ color: dynamicPrimary, fontSize: nameSize, fontFamily: 'inherit' }}
                >
                    {name || t.labels.name}
                </h1>
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto opacity-50" />
                <p className="uppercase tracking-[0.4em] text-[10px] font-bold mt-2 opacity-30 italic" style={{ fontFamily: 'inherit' }}>{t.title}</p>
            </div>

            {/* Content Grid */}
            <div className="flex-1 z-10 relative px-6 w-full max-w-2xl mx-auto">
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {fields.map((field) => (
                        <div key={field.id} className="flex flex-col border-b border-pink-50 pb-1.5 transition-all hover:translate-x-1">
                            <span
                                className="font-black uppercase tracking-widest opacity-40 mb-1"
                                style={{ color: dynamicPrimary, fontSize: fontSize * 0.7 }}
                            >
                                {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                            </span>
                            <span className="font-bold text-slate-800 tracking-tight" style={{ fontSize: fontSize }}>
                                {field.value || "—"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 flex justify-between items-end opacity-20 z-10 relative">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-[10px]">M</div>
                    <span className="text-[10px] font-black tracking-widest uppercase">MarryBuilder Premium</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400" />)}
                </div>
            </div>
        </div>
    );
}
