import { Dialog, Grid, TextField, Typography, IconButton, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import './Form.sass';
import { Controller, useForm } from 'react-hook-form';
import { createRef, useEffect, useReducer, useRef, useState } from 'react';
import { CreateGroup, FetchGroups } from '../../../../Api/APIMethods';
import SearchDropdown from '../../../Searchdropdown/Search';

const searchGroup = async (key: string, setOptions: Function) => {
    try {
        const response = await FetchGroups(key);
        setOptions(response);
    } catch (error) {

    }
}

const Form = (props: any) => {
    const { data, controlFrom, sizes, addSizes } = props;
    const [options, setOptions] = useState([]);
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [sizeName,setSizeName] = useState('');
    const [sizeCount,setSizeCount] = useState<number>();
    const [groupName, setGroupName] = useState('');
    const { handleSubmit, control } = useForm();
    const groupRef = createRef<HTMLFormElement>();
    useEffect(() => {
        searchGroup('', setOptions);
    }, []);
    const textStyle = {
     ".MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl":  { height: "34px",
        padding: "10px, 8.12px, 10px, 16px",
        borderRadius: "8px",
        border: "1px solid #EBE8EF",
        gap: "5.07px"
    }
    }
    const createGroup = (data: any) => {
        // Your form submission logic
        console.log('Form submitted with data:', data);
    };

    const handleCreateButtonClick = async (e: any) => {
        e.preventDefault();
        console.log(groupName);
        try {
            const response = await CreateGroup(groupName);
            searchGroup('', setOptions);
            setOpenAddGroup(false);
        } catch (error) {
            console.log();
        }
    };
    const onAddSize = ()=>{
        const size = {sizeName,sizeCount};
        addSizes(sizes?.length>0?[...sizes,size]:[size])

    }
    const removeSize = (index:number)=>{
        addSizes(sizes.filter((_:any,i:number)=>i!=index))
    }
    return <Grid container spacing={2} sx={{
        padding: "18px",
        marginInline: "18px",
        maxWidth: "60vw",
        background: "#F7F9FB",
        borderRadius: "10px"
    }}>
        <Grid item xs={12}>
            <Typography>General</Typography>

        </Grid>
        <Grid item xs={12}>
            <Typography>Product name</Typography>
            <Controller
                control={controlFrom}
                name='productName'
                defaultValue={data?.productName}
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField sx={{...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography>Product description</Typography>
            <Controller
                control={controlFrom}
                name='productDescription'
                defaultValue={data?.productDescription}
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField sx={{...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />}
            />

        </Grid>
        <Grid item xs={12}>
            <Typography>Color name</Typography>
            <Controller
                control={controlFrom}
                name='colorName'
                defaultValue={data?.colorName}
                render={({ field: { onChange, onBlur, value, ref } }) => <TextField sx={{...textStyle, width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />}
            />

        </Grid>
        <Grid item xs={12}>
            <Typography>Group</Typography>
            <Controller
                control={controlFrom}
                name='groupId'
                defaultValue={data?.productDescription}
                render={({ field: { onChange, onBlur, value, ref } }) => <SearchDropdown sx={textStyle} options={options} onSearchChanges={(event: any, data: any) => {
                   
                        searchGroup(data, setOptions);
                  
                }} onChange={(e: any, data: any) => {
                    console.log(data);

                    
                        onChange(data.value);
                    
                }} value={value} />}
            />
            <IconButton onClick={() => {
                setOpenAddGroup(true);
            }
            }><Typography color="#7A7B7C" style={{ cursor: "pointer" }}>+&nbsp;Create a group</Typography></IconButton>
        </Grid>
        <Grid item xs={12}>
            Add size
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "flex=start", gap: "8px" }}>
            <TextField placeholder='Size name' value={sizeName} onChange={({target})=>{
                setSizeName(target?.value);
            }} sx={textStyle}/>  <TextField sx={textStyle} placeholder='Size count' value={sizeCount} onChange={({target})=>{
                setSizeCount(Number(target?.value||'0'));
            }}/> <Button variant='contained' onClick={()=>{
                setSizeCount(0);
                setSizeName('');
                onAddSize();
            }} sx={{
                "&": {
                    background: "#000000",
                    color: "#FFF",
                    borderRadius: "16px"
                }
            }}>Add</Button>
        </Grid>
        {sizes && sizes.map((size: any, index: any) => {
            return <Grid item xs={6} sx={{display:"flex",gap:"12px",alignItems:"center"}}>
                <div style={{paddingInline: "20px",paddingBlock:"5px",borderRadius:"16px",background:"#000",color:"#FFF"}}>{size?.sizeName}</div><div>{size?.sizeCount}</div><Button onClick={()=>{
                    removeSize(index);
                }} sx={{"&":{border:"1px solid #000",height:"22px",width:"15px",color:"#000",borderRadius:"10px"}}}>X</Button>
            </Grid>
        })}
        <Dialog
            open={openAddGroup}
            onClose={() => {
                
                setOpenAddGroup(false);
            }}
        ><form ref={groupRef} onSubmit={handleSubmit(createGroup)}>
                <DialogTitle>+&nbsp;Add new group.</DialogTitle>
                <DialogContent>
                    <Box width={"40vw"} height={"20vh"}>

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField sx={{ width: "100%" }} onChange={(e) => { setGroupName(e.target.value); }} value={groupName} />
                            </Grid>
                        </Grid>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setGroupName(''); setOpenAddGroup(false) }} variant='outlined' sx={{ border: "1px solid #7A7B7C", color: "#7A7B7C" }}>Close</Button>
                    <Button variant='contained' onClick={handleCreateButtonClick}>Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    </Grid>
};

export default Form;