import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Typography, Select, MenuItem, TextField, Table, TableBody,
  TableCell, TableHead, TableRow, Container, Paper, Box, Button,
  Chip, FormControl, InputLabel, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, LinearProgress, IconButton, Alert,
  CircularProgress, Avatar,
} from "@mui/material";
import * as XLSX from "xlsx";
import api from "../services/api";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

const yearMap = { FYBCA: 1, SYBCA: 2, TYBCA: 3 };
const TEAL = "#0d9488";
const TEAL_DARK = "#0f766e";

export default function Attendance() {
  const [year, setYear] = useState("FYBCA");
  const [division, setDivision] = useState("A");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [markingOpen, setMarkingOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { fetchStudents(); }, [year, division]);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    setAttendance({});
    try {
      const response = await api.get(`/api/admin/students/division?year=${yearMap[year]}&division=${division}`);
      setStudents(response.data);
    } catch {
      setError("Failed to load students. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const currentStudent = students[currentIndex];
  const totalStudents = students.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalStudents - 1;
  const markedCount = Object.keys(attendance).length;
  const presentCount = Object.values(attendance).filter(Boolean).length;

  const markAttendance = (status) => {
    if (!currentStudent) return;
    setAttendance((prev) => ({ ...prev, [currentStudent.rollNumber]: status }));
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  const saveRecords = async () => {
    if (markedCount === 0) { alert("No attendance to save."); return; }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/teacher/attendance", {
        year: yearMap[year], division, date: selectedDate, attendance,
      });
      setSuccess(`Attendance saved! ${presentCount} present, ${markedCount - presentCount} absent.`);
    } catch {
      setError("Failed to save attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const downloadReport = () => {
    if (markedCount === 0) { alert("No attendance marked yet!"); return; }
    const data = students.map((s) => ({
      "Roll No": s.rollNumber,
      "Student Name": s.fullName,
      "PR Number": s.prNumber,
      "Year": year, "Division": division, "Date": selectedDate,
      "Status": attendance[s.rollNumber] === true ? "Present" : attendance[s.rollNumber] === false ? "Absent" : "Not Marked",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `Attendance_${year}_${division}_${selectedDate}.xlsx`);
  };

  const progress = totalStudents > 0 ? ((currentIndex + 1) / totalStudents) * 100 : 0;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />

      {/* Hero Header */}
      <Box sx={{
        background: `linear-gradient(135deg, #064e3b 0%, #134e4a 50%, ${TEAL_DARK} 100%)`,
        pt: { xs: 3, md: 5 }, pb: { xs: 8, md: 10 }, px: { xs: 2, md: 5 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <Container maxWidth="xl">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.12)", p: 1.2, borderRadius: 2.5, display: "flex" }}>
                  <EventNoteRoundedIcon sx={{ color: "white", fontSize: 22 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: 2, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Attendance Management
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 900, letterSpacing: "-0.02em" }}>
                Mark Daily Attendance
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.65)", mt: 0.5 }}>
                {year} • Division {division} • {new Date(selectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DownloadRoundedIcon />}
                onClick={downloadReport} disabled={markedCount === 0}
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)", borderRadius: 2.5, textTransform: "none", fontWeight: 600, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" } }}>
                Export
              </Button>
              <Button variant="contained" startIcon={saving ? null : <SaveRoundedIcon />}
                onClick={saveRecords} disabled={markedCount === 0 || saving}
                sx={{ bgcolor: "white", color: "#064e3b", borderRadius: 2.5, fontWeight: 700, textTransform: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", "&:hover": { bgcolor: "#f0fdf4" } }}>
                {saving ? <CircularProgress size={20} sx={{ color: "#064e3b" }} /> : "Save Records"}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -4, position: "relative", zIndex: 2 }}>

        {/* Stats Row */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          {[
            { label: "Total Students", value: totalStudents, icon: <PeopleAltRoundedIcon />, color: TEAL },
            { label: "Marked", value: markedCount, icon: <CheckCircleRoundedIcon />, color: "#2563eb" },
            { label: "Present", value: presentCount, icon: <CheckCircleRoundedIcon />, color: "#10b981" },
            { label: "Absent", value: markedCount - presentCount, icon: <CancelRoundedIcon />, color: "#ef4444" },
          ].map((stat) => (
            <Paper key={stat.label} elevation={0} sx={{ flex: 1, p: 2.5, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "white", display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2.5 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</Typography>
                <Typography variant="h5" fontWeight={900} color="#0f172a">{stat.value}</Typography>
              </Box>
            </Paper>
          ))}
        </Stack>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>{success}</Alert>}

        {/* Filter Bar */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "white" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Year</InputLabel>
              <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)} sx={{ borderRadius: 2 }}>
                <MenuItem value="FYBCA">FYBCA</MenuItem>
                <MenuItem value="SYBCA">SYBCA</MenuItem>
                <MenuItem value="TYBCA">TYBCA</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Division</InputLabel>
              <Select value={division} label="Division" onChange={(e) => setDivision(e.target.value)} sx={{ borderRadius: 2 }}>
                <MenuItem value="A">Division A</MenuItem>
                <MenuItem value="B">Division B</MenuItem>
              </Select>
            </FormControl>
            <TextField type="date" size="small" value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              sx={{ width: 180, "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            <Button variant="contained" startIcon={loading ? null : <PlayArrowRoundedIcon />}
              onClick={() => { setCurrentIndex(0); setMarkingOpen(true); }}
              disabled={loading || totalStudents === 0}
              sx={{ bgcolor: "#0f172a", borderRadius: 2.5, textTransform: "none", fontWeight: 700, px: 3, "&:hover": { bgcolor: "#1e293b" } }}>
              {loading ? <CircularProgress size={20} color="inherit" /> : `Start Marking (${totalStudents} students)`}
            </Button>
          </Stack>
        </Paper>

        {/* Attendance Table */}
        {markedCount > 0 && (
          <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid #e2e8f0", bgcolor: "white", mb: 4 }}>
            <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9" }}>
              <Typography fontWeight={800} color="#0f172a">Attendance Summary</Typography>
              <Typography variant="body2" color="text.secondary">{markedCount} of {totalStudents} students marked</Typography>
            </Box>
            <Table>
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  {["Roll No", "Student Name", "PR Number", "Status"].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => {
                  const status = attendance[student.rollNumber];
                  return (
                    <TableRow key={student.prNumber} hover sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>{student.rollNumber}</TableCell>
                      <TableCell>{student.fullName}</TableCell>
                      <TableCell sx={{ color: "#64748b", fontFamily: "monospace" }}>{student.prNumber}</TableCell>
                      <TableCell>
                        {status !== undefined ? (
                          <Chip
                            icon={status ? <CheckCircleRoundedIcon style={{ fontSize: 14 }} /> : <CancelRoundedIcon style={{ fontSize: 14 }} />}
                            label={status ? "Present" : "Absent"}
                            size="small"
                            sx={{
                              bgcolor: status ? "#dcfce7" : "#fee2e2",
                              color: status ? "#166534" : "#991b1b",
                              fontWeight: 700, border: "none",
                              "& .MuiChip-icon": { color: "inherit" }
                            }}
                          />
                        ) : <Typography variant="body2" color="#cbd5e1">—</Typography>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>

      {/* Marking Modal */}
      <Dialog open={markingOpen} onClose={() => setMarkingOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 5, overflow: "hidden" } }}>
        <Box sx={{ background: `linear-gradient(135deg, #064e3b, ${TEAL_DARK})`, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={800} color="white">Mark Attendance</Typography>
            <IconButton onClick={() => setMarkingOpen(false)} sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "white" } }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.2)", "& .MuiLinearProgress-bar": { bgcolor: "white", borderRadius: 3 } }} />
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}>
            Student {currentIndex + 1} of {totalStudents}
          </Typography>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          {currentStudent && (
            <Box textAlign="center" py={2}>
              <Avatar sx={{ width: 72, height: 72, bgcolor: `${TEAL}20`, color: TEAL, fontSize: "1.8rem", fontWeight: 900, mx: "auto", mb: 2, borderRadius: 4 }}>
                {currentStudent.fullName?.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight={800} color="#0f172a">{currentStudent.fullName}</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Roll: {currentStudent.rollNumber} &nbsp;•&nbsp; PR: {currentStudent.prNumber}
              </Typography>
              <Typography variant="caption" sx={{ color: TEAL, fontWeight: 700 }}>{year} – Division {division}</Typography>

              <Stack direction="row" spacing={3} justifyContent="center" mt={5}>
                <Button variant={attendance[currentStudent.rollNumber] === true ? "contained" : "outlined"}
                  startIcon={<CheckCircleRoundedIcon />}
                  onClick={() => markAttendance(true)} size="large"
                  sx={{
                    minWidth: 160, py: 1.8, borderRadius: 3, fontWeight: 700, textTransform: "none",
                    ...(attendance[currentStudent.rollNumber] === true
                      ? { bgcolor: "#10b981", "&:hover": { bgcolor: "#059669" }, borderColor: "#10b981" }
                      : { color: "#10b981", borderColor: "#10b981", "&:hover": { bgcolor: "#f0fdf4" } })
                  }}>
                  Present
                </Button>
                <Button variant={attendance[currentStudent.rollNumber] === false ? "contained" : "outlined"}
                  startIcon={<CancelRoundedIcon />}
                  onClick={() => markAttendance(false)} size="large"
                  sx={{
                    minWidth: 160, py: 1.8, borderRadius: 3, fontWeight: 700, textTransform: "none",
                    ...(attendance[currentStudent.rollNumber] === false
                      ? { bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" }, borderColor: "#ef4444" }
                      : { color: "#ef4444", borderColor: "#ef4444", "&:hover": { bgcolor: "#fef2f2" } })
                  }}>
                  Absent
                </Button>
              </Stack>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
          <Button onClick={() => { if (!isFirst) setCurrentIndex((p) => p - 1); }} disabled={isFirst}
            sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600, flex: 1, py: 1.5, border: "1px solid #e2e8f0", color: "#475569" }}>
            ← Previous
          </Button>
          <Button variant="contained"
            onClick={() => isLast ? setMarkingOpen(false) : setCurrentIndex((p) => p + 1)}
            sx={{ bgcolor: "#0f172a", borderRadius: 2.5, textTransform: "none", fontWeight: 700, flex: 1, py: 1.5, "&:hover": { bgcolor: "#1e293b" } }}>
            {isLast ? "✓ Finish" : "Next →"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}