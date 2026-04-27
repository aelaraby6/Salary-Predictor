const STATS = [
    { val: '10.4k', label: 'Samples' },
    { val: '5', label: 'Models' },
    { val: '84.7%', label: 'Accuracy' },
]

export default function StatsRow() {
    return (
        <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {STATS.map(({ val, label }) => (
                <div key={label} className="bg-white p-4 text-center">
                    <div className="font-serif text-[1.4rem] text-ink tracking-[-0.5px] leading-none mb-1">
                        {val}
                    </div>
                    <div className="text-[0.7rem] font-semibold tracking-[0.5px] uppercase text-muted">
                        {label}
                    </div>
                </div>
            ))}
        </div>
    )
}