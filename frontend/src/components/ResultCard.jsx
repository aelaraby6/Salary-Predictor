import { useEffect, useRef } from 'react'

function useAnimatedNumber(target, duration = 700) {
    const elRef = useRef(null)

    useEffect(() => {
        if (target === null || !elRef.current) return
        const start = performance.now()
        const from = 0

        function update(now) {
            const t = Math.min((now - start) / duration, 1)
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            if (elRef.current) elRef.current.textContent = Math.round(from + (target - from) * ease)
            if (t < 1) requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
    }, [target, duration])

    return elRef
}

const REM_LABEL = { 0: 'On-site', 50: 'Hybrid', 100: 'Remote' }
const SIZE_LABEL = { S: 'Small Co.', M: 'Mid-size', L: 'Large Co.' }

export default function ResultCard({ result }) {
    const numRef = useAnimatedNumber(result?.salary ?? null)

    if (!result) {
        return (
            <div className="bg-white border border-border rounded-2xl p-7 shadow-md relative overflow-hidden animate-fadeUp">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green to-[#52b788]" />
                <div className="text-center py-8">
                    <div className="w-[52px] h-[52px] bg-cream rounded-[14px] flex items-center justify-center mx-auto mb-[14px] text-[1.4rem]">
                        💼
                    </div>
                    <p className="text-muted text-sm font-light">
                        Fill in your profile and<br />
                        hit <strong className="font-semibold">Calculate</strong> to see your<br />
                        predicted salary.
                    </p>
                </div>
            </div>
        )
    }

    const chips = [result.job, result.exp, SIZE_LABEL[result.size], REM_LABEL[result.remote], result.loc]

    return (
        <div className="bg-white border border-border rounded-2xl p-7 shadow-md relative overflow-hidden animate-popIn">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green to-[#52b788]" />

            <p className="text-[0.75rem] font-semibold tracking-[0.8px] uppercase text-muted mb-2">
                Estimated Annual Salary
            </p>

            <div className="font-serif text-[3rem] tracking-[-2px] text-green leading-none mb-1">
                <span className="text-[1.4rem] tracking-normal text-muted">$</span>
                <span ref={numRef}>0</span>
                <span className="text-[1.4rem] tracking-normal text-muted">k</span>
            </div>

            <p className="text-[0.8rem] text-muted mb-5 font-light">
                Range: ${result.low}k – ${result.high}k / year
            </p>

            <div className="flex flex-wrap gap-[6px] pt-4 border-t border-border">
                {chips.map((t) => (
                    <span
                        key={t}
                        className="bg-cream border border-border text-ink2 text-[0.75rem] font-medium px-[10px] py-1 rounded-full"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}