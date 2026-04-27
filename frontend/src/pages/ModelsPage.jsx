import { useEffect, useRef } from 'react'

const MODELS = [
    {
        name: 'Ridge Regression',
        desc: 'L2 regularization — handles multicollinearity well.',
        r2: 0.847, mae: '$18.2k', rmse: '$26.1k',
        best: true,
        barW: '84.7%',
    },
    {
        name: 'Lasso Regression',
        desc: 'L1 regularization — automatic feature selection.',
        r2: 0.831, mae: '$19.7k', rmse: '$27.8k',
        barW: '83.1%',
    },
    {
        name: 'ElasticNet',
        desc: 'Mix of L1 + L2 — balanced regularization.',
        r2: 0.819, mae: '$21.3k', rmse: '$29.2k',
        barW: '81.9%',
    },
    {
        name: 'Linear Regression',
        desc: 'Baseline model — no regularization applied.',
        r2: 0.804, mae: '$22.6k', rmse: '$31.4k',
        barW: '80.4%',
    },
    {
        name: 'Polynomial Regression',
        desc: 'Degree 2 — captures non-linear relationships.',
        r2: 0.788, mae: '$24.1k', rmse: '$33.7k',
        barW: '78.8%',
    },
]

function ModelCard({ model }) {
    const { name, desc, r2, mae, rmse, best } = model

    return (
        <div
            className={`bg-white border-[1.5px] rounded-[14px] p-6 relative transition-all hover:shadow-md
        ${best
                    ? 'border-green-mid bg-gradient-to-br from-white via-white to-green-light'
                    : 'border-border hover:border-border2'
                }`}
        >
            {best && (
                <span className="absolute top-4 right-4 bg-green text-white text-[0.65rem] font-bold tracking-[0.8px] uppercase px-[9px] py-[3px] rounded-full">
                    ✦ Best
                </span>
            )}

            <h3 className="font-serif text-[1.15rem] tracking-[-0.3px] mb-1">{name}</h3>
            <p className="text-[0.8rem] text-muted font-light mb-5">{desc}</p>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { val: r2, lbl: 'R²' },
                    { val: mae, lbl: 'MAE' },
                    { val: rmse, lbl: 'RMSE' },
                ].map(({ val, lbl }) => (
                    <div
                        key={lbl}
                        className={`rounded-lg p-[10px_8px] text-center ${best ? 'bg-green/[0.07]' : 'bg-cream'}`}
                    >
                        <div className="font-bold text-[0.95rem] text-ink mb-[2px]">{val}</div>
                        <div className="text-[0.65rem] font-semibold tracking-[0.4px] uppercase text-muted">{lbl}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BarChart() {
    const barsRef = useRef([])

    useEffect(() => {
        const timeout = setTimeout(() => {
            barsRef.current.forEach((el, i) => {
                if (el) el.style.width = MODELS[i].barW
            })
        }, 100)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="bg-white border border-border rounded-2xl p-7 shadow-sm">
            <h3 className="font-serif text-[1.1rem] tracking-[-0.3px] mb-6 text-ink">R² Score Comparison</h3>

            {MODELS.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3 mb-[14px]">
                    <div className="text-[0.8rem] font-medium text-ink2 w-40 flex-shrink-0 text-right">
                        {m.name === 'Polynomial Regression' ? 'Polynomial Reg.' : m.name}
                    </div>

                    <div className="flex-1 h-[10px] bg-cream rounded-full overflow-hidden">
                        <div
                            ref={el => (barsRef.current[i] = el)}
                            style={{ width: '0%' }}
                            className={`h-full rounded-full bar-fill ${m.best ? 'bg-green' : 'bg-border2'}`}
                        />
                    </div>

                    <div className="text-[0.8rem] font-bold text-ink2 w-10 flex-shrink-0">
                        {m.r2}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ModelsPage() {
    return (
        <div className="max-w-[1100px] mx-auto px-10 py-12 pb-20 max-[800px]:px-5 max-[800px]:py-8">
            <h2 className="font-serif text-[2rem] tracking-[-0.8px] mb-[6px]">Model Comparison</h2>
            <p className="text-muted text-[0.9rem] font-light mb-9">
                Five regression models trained and evaluated on the same dataset. Ridge wins.
            </p>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mb-10">
                {MODELS.map(m => <ModelCard key={m.name} model={m} />)}
            </div>

            <BarChart />
        </div>
    )
}