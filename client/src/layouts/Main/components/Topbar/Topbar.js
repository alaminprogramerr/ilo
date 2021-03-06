import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar, Button, Input } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { logoutUser } from '../../../../actions/authActions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    cursor: 'pointer'
  }
}));

const Topbar = props => {
  const { className, auth, logoutUser, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
const [space, setSpace] = useState('')

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  }
  const logout = () => {
    window.localStorage.removeItem('jwtToken')
    window.location.href = "/"
  }

  const selectSpace=(e)=>{
    e.preventDefault()
    window.location.href=`/filter?space=${e.target.value}`
  }
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {/* logo placement */}
        <RouterLink to="/" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Home</span></Button> </RouterLink>
        <RouterLink to="/hot" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Hot</span></Button> </RouterLink>
        <select onChange={e => selectSpace(e)}>
          <option>Filter By Selecting Space</option>
          <option value="Algorithm">Algorithm</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="System">System</option>
          <option value="Javascript">Javascript</option>
        </select>
        <div className={classes.flexGrow} />
        {
          auth.isAuthenticated ?
            <Hidden mdDown><Button variant="contained" color="secondary" onClick={e => { logout() }}>Log Out</Button></Hidden> :
            <Hidden mdDown>
              <RouterLink to="/login" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Login</span></Button></RouterLink>
              <RouterLink to="/sign-up" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Register</span></Button> </RouterLink>
            </Hidden>
        }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Topbar
);