import { notFound } from "next/navigation";

import { SessionPlayer } from "@/components/session-player";
import { PROTOCOL_BEATS, protocolDurationSec } from "@/lib/protocol";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  const beats = PROTOCOL_BEATS[mode];
  if (!beats) notFound();

  return (
    <SessionPlayer
      modeId={mode}
      beats={beats}
      totalDurationSec={protocolDurationSec(mode)}
    />
  );
}
