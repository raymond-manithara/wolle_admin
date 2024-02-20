import { Box, Button, Grid, InputAdornment, TextField,IconButton } from "@mui/material";



const ProductListing = (props:any)=>{
    const {SearchIcon,navigate,collections,page,totalCount,onPageChange} = props;
    return   <Grid container>
    <Grid item xs={12} sx={{
        marginTop: "10vh",
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
        justifyContent: "space-between"
    }}><TextField style={{
        borderRadius: "35px !important",
        border: "1px solid var(--gery, #EBEBEB) !important",
        background: "#FFF !important",
        height: "33px !important",
        width: "30vw"

    }} placeholder='Search...' InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <IconButton>
                    <img src={SearchIcon} />
                </IconButton>
            </InputAdornment>
        ),
    }} /><Button variant='contained' sx={{ boxShadow: "none", borderRadius: "36px", height: "53px" }} onClick={() => {
        navigate('/add-product');
    }}><span style={{ marginRight: "11px" }} >+</span>Add product</Button></Grid>
    <Grid item xs={12} sx={{
        borderRadius: "4px",
    }}>
        <table className='product_table'>
            <thead>
                <tr>
                    <th></th>
                    <th>PRODUCT NAME</th>
                    <th>GENDER</th>
                    <th>BASE PRICE</th>
                    <th>STATUS</th>
                    <th>DISCOUNT</th>
                    <th>CURRENT PRICE</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {collections.map((product: any, i: number) => {
                    return <tr key={`row ${i.toString()}`} style={{ height: "60px" }}>
                        <td width={"10px"}><Box width={"38px"} marginLeft={"11px"} height={"42px"} borderRadius={"8px"} overflow={"hidden"}><img width={"100%"} height={"100%"} src={product?.images?.[0]?.imageData} /></Box></td>
                        <td>{product?.productName}</td>
                        <td>{product?.productGender}</td>
                        <td>${product?.basePrice}</td>
                        <td>{product?.sizes?.reduce((sum: number, obj: any) => sum + obj.sizeCount, 0) > 0 ? `Available` : `Not Available`}</td>
                        <td>{product?.discountPercentage}%</td>
                        <td>${product?.currentPrice}</td>
                        <td><a href={`/details?p=${product?.productId}`}>View</a></td>
                    </tr>
                })}

            </tbody>

        </table>
        <div style={{ height: "60px", display: "flex", paddingInline: "2rem", paddingTop: "1rem" }}>
            <Button disabled={page > 1 ? false : true} variant={page > 1 ? 'contained' : 'outlined'} sx={{ border: page > 1 ? "none" : "", boxShadow: "none", borderRadius: "8px", height: "22px" }}>&larr;Previous</Button>{Array.from({ length: Math.ceil(totalCount / 12) }, (_, index) => index + 1).map((num, i) => {
                return <Box key={`Pagination ${i}`} style={{
                    cursor: page == num ? "" : "pointer"
                }} onClick={page == num ? () => { } : ()=>{onPageChange(num)}} paddingInline={"12px"} height={"24px"} borderRadius={"8px"} bgcolor={page == num ? '#F6F6F6' : ''} marginRight={"25px"} color={page == num ? '#222' : '#7A7B7C'}>{num}</Box>
            })}<Button variant='contained' sx={{ border: "none", boxShadow: "none", borderRadius: "8px", height: "22px" }}>Next&rarr;</Button>
        </div>
    </Grid>
</Grid>
};

export default ProductListing;