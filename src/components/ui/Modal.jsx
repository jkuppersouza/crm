import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cx } from '../../utils/format'

const WIDTHS = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

/**
 * Modal centralizado com backdrop desfocado.
 * Fecha com Esc, clique fora ou no X.
 */
export default function Modal({ open, onClose, title, subtitle, icon: Icon, size = 'md', footer, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-slate-900/40 backdrop-blur-[3px] dark:bg-black/80"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cx(
          'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-modal',
          // 🎨 No escuro o modal é vidro fosco com borda fina
          'animate-scale-in sm:rounded-2xl dark:bg-slate-900/95 dark:backdrop-blur-xl dark:ring-1 dark:ring-slate-800',
          WIDTHS[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5 dark:border-slate-800">
          <div className="flex min-w-0 items-start gap-3">
            {Icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
              {subtitle && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-1.5 -mt-1 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-200/80 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/60">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

/** Painel lateral (drawer) — usado nos detalhes de contato */
export function Drawer({ open, onClose, title, subtitle, header, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 animate-fade-in bg-slate-900/40 backdrop-blur-[3px] dark:bg-black/80"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-xl animate-slide-in-right flex-col bg-white shadow-modal dark:border-l dark:border-slate-800 dark:bg-slate-900/95 dark:backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5 dark:border-slate-800">
          <div className="min-w-0">
            {header || (
              <>
                <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
                {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
              </>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-1.5 -mt-1 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-200/80 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/60">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

/** Diálogo de confirmação para exclusões */
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Excluir' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{message}</p>
      <div className="mt-6 flex justify-end gap-2.5">
        <button
          onClick={onClose}
          className="inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onConfirm?.()
            onClose?.()
          }}
          className="inline-flex h-10 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
