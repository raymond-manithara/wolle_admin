import {  Grid } from '@mui/material';
import './navbar.sass';
import Logo from '/src/assets/Logo.svg';

const Navbar = ()=>{
    return <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={2}>
            <img src={Logo}/>
        </Grid>
    </Grid>
};

export default Navbar;