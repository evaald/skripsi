import Logo from "../elements/logo";
import FragmenHamburgerMenu from "../fragments/hamburgerMenu";
import LogoRsud from "../../components/imageAndVector/download.webp";
import { BarChart } from '@mui/x-charts/BarChart';
import filterPenyakitTerbanyak from "../../filterPenyakitTerbanyak";
import { dataPasien } from "../../data";
import { useEffect, useState } from "react";

function Dashboard() {

  const top10 = filterPenyakitTerbanyak(dataPasien, "01/01/2025", "31/01/2025");

  const top5 = Object.entries(top10)
    .sort(([, a], [, b]) => b["TOTAL JUMLAH"] - a["TOTAL JUMLAH"])
    .slice(0, 5);

  const labels = top5.map(([diagnosa]) => diagnosa);
  const totals = top5.map(([, item]) => item["TOTAL JUMLAH"]);

const [chartWidth, setChartWidth] = useState(800);

useEffect(() => {
  const updateChartWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setChartWidth(300); // sm
    }  else if (screenWidth < 1024) {
      setChartWidth(600); // md
    } else {
      setChartWidth(800); // lg+
    }
  };

  updateChartWidth(); // set on mount
  window.addEventListener("resize", updateChartWidth);

  return () => window.removeEventListener("resize", updateChartWidth);
}, []);
  return (
    <div className="lg:flex lg:justify-end lg:w-full ">
      <FragmenHamburgerMenu />
      <div className="mx-4 lg:ml-66 lg:w-full min-h-screen lg:pl-10 lg:py-4 lg:pb-4 bg-white lg:z-50 lg:rounded-4xl lg:shadow-lg"> 
        <div className="lg:hidden">
          <Logo 
            src={LogoRsud}
            alt="Logo RSUD Kanjuruhan Kepanjen"
            className2="flex flex-col items-center justify-center"
            className="h-28 w-28"
            label="RSUD KANJURUHAN KEPANJEN"/>
        </div>
        <div className="my-4 p-4 text-center lg:text-left bg-[#C0EBA6] rounded-2xl shadow-lg">
          <div className="lg:hidden italic text-2xl font-black"> 
            <h1>SELAMAT DATANG </h1>
            <h1 >ADMIN PATIMURA </h1>
          </div>
          <div className="hidden lg:block">
            <p >Selamat Datang Admin Patimura </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-[#C5E1A5] rounded-2xl shadow-lg p-6 my-4">
          <h1 className="text-2xl text-center font-bold mb-4">5 PENYAKIT TERBANYAK BULAN JANUARI</h1>
          {top5.length === 0 ? (
            <p className="text-center mt-4">Tidak ada data untuk ditampilkan.</p>
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
