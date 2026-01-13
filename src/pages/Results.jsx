import { useState } from "react";
import Sidebar from "../components/Navbar";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function Results() {
  const [subject, setSubject] = useState("");

  const students = [
    { id: 1, roll: "BCA101", name: "Rahul" },
    { id: 2, roll: "BCA102", name: "Aisha" },
    { id: 3, roll: "BCA103", name: "Mohammed" },
  ];

  const [marks, setMarks] = useState({});

  const handleMarks = (id, value) => {
    setMarks({ ...marks, [id]: value });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: 220, padding: 20, width: "100%" }}>
        <Typography variant="h4">Upload Results</Typography>

        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <Table style={{ marginTop: 30 }}>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.roll}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    onChange={(e) => handleMarks(s.id, e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button variant="contained" style={{ marginTop: 20 }}>
          Save Results
        </Button>
      </div>
    </div>
  );
}
