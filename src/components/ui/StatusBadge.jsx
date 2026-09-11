import "./StatusBadge.css";

const LABELS = {
  critical: "Critical",
  medium: "Medium",
  low: "Low",
  resolved: "Resolved",
};

export default function StatusBadge({ level }) {
  const label = LABELS[level] || level;
  return <span className={`status-badge status-badge--${level}`}>{label}</span>;
}
