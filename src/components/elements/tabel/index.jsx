import { useLocation } from "react-router-dom";


function Tabel({ dataRekap }){
  const location = useLocation();
  const hasilRekap = dataRekap || {};
    console.log("Hasil Rekap:", hasilRekap);
  const diagnosaKeys = Object.keys(hasilRekap);

    return (
        <div className="table w-full shadow-lg border border-2 border-[#C0EBA6] rounded-2xl">
          {location.pathname === "/morbiditas" && 
          (
            <>
              <div className="table-header-group bg-[#C0EBA6] rounded-2xl p-2">
                <div className="table-row  ">
                  <div className="table-cell text-center rounded-tl-lg p-2">No</div>
                  <div className="table-cell text-left p-2">Diagnosa</div>
                  <div className="table-cell p-2 text-center text-md">Usia Dominan</div>
                  <div className="lg:table-cell text-center hidden lg:visible p-2">Jumlah Laki-Laki</div>
                  <div className="lg:table-cell text-center hidden lg:visible p-2">Jumlah Perempuan</div>
                  <div className="table-cell p-2 text-center rounded-tr-lg">Total</div>
                </div>
              </div>

            <div className="table-row-group">
            {diagnosaKeys.map((diagnosa, index) => {
              const info = hasilRekap[diagnosa];

              if (!info) return null; 
              return (
                <div className="table-row" key={diagnosa}>
                  <div className="table-cell  p-2 text-center">{index + 1}</div>
                  <div className="table-cell p-2 text-left">{diagnosa}</div>
                  <div className="table-cell p-2 text-center">{info["RATA-RATA USIA"]}</div>
                  <div className="hidden lg:visible lg:table-cell p-2 text-center">{info["JUMLAH LAKI-LAKI"]}</div>
                  <div className="hidden lg:table-cell lg:visible p-2 text-center">{info["JUMLAH PEREMPUAN"]}</div>
                  <div className="table-cell p-2 text-center">{info["TOTAL JUMLAH"]}</div>
                </div>
              );
            })}
          </div>
        </>
          )}

          {location.pathname === "/10penyakitterbanyak" && 
          (
            <>
              <div className="table-header-group bg-[#C0EBA6] rounded-2xl p-2">
                <div className="table-row  ">
                  <div className="table-cell text-center rounded-tl-lg p-2">No</div>
                  <div className="table-cell text-left p-2">Diagnosa</div>
                  <div className="table-cell p-2 text-md text-center">Usia Dominan</div>
                  <div className="lg:table-cell hidden lg:visible p-2 text-center">Jumlah Teredukasi</div>
                  <div className="table-cell p-2 rounded-tr-lg text-center">Total</div>
                </div>
              </div>

            <div className="table-row-group">
            {diagnosaKeys.map((diagnosa, index) => {
              const info = hasilRekap[diagnosa];

              if (!info) return null; 
              return (
                <div className="table-row" key={diagnosa}>
                  <div className="table-cell p-2 text-center">{index + 1}</div>
                  <div className="table-cell p-2 text-left">{diagnosa}</div>
                  <div className="table-cell p-2 text-center">{info["RATA-RATA USIA"]}</div>
                  <div className="hidden lg:visible lg:table-cell p-2 text-center">{info["TOTAL JUMLAH"]}</div>
                  <div className="table-cell p-2 text-center">{info["TOTAL JUMLAH"]}</div>
                </div>
              );
            })}
          </div>
            </>
          )}
          
        </div>
    )
}
export default Tabel;