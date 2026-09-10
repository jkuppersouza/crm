import { cx } from '../../utils/format'

/**
 * Pill de status. Passe `className` com as classes vindas de
 * src/config/theme.js (STAGE_META / PRIORITY_META / CONTACT_STATUS_META).
 */
export default function Badge({ children, className, dot, size = 'md' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className || 'bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30',
      )}
    >
      {dot && <span className={cx('h-1.5 w-1.5 rounded-full', dot)} />}
      {children}
    </span>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  )
}
