import React from 'react';
import Editor from './pages/Editor';

function App() {
    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-primary-50 via-white to-primary-100 flex flex-col relative overflow-x-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-accent-500/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Navigation */}
            <header className="sticky top-0 z-50 glass-panel mt-2 mx-2 md:mt-4 md:mx-8 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-lg cursor-pointer">
                        M
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none cursor-pointer">
                            Marry<span className="text-primary-600">Builder</span>
                        </h1>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Premium Collection</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Verified Pro</span>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-8 py-4 md:py-8 relative z-10">
                <Editor />
            </main>
        </div>
    );
}

export default App;
