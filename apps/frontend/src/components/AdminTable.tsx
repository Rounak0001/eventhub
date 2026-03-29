interface AdminTableProps<T extends Record<string, unknown>> {
  title: string
  columns: Array<{ key: keyof T; label: string }>
  rows: T[]
}

export function AdminTable<T extends Record<string, unknown>>({ title, columns, rows }: AdminTableProps<T>) {
  return (
    <div className="paper-panel overflow-hidden">
      <div className="border-b border-[color:rgba(185,146,71,0.16)] px-6 py-5">
        <h3 className="font-display text-2xl">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/60 text-[color:var(--color-muted)]">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-6 py-4 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-[color:rgba(185,146,71,0.1)]">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 text-[color:var(--color-ink)]">
                    {String(row[column.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
