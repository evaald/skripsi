import { rekapData } from "./rekapDataMorbiditas";

function filterDataByTanggal(data, startDate, endDate, ruangan) {
  // Konversi string jadi objek Date (format: DD/MM/YYYY → YYYY-MM-DD)
  function parseDate(str) {
    if (typeof str !== "string") {
      console.warn("parseDate: input bukan string:", str);
      return null;
    }
    const parts = str.split("/");
    if (parts.length !== 3) {
      console.warn("parseDate: format tanggal salah:", str);
      return null;
    }
    const [day, month, year] = parts.map(Number);
    
    // Validasi input
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.warn("parseDate: nilai tidak valid:", { day, month, year });
      return null;
    }
    if (day < 1 || day > 31 || month < 1 || month > 12) {
      console.warn("parseDate: nilai di luar range:", { day, month, year });
      return null;
    }
    
    const date = new Date(year, month - 1, day);
    return isNaN(date) ? null : date;
  }

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end) {
    console.error("parseDate: start atau end date tidak valid:", { startDate, endDate });
    return {};
  }

  console.log("Filter range:", { start, end });

  const filtered = data.filter((item) => {
    const itemDate = parseDate(item["TANGGAL"]);
    const itemRuangan = item["RUANGAN"];

    if (!itemDate) {
      console.warn("Item dengan tanggal tidak valid:", item);
      return false;
    }

    const isWithinRange = itemDate >= start && itemDate <= end;
    const isRuanganMatch = !ruangan || itemRuangan === ruangan;

    return isWithinRange && isRuanganMatch;
  });

  console.log(`Filtered ${filtered.length} items from ${data.length} total items`);

  if (filtered.length === 0) return {}; // Menghindari error jika tidak ada data

  const hasilRekap = rekapData(filtered);

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

  return hasilRekap;
}

export { filterDataByTanggal };
export default filterDataByTanggal;