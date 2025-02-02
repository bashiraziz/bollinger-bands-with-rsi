"use client"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`card ${className || ""}`}>{children}</div>
)

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <header className="card-header">{children}</header>
)

export const CardTitle = ({ children }: { children: React.ReactNode }) => <h2 className="card-title">{children}</h2>

export const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="card-description">{children}</p>
)

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
)

export const Table = ({ children }: { children: React.ReactNode }) => <table className="table">{children}</table>

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="table-header">{children}</thead>
)

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="table-body">{children}</tbody>
)

export const TableRow = ({ children }: { children: React.ReactNode }) => <tr className="table-row">{children}</tr>

export const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={className || ""}>{children}</td>
)

export const TableHead = ({ children }: { children: React.ReactNode }) => <th className="table-head">{children}</th>

