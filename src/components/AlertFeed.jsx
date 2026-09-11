import AlertItem from './AlertItem';
import EmptyState from './EmptyState';

export default function AlertFeed({ alerts, onSelectAlert }) {
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  return (
    <aside className="flex h-full flex-col rounded-md border border-ops-border bg-ops-panel">
      <div className="flex items-center justify-between border-b border-ops-border px-3.5 py-3">
        <h2 className="text-sm font-medium text-ops-text">Live Alerts</h2>
        <span className="flex items-center gap-2 text-xs text-ops-muted">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1 text-severity-critical">
              <span className="h-1.5 w-1.5 rounded-full bg-severity-critical animate-pulse" />
              {criticalCount} critical
            </span>
          )}
          <span>{alerts.length} total</span>
        </span>
      </div>

      <div className="flex-1 divide-y divide-ops-border overflow-y-auto">
        {alerts.length === 0 ? (
          <EmptyState title="No alerts in the current window" />
        ) : (
          alerts
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((alert) => (
              <AlertItem key={alert.id} alert={alert} onSelect={onSelectAlert} />
            ))
        )}
      </div>
    </aside>
  );
}
