import { X, Camera, Clock, Gauge, CheckCircle2, ArrowUpCircle, XCircle } from 'lucide-react';
import StatusBadge from './ui/StatusBadge';
import ANPRDetails from './ANPRDetails';
import LocationIndicator from './LocationIndicator';

function formatTimestamp(ts) {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

const ACTION_STATUS_LABEL = {
  new: null,
  acknowledged: { label: 'Acknowledged', className: 'text-severity-info' },
  escalated: { label: 'Escalated', className: 'text-severity-critical' },
  false_positive: { label: 'Marked false positive', className: 'text-ops-muted' },
};

export default function AlertDetailPanel({ alert, onClose, onUpdateStatus }) {
  if (!alert) return null;

  const currentStatus = ACTION_STATUS_LABEL[alert.status];

  const handleAction = (nextStatus) => {
    onUpdateStatus?.(alert.id, nextStatus);
  };

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Alert detail — ${alert.id}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-ops-border bg-ops-panel shadow-panel font-sans"
      >
        <div className="flex items-start justify-between border-b border-ops-border px-4 py-3.5">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-xs text-ops-muted">{alert.id}</span>
              <StatusBadge severity={alert.severity} />
            </div>
            <h2 className="text-sm font-semibold text-ops-text">{alert.type}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-ops-muted hover:bg-ops-panel2 hover:text-ops-text transition-colors"
            aria-label="Close alert detail"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {/* snapshot placeholder */}
          <div className="flex aspect-video items-center justify-center rounded-md border border-ops-border bg-black">
            <p className="px-4 text-center text-xs text-ops-muted">{alert.snapshotLabel}</p>
          </div>

          {/* meta grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md border border-ops-border bg-ops-bg px-2.5 py-2">
              <p className="mb-1 flex items-center gap-1 text-[10px] text-ops-muted">
                <Camera size={11} /> Camera
              </p>
              <p className="font-mono text-xs text-ops-text">{alert.cameraId}</p>
            </div>
            <div className="rounded-md border border-ops-border bg-ops-bg px-2.5 py-2">
              <p className="mb-1 flex items-center gap-1 text-[10px] text-ops-muted">
                <Clock size={11} /> Time
              </p>
              <p className="text-xs text-ops-text">{formatTimestamp(alert.timestamp)}</p>
            </div>
            <div className="rounded-md border border-ops-border bg-ops-bg px-2.5 py-2">
              <p className="mb-1 flex items-center gap-1 text-[10px] text-ops-muted">
                <Gauge size={11} /> Confidence
              </p>
              <p className="text-xs text-ops-text">{Math.round(alert.confidence * 100)}%</p>
            </div>
          </div>

          <ANPRDetails vehicle={alert.vehicle} />
          <LocationIndicator location={alert.location} />
        </div>

        {/* officer actions */}
        <div className="border-t border-ops-border px-4 py-3.5">
          {currentStatus && (
            <p className={`mb-2 text-xs ${currentStatus.className}`}>
              Current status: {currentStatus.label}
            </p>
          )}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleAction('acknowledged')}
              className="flex flex-col items-center gap-1 rounded-md border border-ops-border bg-ops-bg px-2 py-2 text-xs text-ops-text hover:border-severity-info hover:text-severity-info transition-colors"
            >
              <CheckCircle2 size={16} />
              Acknowledge
            </button>
            <button
              type="button"
              onClick={() => handleAction('escalated')}
              className="flex flex-col items-center gap-1 rounded-md border border-ops-border bg-ops-bg px-2 py-2 text-xs text-ops-text hover:border-severity-critical hover:text-severity-critical transition-colors"
            >
              <ArrowUpCircle size={16} />
              Escalate
            </button>
            <button
              type="button"
              onClick={() => handleAction('false_positive')}
              className="flex flex-col items-center gap-1 rounded-md border border-ops-border bg-ops-bg px-2 py-2 text-xs text-ops-text hover:border-ops-muted hover:text-ops-muted transition-colors"
            >
              <XCircle size={16} />
              False Positive
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
