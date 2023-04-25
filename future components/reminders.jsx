import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Typography, Button, Drawer, List, ListItem, ListItemText, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import firebase from '../firebase_/firebase';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import Calendar from '../components/calendar';
import DatePick from '../components/datepicker';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '300%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
}));

export default function Reminders() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reminderTitle, setReminderTitle] = React.useState('');
  const [reminderDescription, setReminderDescription] = React.useState('');
  const [reminderDate, setReminderDate] = React.useState('');
  const [reminderStatus, setReminderStatus] = React.useState('');
  const db = firebase.firestore();
  const [showTable, setShowTable] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleAddReminder = () => {
    setOpen(true);
  };

  const [state, setState] = useState({
    reminders: [],
    open: false,
    reminderTitle: '',
    reminderDescription: '',
    selectedReminders: new Set(), // add selectedReminders to the initial state
  });

  const handleReminderTitleChange = (event) => {
    setReminderTitle(event.target.value);
  };

  const handleReminderDescriptionChange = (event) => {
    setReminderDescription(event.target.value);
  };

const handleReminderDateChange = (event) => {
  const inputDate = event.target.value;
  setReminderDate(inputDate);
};

  const handleReminderStatusChange = (event) => {
    setReminderStatus(event.target.value);
  };

  const handleSaveReminder = async () => {
    const reminder = {
      title: reminderTitle,
      description: reminderDescription,
      date: reminderDate,
      status: reminderStatus
    };
    await db.collection('reminders').add(reminder);
    setState({
      ...state,
      reminders: [...state.reminders, reminder]
    });
    setOpen(false);
  };

  const handleSelectReminder = (index) => {
    const selectedReminders = new Set(state.selectedReminders);
    if (selectedReminders.has(index)) {
      selectedReminders.delete(index);
    } else {
      selectedReminders.add(index);
    }
    setState({ ...state, selectedReminders });
  };

  const handleEditReminder = (index) => {
    const selectedReminder = state.reminders[index];
    setReminderTitle(selectedReminder.title);
    setReminderDescription(selectedReminder.description);
    setReminderDate(selectedReminder.date);
    setReminderStatus(selectedReminder.status);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDeleteSelected = async () => {
    const newReminders = state.reminders.filter(
      (reminder, index) => !state.selectedReminders.has(index)
    );

    // Remove selected reminders from Firebase
    const selectedReminderIds = Array.from(state.selectedReminders).map(
      (index) => state.reminders[index].id
    );

    selectedReminderIds.forEach(async (id) => {
      console.log("Deleting reminder with ID:", id); // add this line to log the ID
      const reminderRef = firebase.firestore().collection('reminders').doc(id);
      reminderRef.delete().catch((error) => console.error(error));
    });

    setState({
      ...state,
      reminders: newReminders,
      selectedReminders: new Set(),
    });
  };


  const handleCancelReminder = () => {
    setOpen(false);
    setEditingIndex(-1);
  };


  useEffect(() => {
    const fetchData = async () => {
      const remindersRef = firebase.firestore().collection('reminders');
      const snapshot = await remindersRef.get();
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setState({ ...state, reminders: data });
    };

    fetchData();
  }, []);


  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <RouterLink component={RouterLink} to="/reminders">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Reminders" />
            </ListItem>
          </RouterLink>
          <RouterLink component={RouterLink} to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </RouterLink>
          <ListItem button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4">Reminders</Typography>
        <Typography variant="body1">Things to do!</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell> {/* New checkbox column */}
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.reminders.map((reminder, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={state.selectedReminders.has(index)}
                      onChange={() => handleSelectReminder(index)}
                      color="primary"
                    />
                  </TableCell> {/* New checkbox column */}

                  <TableCell>
                    <Typography variant="body1" style={{ wordBreak: 'break-all', maxWidth: '30ch' }}>
                      {reminder.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ wordBreak: 'break-all', maxWidth: '55ch' }}>
                      {reminder.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ wwordBreak: 'break-all', maxWidth: '30ch' }}>
                      {reminder.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ wwordBreak: 'break-all', maxWidth: '30ch' }}>
                      {reminder.status}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button
                      color="secondary"
                      variant="contained"
                      size="small"
                      onClick={() => handleDeleteSelected(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ marginTop: 2 }}>
          <Fab color="primary" aria-label="add" onClick={handleAddReminder}>
            <AddIcon />
          </Fab>
        </Box>

        <Modal
          open={open}
          onClose={handleCancelReminder}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={classes.modal}
        >
          <Box className={classes.modalContent}>
            <Typography variant="h6" id="modal-title" gutterBottom>
              Add Reminder
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                id="reminder-title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={reminderTitle}
                onChange={handleReminderTitleChange}
              />
              <TextField
                id="reminder-description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={reminderDescription}
                onChange={handleReminderDescriptionChange}
              />
              <TextField
                id="reminder-date"
                label="Date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={reminderDate}
                onChange={handleReminderDateChange}
              
              />
              <TextField
                id="reminder-status"
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={reminderStatus}
                onChange={handleReminderStatusChange}
              />
            </form>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveReminder}
              style={{ marginRight: 10 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelReminder}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
        <Calendar />
      </main>
    </div>
  );
}

