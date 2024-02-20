import { Grid } from "@mui/material"
import ImageSection from "./ImageSection/ImageSection";
import Form from "./Form/Form";
import Pricing from "./Pricing/Pricing";
import CategoryDetails from "./CatogaryDetails/CategoryDetails";


const FormSection = (props: any) => {
    const { data, setData,control,watch,setValue } = props;
    const handleChangeImages = (images: String[]) => {
        setData({
            ...data,
            images
        })
    }
    const handleChangeSizes = (sizes:any)=>{
        setData({
            ...data,
            sizes
        });
    }
    return <Grid container sx={{
        "&": {
            marginTop: "34px"
        }
    }}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
            <ImageSection images={data?.images} addImages={handleChangeImages} />
            <CategoryDetails control={control} data={data} watch={watch} setValue={setValue}/>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
            <Form controlFrom={control} data={data} sizes={data?.sizes} addSizes={handleChangeSizes}/>
            <Pricing control={control} data={data} watch={watch} setValue={setValue}/>
        </Grid>
    </Grid>
};

export default FormSection;