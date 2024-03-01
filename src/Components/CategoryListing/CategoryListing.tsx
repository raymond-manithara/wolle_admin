import { Box, Button, Grid, InputAdornment, TextField, IconButton, Switch, Dialog, DialogTitle, DialogProps, DialogContent, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateCategory } from "../../Api/APIMethods";
export interface AddCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    title: String;
    data: any;
    onPageChange:(num:number)=>void
}
type Inputs = {
    categoryName: string
    categoryEnabled: boolean
}
function CategoryDialog(props: AddCategoryDialogProps) {
    const { handleSubmit, control, reset } = useForm<Inputs>()
    const { onClose, open, title, data,onPageChange } = props;
    const [isLoading,setLoading] = useState(false);


    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        onClose();
    };

    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
    const submitForm = async(data: any) => {
        
        try {
            setLoading(true);
            const responseCreateCategory = await CreateCategory(data);
            console.log(responseCreateCategory);
            onPageChange(1);
            reset();
            onClose();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <Dialog onClose={handleClose} fullWidth={true} maxWidth={maxWidth} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form method="POST" onSubmit={isLoading?(e)=>{e.preventDefault()}:handleSubmit(submitForm)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Category name</Typography>
                            <Controller
                                control={control}
                                name="categoryName"
                                render={({ field: { onChange, onBlur, value, ref } }) => <TextField sx={{ width: "100%" }} onChange={onChange} value={value} onBlur={onBlur} ref={ref} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Category enabled</Typography>
                            <Controller
                                control={control}
                                name="categoryEnabled"
                                render={({ field: { onChange, onBlur, value, ref, } }) => <Switch onChange={onChange} onBlur={onBlur} value={value} />}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="contained" onClick={() => {
                                reset();
                                onClose();
                            }} sx={{
                                background: "#898989", border: "none", boxShadow: "none", color: "white", marginRight: "1rem", "&:hover": {
                                    background: "#898989", border: "none", boxShadow: "none", color: "white",
                                }
                            }}>Close</Button>
                            <Button variant="contained" type="submit" sx={{ boxShadow: "none", border: "none" }}>{isLoading?<CircularProgress/>:"Save"}</Button>
                        </Grid>
                    </Grid>

                </form>
            </DialogContent>
        </Dialog>
    );
}

const CategoryListing = (props: any) => {
    const { SearchIcon, navigate, categories, page, totalCount, onPageChange } = props;
    const [openAddCtegory, setOpenAddCategory] = useState(false);
    const [data, setData] = useState();
    const closeAddCategoryModal = () => {
        setOpenAddCategory(false);
    }
    console.log(totalCount);
    return <Grid container>
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
            setOpenAddCategory(true);
        }}><span style={{ marginRight: "11px" }} >+</span>Add category</Button></Grid>
        <Grid item xs={12} sx={{
            borderRadius: "4px",
        }}>
            <table className='product_table'>
                <thead>
                    <tr>
                        <th>CATEGORY ID</th>
                        <th style={{ textAlign: "left" }}>CATEGORY NAME</th>
                        <th>CATEGORY STATUS</th>
                        <th>CATEGORY CREATED</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((product: any, i: number) => {
                        return <tr key={`row ${i.toString()}`} style={{ height: "60px" }}>
                            <td>{product?.categoryId}</td>
                            <td style={{ textAlign: "left" }}>{product?.categoryName}</td>
                            <td><Switch checked={product?.categoryEnabled} /></td>
                            <td>{new Date(product?.createdAt).toLocaleString()}</td>
                            <td>View</td>
                        </tr>
                    })}

                </tbody>

            </table>
            <div style={{ height: "60px", display: "flex", paddingInline: "2rem", paddingTop: "1rem" }}>
                <Button disabled={page > 1 ? false : true} variant={page > 1 ? 'contained' : 'outlined'} sx={{ border: page > 1 ? "none" : "", boxShadow: "none", borderRadius: "8px", height: "22px" }}>&larr;Previous</Button>
                {Array.from({ length: Math.ceil(totalCount / 12) }, (_, index) => index + 1).map((num, i) => {
                    return <Box key={`Pagination ${i}`} style={{
                        cursor: page == num ? "" : "pointer"
                    }} onClick={page == num ? () => { } : () => { onPageChange(num) }} paddingInline={"12px"} height={"24px"} borderRadius={"8px"} bgcolor={page == num ? '#F6F6F6' : ''} marginRight={"25px"} color={page == num ? '#222' : '#7A7B7C'}>{num}</Box>
                })}<Button variant='contained' sx={{ border: "none", boxShadow: "none", borderRadius: "8px", height: "22px" }}>Next&rarr;</Button>
            </div>
        </Grid>
        <CategoryDialog
            open={openAddCtegory}
            title={data ? "Update category" : "Add category"}
            data={data}
            onClose={closeAddCategoryModal}
            onPageChange={onPageChange}
        />
    </Grid>
};

export default CategoryListing;