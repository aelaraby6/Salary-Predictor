export default function Navbar({ activePage, setActivePage }) {
    return (
        <nav className="bg-white border-b border-border h-[60px] px-10 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            {/* Logo */}
            <div className="font-serif text-[1.45rem] text-ink tracking-[-0.5px] flex items-center gap-2">
                <span className="w-2 h-2 bg-green rounded-full inline-block" />
                PaySight
            </div>

            {/* Links */}
            <div className="flex gap-1">
                {[
                    { key: 'predict', label: 'Predict' },
                    { key: 'models', label: 'Models' },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActivePage(key)}
                        className={`px-[14px] py-[6px] rounded-lg text-sm font-medium transition-colors border-none cursor-pointer font-sans
              ${activePage === key
                                ? 'bg-green-light text-green'
                                : 'text-ink2 hover:bg-cream'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </nav>
    )
}