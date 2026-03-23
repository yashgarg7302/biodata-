import React from 'react';
import { translations } from '../../utils/lang';

export default function BiodataForm({ name, setName, photo, setPhoto, fields, setFields, lang = 'en' }) {
    const t = translations[lang] || translations.en;

    const updateField = (id, key, value) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const addField = () => {
        const newId = Date.now().toString();
        setFields([...fields, { id: newId, label: 'Custom Field', value: '' }]);
    };

    return (
        <div className="flex flex-col gap-4 w-full animate-fade-in-up">

            {/* Hidden Photo Upload Input */}
            <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setPhoto(imageUrl);
                    }
                }}
            />

            {/* Profile Photo Control */}
            {photo ? (
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <img src={photo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold text-slate-700">{t.labels.photo}</span>
                        <span className="text-xs text-green-600 font-medium tracking-wide">Premium Profile Image</span>
                    </div>
                    <button
                        onClick={() => setPhoto("")}
                        className="px-3 py-1.5 text-xs font-bold text-red-500 bg-red-50 rounded-lg cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => document.getElementById('photo-upload').click()}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all cursor-pointer"
                >
                    <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">Upload Profile Photo</span>
                </button>
            )}

            {/* Name */}
            <div className="flex flex-col gap-2 mb-2">
                <label className="text-sm font-semibold text-slate-700">{t.labels.name}</label>
                <input
                    type="text"
                    placeholder="Type name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-800 shadow-sm w-full bg-slate-50 text-lg font-medium transition-all"
                />
            </div>

            <div className="w-full h-px bg-slate-200 mb-2"></div>

            {fields.map((field) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center group bg-white p-2 rounded-xl border border-slate-100/50 shadow-sm transition-all">
                    <div className="flex w-full sm:w-[35%] gap-2 items-center">
                        {/* Label Input */}
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, 'label', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-transparent hover:border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 bg-slate-50/50 text-slate-600 focus:text-slate-800 text-xs font-bold transition-all shadow-none"
                        />
                    </div>
                    
                    <div className="flex w-full flex-1 gap-2 items-center">
                        {/* Value Input */}
                        <input
                            type="text"
                            placeholder={field.label}
                            value={field.value}
                            onChange={(e) => updateField(field.id, 'value', e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white text-slate-800 text-sm shadow-sm transition-all"
                        />
                        {/* Delete Button (visible on mobile, hidden on desktop until hover) */}
                        <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            className="p-2.5 text-slate-400 hover:text-red-500 rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Field Button */}
            <button
                type="button"
                onClick={addField}
                className="mt-4 w-full py-3.5 border-2 border-dashed border-primary-200 text-primary-600 font-semibold rounded-xl bg-primary-50/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                {t.labels.add_field}
            </button>
        </div>
    );
}
