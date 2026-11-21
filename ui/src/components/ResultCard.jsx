import { useEffect, useRef, useState } from 'react'
import {
    DollarSign,
    Check,
    Copy,
    Building2,
    Briefcase,
    MapPin,
    Sparkles,
    ShieldAlert
} from 'lucide-react'
import { useSalaryStore } from '../store/salaryStore'

function useAnimatedNumber(target, duration = 650) {
    const elRef = useRef(null)

    useEffect(() => {
        if (target === null || !elRef.current) return
        const start = performance.now()
        const from = 0

        function update(now) {
            const t = Math.min((now - start) / duration, 1)
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            if (elRef.current) {
                const currentVal = Math.round(from + (target - from) * ease)
                elRef.current.textContent = '$' + currentVal.toLocaleString()
            }
            if (t < 1) requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
    }, [target, duration])

    return elRef
}

const REM_LABELS = { 0: 'On-site', 50: 'Hybrid', 100: '100% Remote' }
const SIZE_LABELS = { S: 'Small Team (<50)', M: 'Mid Scale (50–250)', L: 'Enterprise (>250)' }
const EXP_LABELS = { EN: 'Entry-Level', MI: 'Mid-Level', SE: 'Senior Level', EX: 'Executive / Director' }

export default function ResultCard() {
    const { result, error } = useSalaryStore()
    const [copied, setCopied] = useState(false)
    const numRef = useAnimatedNumber(result?.salary ?? null)

    const handleCopy = () => {
        if (!result) return
        const text = `Salary Estimate for ${result.job} (${result.exp}): $${result.salary.toLocaleString()} USD/yr [Confidence: $${result.low.toLocaleString()} - $${result.high.toLocaleString()}] via Salary Predictor (Ridge Model).`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
    }

    if (error) {
        return (
            <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-md relative overflow-hidden animate-fadeUp">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 text-red-700 rounded-lg shrink-0">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-900 text-sm">Prediction Notice</h4>
                        <p className="text-red-700/90 text-xs mt-1 leading-relaxed">{error}</p>
                        <p className="text-muted text-[11px] mt-2">
                            Tip: Ensure FastAPI server is running on <code className="bg-cream px-1 py-0.5 rounded border border-border">http://127.0.0.1:8000</code>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="bg-white border border-border rounded-2xl p-7 shadow-sm relative overflow-hidden animate-fadeUp">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green/60 via-green to-green-mid" />
                <div className="text-center py-6">
                    <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mx-auto mb-3.5 text-green border border-border/80">
                        <DollarSign className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="font-bold text-lg text-ink mb-1">Awaiting Profile Parameters</h3>
                    <p className="text-muted text-xs font-normal max-w-[270px] mx-auto leading-relaxed">
                        Configure your role, seniority, and location on the left, then click <strong className="font-semibold text-ink2">Calculate Salary</strong>.
                    </p>

                    <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-center gap-2 text-[11px] text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
                        <span>Powered by Ridge Regularized Regression</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden animate-popIn">
            {/* Top Brand Accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-green" />

            {/* Header & Copy Button */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-green bg-green-light px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Market Estimate (Annual)
                </div>

                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors px-2 py-1 rounded-md hover:bg-cream cursor-pointer"
                    title="Copy breakdown to clipboard"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green" />
                            <span className="text-green font-medium">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Main Number */}
            <div className="my-5 text-center sm:text-left">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
                    Predicted Base Compensation (USD)
                </div>
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <span
                        ref={numRef}
                        className="font-extrabold text-[2.5rem] sm:text-[3.1rem] leading-none text-ink tracking-tight"
                    >
                        ${result.salary.toLocaleString()}
                    </span>
                    <span className="text-sm font-sans font-medium text-muted">/ year</span>
                </div>
            </div>

            {/* Confidence Interval (MAE Range) */}
            <div className="bg-cream/70 border border-border rounded-xl p-3.5 mb-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink2">Statistical Confidence Interval</span>
                    <span className="font-mono text-xs text-muted">MAE: ±${result.typicalError.toLocaleString()}</span>
                </div>

                {/* Progress bar visual */}
                <div className="relative h-2 bg-border/60 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 bg-green/80 rounded-full"
                        style={{ left: '20%', width: '60%' }}
                    />
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>Lower: <strong className="text-ink font-medium">${result.low.toLocaleString()}</strong></span>
                    <span>Median Point</span>
                    <span>Upper: <strong className="text-ink font-medium">${result.high.toLocaleString()}</strong></span>
                </div>
            </div>

            {/* Evaluated Parameters Tags */}
            <div className="space-y-2 text-xs">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">Profile Snapshot</div>
                <div className="grid grid-cols-2 gap-2 text-ink2">
                    <div className="flex items-center gap-2 p-2 bg-cream/40 rounded-lg border border-border/60">
                        <Briefcase className="w-3.5 h-3.5 text-muted shrink-0" />
                        <span className="truncate">{result.job}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-cream/40 rounded-lg border border-border/60">
                        <span className="w-2 h-2 rounded-full bg-green shrink-0" />
                        <span className="truncate">{EXP_LABELS[result.exp] || result.exp}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-cream/40 rounded-lg border border-border/60">
                        <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                        <span className="truncate">{result.loc} • {REM_LABELS[result.remote]}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-cream/40 rounded-lg border border-border/60">
                        <Building2 className="w-3.5 h-3.5 text-muted shrink-0" />
                        <span className="truncate">{SIZE_LABELS[result.size] || result.size}</span>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-5 pt-3.5 border-t border-border/80 flex items-center justify-between text-[11px] text-muted">
                <span>Model: RidgeCV (v{result.modelVersion})</span>
                <span>Calculated at {result.timestamp}</span>
            </div>
        </div>
    )
}
