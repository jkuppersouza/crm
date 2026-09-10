import { cx } from '../../utils/format'

export default function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cx(
        'surface',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, icon: Icon, className }) {
  return (
    <div className={cx('flex items-start justify-between gap-4 px-5 py-4 sm:px-6', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-slate-900 dark:text-white">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 truncate text-[13px] text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardBody({ className, children }) {
  return <div className={cx('px-5 pb-5 sm:px-6 sm:pb-6', className)}>{children}</div>
}

export function Divider({ className }) {
  return <div className={cx('h-px bg-slate-200/80 dark:bg-slate-800', className)} />
}
