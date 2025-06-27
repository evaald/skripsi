import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// 1. Styling dulu
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    borderBottom: "1pt solid black",
    padding: 5,
  },
  cell: {
    flex: 1,
    borderBottom: "0.5pt solid gray",
    padding: 5,
  },
});

const renderKelompokUsia = (kelompokUsia) => {
  return Object.entries(kelompokUsia)
    .map(([rentang, detail]) => {
      // return `${rentang} (L: ${detail["LAKI-LAKI"]}, P: ${detail["PEREMPUAN"]})`;
       return `${rentang}`;
    })
    .join("; ");
};

// 2. Komponen dokumen PDF
const LaporanPDF = ({ data, judulPdf,tipe }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
        {judulPdf}
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>Diagnosa</Text>
          <Text style={styles.cellHeader}>Rata-rata Usia</Text>
          {/* <Text style={styles.cellHeader}>Kelompok Usia</Text> */}
          {tipe === "morbiditas" && <Text style={styles.cellHeader}>Kelompok Usia</Text>}
          <Text style={styles.cellHeader}>Laki-laki</Text>
          <Text style={styles.cellHeader}>Perempuan</Text>
          <Text style={styles.cellHeader}>Total</Text>
        </View>

       {Object.keys(data).length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Tidak ada data untuk rentang tanggal ini.</Text>
        ) : (
        Object.entries(data).map(([diagnosa, item], i) => (
            <View style={styles.row} key={i}>
            <Text style={styles.cell}>{diagnosa}</Text>
            <Text style={styles.cell}>{item["RATA-RATA USIA"]}</Text>
            {/* <Text style={styles.cell}>{renderKelompokUsia(item["KELOMPOK USIA"])}</Text> */}
            
            {tipe === "morbiditas" && (
              <Text style={styles.cell}>
                {renderKelompokUsia(item["KELOMPOK USIA"] || {})}
              </Text>
            )}
            <Text style={styles.cell}>{item["JUMLAH LAKI-LAKI"]}</Text>
            <Text style={styles.cell}>{item["JUMLAH PEREMPUAN"]}</Text>
            <Text style={styles.cell}>{item["TOTAL JUMLAH"]}</Text>
            </View>
        ))
        )}
      </View>
    </Page>
  </Document>
);

export default LaporanPDF;
