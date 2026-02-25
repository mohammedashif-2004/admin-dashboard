import { useState, useRef, useEffect } from "react";
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
  Chip,
  Avatar,
  Divider,
  InputAdornment,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  DialogContent,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Trash2,
  Paperclip,
  Plus,
  Search,
  FileText,
  X,
  Eye,
  FileWarning,
} from "lucide-react";
import React from "react";

// Slide animation for the Viewer
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notices() {
  const fileInputRef = useRef(null);
  
  // --- STATES ---
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Viewer States
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewFileUrl, setViewFileUrl] = useState("");
  const [viewFileName, setViewFileName] = useState("");

  // --- SEARCH & SORT LOGIC ---
  // Filters by search query and ensures matched items are at the top
  const filteredNotices = notices
    .filter((n) => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- ACTIONS ---
  const handlePublish = () => {
    if (!title.trim() || !message.trim()) return;
    setIsPublishing(true);

    // Create the notice object
    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
      attachment: selectedFile, // Store the actual File object
    };

    setTimeout(() => {
      setNotices((prev) => [newNotice, ...prev]);
      setTitle("");
      setMessage("");
      setSelectedFile(null);
      setIsPublishing(false);
    }, 600);
  };

  const openViewer = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setViewFileUrl(url);
    setViewFileName(file.name);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    // Cleanup memory to prevent leaks
    URL.revokeObjectURL(viewFileUrl);
    setViewFileUrl("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9", pb: 10 }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 14 } }}>
        <Stack mb={5}>
          <Typography variant="h3" fontWeight={900} sx={{ color: '#0f172a' }}>Notice Board</Typography>
          <Typography color="text.secondary">Securely view and manage official documents</Typography>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 350px' }, gap: 4 }}>
          
          {/* LEFT: SEARCH & NOTICES */}
          <Stack spacing={3}>
            <TextField
              fullWidth
              placeholder="Search old notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Search size={20} /></InputAdornment>),
                sx: { borderRadius: 4, bgcolor: 'white', border: 'none' }
              }}
            />

            <AnimatePresence mode="popLayout">
              {filteredNotices.map((notice) => (
                <motion.div key={notice.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', display: 'flex', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', minWidth: 50 }}>
                      <Typography variant="caption" fontWeight={700} color="primary">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</Typography>
                      <Typography variant="h5" fontWeight={800}>{new Date(notice.date).getDate()}</Typography>
                    </Box>
                    
                    <Divider orientation="vertical" flexItem />

                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={700}>{notice.title}</Typography>
                        <IconButton size="small" onClick={() => setNotices(prev => prev.filter(i => i.id !== notice.id))}>
                          <Trash2 size={16} color="#94a3b8" />
                        </IconButton>
                      </Stack>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>{notice.message}</Typography>

                      {notice.attachment && (
                        <Button 
                          variant="soft" 
                          startIcon={<Eye size={16} />}
                          onClick={() => openViewer(notice.attachment)}
                          sx={{ 
                            bgcolor: '#eff6ff', 
                            color: '#2563eb', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#dbeafe' }
                          }}
                        >
                          View Document
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </motion.div>
              ))}
              
              {filteredNotices.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <FileWarning size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
                  <Typography color="text.secondary">No announcements found matching your criteria.</Typography>
                </Box>
              )}
            </AnimatePresence>
          </Stack>

          {/* RIGHT: PUBLISH PANEL */}
          <Box sx={{ position: 'sticky', top: 100 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" fontWeight={700} mb={3}>Create New</Typography>
              <Stack spacing={2.5}>
                <TextField fullWidth label="Notice Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
                <TextField fullWidth multiline rows={4} label="Message Body" variant="filled" value={message} onChange={(e) => setMessage(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
                
                <Box 
                  onClick={() => fileInputRef.current.click()}
                  sx={{ 
                    border: '2px dashed #e2e8f0', borderRadius: 2, p: 2, textAlign: 'center', cursor: 'pointer',
                    '&:hover': { borderColor: '#3b82f6', bgcolor: '#f8fafc' }
                  }}
                >
                  <input type="file" hidden ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files[0])} accept="application/pdf,image/*" />
                  {selectedFile ? (
                    <Typography variant="caption" fontWeight={700} color="primary" noWrap display="block">{selectedFile.name}</Typography>
                  ) : (
                    <Typography variant="caption" color="text.secondary">Click to attach PDF or Image</Typography>
                  )}
                </Box>

                <Button 
                  fullWidth variant="contained" 
                  onClick={handlePublish}
                  disabled={isPublishing || !title || !message}
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                >
                  {isPublishing ? "Processing..." : "Publish Notice"}
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* --- SECURE VIEW-ONLY MODAL --- */}
      <Dialog
        fullScreen
        open={viewerOpen}
        onClose={closeViewer}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#0f172a', elevation: 0 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={closeViewer} aria-label="close">
              <X />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {viewFileName}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>Secure Viewer</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, height: '100%', bgcolor: '#1e293b', overflow: 'hidden' }}>
          {/* The #toolbar=0 flag in the URL helps hide the download/print buttons in many browsers */}
          <iframe
            src={`${viewFileUrl}#toolbar=0&navpanes=0`}
            title="Notice Viewer"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}