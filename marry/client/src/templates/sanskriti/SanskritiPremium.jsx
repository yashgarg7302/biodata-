import React from 'react';
import { fontMap } from "../../utils/fontMap";
import { translations } from "../../utils/lang";
import floralImg from "../../assets/images/floral.png";

export default function SanskritiPremium({ data, font, theme, lang = 'en', invocation = '' }) {
  const { name, fields = [], photo } = data;
  const t = translations[lang] || translations.en;
  
  // Use theme colors if possible, else defaults from user's request
  const primary = theme?.primary || "#4a6c8c";
  const bg = theme?.background || "#f6efe4";

  // Helper function to find field value by label or ID
  const getField = (labelKey) => {
    const field = fields.find(f => 
        f.label.toLowerCase().includes(labelKey.toLowerCase()) || 
        f.id === labelKey
    );
    return field ? field.value : "-";
  };

  return (
    <div
      className="w-full h-full relative transition-all duration-700 flex flex-col"
      style={{
        backgroundColor: bg,
        fontFamily: fontMap[font] || "'Playfair Display', serif",
        position: "relative",
        padding: "clamp(20px, 5vw, 60px)",
        lineHeight: "1.6",
        letterSpacing: "0.5px"
      }}
    >
      {/* Floral corners */}
      <div className="absolute top-2 left-2 w-10 h-10 md:w-14 md:h-14 pointer-events-none opacity-80 z-0">
        <img src={floralImg} alt="" crossOrigin="anonymous" className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      <div className="absolute top-2 right-2 w-10 h-10 md:w-14 md:h-14 pointer-events-none opacity-80 rotate-90 z-0">
        <img src={floralImg} alt="" crossOrigin="anonymous" className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      <div className="absolute bottom-2 left-2 w-10 h-10 md:w-14 md:h-14 pointer-events-none opacity-80 -rotate-90 z-0">
        <img src={floralImg} alt="" crossOrigin="anonymous" className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      <div className="absolute bottom-2 right-2 w-10 h-10 md:w-14 md:h-14 pointer-events-none opacity-80 rotate-180 z-0">
        <img src={floralImg} alt="" crossOrigin="anonymous" className="w-full h-full object-contain mix-blend-multiply" />
      </div>

      {/* Header */}
      <div className="text-center mb-6 z-10 relative">
        <h2 className="text-lg font-bold opacity-70" style={{ color: primary }}>{invocation || "ॐ"}</h2>
        <h1 className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase mt-2 mb-1" style={{ color: primary, fontFamily: 'inherit' }}>
            {t.title}
        </h1>
        <div className="w-16 md:w-24 h-0.5 mx-auto bg-slate-300 opacity-30 mt-2" />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-1 z-10 w-full">
        
        {/* LEFT CONTENT */}
        <div className="flex-[5.5] order-2 md:order-1 flex flex-col gap-6">

          {/* PERSONAL DETAILS */}
          <Section title={t.labels.details} primary={primary}>
            <Row label={t.labels.name} value={name} />
            <Row label="Date of Birth" value={getField('3')} />
            <Row label="Place of Birth" value={getField('4')} />
            <Row label="Caste" value={getField('5')} />
            <Row label="Height" value={getField('2')} />
            <Row label="Education" value={getField('7')} />
            <Row label="Occupation" value={getField('8')} />
            <Row label="Income" value={getField('9')} />
          </Section>

          {/* FAMILY DETAILS */}
          <Section title="Family Details" primary={primary}>
            <Row label="Father's Occupation" value={getField('10')} />
            <Row label="Mother's Occupation" value={getField('11')} />
            <Row label="Siblings" value={getField('12')} />
          </Section>

          {/* CONTACT DETAILS */}
          <Section title="Contact Details" primary={primary}>
            <Row label="Address" value={getField('13')} />
            <Row label="Phone" value={getField('6')} />
          </Section>

          {/* Custom / Extra Fields */}
          {fields.filter(f => !['1','2','3','4','5','6','7','8','9','10','11','12','13'].includes(f.id)).length > 0 && (
            <Section title="Additional Details" primary={primary}>
                {fields.filter(f => !['1','2','3','4','5','6','7','8','9','10','11','12','13'].includes(f.id)).map(f => (
                    <Row key={f.id} label={f.label} value={f.value} />
                ))}
            </Section>
          )}

        </div>

        {/* RIGHT PHOTO */}
        <div className="flex-[3.5] order-1 md:order-2 text-center pt-4 md:pt-8 max-w-[200px] md:max-w-none mx-auto w-full">
            {photo ? (
                <div className="relative mx-auto w-full">
                    <div className="absolute inset-[-8px] border-2 opacity-10 rounded-2xl" style={{ borderColor: primary }} />
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
            ) : (
                <div className="w-full aspect-[4/5] rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-widest bg-slate-50 opacity-40">
                    Your Photo Here
                </div>
            )}
            
            <div className="mt-6 md:mt-8 pt-4 border-t border-slate-200/50 flex flex-col items-center opacity-30">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] mb-2">M</div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Premium Signature</span>
                <span className="text-[7px] uppercase tracking-widest mt-1">MarryBuilder © 2026</span>
            </div>
        </div>

      </div>
    </div>
  );
}

function Section({ title, children, primary }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: primary }}>
            {title}
        </h3>
        <div className="h-px w-full bg-slate-200 opacity-50" />
      </div>
      <div className="flex flex-col gap-1.5 pl-1">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline text-sm">
      <div className="w-[45%] font-black uppercase tracking-widest opacity-40 text-[9px] shrink-0">
        {label}
      </div>
      <div className="text-slate-800 font-bold tracking-tight">
        {value || "—"}
      </div>
    </div>
  );
}
