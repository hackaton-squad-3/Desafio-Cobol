import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { Edit, Delete, Add, Search, Clear } from '@mui/icons-material';
import { taskService } from '../../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByTag = async () => {
    if (!searchTag.trim()) {
      loadTasks();
      setIsSearching(false);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasksByTag(searchTag.trim());
      setTasks(data);
      setIsSearching(true);
    } catch (err) {
      setError('Failed to search tasks by tag');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTag('');
    setIsSearching(false);
    loadTasks();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchByTag();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'PENDING': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return 'error';
      case 2: return 'warning';
      case 1: return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'Unknown';
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                borderBottom: '3px solid #ffbf00', 
                paddingBottom: 2, 
                fontWeight: 600,
                mb: 2
              }}
            >
              Tasks {isSearching && `(filtered by tag: "${searchTag}")`}
            </Typography>
            <Typography variant="body1" sx={{ color: '#49453f' }}>
              Manage and track all system tasks
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            component={Link}
            to="/tasks/new"
            sx={{ px: 3, py: 1, fontSize: '1rem', fontWeight: 600, ml: 2 }}
          >
            Add Task
          </Button>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks by tag..."
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTag && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ maxWidth: 400 }}
          />
          <Button
            variant="contained"
            onClick={handleSearchByTag}
            sx={{ ml: 2, height: '56px' }}
          >
            Search
          </Button>
          {isSearching && (
            <Button
              variant="outlined"
              onClick={handleClearSearch}
              sx={{ ml: 1, height: '56px' }}
            >
              Show All
            </Button>
          )}
          <Button
            variant="outlined"
            component={Link}
            to="/tasks/search"
            sx={{ ml: 1, height: '56px' }}
          >
            Advanced Search
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={task.status} 
                    color={getStatusColor(task.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getPriorityLabel(task.priority)} 
                    color={getPriorityColor(task.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {task.tags ? (
                    task.tags.split(',').map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.trim()}
                        size="small"
                        clickable
                        component={Link}
                        to={`/tasks/tag/${encodeURIComponent(tag.trim())}`}
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/tasks/edit/${task.id}`}
                    color="secondary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(task.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TaskList;