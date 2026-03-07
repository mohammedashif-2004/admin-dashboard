import React, { useState } from "react";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import {
  Box, Container, Typography, Paper, Stack, Button, Select, MenuItem,
  FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Chip, IconButton, Divider, Avatar,
} from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const TEAL = "#0d9488";
const TEAL_DARK = "#0f766e";

const SUBJECTS = ["Mathematics", "Data Structures", "Web Development", "Python", "Operating Systems", "Networking", "DBMS", "Software Engineering"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CLASSES = ["FYBCA", "SYBCA", "TYBCA"];
const DIVISIONS = ["A", "B"];
const TIME_SLOTS = ["08:15 - 09:15", "09:15 - 10:15", "10:15 - 11:15", "11:15 - 11:30", "11:30 - 12:30", "12:30 - 01:30", "01:30 - 02:30"];

const TYPE_STYLES = {
  Theory: { bg: "#e0f2fe", color: "#0369a1", border: "#bae6fd" },
  Lab: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Tutorial: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
};

export default function TimeTable() {
  const [allData, setAllData] = useState({});
  const [currentClass, setCurrentClass] = useState("FYBCA");
  const [currentDiv, setCurrentDiv] = useState("A");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [form, setForm] = useState({ subject: "", startTime: "08:15", endTime: "09:15", type: "Theory", teacher: "", room: "" });

  const classKey = `${currentClass}-${currentDiv}`;
  const schedule = allData[classKey] || {};

  const handleCellClick = (day, slot) => {
    if (slot === "11:15 - 11:30") return;
    setActiveDay(day);
    setActiveSlot(slot);
    setForm({ subject: "", startTime: slot.split(" - ")[0], endTime: slot.split(" - ")[1], type: "Theory", teacher: "", room: "" });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.subject) return;
    const entry = { ...form, id: Date.now() };
    const key = `${activeDay}__${activeSlot}`;
    setAllData((prev) => ({
      ...prev,
      [classKey]: { ...schedule, [key]: entry },
    }));
    setModalOpen(false);
  };

  const handleDelete = (day, slot) => {
    const key = `${day}__${slot}`;
    const updated = { ...schedule };
    delete updated[key];
    setAllData((prev) => ({ ...prev, [classKey]: updated }));
  };

  const handleExport = () => {
    const rows = [];
    TIME_SLOTS.forEach((slot) => {
      DAYS.forEach((day) => {
        const entry = schedule[`${day}__${slot}`];
        if (entry) rows.push({ Day: day, Time: slot, Subject: entry.subject, Type: entry.type, Teacher: entry.teacher, Room: entry.room });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timetable");
    XLSX.writeFile(wb, `${classKey}_Timetable.xlsx`);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{
        background: `linear-gradient(135deg, #064e3b 0%, #134e4a 50%, ${TEAL_DARK} 100%)`,
        pt: { xs: 3, md: 5 }, pb: { xs: 8, md: 10 }, px: { xs: 2, md: 5 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <Container maxWidth="xl">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.12)", p: 1.2, borderRadius: 2.5, display: "flex" }}>
                  <ScheduleRoundedIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: 2, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Class Schedule
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 900, letterSpacing: "-0.02em" }}>Timetable Manager</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.65)", mt: 0.5 }}>{currentClass} – Division {currentDiv}</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DownloadRoundedIcon />} onClick={handleExport}
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)", borderRadius: 2.5, textTransform: "none", fontWeight: 600, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" } }}>
                Export Excel
              </Button>
              <Button variant="contained" startIcon={<RefreshRoundedIcon />}
                onClick={() => setAllData((p) => ({ ...p, [classKey]: {} }))}
                sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "white", borderRadius: 2.5, textTransform: "none", fontWeight: 600, boxShadow: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.22)" } }}>
                Reset
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -4, pb: 8, position: "relative", zIndex: 2 }}>

        {/* Controls */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "white" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Class</InputLabel>
              <Select value={currentClass} label="Class" onChange={(e) => setCurrentClass(e.target.value)} sx={{ borderRadius: 2 }}>
                {CLASSES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Division</InputLabel>
              <Select value={currentDiv} label="Division" onChange={(e) => setCurrentDiv(e.target.value)} sx={{ borderRadius: 2 }}>
                {DIVISIONS.map((d) => <MenuItem key={d} value={d}>Division {d}</MenuItem>)}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
              {Object.entries(TYPE_STYLES).map(([type, style]) => (
                <Chip key={type} label={type} size="small"
                  sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, border: `1px solid ${style.border}` }} />
              ))}
            </Stack>
          </Stack>
        </Paper>

        {/* Timetable Grid */}
        <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "white", overflow: "hidden" }}>
          <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 900 }}>
              {/* Header Row */}
              <Box sx={{ display: "grid", gridTemplateColumns: "140px repeat(6, 1fr)", bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <Box sx={{ p: 2, borderRight: "1px solid #e2e8f0" }}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>Time</Typography>
                </Box>
                {DAYS.map((day) => (
                  <Box key={day} sx={{ p: 2, textAlign: "center", borderRight: "1px solid #f1f5f9" }}>
                    <Typography variant="caption" fontWeight={700} color="#475569" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>{day.slice(0, 3)}</Typography>
                    <Typography variant="body2" fontWeight={800} color="#0f172a">{day}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Time Rows */}
              {TIME_SLOTS.map((slot) => {
                const isBreak = slot === "11:15 - 11:30";
                return (
                  <Box key={slot} sx={{ display: "grid", gridTemplateColumns: "140px repeat(6, 1fr)", borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" } }}>
                    {/* Time Label */}
                    <Box sx={{ p: 2, borderRight: "1px solid #e2e8f0", bgcolor: isBreak ? "#fef3c7" : "#fafafa", display: "flex", alignItems: "center" }}>
                      <Typography variant="caption" fontWeight={700} color={isBreak ? "#92400e" : "#64748b"} sx={{ lineHeight: 1.4 }}>
                        {slot.replace(" - ", "\n")}
                      </Typography>
                    </Box>
                    {/* Day Cells */}
                    {DAYS.map((day) => {
                      const key = `${day}__${slot}`;
                      const entry = schedule[key];
                      const style = entry ? TYPE_STYLES[entry.type] : null;
                      return (
                        <Box key={`${day}-${slot}`}
                          onClick={() => !isBreak && !entry && handleCellClick(day, slot)}
                          sx={{
                            p: 1.5, borderRight: "1px solid #f1f5f9", minHeight: isBreak ? 44 : 90,
                            bgcolor: isBreak ? "#fef9e7" : "transparent",
                            cursor: isBreak || entry ? "default" : "pointer",
                            "&:hover": !isBreak && !entry ? { bgcolor: `${TEAL}08` } : {},
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                          {isBreak ? (
                            <Typography variant="caption" fontWeight={700} color="#92400e">☕ Break</Typography>
                          ) : entry ? (
                            <Box sx={{ width: "100%", bgcolor: style.bg, borderRadius: 2.5, p: 1.5, borderLeft: `3px solid ${style.color}`, position: "relative" }}>
                              <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(day, slot); }}
                                sx={{ position: "absolute", top: 2, right: 2, opacity: 0, width: 20, height: 20, "&:hover": { color: "#ef4444" }, ".MuiBox-root:hover &": { opacity: 1 } }}>
                                <CloseRoundedIcon sx={{ fontSize: 12 }} />
                              </IconButton>
                              <Typography variant="caption" fontWeight={800} color={style.color} display="block" sx={{ pr: 2, lineHeight: 1.3 }}>
                                {entry.subject}
                              </Typography>
                              {entry.teacher && (
                                <Typography variant="caption" color={style.color} sx={{ opacity: 0.75, display: "block", mt: 0.3 }}>
                                  {entry.teacher}
                                </Typography>
                              )}
                              {entry.room && (
                                <Typography variant="caption" color={style.color} sx={{ opacity: 0.65, display: "block" }}>
                                  📍 {entry.room}
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#cbd5e1" }}>
                              <AddRoundedIcon sx={{ fontSize: 20 }} />
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Add Session Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}>
        <Box sx={{ background: `linear-gradient(135deg, #064e3b, ${TEAL_DARK})`, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={800} color="white">Add Session</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>{activeDay} • {activeSlot}</Typography>
            </Box>
            <IconButton onClick={() => setModalOpen(false)} sx={{ color: "rgba(255,255,255,0.7)" }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select value={form.subject} label="Subject" onChange={(e) => setForm({ ...form, subject: e.target.value })} sx={{ borderRadius: 2 }}>
                {SUBJECTS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
              {["Theory", "Lab", "Tutorial"].map((t) => (
                <Button key={t} variant={form.type === t ? "contained" : "outlined"} onClick={() => setForm({ ...form, type: t })} size="small"
                  sx={{
                    flex: 1, borderRadius: 2.5, textTransform: "none", fontWeight: 700,
                    ...(form.type === t
                      ? { bgcolor: "#0f172a", color: "white", "&:hover": { bgcolor: "#1e293b" } }
                      : { borderColor: "#e2e8f0", color: "#475569" })
                  }}>
                  {t}
                </Button>
              ))}
            </Stack>

            <TextField fullWidth size="small" label="Teacher Name" value={form.teacher}
              onChange={(e) => setForm({ ...form, teacher: e.target.value })}
              InputProps={{ sx: { borderRadius: 2 } }} />

            <TextField fullWidth size="small" label="Room / Lab" value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              InputProps={{ sx: { borderRadius: 2 } }} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
          <Button onClick={() => setModalOpen(false)} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600, flex: 1, border: "1px solid #e2e8f0", color: "#475569" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={!form.subject}
            sx={{ flex: 1, borderRadius: 2.5, textTransform: "none", fontWeight: 700, background: `linear-gradient(135deg, #064e3b, ${TEAL_DARK})`, boxShadow: "none" }}>
            Save Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}