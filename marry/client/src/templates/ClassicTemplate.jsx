import React from 'react';
import { fontMap } from '../utils/fontMap';
import { getScaleParams } from '../utils/scaleParams';
import { translations } from '../utils/lang';

export default function ClassicTemplate({ data, theme, font, lang = 'en', invocation = '' }) {
    const { name, fields = [], photo } = data;
    const dynamicPrimary = theme?.primary || "#ec4899";
    const dynamicBg = theme?.background || "#ffffff";
    const t = translations[lang] || translations.en;

    const { fontSize, nameSize, photoSize, gap, padding } = getScaleParams(fields.length);

    return (
        <div
            className="text-slate-900 border-x-4 shadow-[0_0_15px_rgba(0,0,0,0.05)] flex flex-col h-full relative transition-colors duration-500 overflow-hidden"
            style={{
                borderColor: dynamicPrimary,
                backgroundColor: dynamicBg,
                fontFamily: fontMap[font] || "'Playfair Display', serif",
                fontSize: `${fontSize}px`,
                padding: `${padding}px`,
            }}
        >
            {/* Invocation */}
            <div className="absolute top-2 w-full text-center left-0 opacity-40 min-h-[1em]">
                <p className="text-[10px] font-bold tracking-widest" style={{ color: dynamicPrimary }}>
                    {invocation}
                </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 opacity-50 m-3 rounded-tl-xl pointer-events-none" style={{ borderColor: dynamicPrimary }} />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 opacity-50 m-3 rounded-tr-xl pointer-events-none" style={{ borderColor: dynamicPrimary }} />

            {/* Photo */}
            <div className="relative mx-auto" style={{ width: photoSize, height: photoSize, marginBottom: gap * 0.6 }}>
                <label
                    htmlFor="photo-upload"
                    className="cursor-pointer relative w-full h-full rounded-full bg-slate-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden z-10 hover:scale-105 transition-transform duration-300 group"
                    title="Click to Upload Photo"
                >
                    {photo ? (
                        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-300">
                            <svg className="text-slate-300" style={{ width: photoSize * 0.3, height: photoSize * 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="text-slate-400 font-medium tracking-widest uppercase text-center" style={{ fontSize: 9 }}>{t.labels.photo}</span>
                        </div>
                    )}
                </label>
            </div>

            {/* Header */}
            <div className="text-center border-b border-slate-100 transition-colors duration-500" style={{ marginBottom: gap, paddingBottom: gap * 0.6 }}>
                <h1
                    className="font-bold tracking-wide uppercase drop-shadow-sm transition-colors duration-500"
                    style={{ color: dynamicPrimary, fontSize: nameSize, fontFamily: 'inherit' }}
                >
                    {name || t.labels.name}
                </h1>
                <p className="font-medium text-slate-500 tracking-widest uppercase" style={{ fontSize: fontSize * 0.8 }}>
                    {t.title}
                </p>
            </div>

            {/* Main Details Grid */}
            <div className="flex-1 max-w-2xl mx-auto w-full">
                <div
                    className="grid grid-cols-2"
                    style={{ gap: `${gap * 0.8}px ${gap * 2}px` }}
                >
                    {fields.map((field) => (
                        <div key={field.id} className="flex flex-col" style={{ gap: gap * 0.2 }}>
                            <span
                                className="font-bold uppercase tracking-widest transition-colors duration-500"
                                style={{ color: dynamicPrimary, fontSize: fontSize * 0.8 }}
                            >
                                {t.labels[field.label.toLowerCase().replace(/\s+/g, '_')] || field.label}
                            </span>
                            <span
                                className="text-slate-800 border-b border-dashed border-slate-200"
                                style={{ fontSize, paddingBottom: gap * 0.2 }}
                            >
                                {field.value || "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer watermark */}
            <div className="border-t border-slate-100 flex justify-center opacity-40" style={{ marginTop: gap, paddingTop: gap * 0.5 }}>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center text-white font-bold transition-colors duration-500" style={{ backgroundColor: dynamicPrimary, fontSize: 8 }}>M</div>
                    <span className="font-semibold tracking-widest uppercase text-slate-500" style={{ fontSize: fontSize * 0.75 }}>MarryBuilder</span>
                </div>
            </div>
        </div>
    );
}
