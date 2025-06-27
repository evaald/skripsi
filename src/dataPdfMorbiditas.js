export function dataPdfMorbiditas(data, startDate, endDate, ruangan) {
  // Fungsi bantu untuk parsing tanggal dari DD/MM/YYYY
  const parseDate = (str) => {
    const [day, month, year] = str.split("/");
    return new Date(year, month - 1, day);
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  // Step 1: Filter berdasarkan tanggal dulu
  const filteredData = data.filter((item) => {
    const itemDate = parseDate(item["TANGGAL"]);
    const itemRuangan = item["RUANGAN"];

    const isWithinRange = itemDate >= start && itemDate <= end;
    const isRuanganMatch = !ruangan || itemRuangan === ruangan;

    return isWithinRange && isRuanganMatch;
  });

  if (filteredData.length === 0) return {}; // Menghindari error jika tidak ada data

  // Step 2: Proses data setelah difilter
  const hasil = filteredData.reduce((wadahBaru, itemSaatIni) => {
    const diagnosa = itemSaatIni["DIAGNOSA"];
    const gender = itemSaatIni["JENIS KELAMIN"];
    const umurObj = itemSaatIni["UMUR"];
    const usiaValue = umurObj.value;
    const usiaUnit = umurObj.unit;
    const ruangan = itemSaatIni["RUANGAN"];

    // Inisialisasi objek diagnosa
    if (!wadahBaru[diagnosa]) {
      wadahBaru[diagnosa] = {
        hitungUsia: {},
        "RUANGAN": ruangan,
        "RATA-RATA USIA": null,
        "KELOMPOK USIA": {},
        "JUMLAH LAKI-LAKI": 0,
        "JUMLAH PEREMPUAN": 0,
        "TOTAL JUMLAH": 0
      };
    }

    // Hitung jumlah per gender
    if (gender === "LAKI-LAKI") {
      wadahBaru[diagnosa]["JUMLAH LAKI-LAKI"]++;
    } else if (gender === "PEREMPUAN") {
      wadahBaru[diagnosa]["JUMLAH PEREMPUAN"]++;
    }

    wadahBaru[diagnosa]["TOTAL JUMLAH"]++;

    // Hitung frekuensi usia
    if (typeof wadahBaru[diagnosa].hitungUsia[usiaValue] === "undefined") {
      wadahBaru[diagnosa].hitungUsia[usiaValue] = 0;
    }
    wadahBaru[diagnosa].hitungUsia[usiaValue]++;

    // Tentukan usia yang paling sering muncul
    const jumlahUmurSaatIni = wadahBaru[diagnosa].hitungUsia[usiaValue];
    const usiaTerbanyakSebelumnya = wadahBaru[diagnosa]["RATA-RATA USIA"];
    const frekuensiSebelumnya =
      usiaTerbanyakSebelumnya !== null
        ? wadahBaru[diagnosa].hitungUsia[usiaTerbanyakSebelumnya]
        : 0;

    if (
      usiaTerbanyakSebelumnya === null ||
      jumlahUmurSaatIni > frekuensiSebelumnya
    ) {
      wadahBaru[diagnosa]["RATA-RATA USIA"] = usiaValue;
    }

    // Tentukan kelompok usia
    let kelompok = "";
    if (usiaUnit === "JAM" && usiaValue <= 24) {
      kelompok = "BAYI BARU LAHIR (1-24 JAM)";
    } else if (usiaUnit === "HARI" && usiaValue <= 30) {
      kelompok = "BAYI (1 HARI - 30 HARI)";
    } else if (usiaUnit === "BULAN" && usiaValue <= 12) {
      kelompok = "BAYI (1 BULAN - 12 BULAN)";
    } else if (usiaUnit === "TAHUN") {
      if (usiaValue <= 10) kelompok = "1-10";
      else if (usiaValue <= 20) kelompok = "11-20";
      else if (usiaValue <= 30) kelompok = "21-30";
      else if (usiaValue <= 40) kelompok = "31-40";
      else if (usiaValue <= 50) kelompok = "41-50";
      else if (usiaValue <= 60) kelompok = "51-60";
      else if (usiaValue <= 70) kelompok = "61-70";
      else if (usiaValue <= 80) kelompok = "71-80";
      else if (usiaValue <= 85) kelompok = "81-85";
      else kelompok = ">85";
    } else {
      kelompok = "LAINNYA";
    }

    // Inisialisasi kelompok usia jika belum ada
    if (!wadahBaru[diagnosa]["KELOMPOK USIA"][kelompok]) {
      wadahBaru[diagnosa]["KELOMPOK USIA"][kelompok] = {
        "LAKI-LAKI": 0,
        "PEREMPUAN": 0
      };
    }

    // Tambahkan jumlah sesuai gender dalam kelompok usia
    if (gender === "LAKI-LAKI" || gender === "PEREMPUAN") {
      wadahBaru[diagnosa]["KELOMPOK USIA"][kelompok][gender]++;
    }

    return wadahBaru;
  }, {});

  console.log("hasil rekap data morbiditas:", hasil);
  return hasil;
}
