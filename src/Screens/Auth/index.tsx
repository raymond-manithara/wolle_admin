import { Box, Button, Grid, TextField } from "@mui/material";
import Header from "../../Components/Header/Header";
import FaceImage from '/src/assets/FaceImage.png';
import './auth.sass';
import { useState } from "react";
import { AutenticateWithEmail } from "../../Api/APIMethods";
import { useNavigate } from "react-router-dom";



const Auth = () => {
    const [email, setEmail] = useState();
    const navigate= useNavigate();
    const handleChangeEmail = ({ target }: { target: any }) => {
        const { value } = target;
        setEmail(value);
    }
    const authenticateClient = async () => {
        if (String(email).trim() == "") {
            return;
        }
        try {
            const authRes = await AutenticateWithEmail(String(email).trim())
            console.log(authRes);
            navigate(`/otp?k=${authRes?.key}`)
        } catch (error) {
            console.log(error)
        }
    };
    return <Box height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Header />
        <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{
                "&": {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingInline: "10vw"
                },

            }}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"} maxWidth={"512px"}>
                    <div className="auth_title">Welcome</div>
                    <Box>
                        <b><div className="auth_create_account">Continue using email</div></b>
                        <div className="email_label">Enter your Email</div>
                        <TextField onChange={handleChangeEmail} value={email} variant="standard" placeholder="you@email.com" sx={{
                            "&": {
                                width: "100%"
                            }
                        }} />
                        <Button variant="contained" sx={{
                            "&": {
                                width: "100%",
                                boxShadow: "none",
                                border: "none",
                                borderRadius: "35.067px",
                                marginTop: "24px",
                                background: email ? "" : "#DEDEDE",
                                color: "#FFF"
                            }, "&:hover": {
                                background: email ? "" : "#DEDEDE",
                                color: "#FFF",
                                boxShadow: email ? "" : "none"
                            }
                        }} onClick={()=>{
                            if(String(email).trim()!=""){
                                authenticateClient();
                            }
                        }}>Send OTP</Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{
                "&": {
                    display: "flex",
                    justifyContent: "flex-end"
                }
            }}>
                <img src={FaceImage} style={{ maxWidth: "50vw" }} />
            </Grid>
        </Grid>
    </Box>
};

export default Auth;