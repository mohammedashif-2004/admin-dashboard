import { useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Box, Container, Typography, Paper, Grid, Tab, Tabs, Chip, Stack, Avatar 
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, MapPin, User, BookOpen, CalendarDays, Monitor, Shield, Smartphone, Hash
} from "lucide-react";

// --- Mock Data ---
const schedule = {
  Monday: [
    { id: 1, time: "09:00 AM - 10:30 AM", subject: "App Development", code: "CS401", professor: "Dr. Sarah Smith", room: "Lab 3", icon: Smartphone, color: "#3b82f6" },
    { id: 2, time: "10:45 AM - 12:15 PM", subject: "Social Media Marketing", code: "MKT205", professor: "Prof. John Doe", room: "Hall A", icon: Hash, color: "#ec4899" },
    { id: 3, time: "01:30 PM - 03:00 PM", subject: "Cyber Security", code: "CS405", professor: "Dr. Alan Turing", room: "Lab 1", icon: Shield, color: "#ef4444" },
    { id: 4, time: "03:15 PM - 04:45 PM", subject: "Machine Learning", code: "AI302", professor: "Prof. A. Lovelace", room: "Lab 5", icon: Monitor, color: "#8b5cf6" },
  ],
  Tuesday: [
    { id: 1, time: "09:00 AM - 11:00 AM", subject: "Data Structures", code: "CS201", professor: "Mr. R. Sharma", room: "Room 101", icon: BookOpen, color: "#f59e0b" },
    { id: 2, time: "11:30 AM - 01:00 PM", subject: "Web Technologies", code: "CS204", professor: "Ms. P. Gupta", room: "Lab 2", icon: Monitor, color: "#10b981" },
  ],
  Wednesday: [
    { id: 1, time: "10:00 AM - 12:00 PM", subject: "Operating Systems", code: "CS301", professor: "Dr. K. Verma", room: "Hall B", icon: Monitor, color: "#6366f1" },
  ],
  Thursday: [
    { id: 1, time: "09:00 AM - 10:30 AM", subject: "App Development", code: "CS401", professor: "Dr. Sarah Smith", room: "Lab 3", icon: Smartphone, color: "#3b82f6" },
    { id: 2, time: "01:30 PM - 03:00 PM", subject: "Cloud Computing", code: "CS408", professor: "Mr. J. Wilson", room: "Lab 4", icon: MapPin, color: "#06b6d4" },
  ],
  Friday: [
    { id: 1, time: "09:00 AM - 12:00 PM", subject: "Major Project Lab", code: "PRJ500", professor: "All Faculty", room: "Main Lab", icon: User, color: "#64748b" },
  ]
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

export default function TimeTable() {
  const [activeDay, setActiveDay] = useState("Monday");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          
          {/* Header */}
          <Box mb={6} textAlign="center">
            <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
              Class Schedule
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Academic Year 2025-2026 • Semester 6
            </Typography>
          </Box>

          {/* Day Selector */}
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 5, 
              borderRadius: 4, 
              bgcolor: "white", 
              border: "1px solid #e2e8f0",
              overflow: "hidden"
            }}
          >
            <Tabs 
              value={activeDay} 
              onChange={(e, val) => setActiveDay(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": { 
                  textTransform: "none", 
                  fontWeight: 600, 
                  fontSize: "1rem", 
                  minHeight: 60,
                  px: 4
                },
                "& .Mui-selected": { color: "#3b82f6" },
                "& .MuiTabs-indicator": { backgroundColor: "#3b82f6", height: 3 }
              }}
            >
              {days.map((day) => (
                <Tab key={day} label={day} value={day} />
              ))}
            </Tabs>
          </Paper>

          {/* Schedule List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                {schedule[activeDay]?.length > 0 ? (
                  schedule[activeDay].map((cls, index) => {
                    const Icon = cls.icon;
                    return (
                      <Grid item xs={12} key={cls.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 0,
                            borderRadius: 4,
                            overflow: "hidden",
                            border: "1px solid #e2e8f0",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.1)",
                              borderColor: cls.color
                            }
                          }}
                        >
                          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                            {/* Time Column */}
                            <Box 
                              sx={{ 
                                width: { xs: "100%", sm: 200 }, 
                                bgcolor: `${cls.color}10`, // 10% opacity
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: { xs: "flex-start", sm: "center" },
                                borderRight: { sm: `1px solid ${cls.color}20` }
                              }}
                            >
                              <Typography variant="h6" fontWeight={700} color={cls.color}>
                                {cls.time.split(" - ")[0]}
                              </Typography>
                              <Typography variant="caption" fontWeight={600} color="text.secondary">
                                to {cls.time.split(" - ")[1]}
                              </Typography>
                            </Box>

                            {/* Details Column */}
                            <Box sx={{ p: 3, flexGrow: 1 }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
                                <Box>
                                  <Chip 
                                    label={cls.code} 
                                    size="small" 
                                    sx={{ 
                                      borderRadius: 1, 
                                      fontWeight: 700, 
                                      bgcolor: `${cls.color}15`, 
                                      color: cls.color,
                                      mb: 1
                                    }} 
                                  />
                                  <Typography variant="h5" fontWeight={700} color="text.primary">
                                    {cls.subject}
                                  </Typography>
                                </Box>
                                <Box 
                                  sx={{ 
                                    p: 1.5, 
                                    borderRadius: "50%", 
                                    bgcolor: `${cls.color}10`,
                                    color: cls.color 
                                  }}
                                >
                                  <Icon size={24} />
                                </Box>
                              </Stack>

                              <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                  <Avatar sx={{ width: 28, height: 28, bgcolor: "grey.200" }}>
                                    <User size={16} color="#64748b" />
                                  </Avatar>
                                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                                    {cls.professor}
                                  </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                  <Avatar sx={{ width: 28, height: 28, bgcolor: "grey.200" }}>
                                    <MapPin size={16} color="#64748b" />
                                  </Avatar>
                                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                                    {cls.room}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item xs={12}>
                    <Box textAlign="center" py={8} color="text.disabled">
                      <CalendarDays size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                      <Typography variant="h6">No classes scheduled</Typography>
                      <Typography variant="body2">Enjoy your day off!</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          </AnimatePresence>

        </motion.div>
      </Container>
    </Box>
  );
}