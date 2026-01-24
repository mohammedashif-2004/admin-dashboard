import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Typography, Container, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Box, TextField, Button, Chip, Stack, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { motion } from "framer-motion";
import { Save, Calculator, Trophy, AlertCircle } from "lucide-react";

export default function Results() {
  const [subject, setSubject] = useState("Mathematics");
  const [marks, setMarks] = useState({ 1: 85, 2: 92, 3: 45 }); // Pre-filled for demo

  const students = [
    { id: 1, roll: "BCA101", name: "Rahul Sharma" },
    { id: 2, roll: "BCA102", name: "Aisha Verma" },
    { id: 3, roll: "BCA103", name: "Mohammed Asif" },
  ];

  const handleMarksChange = (id, value) => {
    // Limit to 0-100
    const val = Math.min(100, Math.max(0, Number(value)));
    setMarks({ ...marks, [id]: val });
  };

  const getGrade = (score) => {
    if (!score && score !== 0) return "-";
    if (score >= 90) return { label: "A+", color: "success" };
    if (score >= 75) return { label: "A", color: "success" };
    if (score >= 60) return { label: "B", color: "primary" };
    if (score >= 40) return { label: "C", color: "warning" };
    return { label: "F", color: "error" };
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          
          {/* Header Section */}
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={5}>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary">
                Student Results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter marks and calculate grades automatically
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Save size={18} />}
              sx={{ borderRadius: 2, px: 3, py: 1, textTransform: "none" }}
            >
              Publish Results
            </Button>
          </Stack>

          {/* Controls */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: "1px solid #e2e8f0" }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Select Subject</InputLabel>
                <Select value={subject} label="Select Subject" onChange={(e) => setSubject(e.target.value)}>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Data Structures">Data Structures</MenuItem>
                </Select>
              </FormControl>
              <Chip icon={<Calculator size={14} />} label="Auto-grading Active" color="primary" variant="outlined" />
            </Stack>
          </Paper>

          {/* Table */}
          <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell><strong>Roll No</strong></TableCell>
                  <TableCell><strong>Student Name</strong></TableCell>
                  <TableCell width={200}><strong>Marks (Out of 100)</strong></TableCell>
                  <TableCell align="center"><strong>Grade</strong></TableCell>
                  <TableCell align="right"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => {
                  const score = marks[s.id] || "";
                  const grade = getGrade(score);
                  
                  return (
                    <TableRow key={s.id} hover>
                      <TableCell sx={{ fontFamily: "monospace", color: "text.secondary" }}>{s.roll}</TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>{s.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          placeholder="00"
                          value={score}
                          onChange={(e) => handleMarksChange(s.id, e.target.value)}
                          InputProps={{ inputProps: { min: 0, max: 100 } }}
                          sx={{ 
                            "& .MuiOutlinedInput-root": { borderRadius: 2 }
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {score !== "" && (
                          <Chip 
                            label={grade.label} 
                            color={grade.color} 
                            size="small" 
                            sx={{ fontWeight: 800, minWidth: 40 }} 
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {score !== "" ? (
                          score >= 40 ? 
                          <Box display="flex" alignItems="center" justifyContent="flex-end" color="success.main" gap={1}>
                            <Trophy size={16} /> <Typography variant="caption" fontWeight={700}>PASS</Typography>
                          </Box> :
                          <Box display="flex" alignItems="center" justifyContent="flex-end" color="error.main" gap={1}>
                            <AlertCircle size={16} /> <Typography variant="caption" fontWeight={700}>FAIL</Typography>
                          </Box>
                        ) : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}