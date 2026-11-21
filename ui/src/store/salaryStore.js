import { create } from 'zustand'
import api from '../api/axios'

const INITIAL_FORM = {
    job_title: 'Data Scientist',
    experience_level: 'SE',
    employment_type: 'FT',
    company_size: 'M',
    company_location: 'US',
    employee_residence: 'US',
    same_residence: true,
    work_year: 2023,
    remote_ratio: 50,
}

export const PRESETS = [
    {
        label: 'Senior ML Engineer (US)',
        values: {
            job_title: 'Machine Learning Engineer',
            experience_level: 'SE',
            employment_type: 'FT',
            company_size: 'L',
            company_location: 'US',
            employee_residence: 'US',
            same_residence: true,
            work_year: 2023,
            remote_ratio: 100,
        },
    },
    {
        label: 'Mid Data Scientist (US)',
        values: {
            job_title: 'Data Scientist',
            experience_level: 'MI',
            employment_type: 'FT',
            company_size: 'M',
            company_location: 'US',
            employee_residence: 'US',
            same_residence: true,
            work_year: 2023,
            remote_ratio: 50,
        },
    },
    {
        label: 'Data Analyst (UK / Hybrid)',
        values: {
            job_title: 'Data Analyst',
            experience_level: 'MI',
            employment_type: 'FT',
            company_size: 'M',
            company_location: 'GB',
            employee_residence: 'GB',
            same_residence: true,
            work_year: 2023,
            remote_ratio: 50,
        },
    },
    {
        label: 'Data Architect (Large Co)',
        values: {
            job_title: 'Data Architect',
            experience_level: 'EX',
            employment_type: 'FT',
            company_size: 'L',
            company_location: 'US',
            employee_residence: 'US',
            same_residence: true,
            work_year: 2023,
            remote_ratio: 0,
        },
    },
]

export const useSalaryStore = create((set, get) => ({
    // Form state
    form: { ...INITIAL_FORM },

    // Backend & Model Metadata
    backendStatus: 'checking', // 'online' | 'offline' | 'checking'
    modelVersion: 'v1',
    algorithm: 'RidgeCV',

    // Results & States
    result: null,
    loading: false,
    error: null,

    // Comparison History
    history: [],

    // Update single form field
    setFormField: (field, value) => {
        set((state) => {
            const nextForm = { ...state.form, [field]: value }
            // Keep employee_residence in sync if same_residence is true
            if (field === 'company_location' && nextForm.same_residence) {
                nextForm.employee_residence = value
            }
            if (field === 'same_residence' && value) {
                nextForm.employee_residence = nextForm.company_location
            }
            return { form: nextForm, error: null }
        })
    },

    // Apply quick preset
    applyPreset: (presetValues) => {
        set({ form: { ...presetValues }, error: null })
    },

    // Reset form to defaults
    resetForm: () => {
        set({ form: { ...INITIAL_FORM }, error: null })
    },

    // Health check
    checkHealth: async () => {
        try {
            const res = await api.get('/health', { timeout: 3500 })
            if (res.data?.status === 'ok') {
                set({
                    backendStatus: 'online',
                    modelVersion: res.data.model_version || 'v1',
                })
            } else {
                set({ backendStatus: 'offline' })
            }
        } catch {
            set({ backendStatus: 'offline' })
        }
    },

    // Submit prediction to FastAPI backend
    predictSalary: async () => {
        const { form, history } = get()

        if (!form.job_title || !form.experience_level || !form.company_size || !form.company_location) {
            set({ error: 'Please ensure all required fields are selected.' })
            return
        }

        set({ loading: true, error: null })

        try {
            const payload = {
                work_year: parseInt(form.work_year),
                experience_level: form.experience_level,
                employment_type: form.employment_type,
                job_title: form.job_title.trim(),
                employee_residence: (form.same_residence ? form.company_location : form.employee_residence || form.company_location).trim().toUpperCase(),
                remote_ratio: parseInt(form.remote_ratio),
                company_location: form.company_location.trim().toUpperCase(),
                company_size: form.company_size,
            }

            const res = await api.post('/predict', payload)
            const predictedSalary = Math.round(res.data.predicted_salary_usd)
            const typicalError = Math.round(res.data.typical_error_usd || 37160)

            const newResult = {
                salary: predictedSalary,
                typicalError: typicalError,
                low: Math.max(0, predictedSalary - typicalError),
                high: predictedSalary + typicalError,
                job: payload.job_title,
                exp: payload.experience_level,
                employment: payload.employment_type,
                size: payload.company_size,
                loc: payload.company_location,
                residence: payload.employee_residence,
                remote: payload.remote_ratio,
                modelVersion: res.data.model_version || 'v1',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }

            set({
                result: newResult,
                loading: false,
                backendStatus: 'online',
                history: [newResult, ...history.filter(h => h.job !== newResult.job || h.exp !== newResult.exp || h.loc !== newResult.loc)].slice(0, 5),
            })
        } catch (err) {
            console.error('Prediction API Error:', err)
            const errorMsg =
                err.response?.data?.detail?.[0]?.msg ||
                err.response?.data?.message ||
                'Could not connect to the Prediction Server. Make sure the backend is running.'
            set({ error: errorMsg, loading: false, backendStatus: 'offline' })
        }
    },

    clearHistory: () => set({ history: [] }),
}))
