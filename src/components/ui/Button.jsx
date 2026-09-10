import { cx } from '../../utils/format'

// 🎨 Variantes de botão — todas derivam da cor da marca (brand-*)
const VARIANTS = {
  // `text-brand-fg` = preto no tema Mono, branco nos temas coloridos
  primary:
    'bg-brand-600 text-brand-fg shadow-sm shadow-brand-600/20 hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 active:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700/70',
  soft:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
  danger:
    'bg-rose-600 text-white shadow-sm shadow-rose-600/20 hover:bg-rose-700 active:bg-rose-800',
  dangerGhost:
    'text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10',
  // 🎨 Variantes do template SaaS
  gradient:
    'bg-gradient-to-b from-white via-white/95 to-white/60 text-black shadow-glow hover:scale-105 active:scale-95',
  default:
    'bg-white text-black hover:bg-slate-100',
}

const SIZES = {
  xs: 'h-7 gap-1.5 px-2.5 text-xs',
  sm: 'h-9 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-5 text-[15px]',
  icon: 'h-9 w-9 justify-center',
  iconSm: 'h-8 w-8 justify-center',
}

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconRight: IconRight,
  children,
  ...props
}) {
  return (
    <Tag
      className={cx(
        'inline-flex select-none items-center rounded-xl font-semibold transition-all duration-150',
        'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={size === 'xs' ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2.2} />}
      {children}
      {IconRight && <IconRight className="h-4 w-4" strokeWidth={2.2} />}
    </Tag>
  )
}
