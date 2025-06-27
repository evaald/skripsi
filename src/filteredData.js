import { rekapData } from "./rekapDataMorbiditas";

function filterDataByTanggal(data, startDate, endDate, ruangan) {
  // Konversi string jadi objek Date (format: DD/MM/YYYY → YYYY-MM-DD)
  const parseDate = (str) => {
    const [day, month, year] = str.split("/");
    return new Date(year, month - 1, day);
  };

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
