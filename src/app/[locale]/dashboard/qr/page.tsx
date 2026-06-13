"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QrCode, Camera, CameraOff, Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function QRScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = useCallback(async () => {
    setError("");
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
    } catch {
      setError("Unable to access camera. Please allow camera access.");
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }, []);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    router.push(`/dashboard/inspections/new?template=${result}`);
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">Scan QR Code</h1>
        <p className="text-surface-500 text-sm mt-1">Scan a QR code for quick access to inspection templates</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-4 glass-card">
        <div className="relative aspect-video bg-surface-900 rounded-xl overflow-hidden flex items-center justify-center">
          {scanning ? (
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <QrCode className="w-16 h-16 text-surface-500" />
          )}
        </div>

        <div className="flex justify-center gap-3">
          {!scanning ? (
            <button onClick={startScanning}
              className="btn-primary">
              <Camera className="w-4 h-4" /> Start Scanning
            </button>
          ) : (
            <button onClick={stopScanning}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
              <CameraOff className="w-4 h-4" /> Stop Scanning
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
            <XCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {result && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Code detected: {result}
          </div>
        )}
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 glass-card">
        <h2 className="text-sm font-semibold text-surface-900 mb-3">Or enter template code manually</h2>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input type="text" value={result || ""} onChange={(e) => setResult(e.target.value)}
            placeholder="Template ID..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-surface-200 text-sm focus:border-brand-400 outline-none" />
          <button type="submit"
            className="btn-primary">
            Open
          </button>
        </form>
      </div>
    </div>
  );
}
