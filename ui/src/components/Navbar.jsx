import { useState, useEffect } from 'react'
import {
    TrendingUp,
    BookOpen,
    Menu,
    X,
    Sparkles,
    CheckCircle2,
    SlidersHorizontal,
} from 'lucide-react'
import { useSalaryStore } from '../store/salaryStore'

function GithubIcon({ className = 'w-4 h-4' }) {
    return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    )
}

export default function Navbar({ activePage = 'predict', setActivePage }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [methodologyOpen, setMethodologyOpen] = useState(false)

    const { backendStatus, checkHealth, modelVersion } = useSalaryStore()

    useEffect(() => {
        checkHealth()
    }, [checkHealth])

    const navItems = [
        {
            key: 'predict',
            label: 'Salary Estimator',
            icon: SlidersHorizontal,
            action: () => setActivePage && setActivePage('predict'),
        },
        {
            key: 'methodology',
            label: 'Methodology & Model',
            icon: BookOpen,
            action: () => setMethodologyOpen(true),
        },
    ]

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-[#fbf9f5]/90 backdrop-blur-md transition-colors">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setActivePage && setActivePage('predict')}
                            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90 cursor-pointer"
                        >
                            {/* Handcrafted Emblem / Monogram */}
                            <div className="w-8 h-8 rounded-lg bg-green text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-[1.02]">
                                <TrendingUp className="w-4 h-4 stroke-[2.2]" />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[1.18rem] leading-none text-ink tracking-tight">
                                        Salary Predictor
                                    </span>
                                    <span className="inline-block text-[10px] font-mono font-medium uppercase tracking-wider text-muted px-1.5 py-0.5 rounded border border-border2/60 bg-cream">
                                        Ridge {modelVersion}
                                    </span>
                                </div>
                                <span className="text-[11px] font-sans text-muted tracking-normal hidden sm:block">
                                    Data & AI Compensation Intelligence
                                </span>
                            </div>
                        </button>

                        {/* Live Backend / Model Status Badge */}
                        <div className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cream border border-border text-[11px] font-medium text-ink2">
                            <span className="relative flex h-2 w-2">
                                {backendStatus === 'online' ? (
                                    <>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-40" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                                    </>
                                ) : backendStatus === 'checking' ? (
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
                                ) : (
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                )}
                            </span>
                            <span>
                                {backendStatus === 'online'
                                    ? 'Ridge Model Active'
                                    : backendStatus === 'checking'
                                    ? 'Checking Server…'
                                    : 'API Standby'}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activePage === item.key && item.key !== 'methodology'

                            return (
                                <button
                                    key={item.key}
                                    onClick={item.action}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-2 transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-green-light text-green font-semibold shadow-xs'
                                            : 'text-ink2 hover:text-ink hover:bg-cream'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5 opacity-80" />
                                    <span>{item.label}</span>
                                </button>
                            )
                        })}

                        <div className="h-4 w-px bg-border mx-2" />

                        {/* GitHub Source Link */}
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-ink2 hover:text-ink hover:bg-cream rounded-lg transition-colors cursor-pointer"
                            title="View source on GitHub"
                            aria-label="GitHub Repository"
                        >
                            <GithubIcon className="w-4 h-4" />
                        </a>

                        {/* Quick CTA */}
                        <button
                            onClick={() => {
                                setActivePage && setActivePage('predict')
                                const formEl = document.getElementById('prediction-form')
                                if (formEl) {
                                    formEl.scrollIntoView({ behavior: 'smooth' })
                                } else {
                                    window.scrollTo({ top: 380, behavior: 'smooth' })
                                }
                            }}
                            className="ml-1 inline-flex items-center gap-1.5 bg-green hover:bg-[#23533e] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Quick Estimate</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-ink2 hover:bg-cream border border-border/80 transition-colors cursor-pointer"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-[#fbf9f5] px-6 py-4 space-y-3 animate-fadeUp">
                        {/* Live Status indicator */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cream border border-border text-xs text-ink2">
                            <span className="relative flex h-2 w-2">
                                <span className={`inline-flex rounded-full h-2 w-2 ${backendStatus === 'online' ? 'bg-green' : 'bg-amber'}`} />
                            </span>
                            <span>
                                {backendStatus === 'online' ? 'Ridge Model Ready • 2,584 records' : 'FastAPI Local Server'}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = activePage === item.key && item.key !== 'methodology'

                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => {
                                            item.action()
                                            setMobileMenuOpen(false)
                                        }}
                                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                                            isActive
                                                ? 'bg-green-light text-green font-medium'
                                                : 'text-ink2 hover:bg-cream'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 opacity-80" />
                                        <span>{item.label}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-ink2 hover:text-ink px-3 py-2 rounded-lg bg-cream border border-border/80 flex-1 justify-center"
                            >
                                <GithubIcon className="w-3.5 h-3.5" />
                                <span>Source</span>
                            </a>
                            <button
                                onClick={() => {
                                    setActivePage && setActivePage('predict')
                                    setMobileMenuOpen(false)
                                    window.scrollTo({ top: 380, behavior: 'smooth' })
                                }}
                                className="flex items-center gap-2 text-xs font-medium text-white bg-green hover:bg-[#23533e] px-4 py-2 rounded-lg flex-1 justify-center shadow-xs"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Estimate</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Methodology & Data Modal */}
            {methodologyOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs animate-fadeUp">
                    <div
                        className="relative w-full max-w-lg bg-white border border-border rounded-2xl shadow-lg p-6 sm:p-7 overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between pb-4 border-b border-border">
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-green bg-green-light px-2.5 py-0.5 rounded-full mb-1.5">
                                    <Sparkles className="w-3 h-3" />
                                    Transparency & Model Specs
                                </div>
                                <h3 className="font-bold text-xl text-ink tracking-tight">
                                    Ridge Regression Model
                                </h3>
                            </div>
                            <button
                                onClick={() => setMethodologyOpen(false)}
                                className="p-1.5 text-muted hover:text-ink hover:bg-cream rounded-lg transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="py-4 space-y-4 text-xs sm:text-sm text-ink2 leading-relaxed">
                            <p>
                                Compensation figures are estimated via a cross-validated <strong>Ridge Regression (L2 penalty)</strong> model. Ridge prevents overfitting across high-dimensional categorical features such as job titles and international countries while maintaining interpretable linear coefficients.
                            </p>

                            <div className="bg-cream/70 border border-border rounded-xl p-3.5 space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-ink">
                                    <span>Algorithm Pipeline</span>
                                    <span className="font-mono text-green">RidgeCV (L2 Regularized)</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted">
                                    <span>Training Sample</span>
                                    <span className="font-mono text-ink2 font-medium">2,584 records (80/20 split)</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted">
                                    <span>Test Mean Absolute Error (MAE)</span>
                                    <span className="font-mono text-ink2 font-medium">$37,160</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted">
                                    <span>Validation R² Score</span>
                                    <span className="font-mono text-ink2 font-medium">0.455</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted">
                                    <span>Preprocessor</span>
                                    <span className="font-mono text-ink2 font-medium">OneHotEncoder + StandardScaler</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs">
                                <h4 className="font-semibold text-ink">Included Pipeline Features:</h4>
                                <ul className="grid grid-cols-2 gap-2 text-muted">
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                                        Role title & specialisation
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                                        Seniority (EN, MI, SE, EX)
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                                        Company location & Residence
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                                        Remote ratio & Company scale
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-3 border-t border-border flex items-center justify-end">
                            <button
                                onClick={() => setMethodologyOpen(false)}
                                className="px-4 py-2 bg-ink text-white hover:bg-ink2 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
