import Logo from "../elements/logo";
import FragmenHamburgerMenu from "../fragments/hamburgerMenu";
import LogoRsud from "../../components/imageAndVector/download.webp";
import { BarChart } from "@mui/x-charts/BarChart";
import filterPenyakitTerbanyak from "../../filterPenyakitTerbanyak";
import { dataPasien } from "../../data";
import { useEffect, useState } from "react";
import FilterDataPasien from "../fragments/filterDataPasien";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start") || "";
  const endDate = searchParams.get("end") || "";
  const ruangan = searchParams.get("ruangan") || "";
  console.log("START DATE", startDate);
  console.log("END DATE", endDate);
  console.log("RUANGAN", ruangan);
  let role = localStorage.getItem("role");
  const top10 = filterPenyakitTerbanyak(
    dataPasien,
    startDate,
    endDate,
    ruangan
  );
  const namaBulan = [
  "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
  "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
];

let labelBulan = "BULAN JANUARI"; // default

if (startDate && endDate) {
  const [startDay, startMonth] = startDate.split("/");
  const [endDay, endMonth] = endDate.split("/");

  console.log(startDay)
  console.log(endDay)

  const namaStart = namaBulan[parseInt(startMonth, 10) - 1];
  const namaEnd = namaBulan[parseInt(endMonth, 10) - 1];

  labelBulan = namaStart === namaEnd
    ? `BULAN ${namaStart}`
    : `BULAN ${namaStart} - ${namaEnd}`;
}

    const top10Admin = filterPenyakitTerbanyak(
    dataPasien,
    "01/01/2025",
    "01/31/2025"
  );

  let top5 = [];

  const top5Manajemen = Object.entries(top10)
    .sort(([, a], [, b]) => b["TOTAL JUMLAH"] - a["TOTAL JUMLAH"])
    .slice(0, 5);

  const top5Admin = Object.entries(top10Admin)
    .sort(([, a], [, b]) => b["TOTAL JUMLAH"] - a["TOTAL JUMLAH"])
    .slice(0, 5);

  if(role === "admin") {
     top5 = top5Admin;
  }else if(role === "manajemen") {
    top5 = top5Manajemen;
  };

  const labels = top5.map(([diagnosa]) => diagnosa);
  const totals = top5.map(([, item]) => item["TOTAL JUMLAH"]);

  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const updateChartWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setChartWidth(300); // sm
      } else if (screenWidth < 1024) {
        setChartWidth(600); // md
      } else {
        setChartWidth(800); // lg+
      }
    };

    updateChartWidth(); // set on mount
    window.addEventListener("resize", updateChartWidth);

    return () => window.removeEventListener("resize", updateChartWidth);
  }, []);

 
  let title = role === "admin" ? "Dashboard Admin" : "Dashboard Manajemen";
  return (
    <div className="lg:flex lg:justify-end lg:w-full ">
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
            <h1>{title.toUpperCase()} </h1>
          </div>
          <div className="hidden lg:block lg:text-3xl lg:font-black lg:p-3">
            <p>SELAMAT DATANG DI {title.toUpperCase()}</p>
          </div>
        </div>
        {role === "manajemen" ? (
          <FilterDataPasien data={dataPasien} />
        ) : null}
        <div className="flex flex-col items-center justify-center border-2 border-[#C5E1A5] rounded-2xl shadow-lg p-6 my-4">
          <h1 className="text-2xl text-center font-bold mb-4">
            5 PENYAKIT TERBANYAK {labelBulan}

          </h1>
          {top5.length === 0 ? (
            <p className="text-center mt-4">
              Tidak ada data untuk ditampilkan.
            </p>
          ) : (
            <BarChart
              xAxis={[{ data: labels, scaleType: "band" }]}
              series={[{ data: totals, label: "Total Penderita" }]}
              height={320}
              width={chartWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
