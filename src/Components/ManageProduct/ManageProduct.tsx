import { Button, Grid } from '@mui/material';
import './ManageProduct.sass';
import FormSection from './FormSection/FormSection';

const ManageProduct = (props: any) => {
    const { isEdit = false,data,setData,control,formRef,watch,setValue  } = props;
    return <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={8} className='title_app_header'>{isEdit ? `About Product` : `Add New Product`}</Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}><Button sx={{
            "&": {
                borderRadius: "36px",
                border: "1px solid var(--grey-2, #F2F2F2)",
                background: "var(--gery, #EBEBEB)",
                height: "40px",
                padding: "9px 44px",
                fontFamily: "Manrope",
                color: "var(--grey-3, #7A7B7C)",
                textTransform: "none",
                marginRight: "10px"


            }
        }} className='text_button_cancel'>Cancel</Button><Button sx={{
            "&": {
                borderRadius: "36px",
                border: "1px solid var(--grey-2, #F2F2F2)",
                background: "var(--gery, #121824)",
                height: "40px",
                padding: "9px 44px",
                fontFamily: "Manrope",
                color: "var(--grey-3, #FFF)",
                textTransform: "none"


            }
        }} type='submit'>{isEdit ? `Update` : `Create`}</Button></Grid>
        <Grid item xs={12}>
            <FormSection watch={watch} setValue={setValue} control={control} data={data} setData={setData}/>
        </Grid>
    </Grid>
};

export default ManageProduct;