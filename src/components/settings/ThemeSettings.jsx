import { Palette, Check, Moon, Sun, Monitor } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { BRAND_PRESETS } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx } from '../../utils/format'

/**
 * 🎨 Seletor de tema.
 * As paletas vêm de BRAND_PRESETS (src/config/theme.js) — adicione a sua lá
 * e ela aparece automaticamente aqui.
 */
export default function ThemeSettings() {
  const { brand, setBrand, mode, setMode, notify } = useCrm()

  return (
    <Card>
      <CardHeader icon={Palette} title="Aparência" subtitle="Cor principal e modo de exibição do CRM" />
      <CardBody>
        {/* Cor principal */}
        <p className="field-label">Cor principal do tema</p>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {Object.entries(BRAND_PRESETS).map(([key, preset]) => {
            const active = brand === key
            return (
              <button
                key={key}
                onClick={() => {
                  setBrand(key)
                  notify(`Tema alterado para ${preset.label}.`)
                }}
                title={preset.label}
                className={cx(
                  'group flex flex-col items-center gap-2 rounded-xl p-2 transition-all duration-150',
                  active ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                )}
              >
                <span
                  className={cx(
                    'flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-black/10 transition-transform duration-150 group-hover:scale-110 dark:ring-white/15',
                    active && 'ring-2 ring-slate-900 ring-offset-2 dark:ring-white dark:ring-offset-slate-900',
                  )}
                  style={{ background: preset.hex }}
                >
                  {/* O check acompanha o contraste da paleta (preto no Mono) */}
                  {active && (
                    <Check
                      className={cx('h-5 w-5', preset.fg === '0 0 0' ? 'text-black' : 'text-white')}
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{preset.label}</span>
              </button>
            )
          })}
        </div>

        {/* Modo claro/escuro */}
        <p className="field-label mt-7">Modo de exibição</p>
        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          {[
            { value: 'light', label: 'Modo claro', icon: Sun },
            { value: 'dark', label: 'Modo escuro', icon: Moon },
          ].map((opt) => {
            const active = mode === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setMode(opt.value)}
                className={cx(
                  'flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-150',
                  active
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600',
                )}
              >
                <opt.icon
                  className={cx('h-5 w-5', active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400')}
                  strokeWidth={2.2}
                />
                <span className={cx('text-sm font-semibold', active ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300')}>
                  {opt.label}
                </span>
                {active && <Check className="ml-auto h-4 w-4 text-brand-600 dark:text-brand-400" strokeWidth={3} />}
              </button>
            )
          })}
        </div>

        {/* Pré-visualização */}
        <p className="field-label mt-7">Pré-visualização</p>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
          <button className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-fg shadow-sm shadow-brand-600/20">
            Botão primário
          </button>
          <button className="rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            Botão suave
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Etiqueta
          </span>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-500 to-brand-600" />
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
            <Monitor className="h-4 w-4" /> Link de exemplo
          </span>
        </div>
      </CardBody>
    </Card>
  )
}
