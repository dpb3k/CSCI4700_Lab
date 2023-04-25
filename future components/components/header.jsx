import { useState, useEffect } from 'react';
import { Button, Drawer, List, ListItem, ListItemText, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { MenuOpen, Home as HomeIcon } from '@mui/icons-material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import './header.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import firebase from '../firebase_/firebase';

const useStyles = makeStyles((theme) => ({
  select: {
    paddingRight: "20px", // add padding to the right to make space for the arrow
  },
  icon: {
    right: 40, // adjust the right position of the arrow
  },
}));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    const fetchReminders = async () => {
      const remindersRef = firebase.firestore().collection('reminders');
      const snapshot = await remindersRef.get();
      const remindersList = snapshot.docs.map(doc => doc.data());
      console.log('remindersList:', remindersList);
      setReminders(remindersList);
    };
    fetchReminders();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="header">
      <Button onClick={toggleDrawer(true)}>
        <MenuOpen className="menu-icon" />
      </Button>

      {/* Navigation Bar */}
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItem>
              <MenuOpen sx={{ marginLeft: '-20px' }} />
            </ListItem>
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItem>
              <HomeIcon sx={{ marginLeft: '-20px' }} />
            </ListItem>
            <ListItemText sx={{ marginLeft: '-150px' }} primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItem>
              <LibraryBooksIcon sx={{ marginLeft: '-20px' }} />
            </ListItem>
            <ListItemText sx={{ marginLeft: '-150px' }} primary="Research Labs" />
          </ListItem>
          <RouterLink component={RouterLink} to="/reminders">
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItem>
                <DashboardIcon sx={{ marginLeft: '-20px' }} />
              </ListItem>
              <ListItemText sx={{ marginLeft: '-150px' }} primary="Reminders" />
            </ListItem>
          </RouterLink>
        </List>
      </Drawer>

      {/* Notifications Dropdown */}
      <InputLabel 
  id="reminders-select-label"
  style={{ position: 'absolute', left: '1200px', top: '10px' }}
>
  Notifications
</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleChange}
        label="Reminders"
        classes={{
        select: classes.select,
        icon: classes.icon,
       }}
       displayEmpty
       style={{ position: 'absolute', right: '260px' }}
      >

        {reminders.map((reminder, index) => (
          <MenuItem key={index} value={reminder.title} disabled>
            {reminder.title.length > 20
              ? `${reminder.title.substring(0, 20)}...`
              : reminder.title} - {reminder.date}
          </MenuItem>
          
        ))}
      </Select>


      <p>
        login
      </p>
    </div>
  );
}
