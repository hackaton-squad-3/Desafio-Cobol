import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Box,
  Avatar
} from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';
import { taskService } from '../../services/taskService';

const TasksByUser = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasksByUsers();
  }, []);

  const loadTasksByUsers = async () => {
    try {
      const data = await taskService.getTasksByAllUsers();
      setUserTasks(data);
    } catch (err) {
      setError('Failed to load tasks by users');
    } finally {
      setLoading(false);
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
          Tasks by User
        </Typography>
        <Typography variant="body1" sx={{ color: '#49453f' }}>
          View all tasks organized by assigned users
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {userTasks.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>No tasks found</Alert>
      ) : (
        userTasks.map((userData, index) => (
          <Accordion key={userData.user.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {userData.user.firstName} {userData.user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData.tasks.length} task(s)
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {userData.tasks.length === 0 ? (
                <Typography color="text.secondary">
                  No tasks assigned to this user
                </Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Prioridade</TableCell>
                        <TableCell>Data Final</TableCell>
                        <TableCell>Tags</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userData.tasks.map((task) => (
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
                          <TableCell>{task.endDate}</TableCell>
                          <TableCell>{task.tags}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default TasksByUser;