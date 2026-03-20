import { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
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

    const t = translations[lang] || translations.en;

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

    // 🔥 Sync form labels when language changes
    useEffect(() => {
        setFields(prev => prev.map(field => {
            const key = standardFieldsKeys[field.id];
            if (key && t.labels[key]) {
                return { ...field, label: t.labels[key] };
            }
            return field;
        }));
    }, [lang]);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // 🔥 PERFORMANCE TIP: Client-side PDF generation is 10x faster
            const dataUrl = await toPng(previewRef.current, {
                quality: 1.0,
                pixelRatio: 3, // UHD density for professional printing
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${name || "biodata"}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };
    // End of state declarations


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
                            <button
                                onClick={() => {
                                    setTemplate("bloom");
                                    setTheme({ primary: "#4a6c8c", background: "#f0f9ff" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'bloom' ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Bloom
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("classic");
                                    setTheme({ primary: "#d63384", background: "#fdf2f8" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'classic' ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Classic
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("royal");
                                    setTheme({ primary: "#b45309", background: "#fffbeb" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'royal' ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Royal
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("modern");
                                    setTheme({ primary: "#059669", background: "#f8fafc" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'modern' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Modern
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("sanskriti");
                                    setTheme({ primary: "#8b4513", background: "#fff8f0" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'sanskriti' ? 'bg-orange-50 border-orange-200 text-orange-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Sanskriti
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("vedika");
                                    setTheme({ primary: "#334155", background: "#ffffff" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'vedika' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Vedika
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("utsav");
                                    setTheme({ primary: "#ff7043", background: "#ffffff" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'utsav' ? 'bg-orange-50 border-orange-300 text-orange-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Utsav
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("shagun");
                                    setTheme({ primary: "#ef4444", background: "#fef6e4" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'shagun' ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Shagun
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("aangan");
                                    setTheme({ primary: "#4a6c8c", background: "#f9f9f9" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'aangan' ? 'bg-slate-50 border-slate-200 text-slate-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Aangan
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("vedika");
                                    setTheme({ primary: "#047857", background: "#f0fdf4" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'vedika' && theme.primary === "#047857" ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Nikah
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("shagun");
                                    setTheme({ primary: "#991b1b", background: "#fff1f2" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'shagun' && theme.primary === "#991b1b" ? 'bg-red-50 border-red-300 text-red-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Vivah
                            </button>
                            <button
                                onClick={() => {
                                    setTemplate("royal");
                                    setTheme({ primary: "#854d0e", background: "#fefce8" });
                                }}
                                className={`flex-1 min-w-[30%] py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${template === 'royal' && theme.primary === "#854d0e" ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                Mangal
                            </button>
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
                        ].map((t) => (
                            <div
                                key={t.name}
                                onClick={() => setTheme({ primary: t.primary, background: t.background })}
                                className={`w-8 h-8 rounded-full cursor-pointer shadow-sm border-2 transition-all hover:scale-110 active:scale-95 ${theme.primary === t.primary ? "border-slate-800 ring-2 ring-primary-50 ring-offset-1 scale-110" : "border-white"}`}
                                style={{ background: t.primary }}
                                title={t.name}
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
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all border ${font === f ? "bg-slate-800 text-white border-slate-800 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-2 shadow-lg bg-slate-100/50 rounded-2xl flex-1 border border-slate-200 min-h-[600px] flex flex-col relative">
                    {/* Label positioned absolutely */}
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
                                    <span>Premium PDF</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* A4 preview: width drives height via aspect ratio 1:1.414 */}
                    <div className="w-full mt-16 p-2 flex-1 h-0 overflow-y-auto">
                        <div
                            ref={previewRef}
                            className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mx-auto"
                            style={{ aspectRatio: '1 / 1.414', maxWidth: '650px' }}  /* exact A4 ratio with width cap */
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
        </div>
    );
}
