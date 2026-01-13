import { useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Typography, Select, MenuItem, TextField, Table, TableBody, 
  TableCell, TableHead, TableRow, Container, Paper, Box, Button, Chip,
  FormControl, InputLabel, IconButton, Tooltip, Stack
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  Save, CheckCircle, XCircle, Undo2, CalendarDays, Filter 
} from "lucide-react";  // ← much nicer icons than MUI defaults

export default function Attendance() {
  const [year, setYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});

  const students = [
    { id: 1, roll: "BCA101", name: "Rahul Sharma", batch: "2024" },
    { id: 2, roll: "BCA102", name: "Aisha Verma", batch: "2024" },
    { id: 3, roll: "BCA103", name: "Mohammed Asif", batch: "2024" },
    // ... more realistic length
  ];

  const toggleAttendance = (id, status) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === status ? undefined : status
    }));
  };

  const getStatusColor = (status) => {
    if (status === "P") return { bg: "#dcfce7", text: "#166534", border: "#86efac" };
    if (status === "A") return { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" };
    return { bg: "transparent", text: "#6b7280", border: "#d1d5db" };
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#f8fafc",
      background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            justifyContent="space-between" 
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={3}
            mb={4}
          >
            <Box>
              <Typography 
                variant="h4" 
                fontWeight={800} 
                color="text.primary"
                letterSpacing={-0.5}
                sx={{ background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Attendance
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Mark and manage student attendance • {new Date().toLocaleDateString()}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Undo2 size={18} />}
                onClick={() => setAttendance({})}
                sx={{ borderRadius: 2 }}
              >
                Reset
              </Button>
              
              <Button
                variant="contained"
                startIcon={<Save size={18} />}
                sx={{ 
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
                  boxShadow: "0 4px 14px rgba(15,23,42,0.18)",
                  "&:hover": { 
                    background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.22)"
                  },
                  transition: "all 0.2s"
                }}
              >
                Save Attendance
              </Button>
            </Stack>
          </Stack>

          {/* Filters – nicer layout */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3, 
              border: "1px solid",
              borderColor: "divider",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center"
            }}
          >
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="">All Years</MenuItem>
                <MenuItem value="1">1st Year</MenuItem>
                <MenuItem value="2">2nd Year</MenuItem>
                <MenuItem value="3">3rd Year</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Date"
              type="date"
              size="small"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 160 }}
            />

            <Tooltip title="More filters coming soon...">
              <IconButton color="primary" size="small">
                <Filter size={20} />
              </IconButton>
            </Tooltip>
          </Paper>

          {/* Table – modern card-like rows */}
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 3, 
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              background: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell width={100} sx={{ fontWeight: 700, color: "text.primary" }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Student Name</TableCell>
                  <TableCell width={120} sx={{ fontWeight: 700, color: "text.primary" }}>Batch</TableCell>
                  <TableCell align="center" width={280} sx={{ fontWeight: 700, color: "text.primary" }}>
                    Attendance
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student) => {
                  const status = attendance[student.id];
                  const colors = getStatusColor(status);

                  return (
                    <TableRow 
                      key={student.id}
                      hover
                      sx={{ 
                        transition: "all 0.15s",
                        "&:hover": { bgcolor: "grey.50" }
                      }}
                    >
                      <TableCell sx={{ fontFamily: "monospace", fontWeight: 600, color: "text.secondary" }}>
                        {student.roll}
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {student.name}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip 
                          label={student.batch} 
                          size="small"
                          sx={{ 
                            fontWeight: 600,
                            bgcolor: "grey.200",
                            color: "text.primary"
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1.5} justifyContent="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => toggleAttendance(student.id, "P")}
                            sx={{ 
                              minWidth: 100,
                              borderRadius: 20,
                              borderColor: colors.border,
                              bgcolor: status === "P" ? colors.bg : "transparent",
                              color: status === "P" ? colors.text : "text.secondary",
                              fontWeight: status === "P" ? 700 : 500,
                              "&:hover": {
                                bgcolor: colors.bg,
                                borderColor: colors.border,
                                color: colors.text,
                                transform: "scale(1.04)"
                              },
                              transition: "all 0.18s"
                            }}
                            startIcon={status === "P" ? <CheckCircle size={16} /> : null}
                          >
                            Present
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => toggleAttendance(student.id, "A")}
                            sx={{ 
                              minWidth: 100,
                              borderRadius: 20,
                              borderColor: colors.border,
                              bgcolor: status === "A" ? colors.bg : "transparent",
                              color: status === "A" ? colors.text : "text.secondary",
                              fontWeight: status === "A" ? 700 : 500,
                              "&:hover": {
                                bgcolor: colors.bg,
                                borderColor: colors.border,
                                color: colors.text,
                                transform: "scale(1.04)"
                              },
                              transition: "all 0.18s"
                            }}
                            startIcon={status === "A" ? <XCircle size={16} /> : null}
                          >
                            Absent
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>

          {/* Quick status summary */}
          {Object.keys(attendance).length > 0 && (
            <Box mt={3} textAlign="right">
              <Typography variant="body2" color="text.secondary">
                Marked: {Object.keys(attendance).length} of {students.length} students
              </Typography>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}