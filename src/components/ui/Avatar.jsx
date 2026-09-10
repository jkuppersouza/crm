import { cx, initialsOf } from '../../utils/format'

const SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-11 w-11 text-sm',
  xl: 'h-16 w-16 text-lg',
}

/**
 * Avatar com iniciais. `color` aceita uma classe bg-* (ver TEAM em mockData.js).
 * `textColor` só precisa mudar quando o fundo é claro (tema Mono) — aí use
 * `text-brand-fg`, que acompanha o contraste da paleta ativa.
 */
export default function Avatar({ name, initials, color = 'bg-brand-600', textColor = 'text-white', size = 'md', ring = false, className, title }) {
  return (
    <span
      title={title || name}
      className={cx(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold',
        textColor,
        SIZES[size],
        color,
        ring && 'ring-2 ring-white dark:ring-slate-900',
        className,
      )}
    >
      {initials || initialsOf(name)}
    </span>
  )
}

/** Pilha de avatares sobrepostos */
export function AvatarStack({ users, max = 4, size = 'sm' }) {
  const visible = users.slice(0, max)
  const rest = users.length - visible.length
  return (
    <div className="flex -space-x-2">
      {visible.map((u) => (
        <Avatar key={u.id} name={u.name} initials={u.initials} color={u.color} size={size} ring />
      ))}
      {rest > 0 && (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-900">
          +{rest}
        </span>
      )}
    </div>
  )
}
