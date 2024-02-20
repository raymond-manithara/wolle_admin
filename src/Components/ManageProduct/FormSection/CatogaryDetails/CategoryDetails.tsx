import { Grid, TextField, Typography } from "@mui/material";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import SearchDropdown from "../../../Searchdropdown/Search";
import { useEffect, useState } from "react";
import { SearchCategory, SearchMaterial } from "../../../../Api/APIMethods";

interface CategoryDetailsProps {
    data: any;
    control: Control<HTMLInputElement>;
    watch: UseFormWatch<HTMLInputElement>;
}
const searchCategory = async (key: string, setOptions: Function) => {
    try {
        const response = await SearchCategory(key);
        setOptions(response);
    } catch (error) {

    }
}
const searchMaterial = async (key: string, setOptions: Function) => {
    try {
        const response = await SearchMaterial(key);
        setOptions(response);
    } catch (error) {

    }
}
const CategoryDetails = (props: any) => {
    const { control, data, watch } = props;
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsMaterial, setOptionsMaterial] = useState([]);
    useEffect(() => {
        searchCategory('', setOptionsCategory);
        searchMaterial('', setOptionsMaterial);
    }, []);
    const genderOptions = [
        {
            label: "MALE",
            value: "MALE"
        },
        {
            label: "FEMALE",
            value: "FEMALE"
        },
        {
            label: "UNIGENDER",
            value: "UNIGENDER"
        }
    ];
    const stitchOptions = [
        {
            label: "DOUBLE",
            value: "DOUBLE"
        },
        {
            label: "SINGLE",
            value: "SINGLE"
        }
    ];
    const textStyle = {
        ".MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
            height: "34px",
            padding: "10px, 8.12px, 10px, 16px",
            borderRadius: "8px",
            border: "1px solid #EBE8EF",
            gap: "5.07px"
        }
    }
    return <Grid container spacing={2} sx={{
        "&": {
            maxWidth: "338px",
            maxHeight: "356px",
            height: "fit-content",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid var(--gery, #EBEBEB)",
            padding: "18px",
            overflow: "auto",
            marginTop: "1rem",
            marginLeft: "-5px"

        }
    }}>
        <Grid item xs={12}>
            <Typography>Select category</Typography>
            <Controller
                control={control}
                name='categoyId'
                render={({ field: { onChange, onBlur, value, ref } }) => <SearchDropdown placeholder={"Search category"} sx={textStyle} options={optionsCategory} onSearchChanges={(event: any, data: any) => {

                    searchCategory(data, setOptionsCategory);

                }} onChange={(e: any, data: any) => {
                    console.log(data);


                    onChange(data.value);

                }} value={value} />}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography>Select material</Typography>
            <Controller
                control={control}
                name='materialId'
                render={({ field: { onChange, onBlur, value, ref } }) => <SearchDropdown placeholder={"Search material"} sx={textStyle} options={optionsMaterial} onSearchChanges={(event: any, data: any) => {

                    searchMaterial(data, setOptionsMaterial);

                }} onChange={(e: any, data: any) => {
                    console.log(data);


                    onChange(data.value);

                }} value={value} />}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography>Select gender</Typography>
            <Controller
                control={control}
                name='productGender'
                render={({ field: { onChange, onBlur, value, ref } }) => <SearchDropdown placeholder={"Search gender"} sx={textStyle} options={genderOptions} onSearchChanges={(event: any, data: any) => {}} onChange={(e: any, data: any) => {
                    console.log(data);
                    onChange(data.value);
                }} value={value} />}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography>Select stitch</Typography>
            <Controller
                control={control}
                name='stitchType'
                render={({ field: { onChange, onBlur, value, ref } }) => <SearchDropdown placeholder={"Search stitch"} sx={textStyle} options={stitchOptions} onSearchChanges={(event: any, data: any) => {}} onChange={(e: any, data: any) => {
                    console.log(data);
                    onChange(data.value);
                }} value={value} />}
            />
        </Grid>
    </Grid>
}

export default CategoryDetails;