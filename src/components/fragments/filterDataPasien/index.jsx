import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePickerLaporan from "../../elements/datePicker/index";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


function FilterDataPasien({data}) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedRuangan, setSelectedRuangan] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 ambil path saat ini

  useEffect(() => {
  if (selectedStartDate && selectedEndDate) {
    const formattedStart = selectedStartDate.format("DD/MM/YYYY");
    const formattedEnd = selectedEndDate.format("DD/MM/YYYY");

    // HANYA tambahkan ke URL kalau user benar-benar pilih ruangan
    const ruanganQuery =
      selectedRuangan && selectedRuangan !== ""
        ? `&ruangan=${encodeURIComponent(selectedRuangan)}`
        : "";

    const genderQuery =
      selectedGender && selectedGender !== ""
        ? `&gender=${encodeURIComponent(selectedGender)}`
        : "";

    const targetPath = location.pathname;
    console.log("Navigasi ke:", targetPath);

    navigate(`${targetPath}?start=${formattedStart}&end=${formattedEnd}${ruanganQuery}${genderQuery}`);
  }
}, [selectedStartDate, selectedEndDate, selectedRuangan, selectedGender, navigate, location.pathname]);

  const handleRuanganChange = (event) => {
    setSelectedRuangan(event.target.value);
    console.log("Selected Ruangan:", event.target.value);}

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    console.log("Selected Gender:", event.target.value);}

  return (
    <div className="border-2 border-[#C5E1A5] rounded-2xl shadow-lg my-6 p-4 bg-white shadow-md">
      <h1 className="text-xl text-center font-bold">FILTER DATA PASIEN</h1>
      <div className="mt-3">
        <div className="lg:flex ">
          <div className="mb-2 lg:w-3/6">
            <p>Start Date</p>
            <DatePickerLaporan

              format="DD/MM/YYYY"
              value={selectedStartDate}
              onChange={(newValue) => {
                setSelectedStartDate(newValue);
                console.log("Start date:", newValue);
              }}
            />
          </div>

          <div className="hidden lg: block lg:flex lg:flex-row lg:justify-center lg:items-center lg:text-2xl lg:font-bold lg:p-8">
            <p>-</p>
          </div>

          <div className="mb-2 lg:w-3/6">
            <p>End Date</p>
            <DatePickerLaporan
  
              format="DD/MM/YYYY"
              value={selectedEndDate}
              onChange={(newValue) => {
                setSelectedEndDate(newValue);
                console.log("End date:", newValue);
              }}
            />
          </div>
        </div>
        {location.pathname === "/morbiditas" ? (
          <div className="w-full">
            <div className="w-full">
            <p>Ruangan</p>
            <FormControl className="w-full">
              <Select
              value={selectedRuangan || ""}
              onChange={handleRuanganChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">Semua</MenuItem> {/* ✅ Ini baru */}
              {Array.isArray(data) &&
                [...new Set(data.map((item) => item.RUANGAN))]
                  .filter(Boolean)
                  .sort()
                  .map((ruangan, index) => (
                    <MenuItem key={index} value={ruangan}>
                      {ruangan}
                    </MenuItem>
                  ))}
            </Select>

            </FormControl>
          </div>
          <div className="w-full">
            <p>Jenis Kelamin</p>
            <FormControl className="w-full">
                <Select
                  value={selectedGender || ""}
                  onChange={handleGenderChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">Semua</MenuItem>
                  <MenuItem value="Laki-Laki">Laki-Laki</MenuItem>
                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                </Select>

            </FormControl>
          </div>
        </div>
        ) : (
          <div className="w-full">
            <p>Ruangan</p>
            <FormControl className="w-full">
              <Select
                value={selectedRuangan || ""}
                onChange={handleRuanganChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {Array.isArray(data) &&
                  [...new Set(data.map((item) => item.RUANGAN))]
                    .filter(Boolean)
                    .sort()
                    .map((ruangan, index) => (
                      <MenuItem key={index} value={ruangan}>
                        {ruangan}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </div>
        )}

        
      </div>
    </div>
  );
}

export default FilterDataPasien;
