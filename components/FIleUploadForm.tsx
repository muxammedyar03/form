"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Upload, UploadIcon } from "lucide-react";

export default function UploadExcel({ onSuccess }: { onSuccess?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Xatolik",
        description: "Fayl tanlanmadi.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Serverdan xato javob qaytdi");
      const result = await res.json();

      toast({
        title: "Muvaffaqiyatli ✅",
        description: `${result.count} ta yozuv bazaga qo‘shildi.`,
        variant: "default",
      });
      onSuccess?.();

    } catch (err: any) {
      toast({
        title: "Xatolik",
        description: `Faylni yuklashda xato: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 bg-background rounded space-y-3">
      <div className="flex-1 bg-indigo-500/10 h-24 rounded-xl border-dashed border-2 border-indigo-500/30 text-indigo-500 border-spacing-60 relative">
        <UploadIcon className="w-64 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        <Input
          type="file"
          accept=".xlsx,.xls"
          placeholder="sasd"
          className="mb-2 p-2 text-white w-full h-full opacity-0"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      {file && <div className="text-sm text-muted-foreground">Tanlangan fayl: {file.name}</div>}
      <Button
        variant="default"
        onClick={handleUpload}
        disabled={loading || !file}
        className="ml-2 flex-1 bg-indigo-500 hover:bg-indigo-600 text-white w-full h-12"
      >
        {loading ? "Yuklanmoqda..." : "Faylni yuklash"}
      </Button>
    </div>
  );
}
