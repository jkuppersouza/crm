export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {/* 🎨 Título com o degradê branco → transparente do template */}
        <h1 className="text-gradient text-2xl font-semibold sm:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-[15px] text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}
