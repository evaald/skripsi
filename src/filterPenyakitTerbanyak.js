import { rekapData } from "./rekapDataMorbiditas";

function filterPenyakitTerbanyak(data, startDate, endDate, ruangan) {
   function parseDate(str) {
  if (typeof str !== "string") {
    console.warn("parseDate: input bukan string:", str);
    return null; // atau bisa throw error, atau handle sesuai kebutuhan
  }
  const parts = str.split("/");
  if (parts.length !== 3) {
    console.warn("parseDate: format tanggal salah:", str);
    return null;
  }
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

  const start = parseDate(startDate);
  const end = parseDate(endDate);

 const filtered = data.filter((item) => {
    const itemDate = parseDate(item["TANGGAL"]);
    const itemRuangan = item["RUANGAN"];

    const isWithinRange = itemDate >= start && itemDate <= end;
    const isRuanganMatch = !ruangan || itemRuangan === ruangan;

    return isWithinRange && isRuanganMatch;
  });


  if (filtered.length === 0) return {}; // Menghindari error jika tidak ada data

  const hasilRekap = rekapData(filtered);

  // Cari modus usia
  for (let diagnosa in hasilRekap) {
    const frekuensiUsia = hasilRekap[diagnosa].hitungUsia;
    let usiaTerbanyak = null;
    let jumlahTerbanyak = 0;

    for (let usia in frekuensiUsia) {
      if (frekuensiUsia[usia] > jumlahTerbanyak) {
        jumlahTerbanyak = frekuensiUsia[usia];
        usiaTerbanyak = Number(usia);
      }
    }

    hasilRekap[diagnosa]["RATA-RATA USIA"] = usiaTerbanyak;
    delete hasilRekap[diagnosa].hitungUsia;
  }

  // --- Tambahan: ambil 10 penyakit dengan total terbanyak ---
  // ubah objek hasilRekap jadi array supaya bisa di-sort
  const sortedArr = Object.entries(hasilRekap)
    .sort(([, a], [, b]) => b["TOTAL JUMLAH"] - a["TOTAL JUMLAH"]) // descending total
    .slice(0, 10); // ambil 10 teratas

  // balik ke objek lagi
  const hasilTop10 = {};
  sortedArr.forEach(([diagnosa, data]) => {
    hasilTop10[diagnosa] = data;
  });

  return hasilTop10;
}

export { filterPenyakitTerbanyak };
export default filterPenyakitTerbanyak;
