import React from "react";
// Important: If you don't have a Navbar, comment out the next line
// import Navbar from "../components/Navbar"; 
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Stack,
  Avatar,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Award,
  Clock,
  Download,
  Filter,
  MoreVertical,
  ArrowUpRight,
  FileText,
} from "lucide-react";

// --- PROFESSIONAL THEME ---
const THEME = {
  primary: "#2563eb",
  success: "#10b981",
  warning: "#f59e0b",
  background: "#f8fafc",
  border: "#e2e8f0",
};

// --- MOCK DATA ---
const performanceData = [
  { name: 'Unit 1', score: 85, avg: 70 },
  { name: 'Unit 2', score: 72, avg: 68 },
  { name: 'Midterm', score: 90, avg: 75 },
  { name: 'Unit 3', score: 65, avg: 72 },
  { name: 'Final', score: 88, avg: 80 },
];

const StatCard = ({ title, value, percentage, icon: Icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 4,
      border: `1px solid ${THEME.border}`,
      bgcolor: "white",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="start">
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
        <Typography variant="h4" fontWeight={800} sx={{ my: 0.5 }}>{value}</Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <ArrowUpRight size={14} color={THEME.success} />
          <Typography variant="caption" color="success.main" fontWeight={700}>
            {percentage}% <span style={{ color: '#94a3b8', fontWeight: 400 }}>growth</span>
          </Typography>
        </Stack>
      </Box>
      <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 44, height: 44, borderRadius: 2 }}>
        <Icon size={22} />
      </Avatar>
    </Stack>
  </Paper>
);

export default function Reports() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: THEME.background, pb: 6 }}>
      {/* <Navbar /> */} {/* Uncomment this once your Navbar component is ready */}

      <Container maxWidth="xl" sx={{ pt: 12 }}>
        {/* HEADER */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} mb={5} spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: '#0f172a' }}>
              Institutional Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Performance metrics for Academic Year 2025-26
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<Filter size={18} />} sx={{ borderRadius: 2, textTransform: 'none' }}>Filter</Button>
            <Button variant="contained" startIcon={<Download size={18} />} sx={{ borderRadius: 2, textTransform: 'none', boxShadow: 'none' }}>Export PDF</Button>
          </Stack>
        </Stack>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          
          {/* STATS ROW */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Enrollment" value="1,240" percentage="12" icon={Users} color={THEME.primary} /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Attendance" value="94.2%" percentage="2" icon={Clock} color={THEME.success} /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Avg. Score" value="78.5" percentage="5.4" icon={TrendingUp} color={THEME.warning} /></Grid>
            <Grid item xs={12} sm={6} md={3}><StatCard title="Honors" value="156" percentage="8" icon={Award} color="#8b5cf6" /></Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* CHART AREA */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${THEME.border}`, height: 450 }}>
                <Typography variant="h6" fontWeight={800} mb={4}>Performance Overview</Typography>
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={THEME.primary} stopOpacity={0.1}/>
                          <stop offset="95%" stopColor={THEME.primary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }} />
                      <Area type="monotone" dataKey="score" stroke={THEME.primary} strokeWidth={3} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* SUBJECTS PROGRESS */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${THEME.border}`, height: 450 }}>
                <Typography variant="h6" fontWeight={800} mb={3}>Department Progress</Typography>
                <Stack spacing={3.5}>
                  {[
                    { label: 'Science', val: 88, color: THEME.primary },
                    { label: 'Math', val: 72, color: THEME.warning },
                    { label: 'Arts', val: 95, color: THEME.success },
                  ].map((item, i) => (
                    <Box key={i}>
                      <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" fontWeight={700}>{item.label}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.val}%</Typography>
                      </Stack>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.val} 
                        sx={{ height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: item.color } }} 
                      />
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 4 }} />
                <Button fullWidth variant="soft" startIcon={<FileText size={16} />} sx={{ bgcolor: '#f8fafc', py: 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 600 }}>
                  View Detailed Logs
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}