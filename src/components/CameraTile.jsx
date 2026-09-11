import { VideoOff, Radio } from 'lucide-react';

const STATUS_DOT = {
  online: 'bg-severity-low',
  degraded: 'bg-severity-medium',
  offline: 'bg-ops-muted',
};

const STATUS_LABEL = {
  online: 'Live',
  degraded: 'Degraded',
  offline: 'Offline',
};

export default function CameraTile({ camera }) {
  const isOffline = camera.status === 'offline';

  return (
    <div className="group relative aspect-video overflow-hidden rounded-md border border-ops-border bg-black">
      {/* placeholder feed surface — swap the inner div for a <video>/HLS player later */}
      <div
        className={`h-full w-full flex items-center justify-center ${
          isOffline ? 'bg-ops-panel' : 'bg-gradient-to-br from-ops-panel2 to-black'
        }`}
      >
        {isOffline ? (
          <div className="flex flex-col items-center gap-1.5 text-ops-muted">
            <VideoOff size={22} strokeWidth={1.5} />
            <span className="text-[11px]">Signal lost</span>
          </div>
        ) : (
          <Radio size={18} strokeWidth={1.5} className="text-ops-border" />
        )}
      </div>

      {/* subtle vignette so overlaid text stays legible over any feed content */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-2.5 py-2">
        <span className="font-mono text-[11px] text-ops-text/90">{camera.id}</span>
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[camera.status]} ${camera.status === 'online' ? 'animate-pulse' : ''}`} />
          <span className="text-[10px] text-ops-muted">{STATUS_LABEL[camera.status]}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-2.5 py-2">
        <span className="text-xs text-ops-text/90">{camera.label}</span>
      </div>
    </div>
  );
}
