import Button from "../elements/button";
import Tabel from "../elements/tabel";
import FilterDataPasien from "../fragments/filterDataPasien";
import FragmenHamburgerMenu from "../fragments/hamburgerMenu";
import { rekapData } from "../../rekapDataMorbiditas";
// import { dataPasien } from "../../data";
import filterPenyakitTerbanyak from "../../filterPenyakitTerbanyak";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LaporanPDF from "../elements/pdf/pdf";
import { useSearchParams } from "react-router-dom";




function PenyakitTerbanyak() {

  const dataPasien = localStorage.getItem('uploadedPasien')
  ? JSON.parse(localStorage.getItem('uploadedPasien'))
  : [];

  const rekap = rekapData(dataPasien);
  console.log(rekap);

  // ambil dari query params
const [searchParams] = useSearchParams();
const startDate = searchParams.get("start");
const endDate = searchParams.get("end");
const ruangan = searchParams.get("ruangan");

console.log("ini start date :", startDate, "dan ini end date", endDate, "dan ini ruangan", ruangan);


const hasilFilter = startDate && endDate
  ? filterPenyakitTerbanyak(dataPasien, startDate, endDate, ruangan)
  : filterPenyakitTerbanyak(dataPasien, "01/07/2025", "31/07/2025", null);;



  return (
   <div className="lg:flex lg:w-full">
      <FragmenHamburgerMenu />
      <div className="mx-4 min-h-screen lg:pr-8 lg:ml-66 lg:w-full lg:pl-10 lg:py-4 lg:pb-4 lg:bg-white lg:z-50 lg:rounded-4xl lg:shadow-lg">
         <div className="mt-2 text-center p-8 bg-[#C0EBA6] rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold">LAPORAN 10 PENYAKIT TERBANYAK</h1>
        </div>

        <FilterDataPasien data={dataPasien}/>
        <Tabel dataRekap={hasilFilter}/>

        <div className="flex justify-center">
          <PDFDownloadLink
            key={JSON.stringify(hasilFilter)}
            document={
              (() => {
                try {
                  return <LaporanPDF data={hasilFilter} judulPdf="Laporan 10 Penyakit Terbanyak Pattimura" />;
                } catch (error) {
                  console.error("PDF Error:", error);
                  return <LaporanPDF data={{}} judulPdf="Laporan 10 Penyakit Terbanyak Pattimura" />;
                }
              })()
            }
            fileName="Laporan_penyakit terbanyak.pdf"
          >
            {({ loading }) =>
              loading ? "Loading..." : (
                <Button
                  className="bg-yellow-300 p-3 w-56 rounded-full mt-8 mb-4"
                  label="Download PDF"
                />
              )
            }
          </PDFDownloadLink>
        </div>
        
      </div>
      
    </div>
  );
}
export default PenyakitTerbanyak;