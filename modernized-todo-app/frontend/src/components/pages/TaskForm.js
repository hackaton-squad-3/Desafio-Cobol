import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { taskService } from '../../services/taskService';
import { userService } from '../../services/userService';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    priority: 2,
    tags: '',
    endDate: '',
    creatorId: '',
    assigneeId: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
    if (isEdit) {
      loadTask();
    }
  }, [id, isEdit]);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  const loadTask = async () => {
    try {
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch (err) {
      setError('Failed to load task');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const taskData = {
        ...task,
        creator: task.creatorId ? { id: task.creatorId } : null,
        assignee: task.assigneeId ? { id: task.assigneeId } : null
      };
      delete taskData.creatorId;
      delete taskData.assigneeId;

      if (isEdit) {
        await taskService.updateTask(id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      navigate('/tasks');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save task';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            borderBottom: '3px solid #ffbf00', 
            paddingBottom: 2, 
            marginBottom: 3,
            fontWeight: 600 
          }}
        >
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            type="date"
            value={task.endDate}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Tags"
            name="tags"
            value={task.tags}
            onChange={handleChange}
            margin="normal"
            helperText="Separate multiple tags with commas"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Creator</InputLabel>
            <Select
              name="creatorId"
              value={task.creatorId}
              onChange={handleChange}
              label="Creator"
              required
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Assign to User</InputLabel>
            <Select
              name="assigneeId"
              value={task.assigneeId}
              onChange={handleChange}
              label="Assign to User"
              required
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task')}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;