import Navbar from "../components/Navbar";
import { Typography, Box, Container, Grid, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

// Mock Data
const dataPerformance = [
  { name: 'Unit 1', score: 85 },
  { name: 'Unit 2', score: 72 },
  { name: 'Mid', score: 90 },
  { name: 'Unit 3', score: 65 },
  { name: 'Final', score: 88 },
];

const dataAttendance = [
  { name: 'Present', value: 850 },
  { name: 'Absent', value: 150 },
];

const COLORS = ['#3b82f6', '#e2e8f0'];

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider", height: "100%" }}>
    <Box display="flex" justifyContent="space-between" alignItems="start">
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600} gutterBottom>{title}</Typography>
        <Typography variant="h4" fontWeight={800} color="text.primary">{value}</Typography>
      </Box>
      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, color: color }}>
        <Icon size={24} />
      </Box>
    </Box>
  </Paper>
);

export default function Reports() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          
          <Box mb={6}>
            <Typography variant="h4" fontWeight={800} gutterBottom>Analytics & Reports</Typography>
            <Typography variant="body1" color="text.secondary">Deep insights into student performance and institutional health.</Typography>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3} mb={6}>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Total Students" value="1,240" icon={Users} color="#3b82f6" /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Avg. Attendance" value="88%" icon={Clock} color="#10b981" /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Class Average" value="76.4" icon={TrendingUp} color="#f59e0b" /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Top Performers" value="42" icon={Award} color="#8b5cf6" /></Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3}>
            {/* Bar Chart */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid", borderColor: "divider", height: 400 }}>
                <Typography variant="h6" fontWeight={700} mb={4}>Academic Performance Trend</Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={dataPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid", borderColor: "divider", height: 400 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Attendance Overview</Typography>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={dataAttendance}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataAttendance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box textAlign="center" mt={-2}>
                  <Typography variant="body2" color="text.secondary">
                    <span style={{color: "#3b82f6", fontWeight: 800}}>●</span> Present vs <span style={{color: "#cbd5e1", fontWeight: 800}}>●</span> Absent
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

        </motion.div>
      </Container>
    </Box>
  );
}