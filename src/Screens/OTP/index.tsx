import { Box, Button, Grid, TextField } from "@mui/material";
import Header from "../../Components/Header/Header";
import FaceImage from '/src/assets/FaceImage.png';
import './otp.sass';
import { useState } from "react";
import { AutenticateWithEmail, AutenticateWithOTP } from "../../Api/APIMethods";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TOKEN } from "../../app.const";



const OTP = () => {
    const [otp, steOTP] = useState();
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const handleChangeOTP = ({ target }: { target: any }) => {
        const { value } = target;
        steOTP(value);
    }
    const authenticateClient = async () => {
        if (String(otp).trim() == "") {
            console.log(`empty otp`)
            return;
        }
        try {
            const key = params.get("k");
            const authRes = await AutenticateWithOTP(String(otp).trim(),String(key));
            console.log(authRes);
            localStorage.setItem(TOKEN,authRes.accessToken);
            navigate('/products');
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
                    <Box>
                        <b><div className="auth_create_account">Verify OTP</div></b>
                        <div className="email_label">Enter OTP received in your email</div>
                        <TextField type="password"  onChange={(e)=>{
                            if(e.target.value.length<=4){
                                handleChangeOTP(e);
                            }
                        }} value={otp} variant="standard" placeholder="XXXX" sx={{
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
                                background: otp ? "" : "#DEDEDE",
                                color: "#FFF"
                            }, "&:hover": {
                                background: otp ? "" : "#DEDEDE",
                                color: "#FFF",
                                boxShadow: otp ? "" : "none"
                            }
                        }} onClick={()=>{
                            console.log('Clicked ------------');
                            authenticateClient();
                        }}>Verify OTP</Button>
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

export default OTP;