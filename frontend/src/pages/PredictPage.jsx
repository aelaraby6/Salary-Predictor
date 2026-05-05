import { useState } from 'react'
import api from '../api/axios'
import ResultCard from '../components/ResultCard'
import StatsRow from '../components/StatsRow'

const REM_LABELS = { 0: '0% — On-site', 50: '50% — Hybrid', 100: '100% — Remote' }

function Field({ label, className = '', children }) {
    return (
        <div className={`flex flex-col gap-[6px] ${className}`}>
            <label className="text-[0.8rem] font-semibold text-ink2 tracking-[0.2px]">{label}</label>
            {children}
        </div>
    )
}

const inputCls =
    'bg-cream border-[1.5px] border-border rounded-[10px] px-[14px] py-[10px] text-[0.9rem] font-sans text-ink ' +
    'focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 focus:bg-white transition-all cursor-pointer'

export default function PredictPage() {
    const [form, setForm] = useState({
        job_title: '',
        experience: '',
        employment: 'FT',
        company_size: '',
        company_loc: '',
        work_year: '2023',
        remote_ratio: 50,
    })

    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    function set(key, val) {
        setForm(prev => ({ ...prev, [key]: val }))
    }

    async function predict() {
        const { job_title, experience, employment, company_size, company_loc, work_year, remote_ratio } = form
        if (!job_title || !experience || !company_size || !company_loc) {
            alert('Please fill in all fields.')
            return
        }

        setLoading(true)

        try {
            const res = await api.post('/predict', {
                job_title,
                experience_level: experience,
                employment_type: employment,
                company_size,
                company_location: company_loc === 'OTHER' ? 'Other' : company_loc,
                work_year: parseInt(work_year),
                remote_ratio: parseInt(remote_ratio),
            })

            const salary = Math.round(res.data.predicted_salary_usd / 1000)

            setResult({
                salary,
                low: Math.round(salary * 0.85),
                high: Math.round(salary * 1.15),
                job: job_title,
                exp: experience,
                size: company_size,
                loc: company_loc,
                remote: parseInt(remote_ratio),
            })
        } catch (err) {
            alert('Error connecting to API. Make sure the backend is running.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Hero */}
            <div className="max-w-[1100px] mx-auto px-10 pt-16">
                <div className="inline-flex items-center gap-[6px] bg-green-light text-green text-[0.775rem] font-semibold tracking-[0.8px] uppercase px-3 py-[5px] rounded-full mb-5">
                    <span className="w-[6px] h-[6px] bg-green rounded-full" />
                    ML-Powered
                </div>

                <h1 className="font-serif text-[3.2rem] leading-[1.15] tracking-[-1.5px] text-ink max-w-[620px] mb-4">
                    Know your <em className="not-italic text-green">market value</em> before the interview.
                </h1>

                <p className="text-muted text-base max-w-[480px] font-light mb-10">
                    Fill in your profile and get an instant salary estimate based on real 2023 data from 10,000+ professionals.
                </p>
            </div>

            {/* Main Grid */}
            <div className="max-w-[1100px] mx-auto px-10 pb-20 pt-8 grid grid-cols-[1fr_400px] gap-7 items-start max-[800px]:grid-cols-1 max-[800px]:px-5">

                {/* Form Card */}
                <div className="bg-white border border-border rounded-2xl p-8 shadow-md animate-fadeUp">
                    <h2 className="font-serif text-[1.3rem] tracking-[-0.4px] mb-[6px]">Your Profile</h2>
                    <p className="text-[0.825rem] text-muted mb-7 font-light">All fields are used to improve prediction accuracy.</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 max-[800px]:grid-cols-1">

                        <Field label="Job Title">
                            <select className={inputCls} value={form.job_title} onChange={e => set('job_title', e.target.value)}>
                                <option value="">Select role…</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="ML Engineer">ML Engineer</option>
                                <option value="Data Engineer">Data Engineer</option>
                                <option value="Data Analyst">Data Analyst</option>
                                <option value="Research Scientist">Research Scientist</option>
                            </select>
                        </Field>

                        <Field label="Experience Level">
                            <select className={inputCls} value={form.experience} onChange={e => set('experience', e.target.value)}>
                                <option value="">Select level…</option>
                                <option value="EN">Entry-level (EN)</option>
                                <option value="MI">Mid-level (MI)</option>
                                <option value="SE">Senior (SE)</option>
                                <option value="EX">Executive (EX)</option>
                            </select>
                        </Field>

                        <Field label="Employment Type">
                            <select className={inputCls} value={form.employment} onChange={e => set('employment', e.target.value)}>
                                <option value="FT">Full-Time</option>
                                <option value="PT">Part-Time</option>
                                <option value="CT">Contract</option>
                                <option value="FL">Freelance</option>
                            </select>
                        </Field>

                        <Field label="Company Size">
                            <select className={inputCls} value={form.company_size} onChange={e => set('company_size', e.target.value)}>
                                <option value="">Select size…</option>
                                <option value="S">Small (&lt; 50)</option>
                                <option value="M">Medium (50–250)</option>
                                <option value="L">Large (&gt; 250)</option>
                            </select>
                        </Field>

                        <Field label="Company Location">
                            <select className={inputCls} value={form.company_loc} onChange={e => set('company_loc', e.target.value)}>
                                <option value="">Select country…</option>
                                <option value="US">United States</option>
                                <option value="GB">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="DE">Germany</option>
                                <option value="IN">India</option>
                                <option value="FR">France</option>
                                <option value="AU">Australia</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </Field>

                        <Field label="Work Year">
                            <select className={inputCls} value={form.work_year} onChange={e => set('work_year', e.target.value)}>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                        </Field>

                        <Field label="Remote Ratio" className="col-span-2 max-[800px]:col-span-1">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="range"
                                    min="0" max="100" step="50"
                                    value={form.remote_ratio}
                                    onChange={e => set('remote_ratio', parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-[0.72rem] text-muted">
                                    <span>On-site (0%)</span>
                                    <span>Hybrid (50%)</span>
                                    <span>Remote (100%)</span>
                                </div>
                                <span className="self-start bg-green-light text-green font-semibold text-[0.8rem] px-[10px] py-[3px] rounded-full">
                                    {REM_LABELS[form.remote_ratio]}
                                </span>
                            </div>
                        </Field>

                    </div>

                    <button
                        onClick={predict}
                        disabled={loading}
                        className="w-full py-[14px] bg-ink text-white border-none rounded-xl font-sans text-[0.95rem] font-semibold cursor-pointer mt-2
              flex items-center justify-center gap-2 hover:bg-ink2 active:scale-[0.99] transition-all disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Predicting…
                            </>
                        ) : (
                            <>
                                Calculate Salary
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">
                    <ResultCard result={result} />

                    <div className="bg-amber-light border border-[#e8d5b0] rounded-xl p-[14px_18px] flex items-center gap-3 animate-fadeUp [animation-delay:80ms]">
                        <div className="w-9 h-9 bg-amber rounded-[9px] flex items-center justify-center text-base flex-shrink-0">
                            ⚡
                        </div>
                        <div>
                            <p className="text-[0.75rem] font-semibold tracking-[0.5px] uppercase text-amber mb-[2px]">
                                Best Performing Model
                            </p>
                            <p className="text-[0.875rem] font-semibold text-ink">
                                Ridge Regression — R² 0.402
                            </p>
                        </div>
                    </div>

                    <div className="animate-fadeUp [animation-delay:160ms]">
                        <StatsRow />
                    </div>
                </div>

            </div>
        </>
    )
}