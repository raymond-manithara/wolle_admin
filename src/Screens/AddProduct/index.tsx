import { Breadcrumbs, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import './AddProduct.sass';
import Header from '../../Components/Header/Header';
import ManageProduct from '../../Components/ManageProduct/ManageProduct';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { CreateProductAPI } from '../../Api/APIMethods';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    productName: string
    productDescription: string
    groupId: number
  }
  const createProduct = async(product:any,actionCompleteCallBack:Function)=>{
    try {
        const responseCreateProduct = await CreateProductAPI(product);

        console.log(responseCreateProduct);
    } catch (error) {
        console.log(error);
    }
  }
const AddProducts = () => {

    const [data,setData] = useState({});
    const formRef =  useRef(null);
    const navigate = useNavigate();
    const completeCreate = ()=>{
        navigate('/products');
    }
    const { handleSubmit, control,watch,setValue } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async(formData) => {
        const dataFinal = {...data,...formData};
        console.log(dataFinal);
        await createProduct(dataFinal,completeCreate);
        setData(dataFinal)
      }
    const breadcrumbs = [

        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/products"
        >
            Products
        </Link>,
        <Typography key="2" color="text.primary">
            Add New Product
        </Typography>,
    ];
    return <Grid container sx={{
        height: "100vh",
        width: "100vw",
    }}>
        <Grid item xs={12}>
            <Header/>
        </Grid>
        <Grid item xs={12} sx={{ marginLeft: "10vw",marginTop: "5rem"}}>
            <Breadcrumbs
                separator={'>'}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sx={{ marginLeft: "10vw",marginBlock: "2rem"}}>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <ManageProduct setValue={setValue} watch={watch} formRef={formRef.current} control={control} data={data} setData={setData} isEdit={false}/>
            </form>
        </Grid>
    </Grid>
};

export default AddProducts;