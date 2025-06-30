import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
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
  Button
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import { taskService } from '../../services/taskService';

const TasksByTag = () => {
  const { tag } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasksByTag();
  }, [tag]);

  const loadTasksByTag = async () => {
    try {
      const data = await taskService.getTasksByTag(tag);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks by tag');
    } finally {
      setLoading(false);
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
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          to="/tasks"
          sx={{ mb: 2 }}
        >
          Back to All Tasks
        </Button>
        
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
          Tasks with tag: "{tag}"
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#49453f', mb: 2 }}>
          Found {tasks.length} task{tasks.length !== 1 ? 's' : ''} with this tag
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {tasks.length === 0 ? (
        <Alert severity="info">
          No tasks found with the tag "{tag}". 
          <Link to="/tasks" style={{ marginLeft: '8px' }}>
            View all tasks
          </Link>
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>End Date</TableCell>
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
                  <TableCell>{task.assignee?.name || 'Unassigned'}</TableCell>
                  <TableCell>{new Date(task.endDate).toLocaleDateString()}</TableCell>
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
      )}
    </Container>
  );
};

export default TasksByTag;