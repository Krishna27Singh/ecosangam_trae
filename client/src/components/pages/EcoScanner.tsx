import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Camera, ImagePlus, Loader2, Recycle, ScanSearch, Sparkles, Upload, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type ScanItem = {
  name: string;
  estimatedEmissionKg: number;
  category: string;
};

type ScanResult = {
  items: ScanItem[];
  totalEmissionKg: number;
  sustainabilityScore: number;
  tips: string[];
  scannedAt?: string;
  aiFallback?: boolean;
  warning?: string;
};

const inputOptions = [
  { value: "shopping receipt", label: "Shopping Receipt" },
  { value: "food item or meal", label: "Food / Meal" },
  { value: "product packaging or grocery item", label: "Product / Grocery" },
  { value: "utility bill", label: "Utility Bill" }
];

export const EcoScanner = () => {
  const [selectedType, setSelectedType] = useState(inputOptions[0].value);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const emissionLabel = useMemo(() => {
    if (!result) return "";
    return `${result.totalEmissionKg.toFixed(2)} kg CO2`;
  }, [result]);

  const onImageSelected = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Camera is not supported on this browser/device.");
      return;
    }

    setIsStartingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      streamRef.current = stream;
      setIsCameraOpen(true);

      // Wait until video element is mounted, then attach stream.
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 0);
    } catch (error) {
      console.error("Camera open failed:", error);
      toast.error("Could not open camera. Please allow camera permission.");
      stopCamera();
    } finally {
      setIsStartingCamera(false);
    }
  };

  const captureFromCamera = () => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    const width = videoEl.videoWidth || 1280;
    const height = videoEl.videoHeight || 720;
    canvasEl.width = width;
    canvasEl.height = height;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoEl, 0, 0, width, height);

    canvasEl.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Failed to capture image. Please try again.");
          return;
        }
        const file = new File([blob], `eco-scan-${Date.now()}.jpg`, { type: "image/jpeg" });
        onImageSelected(file);
        toast.success("Photo captured successfully.");
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleScan = async () => {
    if (!backendUri) {
      toast.error("Backend URL is missing. Configure VITE_BACKEND_URI.");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload or capture an image first.");
      return;
    }

    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("inputType", selectedType);

      const response = await fetch(`${backendUri}/api/eco-scanner/scan`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Scan failed.");
      }

      const data = await response.json();
      setResult(data);
      if (data?.aiFallback) {
        toast.warning("AI limit reached, showing best-effort estimated result.");
      } else {
        toast.success("Eco scan completed successfully!");
      }
    } catch (error) {
      console.error("Eco scan error:", error);
      toast.error("Could not process this image. Please try another one.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">
            Eco Scanner
          </h1>
          <p className="text-[#e5e1d8] text-lg opacity-90 uppercase">
            Scan receipts, meals, products and bills with AI
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase tracking-wide flex items-center gap-2">
              <ScanSearch className="w-5 h-5" />
              Smart Carbon Scanner
            </CardTitle>
            <CardDescription className="text-[#e5e1d8]/80 uppercase text-xs">
              Upload or capture an image to estimate carbon impact instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#e5e1d8] uppercase">Input Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full mt-2 rounded-md bg-white/10 border border-white/20 text-[#e5e1d8] px-3 py-2"
                  >
                    {inputOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-black text-[#e5e1d8]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => uploadInputRef.current?.click()}
                    className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button
                    type="button"
                    onClick={openCamera}
                    className="bg-white/15 text-[#e5e1d8] border border-white/30 hover:bg-white/20 uppercase font-semibold"
                    disabled={isStartingCamera}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {isStartingCamera ? "Opening Camera..." : "Capture"}
                  </Button>
                </div>

                <input
                  ref={uploadInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageSelected(e.target.files?.[0])}
                />
                <canvas ref={canvasRef} className="hidden" />

                {isCameraOpen && (
                  <div className="rounded-xl border border-white/20 bg-black/40 p-3 space-y-3">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full max-h-72 rounded-lg object-cover border border-white/20"
                    />
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={captureFromCamera}
                        className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Capture Photo
                      </Button>
                      <Button
                        type="button"
                        onClick={stopCamera}
                        className="bg-white/15 text-[#e5e1d8] border border-white/30 hover:bg-white/20 uppercase font-semibold"
                      >
                        Cancel Camera
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleScan}
                  disabled={isScanning || !imageFile}
                  className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning With AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Scan & Estimate Emissions
                    </>
                  )}
                </Button>
              </div>

              <div className="min-h-[260px] rounded-xl border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Selected preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-[#e5e1d8]/75 p-6">
                    <ImagePlus className="w-12 h-12 mx-auto mb-3" />
                    <p className="uppercase text-sm">Preview appears here</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#e5e1d8] uppercase text-sm">Total Emissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-300">{emissionLabel}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#e5e1d8] uppercase text-sm">Sustainability Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">{result.sustainabilityScore}/100</p>
                  <Progress value={result.sustainabilityScore} className="mt-3 h-2 bg-white/15" />
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#e5e1d8] uppercase text-sm">Detected Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-300">{result.items.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border border-white/20">
              <CardHeader>
                <CardTitle className="text-[#e5e1d8] uppercase text-sm">Emission Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.items}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                    <XAxis dataKey="name" stroke="#e5e1d8" tick={{ fill: "#e5e1d8", fontSize: 12 }} />
                    <YAxis stroke="#e5e1d8" tick={{ fill: "#e5e1d8", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="estimatedEmissionKg" fill="#34d399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#e5e1d8] uppercase text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    Detected Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.items.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="rounded-md border border-white/15 bg-white/5 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-[#e5e1d8] font-semibold">{item.name}</p>
                        <p className="text-xs text-[#e5e1d8]/70 uppercase">{item.category}</p>
                      </div>
                      <p className="text-yellow-300 font-bold">{item.estimatedEmissionKg.toFixed(2)} kg CO2</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#e5e1d8] uppercase text-sm flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-green-300" />
                    Personalized Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.tips.map((tip, idx) => (
                    <div key={`${tip}-${idx}`} className="rounded-md border border-white/15 bg-white/5 p-3 text-[#e5e1d8]">
                      <span className="text-green-300 mr-2">•</span>
                      {tip}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoScanner;
