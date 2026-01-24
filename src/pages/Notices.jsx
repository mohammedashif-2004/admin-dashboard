import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Stack,
  IconButton,
  Tooltip,
  Alert,
  Chip,
  Fade,
  useTheme,
  Avatar,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  FileText,
  X,
  Calendar,
  Trash2,
  Bell,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Helper to format dates nicely (e.g., "Jan 10, 2026")
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const mockNotices = [
  {
    id: 3,
    title: "Mid-Term Examination Schedule Released",
    message: "All students are requested to check the timetable on the portal.",
    date: "2026-01-10",
    type: "urgent", // Added for styling potential
  },
  {
    id: 2,
    title: "Republic Day Celebration Details",
    message: "Cultural program will be held on 26th January from 8:00 AM.",
    date: "2026-01-05",
    type: "info",
  },
  {
    id: 1,
    title: "Winter Vacation Notice",
    message: "College will remain closed from 25th Dec to 5th Jan.",
    date: "2025-12-20",
    type: "info",
  },
];

export default function Notices() {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [notices, setNotices] = useState(mockNotices);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handlePublish = () => {
    if (!title.trim() || !message.trim()) {
      setError("Both title and message are required!");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
      type: "new",
    };

    setNotices((prev) => [newNotice, ...prev]);
    setSuccess(true);
    setError("");

    setTimeout(() => {
      setTitle("");
      setMessage("");
      setSuccess(false);
    }, 2000);
  };

  const handleClear = () => {
    setTitle("");
    setMessage("");
    setError("");
  };

  const handleDeleteClick = (id) => setDeleteConfirmId(id);
  const handleCancelDelete = () => setDeleteConfirmId(null);
  
  const handleConfirmDelete = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
    setDeleteConfirmId(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4f8",
        backgroundImage: `
          radial-gradient(at 0% 0%, hsla(214,46%,88%,1) 0, transparent 50%), 
          radial-gradient(at 50% 100%, hsla(222,46%,92%,1) 0, transparent 50%)
        `,
      }}
    >
      <Navbar />

      <Container maxWidth="md" sx={{ pt: { xs: 10, md: 14 }, pb: 8 }}>
        
        {/* Page Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={5}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 56, 
                height: 56,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Bell size={28} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary">
                Notice Board
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage updates and announcements for students
              </Typography>
            </Box>
          </Stack>
        </motion.div>

        <Stack spacing={4}>
          {/* COMPOSER SECTION */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.6)",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(30, 41, 59, 0.04)",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText size={20} className="text-slate-500" />
                  Create New Notice
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., Exam Schedule Update"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!error && !title.trim()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Enter the detailed announcement here..."
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={!!error && !message.trim()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      borderRadius: 2,
                    }
                  }}
                />

                {/* Status Bar */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 40 }}>
                  <Box>
                    {success && (
                      <Fade in={success}>
                        <Chip 
                          icon={<CheckCircle2 size={16} />} 
                          label="Published Successfully" 
                          color="success" 
                          variant="soft"
                          sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 600 }}
                        />
                      </Fade>
                    )}
                    {error && (
                      <Fade in={!!error}>
                        <Chip 
                          icon={<AlertCircle size={16} />} 
                          label={error} 
                          sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 600 }}
                        />
                      </Fade>
                    )}
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Button
                      onClick={handleClear}
                      color="inherit"
                      disabled={!title && !message}
                      sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' } }}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePublish}
                      disabled={!title.trim() || !message.trim() || success}
                      startIcon={<Send size={18} />}
                      sx={{
                        px: 4,
                        py: 1,
                        borderRadius: 2.5,
                        boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}
                    >
                      Publish Notice
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>

          <Box sx={{ my: 2 }} />

          {/* LIST SECTION */}
          <Typography variant="h6" fontWeight={700} color="text.secondary" sx={{ pl: 1 }}>
            Recent Announcements
          </Typography>

          <Stack spacing={2.5}>
            <AnimatePresence mode="popLayout">
              {notices.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert severity="info" sx={{ borderRadius: 3 }}>
                    No notices have been published yet.
                  </Alert>
                </motion.div>
              ) : (
                notices.map((notice) => (
                  <motion.div
                    key={notice.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 0, // Reset padding for internal layout
                        borderRadius: 3,
                        bgcolor: "white",
                        overflow: 'hidden',
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 0.2s ease-in-out",
                        position: 'relative',
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                          transform: "translateY(-2px)"
                        },
                      }}
                    >
                      {/* Left Accent Bar */}
                      <Box sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: 0, 
                        bottom: 0, 
                        width: 6, 
                        bgcolor: deleteConfirmId === notice.id ? 'error.main' : 'primary.main' 
                      }} />

                      <Box sx={{ p: 3, pl: 4 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={2}>
                          
                          {/* Notice Content */}
                          <Box sx={{ flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                                <Chip
                                  icon={<Calendar size={14} />}
                                  label={formatDate(notice.date)}
                                  size="small"
                                  sx={{ 
                                    bgcolor: 'grey.100', 
                                    color: 'text.secondary', 
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    borderRadius: 1.5 
                                  }}
                                />
                                {notice.id === notices[0].id && (
                                  <Chip label="NEW" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                )}
                            </Stack>
                            
                            <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                              {notice.title}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                              {notice.message}
                            </Typography>
                          </Box>

                          {/* Action Area */}
                          <Box sx={{ minWidth: 100, display: 'flex', justifyContent: 'flex-end' }}>
                            {deleteConfirmId === notice.id ? (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <Stack direction="row" spacing={1} bgcolor="error.50" p={1} borderRadius={2}>
                                  <Button
                                    size="small"
                                    color="inherit"
                                    onClick={handleCancelDelete}
                                    sx={{ minWidth: 'auto', color: 'text.secondary' }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={() => handleConfirmDelete(notice.id)}
                                    sx={{ boxShadow: 'none' }}
                                  >
                                    Confirm
                                  </Button>
                                </Stack>
                              </motion.div>
                            ) : (
                              <Tooltip title="Delete Notice">
                                <IconButton
                                  onClick={() => handleDeleteClick(notice.id)}
                                  sx={{
                                    color: 'text.disabled',
                                    "&:hover": { color: "error.main", bgcolor: "error.50" },
                                  }}
                                >
                                  <Trash2 size={18} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </Stack>
                      </Box>
                    </Paper>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}