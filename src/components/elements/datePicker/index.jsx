import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function DatePickerLaporan({value, onChange, format = "DD/MM/YYYY", label}) {
  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
    
          value={value}
          onChange={onChange}
          format={format}
          sx={{ width: '100%' }} 
      />
    </LocalizationProvider>
    </div>
  );
}



export default DatePickerLaporan;