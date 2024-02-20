import { Box, Grid, Typography } from '@mui/material';
import './Header.sass';
import Logo from '/src/assets/Logo.svg';

const Header = ({ showMenu = false }) => {
    return <Grid container sx={{
        width: "90%",
        padding: "12px",
        position: "fixed",
        background: "#FFF",
        borderRadius: "25px"
    }}>
        <Grid item xs={12} sm={12} md={4} lg={4} sx={{
            display: "flex",
            alignItems:"center"
        }}>
            <img src={Logo} style={{ marginLeft: "24px",width: "51px" }} />
            <div className='header_logo_text'>wOLLE</div>
        </Grid>
        {showMenu ? <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container sx={{
                width: "100%"
            }}>
                <Grid item className='menu_item' xs={12} sm={12} md={2} lg={2}>
                    <a href='#'>home</a>
                </Grid>
                <Grid item className='menu_item' xs={12} sm={12} md={2} lg={2}>
                    <a href='#'>store</a>
                </Grid>
                <Grid item className='menu_item' xs={12} sm={12} md={2} lg={2}>
                    <a href='#'>about</a>
                </Grid>
                <Grid item className='menu_item' xs={12} sm={12} md={2} lg={2}>
                    <a href='#'>contact us</a>
                </Grid>
            </Grid>
        </Grid> : null}
    </Grid>
}

export default Header; 