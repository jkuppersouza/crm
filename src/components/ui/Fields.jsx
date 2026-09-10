import { ChevronDown, Search, X } from 'lucide-react'
import { cx } from '../../utils/format'

export function Input({ label, hint, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="field-label">{label}</span>}
      <input className={cx('field', className)} {...props} />
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  )
}

export function Textarea({ label, className, rows = 3, ...props }) {
  return (
    <label className="block">
      {label && <span className="field-label">{label}</span>}
      <textarea rows={rows} className={cx('field resize-none', className)} {...props} />
    </label>
  )
}

export function Select({ label, options = [], className, placeholder, ...props }) {
  return (
    <label className="block">
      {label && <span className="field-label">{label}</span>}
      <div className="relative">
        <select className={cx('field appearance-none pr-10', className)} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) =>
            typeof o === 'string' ? (
              <option key={o} value={o}>{o}</option>
            ) : (
              <option key={o.value} value={o.value}>{o.label}</option>
            ),
          )}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  )
}

/** Campo de busca com ícone e botão de limpar */
export function SearchInput({ value, onChange, placeholder = 'Buscar...', className }) {
  return (
    <div className={cx('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field pl-10 pr-9"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

/** Grupo de botões tipo "segmented control" */
export function SegmentedControl({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            'rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all duration-150',
            value === o.value
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </span>
      )}
      <p className="text-[15px] font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

/** Barra de progresso fina */
export function ProgressBar({ value, max = 100, className, barClassName }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cx('h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', className)}>
      <div
        className={cx('h-full rounded-full bg-brand-500 transition-all duration-500', barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
