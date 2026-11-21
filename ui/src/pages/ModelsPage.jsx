import { useEffect, useRef } from 'react'

const MODELS = [
    {
        name: 'Ridge Regression',
        desc: 'L2 regularization — handles multicollinearity well.',
        r2: 0.402, mae: '$36.4k', rmse: '$47.6k',
        best: true,
        barW: '40.2%',
    },
    {
        name: 'Lasso Regression',
        desc: 'L1 regularization — automatic feature selection.',
        r2: 0.399, mae: '$36.4k', rmse: '$47.7k',
        barW: '39.9%',
    },
    {
        name: 'Linear Regression',
        desc: 'Baseline model — no regularization applied.',
        r2: 0.396, mae: '$36.5k', rmse: '$47.8k',
        barW: '39.6%',
    },
    {
        name: 'SVR (RBF)',
        desc: 'Support Vector Regression with RBF kernel.',
        r2: 0.358, mae: '$36.8k', rmse: '$49.3k',
        barW: '35.8%',
    },
    {
        name: 'Decision Tree',
        desc: 'Tree-based model — prone to overfitting.',
        r2: 0.328, mae: '$37.4k', rmse: '$50.5k',
        barW: '32.8%',
    },
    {
        name: 'Random Forest',
        desc: 'Ensemble of trees — usually reduces variance.',
        r2: 0.327, mae: '$38.0k', rmse: '$50.5k',
        barW: '32.7%',
    },
    {
        name: 'Polynomial Regression',
        desc: 'Degree 2 — captures non-linear relationships.',
        r2: 0.251, mae: '$39.1k', rmse: '$53.3k',
        barW: '25.1%',
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