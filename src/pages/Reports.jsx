import Sidebar from "../components/Navbar";
import { Typography } from "@mui/material";

export default function Reports() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 220, padding: 20 }}>
        <Typography variant="h4">Reports</Typography>
      </div>
    </div>
  );
}
