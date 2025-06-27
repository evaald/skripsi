import { Select, MenuItem, FormControl} from "@mui/material";

function FilterSelect({value, onChange}) {

  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="ten">Ten</MenuItem>
        <MenuItem value="twenty">Twenty</MenuItem>
        <MenuItem value="thirty">Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
export default FilterSelect;