export function rekapData(data) {
  const hasil = data.reduce((wadahBaru, itemSaatIni) => {
    const diagnosa = itemSaatIni["DIAGNOSA"];
    const gender = itemSaatIni["JENIS KELAMIN"];
    const umurObj = itemSaatIni["UMUR"];
    const ruangan = itemSaatIni["RUANGAN"];
    const usiaValue = umurObj.value;
    const usiaUnit = umurObj.unit;

    if (!wadahBaru[diagnosa]) {
      wadahBaru[diagnosa] = {
        hitungUsia: {},
        "RUANGAN": ruangan,
        "RATA-RATA USIA": null,
        "JUMLAH LAKI-LAKI": 0,
        "JUMLAH PEREMPUAN": 0,
        "TOTAL JUMLAH": 0
      };
    }

    if (gender === "LAKI-LAKI") {
      wadahBaru[diagnosa]["JUMLAH LAKI-LAKI"]++;
    } else if (gender === "PEREMPUAN") {
      wadahBaru[diagnosa]["JUMLAH PEREMPUAN"]++;
    }

    wadahBaru[diagnosa]["TOTAL JUMLAH"]++;

   // Hitung usia yang paling sering muncul
    if (typeof wadahBaru[diagnosa].hitungUsia[usiaValue] === "undefined") {
      wadahBaru[diagnosa].hitungUsia[usiaValue] = 0;
    }
    wadahBaru[diagnosa].hitungUsia[usiaValue]++;

    const jumlahUmurSaatIni = wadahBaru[diagnosa].hitungUsia[usiaValue];
    const rataRataUsiaTerbanyak = wadahBaru[diagnosa]["RATA-RATA USIA"];

    if (
      rataRataUsiaTerbanyak === null ||
      jumlahUmurSaatIni > wadahBaru[diagnosa].hitungUsia[rataRataUsiaTerbanyak]
    ) {
      wadahBaru[diagnosa]["RATA-RATA USIA"] = usiaValue;
    }

    return wadahBaru;
  }, {});

  return hasil;
}
