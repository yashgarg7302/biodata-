import { useState, useRef, useEffect } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import BiodataForm from "../components/form/BiodataForm";
import TemplateRenderer from "../templates/TemplateRenderer";
import { translations } from "../utils/lang";

export default function Editor() {
    const [template, setTemplate] = useState("bloom");
    const [lang, setLang] = useState("en");
    const [invocation, setInvocation] = useState(translations.en.invocation);
    const [theme, setTheme] = useState({
        primary: "#4a6c8c",
        background: "#f0f9ff"
    });
    const [font, setFont] = useState("quartz");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const previewRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [hasPaid, setHasPaid] = useState(false);

    const t = translations[lang] || translations.en;

    // Standard fields mapping to allow cross-language updates
    const standardFieldsKeys = {
        '1': 'age',
        '2': 'height',
        '3': 'date_of_birth',
        '4': 'place_of_birth',
        '5': 'caste',
        '6': 'phone',
        '7': 'education',
        '8': 'occupation',
        '9': 'income',
        '10': "father's_occupation",
        '11': "mother's_occupation",
        '12': 'siblings',
        '13': 'address'
    };

    const [fields, setFields] = useState([
        { id: '1', label: 'Age', value: '' },
        { id: '2', label: 'Height', value: '' },
        { id: '3', label: 'Date of Birth', value: '' },
        { id: '4', label: 'Place of Birth', value: '' },
        { id: '5', label: 'Caste', value: '' },
        { id: '6', label: 'Phone', value: '' },
        { id: '7', label: 'Education', value: '' },
        { id: '8', label: 'Occupation', value: '' },
        { id: '9', label: 'Income', value: '' },
        { id: '10', label: "Father's Occupation", value: '' },
        { id: '11', label: "Mother's Occupation", value: '' },
        { id: '12', label: 'Siblings', value: '' },
        { id: '13', label: 'Address', value: '' }
    ]);

    // 🔥 Sync form labels AND invocation when language changes
    useEffect(() => {
        setInvocation(t.invocation);
        setFields(prev => prev.map(field => {
            const key = standardFieldsKeys[field.id];
            if (key && t.labels[key]) {
                return { ...field, label: t.labels[key] };
            }
            return field;
        }));
    }, [lang]);

    // Identify if the current template is free
    const isFreeTemplate = template === 'aangan';

    const handleDownload = async () => {
        // 🔥 PAYMENT CHECK: If it's a premium template and users haven't paid, show payment modal
        if (!isFreeTemplate && !hasPaid) {
            setShowPayment(true);
            return;
        }

        setIsDownloading(true);
        try {
            // 🔥 FILE SIZE OPTIMIZATION: JPEG + Lower pixelRatio = Smallest PDF
            const dataUrl = await toJpeg(previewRef.current, {
                quality: 0.7, // Balances text clarity and compression
                pixelRatio: 1.5, // 1.5x is the sweet spot for A4 clarity vs size
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true, // Enable internal PDF compression
            });

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Using JPEG with 'FAST' compression for smallest size
            pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            pdf.save(`${name || "biodata"}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full animate-fade-in-up">
            {/* LEFT - FORM */}
            <div className="w-full lg:w-[45%] flex flex-col">
                <div className="glass-panel p-4 md:p-6 shadow-md border-t-4 border-t-primary-500 rounded-2xl flex-1 lg:sticky lg:top-24 lg:max-h-[85vh] overflow-y-auto">
                    {/* Language Selector */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Language</h3>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { id: 'en', label: 'English' },
                                { id: 'hi', label: 'Hindi' },
                                { id: 'ta', label: 'Tamil' },
                                { id: 'mr', label: 'Marathi' },
                                { id: 'ml', label: 'Malayalam' },
                                { id: 'bh', label: 'Bhojpuri' },
                                { id: 'pa', label: 'Punjabi' },
                                { id: 'ur', label: 'Urdu' },
                                { id: 'te', label: 'Telugu' },
                                { id: 'kn', label: 'Kannada' }
                            ].map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => setLang(l.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${lang === l.id ? 'bg-primary-500 text-white border-primary-500 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Invocation / Header */}
                    <div className="mb-6 flex flex-col gap-2">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Greeting / Header</h3>
                        <input
                            type="text"
                            placeholder="e.g. || Shree Ganeshay Namah ||"
                            value={invocation}
                            onChange={(e) => setInvocation(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-slate-50 font-medium transition-all"
                        />
                    </div>

                    {/* Template Selector */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Templates</h3>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { id: 'bloom', label: 'Bloom', primary: "#4a6c8c", bg: "#f0f9ff", highlight: 'bg-sky-50 border-sky-300 text-sky-700' },
                                { id: 'classic', label: 'Classic', primary: "#d63384", bg: "#fdf2f8", highlight: 'bg-pink-50 border-pink-300 text-pink-700' },
                                { id: 'royal', label: 'Royal', primary: "#b45309", bg: "#fffbeb", highlight: 'bg-amber-50 border-amber-300 text-amber-900' },
                                { id: 'modern', label: 'Modern', primary: "#059669", bg: "#f8fafc", highlight: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
                                { id: 'sanskriti', label: 'Sanskriti', primary: "#8b4513", bg: "#fff8f0", highlight: 'bg-orange-50 border-orange-200 text-orange-900' },
                                { id: 'vedika', label: 'Vedika', primary: "#334155", bg: "#ffffff", highlight: 'bg-slate-50 border-slate-200 text-slate-800' },
                                { id: 'utsav', label: 'Utsav', primary: "#ff7043", bg: "#ffffff", highlight: 'bg-orange-50 border-orange-300 text-orange-600' },
                                { id: 'shagun', label: 'Shagun', primary: "#ef4444", bg: "#fef6e4", highlight: 'bg-red-50 border-red-200 text-red-700' },
                                { id: 'aangan', label: 'Aangan', primary: "#4a6c8c", bg: "#f9f9f9", highlight: 'bg-slate-50 border-slate-200 text-slate-600', isFree: true },
                                { id: 'vedika', label: 'Nikah', primary: "#047857", bg: "#f0fdf4", highlight: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
                                { id: 'shagun', label: 'Vivah', primary: "#991b1b", bg: "#fff1f2", highlight: 'bg-red-50 border-red-300 text-red-900' },
                                { id: 'mangal', label: 'Mangal', primary: "#854d0e", bg: "#fefce8", highlight: 'bg-amber-50 border-amber-300 text-amber-900' }
                            ].map((btn) => {
                                const isSelected = template === btn.id && theme.primary.toLowerCase() === btn.primary.toLowerCase();
                                return (
                                    <button
                                        key={btn.label}
                                        onClick={() => {
                                            setTemplate(btn.id);
                                            setTheme({ primary: btn.primary, background: btn.bg });
                                        }}
                                        className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer relative ${isSelected ? btn.highlight + ' shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {btn.label}
                                        {btn.isFree && <span className="absolute -top-1 -right-1 px-1 bg-green-500 text-white text-[8px] rounded-full">FREE</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.labels.details}</h2>
                    <BiodataForm
                        name={name} setName={setName}
                        photo={photo} setPhoto={setPhoto}
                        fields={fields} setFields={setFields}
                        lang={lang}
                    />
                </div>
            </div>

            {/* RIGHT - PREVIEW */}
            <div className="w-full lg:w-[55%] flex flex-col gap-4">
                {/* Theme Selector UI */}
                <div className="glass-panel p-4 shadow-sm border border-slate-200 rounded-xl flex items-center gap-4 bg-white/60">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-2">Themes</h3>
                    <div className="flex gap-3 flex-wrap">
                        {/* Themes map... omitted for brevity or I'll just include it. Including for correctness. */}
                        {[
                            { name: 'Sky Blue', primary: "#4a6c8c", background: "#f0f9ff" },
                            { name: 'Classic Pink', primary: "#d63384", background: "#fdf2f8" },
                            { name: 'Emerald Green', primary: "#198754", background: "#f0fdf4" },
                            { name: 'Royal Amber', primary: "#b45309", background: "#fffbeb" },
                            { name: 'Luxury Violet', primary: "#7c3aed", background: "#f5f3ff" },
                            { name: 'Deep Teal', primary: "#0d9488", background: "#f0fdfa" },
                            { name: 'Rich Burgundy', primary: "#991b1b", background: "#fef2f2" },
                            { name: 'Modern Slate', primary: "#334155", background: "#f8fafc" },
                            { name: 'Sunset Orange', primary: "#f97316", background: "#fff7ed" },
                            { name: 'Indigo Night', primary: "#4f46e5", background: "#eef2ff" },
                            { name: 'Golden Sand', primary: "#ca8a04", background: "#fefce8" },
                            { name: 'Rose Petal', primary: "#e11d48", background: "#fff1f2" }
                        ].map((th) => (
                            <div
                                key={th.name}
                                onClick={() => setTheme({ primary: th.primary, background: th.background })}
                                className={`w-8 h-8 rounded-full cursor-pointer shadow-sm border-2 transition-all hover:scale-110 active:scale-95 ${theme.primary === th.primary ? "border-slate-800 ring-2 ring-primary-50 ring-offset-1 scale-110" : "border-white"}`}
                                style={{ background: th.primary }}
                                title={th.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Font Selector UI */}
                <div className="glass-panel p-4 shadow-sm border border-slate-200 rounded-xl flex items-center gap-4 bg-white/60">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-2 w-16">Fonts</h3>
                    <div className="flex gap-2 flex-wrap flex-1">
                        {["quartz", "luxe", "quill", "prism", "vertex", "swift", "kalam"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFont(f)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all border cursor-pointer ${font === f ? "bg-slate-800 text-white border-slate-800 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-2 shadow-lg bg-slate-100/50 rounded-2xl flex-1 border border-slate-200 min-h-[600px] flex flex-col relative">
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 md:gap-3">
                        <span className="px-3 py-1 bg-white/80 shadow text-[10px] md:text-xs font-semibold text-slate-500 rounded-full border border-slate-200">
                            Professional Canvas
                        </span>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`px-4 py-1.5 text-xs md:text-sm font-bold text-white rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer ${isDownloading ? 'bg-slate-400 opacity-50' : 'bg-slate-900 shadow-xl'}`}
                        >
                            {isDownloading ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin h-3 w-3 border-2 border-white/30 border-t-white rounded-full" />
                                    ...
                                </span>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    <span>{isFreeTemplate ? 'Download PDF' : 'Download Premium'}</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="w-full mt-16 p-2 flex-1 h-0 overflow-y-auto">
                        <div
                            ref={previewRef}
                            className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mx-auto"
                            style={{ aspectRatio: '1 / 1.414', maxWidth: '650px' }}
                        >
                            <TemplateRenderer
                                data={{ name, fields, photo }}
                                template={template}
                                theme={theme}
                                font={font}
                                lang={lang}
                                invocation={invocation}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* PAYMENT MODAL */}
            {showPayment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-scale-in">
                        <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)', backgroundSize: '40px 40px' }} />
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white italic tracking-tighter mb-1">Premium Unlock</h3>
                            <p className="text-white/70 text-sm font-medium">Elevate your biodata today</p>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <div>
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Price</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-slate-800 tracking-tighter">₹49</span>
                                        <span className="text-sm font-bold text-slate-400">/one-time</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-full border border-amber-200 shadow-sm">
                                        BEST VALUE
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    { icon: 'M5 13l4 4L19 7', text: 'Ultra-High HD Resolution (300 DPI)' },
                                    { icon: 'M5 13l4 4L19 7', text: 'No Brand Watermark' },
                                    { icon: 'M5 13l4 4L19 7', text: 'Premium Colors & Gold Patterns' },
                                    { icon: 'M5 13l4 4L19 7', text: 'Lifetime access to this template' }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                                        <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={item.icon} /></svg>
                                        </div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setIsDownloading(true);
                                        setTimeout(() => {
                                            setHasPaid(true);
                                            setShowPayment(false);
                                            setIsDownloading(false);
                                            // Programmatically trigger download after payment
                                            alert("Payment successful! Unlocking premium template...");
                                            handleDownload();
                                        }, 1500);
                                    }}
                                    disabled={isDownloading}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isDownloading ? 'Processing...' : 'Unlock Premium Now'}
                                </button>
                                <button
                                    onClick={() => setShowPayment(false)}
                                    className="w-full py-2 text-slate-400 text-sm font-bold hover:text-slate-600"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
