import { useState } from 'react'
import {
    Sparkles,
    RotateCcw,
    ArrowRight,
    TrendingUp,
    History,
    Check
} from 'lucide-react'
import { useSalaryStore, PRESETS } from '../store/salaryStore'
import ResultCard from '../components/ResultCard'
import StatsRow from '../components/StatsRow'

const REM_LABELS = {
    0: '0% — Strict On-site',
    50: '50% — Hybrid Flexibility',
    100: '100% — Fully Remote',
}

const JOB_OPTIONS = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Data Engineer',
    'Data Analyst',
    'Analytics Engineer',
    'Data Architect',
    'Research Scientist',
    'Applied Scientist',
    'Data Science Manager',
    'Research Engineer',
]

const COUNTRY_OPTIONS = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'DE', name: 'Germany' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'IN', name: 'India' },
    { code: 'AU', name: 'Australia' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BR', name: 'Brazil' },
    { code: 'SG', name: 'Singapore' },
    { code: 'JP', name: 'Japan' },
]

function Field({ label, tooltip, className = '', children }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="text-[0.8rem] font-semibold text-ink2 tracking-[0.2px]">
                    {label}
                </label>
                {tooltip && <span className="text-[10px] text-muted">{tooltip}</span>}
            </div>
            {children}
        </div>
    )
}

const inputCls =
    'bg-[#faf8f4] border border-border rounded-xl px-3.5 py-2.5 text-[0.875rem] font-sans text-ink ' +
    'focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 focus:bg-white transition-all cursor-pointer shadow-2xs'

export default function PredictPage() {
    const {
        form,
        setFormField,
        predictSalary,
        loading,
        applyPreset,
        resetForm,
        history,
    } = useSalaryStore()

    const [activePresetIndex, setActivePresetIndex] = useState(null)

    const handlePresetClick = (preset, idx) => {
        applyPreset(preset.values)
        setActivePresetIndex(idx)
        setTimeout(() => setActivePresetIndex(null), 1500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        predictSalary()
    }

    return (
        <main className="max-w-[1100px] mx-auto px-6 sm:px-10 pt-10 pb-20">
            {/* Editorial Hero Header */}
            <section className="mb-10 animate-fadeUp">
                <div className="inline-flex items-center gap-2 bg-green-light border border-green-mid/40 text-green text-[0.75rem] font-medium tracking-wide uppercase px-3 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-green rounded-full" />
                    <span>RidgeCV Regularized Calibration</span>
                </div>

                <h1 className="font-extrabold text-[2.35rem] sm:text-[3.25rem] leading-[1.12] tracking-[-1.5px] text-ink max-w-[720px] mb-4">
                    Know your <span className="text-green underline decoration-green/30 decoration-wavy underline-offset-6">fair market value</span> before negotiations.
                </h1>

                <p className="text-muted text-sm sm:text-base max-w-[540px] font-normal leading-relaxed mb-6">
                    Real-world salary intelligence calibrated across 2,580+ international tech compensation records using cross-validated Ridge linear regression.
                </p>

                {/* Quick Presets Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-muted font-medium mr-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-green" />
                        Quick Test Profiles:
                    </span>
                    {PRESETS.map((preset, idx) => (
                        <button
                            key={preset.label}
                            onClick={() => handlePresetClick(preset, idx)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                                activePresetIndex === idx
                                    ? 'bg-green text-white border-green shadow-xs'
                                    : 'bg-white hover:bg-cream border-border text-ink2 hover:border-border2'
                            }`}
                        >
                            {activePresetIndex === idx ? <Check className="w-3 h-3" /> : null}
                            <span>{preset.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_410px] gap-8 items-start">
                {/* Form Card */}
                <section
                    id="prediction-form"
                    className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md animate-fadeUp"
                >
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                        <div>
                            <h2 className="font-bold text-xl text-ink tracking-tight">
                                Profile Parameters
                            </h2>
                            <p className="text-xs text-muted mt-0.5">
                                Select accurate position details to minimize predictive variance.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink px-2.5 py-1.5 rounded-lg hover:bg-cream transition-colors cursor-pointer"
                            title="Reset all fields"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Job Title */}
                            <Field label="Job Specialization">
                                <select
                                    className={inputCls}
                                    value={form.job_title}
                                    onChange={(e) => setFormField('job_title', e.target.value)}
                                >
                                    {JOB_OPTIONS.map((title) => (
                                        <option key={title} value={title}>
                                            {title}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            {/* Experience Level */}
                            <Field label="Experience / Seniority">
                                <select
                                    className={inputCls}
                                    value={form.experience_level}
                                    onChange={(e) => setFormField('experience_level', e.target.value)}
                                >
                                    <option value="EN">Entry-Level (EN)</option>
                                    <option value="MI">Mid-Level (MI)</option>
                                    <option value="SE">Senior-Level (SE)</option>
                                    <option value="EX">Executive / Principal (EX)</option>
                                </select>
                            </Field>

                            {/* Employment Type */}
                            <Field label="Employment Basis">
                                <select
                                    className={inputCls}
                                    value={form.employment_type}
                                    onChange={(e) => setFormField('employment_type', e.target.value)}
                                >
                                    <option value="FT">Full-Time (FT)</option>
                                    <option value="PT">Part-Time (PT)</option>
                                    <option value="CT">Contractor (CT)</option>
                                    <option value="FL">Freelance (FL)</option>
                                </select>
                            </Field>

                            {/* Company Scale */}
                            <Field label="Company Scale">
                                <select
                                    className={inputCls}
                                    value={form.company_size}
                                    onChange={(e) => setFormField('company_size', e.target.value)}
                                >
                                    <option value="S">Small (&lt; 50 employees)</option>
                                    <option value="M">Medium (50–250 employees)</option>
                                    <option value="L">Enterprise (&gt; 250 employees)</option>
                                </select>
                            </Field>

                            {/* Company Location */}
                            <Field label="Company Location (HQ)">
                                <select
                                    className={inputCls}
                                    value={form.company_location}
                                    onChange={(e) => setFormField('company_location', e.target.value)}
                                >
                                    {COUNTRY_OPTIONS.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.name} ({c.code})
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            {/* Benchmark Reference Year */}
                            <Field label="Benchmark Year">
                                <select
                                    className={inputCls}
                                    value={form.work_year}
                                    onChange={(e) => setFormField('work_year', e.target.value)}
                                >
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                </select>
                            </Field>
                        </div>

                        {/* Cross-Border Residence Toggle */}
                        <div className="p-3.5 bg-cream/50 border border-border/80 rounded-xl space-y-3">
                            <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={form.same_residence}
                                    onChange={(e) => setFormField('same_residence', e.target.checked)}
                                    className="rounded border-border text-green focus:ring-green/30 w-4 h-4 cursor-pointer"
                                />
                                <span>Employee resides in the same country as company headquarters</span>
                            </label>

                            {!form.same_residence && (
                                <div className="pt-2 border-t border-border/70 animate-fadeUp">
                                    <Field label="Employee Country of Residence" tooltip="Required by model">
                                        <select
                                            className={inputCls}
                                            value={form.employee_residence}
                                            onChange={(e) => setFormField('employee_residence', e.target.value)}
                                        >
                                            {COUNTRY_OPTIONS.map((c) => (
                                                <option key={c.code} value={c.code}>
                                                    {c.name} ({c.code})
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>
                            )}
                        </div>

                        {/* Remote Arrangement Range Slider */}
                        <Field label="Work Arrangement / Remote Policy">
                            <div className="bg-cream/40 border border-border/70 rounded-xl p-4 flex flex-col gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="50"
                                    value={form.remote_ratio}
                                    onChange={(e) => setFormField('remote_ratio', parseInt(e.target.value))}
                                    className="w-full cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-muted">
                                    <span>On-site (0%)</span>
                                    <span>Hybrid (50%)</span>
                                    <span>Remote (100%)</span>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-xs text-muted">Selected Policy:</span>
                                    <span className="bg-green-light border border-green-mid/50 text-green font-semibold text-xs px-2.5 py-0.5 rounded-full">
                                        {REM_LABELS[form.remote_ratio]}
                                    </span>
                                </div>
                            </div>
                        </Field>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-ink hover:bg-ink2 text-white border-none rounded-xl font-sans text-sm font-semibold cursor-pointer
                            flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Evaluating Linear Regression Coefficients…</span>
                                </>
                            ) : (
                                <>
                                    <span>Calculate Compensation</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </section>

                {/* Right Column: Results & Benchmark Insights */}
                <aside className="space-y-6">
                    {/* Result Card */}
                    <ResultCard />

                    {/* Best Performing Model Badge */}
                    <div className="bg-amber-light border border-[#e8d5b0] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
                        <div className="w-9 h-9 bg-amber text-white rounded-lg flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                            <div className="text-[10px] font-semibold tracking-wider uppercase text-amber mb-0.5">
                                Deployed Production Model
                            </div>
                            <div className="text-xs font-semibold text-ink">
                                Ridge Regression (RidgeCV) — R² 0.455
                            </div>
                            <div className="text-[11px] text-muted">
                                L2 penalty prevents multi-collinearity overfit
                            </div>
                        </div>
                    </div>

                    {/* Statistics Row */}
                    <StatsRow />

                    {/* Session Comparison History (Zustand) */}
                    {history.length > 1 && (
                        <div className="bg-white border border-border rounded-xl p-4 shadow-2xs animate-fadeUp">
                            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border text-xs">
                                <span className="font-semibold text-ink flex items-center gap-1.5">
                                    <History className="w-3.5 h-3.5 text-muted" />
                                    Comparison Benchmarks ({history.length})
                                </span>
                                <span className="text-[10px] text-muted font-mono">This Session</span>
                            </div>

                            <div className="space-y-2 text-xs">
                                {history.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-2 rounded-lg bg-cream/40 border border-border/60 hover:bg-cream transition-colors"
                                    >
                                        <div className="truncate mr-2">
                                            <div className="font-medium text-ink truncate">{item.job}</div>
                                            <div className="text-[10px] text-muted">{item.exp} • {item.loc} • {REM_LABELS[item.remote]?.split(' ')[0]}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="font-bold text-green text-sm">
                                                ${item.salary.toLocaleString()}
                                            </div>
                                            <div className="text-[9px] text-muted">±${item.typicalError.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    )
}
