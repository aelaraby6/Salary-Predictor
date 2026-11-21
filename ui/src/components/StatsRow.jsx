import { useSalaryStore } from '../store/salaryStore'

export default function StatsRow() {
    const { modelVersion } = useSalaryStore()

    const STATS = [
        { val: '2,584', label: 'Trained Records', sub: 'Verified Tech Roles' },
        { val: 'RidgeCV', label: 'Estimator', sub: 'L2 Regularized' },
        { val: '±$37.2k', label: 'Avg MAE Error', sub: 'Validation Benchmark' },
    ]

    return (
        <div className="border border-border rounded-xl bg-white overflow-hidden shadow-xs">
            <div className="px-4 py-2.5 bg-cream/60 border-b border-border flex items-center justify-between text-[11px]">
                <span className="font-semibold text-ink2 uppercase tracking-wider">Model Validation Metrics</span>
                <span className="font-mono text-muted">{modelVersion.toUpperCase()} • R² 0.455</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
                {STATS.map(({ val, label, sub }) => (
                    <div key={label} className="p-3.5 text-center transition-colors hover:bg-cream/30">
                        <div className="font-bold text-[1.25rem] text-ink tracking-tight leading-none mb-1">
                            {val}
                        </div>
                        <div className="text-[10px] font-semibold tracking-wider uppercase text-ink2 mb-0.5">
                            {label}
                        </div>
                        <div className="text-[10px] text-muted hidden sm:block">
                            {sub}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
