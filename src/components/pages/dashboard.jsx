import Logo from "../elements/logo";
import FragmenHamburgerMenu from "../fragments/hamburgerMenu";
import LogoRsud from "../../components/imageAndVector/download.webp";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import filterDataByTanggal from "../../filteredData";
import ExcelUploader from "../fragments/excelDrop/excelDragDrop";

function Dashboard() {
  const [searchParams] = useSearchParams();
  let role = localStorage.getItem("role");
  const [uploadedData, setUploadedData] = useState([]);
  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadedPasien");
    if (storedData) {
      setUploadedData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const updateChartWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) setChartWidth(300);
      else if (screenWidth < 1024) setChartWidth(600);
      else setChartWidth(800);
    };
    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);
    return () => window.removeEventListener("resize", updateChartWidth);
  }, []);

  const namaBulan = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];

  let labelBulan = "BULAN TIDAK DIKETAHUI";
  let startDate = "";
  let endDate = "";
  let filteredData = [];

  if (uploadedData.length > 0) {
    function parseDate(str) {
      if (typeof str !== "string") return null;
      const parts = str.split("/");
      if (parts.length !== 3) return null;
      const [day, month, year] = parts.map(Number);
      
      // Validasi input
      if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
      if (day < 1 || day > 31 || month < 1 || month > 12) return null;
      
      const date = new Date(year, month - 1, day);
      return isNaN(date) ? null : date;
    }

    const semuaTanggal = uploadedData
      .map(item => parseDate(item.TANGGAL))
      .filter(date => date !== null);

    if (semuaTanggal.length > 0) {
      const latestDate = new Date(Math.max(...semuaTanggal));
      const latestMonth = latestDate.getMonth();
      const latestYear = latestDate.getFullYear();

      const lastDay = new Date(latestYear, latestMonth + 1, 0).getDate();
      startDate = `01/${String(latestMonth + 1).padStart(2, "0")}/${latestYear}`;
      endDate = `${lastDay}/${String(latestMonth + 1).padStart(2, "0")}/${latestYear}`;
      labelBulan = `BULAN ${namaBulan[latestMonth]}`;

      filteredData = filterDataByTanggal(uploadedData, startDate, endDate, null);
      console.log("Filtered Data:", filteredData);
      console.log("Start Date:", startDate, "End Date:", endDate);
      console.log("Latest Date:", latestDate);
      console.log("Sample dates:", semuaTanggal.slice(0, 5));
    }
  }

  const top5 = Object.entries(filteredData)
    .sort(([, a], [, b]) => b["TOTAL JUMLAH"] - a["TOTAL JUMLAH"])
    .slice(0, 30);

  const diagnosaList = top5.map(([nama]) => nama);
  const semuaRuangan = [...new Set(top5.map(([, val]) => val.RUANGAN))];

  const dataByRuangan = {};
  semuaRuangan.forEach((ruang) => {
    dataByRuangan[ruang] = diagnosaList.map((diagnosa) => {
      const found = top5.find(([key, val]) => key === diagnosa && val.RUANGAN === ruang);
      if (found) {
        const val = found[1];
        return {
          total: val["TOTAL JUMLAH"],
          laki: val["JUMLAH LAKI-LAKI"],
          perempuan: val["JUMLAH PEREMPUAN"]
        };
      } else {
        return { total: 0, laki: 0, perempuan: 0 };
      }
    });
  });

  let title = role === "admin" ? "Dashboard Admin" : "Dashboard Manajemen";

  return (
    <div className="lg:flex lg:justify-end lg:w-full">
      <FragmenHamburgerMenu />
      <div className="mx-4 lg:ml-66 lg:pr-8 lg:w-full min-h-screen lg:pl-10 lg:py-4 bg-white lg:z-50 lg:rounded-4xl lg:shadow-lg">
        <div className="lg:hidden">
          <Logo
            src={LogoRsud}
            alt="Logo RSUD Kanjuruhan Kepanjen"
            className2="flex flex-col items-center justify-center"
            className="h-28 w-28"
            classNameLabel="mt-2 text-center text-sm font-semibold text-gray-800"
            label="RSUD KANJURUHAN KEPANJEN"
          />
        </div>
        <div className="my-4 p-4 text-center lg:text-left bg-[#C0EBA6] rounded-2xl shadow-lg">
          <div className="lg:hidden italic text-xl font-black">
            <h1>SELAMAT DATANG DI</h1>
            <h1>{title.toUpperCase()}</h1>
          </div>
          <div className="hidden lg:block lg:text-3xl lg:font-black lg:p-3">
            <p>SELAMAT DATANG DI {title.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-[#C5E1A5] rounded-2xl shadow-lg p-6 my-4">
          <h1 className="text-2xl text-center font-bold mb-4">
            TREN PENYAKIT TERBANYAK {labelBulan}
          </h1>
          {diagnosaList.length === 0 ? (
            <div className="text-center text-gray-600 font-semibold mt-6">
              <p className="mb-4">Data belum ditemukan.</p>
              <p className="mb-2">Masukkan file morbiditas-mu di sini:</p>
              <ExcelUploader onDataParsed={setUploadedData} />
            </div>
          ) : (
            <>
              <ExcelUploader onDataParsed={setUploadedData} />
              <LineChart
                xAxis={[{ data: diagnosaList, scaleType: "band", label: "Diagnosa" }]}
                yAxis={[{ label: "Jumlah Pasien" }]}
                height={400}
                width={chartWidth}
                series={semuaRuangan.map((ruang, index) => ({
                  id: `ruang-${index}`,
                  label: ruang,
                  data: dataByRuangan[ruang].map(d => d.total),
                  color: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC", "#26C6DA"][index % 5],
                  highlightScope: { highlight: "item" },
                  curve: "linear",
                  showMark: true
                }))}
                tooltip={{
                  trigger: "item",
                  formatter: (params) => {
                    const { seriesId, dataIndex } = params;
                    const ruang = semuaRuangan[parseInt(seriesId.split("-")[1])];
                    const data = dataByRuangan[ruang][dataIndex];
                    return `${ruang}<br/>Laki: ${data.laki}, Perempuan: ${data.perempuan}<br/>Total: ${data.total}`;
                  }
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;