import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { useEffect, useState } from "react";


const Pricing = (props: any) => {
    const { data, control, watch,setValue } = props;
    const [defaultDiscountPercentage, setDefaultDiscountPercentage] = useState(0.0);
    const [defaultDiscountAmount, setDefaultDiscountAmount] = useState(0);
    const textStyle = {
        ".MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
            height: "34px",
            padding: "10px, 8.12px, 10px, 16px",
            borderRadius: "8px",
            border: "1px solid #EBE8EF",
            gap: "5.07px"
        }
    }
    let _basePrice = watch("basePrice");
    let _currentPrice = watch("currentPrice");
    useEffect(() => {
      
            const amount = _basePrice - _currentPrice;
            const percent = (amount / _basePrice) * 100;
            setValue("discountPercentage",percent);
            setValue("discountAmount",amount);
        
    }, [_basePrice, _currentPrice]);
    return <Grid container spacing={2} sx={{
        padding: "18px",
        margin: "18px",
        maxWidth: "60vw",
        background: "#F7F9FB",
        borderRadius: "10px"
    }}>
        <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Price</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Base price</Typography>
            <Controller
                control={control}
                name='basePrice'
                defaultValue={data?.colorName}
                render={({ field }) => <TextField placeholder="Base price" sx={{ ...textStyle, width: "100%" }} {...field} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }} />}
            />
            <span style={{ color: "#7A7B7C", fontSize: "12px", marginLeft: "5px" }}>Base price of the product</span>
        </Grid>
        <Grid item xs={6}>
            <Typography>Current price</Typography>
            <Controller
                control={control}
                name='currentPrice'
                defaultValue={data?.colorName}
                render={({ field }) => <TextField placeholder="Current price" sx={{ ...textStyle, width: "100%" }} {...field} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }} />}
            />
            <span style={{ color: "#7A7B7C", fontSize: "12px", marginLeft: "5px" }}>Product price after discount</span>

        </Grid>
        <Grid item xs={6}>
            <Typography>Discount percentage</Typography>
            <Controller
                control={control}
                name='discountPercentage'
                defaultValue={defaultDiscountPercentage}
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField disabled placeholder="Discount percentage" sx={{ ...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <PercentIcon />
                        </InputAdornment>
                    ),
                }} />}
            />
            <span style={{ color: "#7A7B7C", fontSize: "12px", marginLeft: "5px" }}>Percentage of discount</span>

        </Grid>
        <Grid item xs={6}>
            <Typography>Discount amount</Typography>
            <Controller
                control={control}
                name='discountAmount'
                defaultValue={defaultDiscountAmount}
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField disabled placeholder="Discount amount" sx={{ ...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }} />}
            />
            <span style={{ color: "#7A7B7C", fontSize: "12px", marginLeft: "5px" }}>Discount amount</span>

        </Grid>
        <Grid item xs={6}>
            <Typography>Discount name</Typography>
            <Controller
                control={control}
                name='discountName'
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField placeholder="Discount name" sx={{ ...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref}  />}
            />
            <span style={{ color: "#7A7B7C", fontSize: "12px", marginLeft: "5px" }}>Label to show in discount section.</span>

        </Grid>
    </Grid>
}

export default Pricing;