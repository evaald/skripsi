import { useRef } from "react";
import * as XLSX from "xlsx";

function ExcelUploader({ onDataParsed }) {
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" , cellDates: true});

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet);

        const jsonData = rawData.map((item) => {
        // Parse dan ubah kolom tanggal ke string format "dd/mm/yyyy"
        let tanggalStr = "";
        if (item.TANGGAL) {
            // Coba parse ke Date dulu
            const dateObj = new Date(item.TANGGAL);
            if (!isNaN(dateObj)) {
            // Format manual "dd/mm/yyyy"
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            tanggalStr = `${day}/${month}/${year}`;
            } else if (typeof item.TANGGAL === "string") {
            // Kalau sudah string, asumsikan sudah benar (atau bisa diproses ulang)
            tanggalStr = item.TANGGAL;
            }
        }

        // Ubah struktur UMUR jadi objek { value, unit }
        const umur = {
            value: item.UMUR_VALUE ?? "",
            unit: item.UMUR_UNIT ?? ""
        };

        // Hapus field mentah biar rapi
        const cleanedItem = { ...item };
        delete cleanedItem.UMUR_VALUE;
        delete cleanedItem.UMUR_UNIT;

        return {
            ...cleanedItem,
            TANGGAL: tanggalStr,
            UMUR: umur
        };
        });

      localStorage.setItem("uploadedPasien", JSON.stringify(jsonData));
      onDataParsed(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      handleFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleManualUpload = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-100 mb-6"
      onClick={() => fileInputRef.current.click()}
    >
      <p className="text-gray-600">Drag & Drop file Excel (.xlsx) di sini<br />atau klik untuk unggah</p>
      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={handleManualUpload}
        className="hidden"
      />
    </div>
  );
}

export default ExcelUploader;
