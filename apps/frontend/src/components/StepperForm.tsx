import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface StepperFormProps {
  currentStep: number
  totalSteps: number
  title: string
  subtitle: string
  canGoBack: boolean
  onBack: () => void
  onNext: () => void
  isLastStep?: boolean
  loading?: boolean
  children: ReactNode
}

export function StepperForm({
  currentStep,
  totalSteps,
  title,
  subtitle,
  canGoBack,
  onBack,
  onNext,
  isLastStep,
  loading,
  children,
}: StepperFormProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(140deg,rgba(19,32,42,0.92),rgba(28,37,52,0.82))] p-[1px] shadow-[0_24px_80px_rgba(27,28,34,0.34)]">
      <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(140deg,rgba(24,34,45,0.82),rgba(44,52,68,0.58))] p-6 text-white backdrop-blur-xl sm:p-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {Array.from({ length: totalSteps }, (_, index) => {
            const step = index + 1
            const isActive = step === currentStep
            const isComplete = step < currentStep

            return (
              <div
                key={step}
                className={`flex h-10 flex-1 items-center justify-center rounded-full border text-sm ${
                  isActive ? 'border-white/60 bg-white/18' : isComplete ? 'border-emerald-200/35 bg-emerald-200/20' : 'border-white/10 bg-white/5'
                }`}
              >
                {step}
              </div>
            )
          })}
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-[#d5ba8a]">Step {currentStep}</p>
        <h2 className="mt-3 font-display text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{subtitle}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={onBack} className="secondary-button border-white/15 bg-white/8 text-white disabled:cursor-not-allowed disabled:opacity-40" disabled={!canGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
          <button type="button" onClick={onNext} className="primary-button">
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLastStep ? 'Publish My Event' : 'Continue'} {!isLastStep ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
          </button>
        </div>
      </div>
    </div>
  )
}
