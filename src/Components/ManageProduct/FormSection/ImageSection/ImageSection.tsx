import { Button, Grid, Typography } from '@mui/material';
import AddImage from '/src/assets/add_a_photo.svg';
import './ImageSection.sass';
import { useRef } from 'react';
const convertFileToBae64 = async (file:any) => {

    if (file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const result = reader.result;
          resolve(result);
        };
  
        reader.readAsDataURL(file);
      });
    }
  
    return null;
  };
const ImageSection = (props: any) => {
    const { images,addImages } = props;
    const imageRef =  useRef<HTMLInputElement>(null);
    const handleFileChange = async({target}:{target:any})=>{
       const fileString = await convertFileToBae64(target.files[0]);
        addImages(images?.length>0?[...images,{imageData:fileString}]:[{imageData:fileString}])
    }
    return <Grid spacing={1} container sx={{
        "&": {
            maxWidth: "338px",
            maxHeight: "356px",
            height: "100%",
            width: "100%",
            minHeight: "60vh",
            borderRadius: "10px",
            border: "1px solid var(--gery, #EBEBEB)",
            padding: "18px",
            overflow: "auto"

        }
    }}>
        {images?.length > 0 ? images?.map((image: any, i: number) => {
            return <Grid key={`image ${i.toString()}`} item xs={6} sm={6} md={4} lg={4} >
                <div style={{
                    maxWidth: "102px",
                    maxHeight: "101px",
                    height: "100%",
                    width: "100%",
                    borderRadius: "9px",
                    overflow: "hidden"
                }}>
                <img width="100%" height= "100%" src={image?.imageData} />
                </div>
            </Grid>
        }) : <Grid item xs={12} sx={{
            "&": {
                marginTop: "50%"
            }
        }}>No Images</Grid>}
        <Grid item xs={12}>
            <input type='file' style={{display:"none"}} ref={imageRef} onChange={handleFileChange}/>
            <Button variant='contained' sx={{
                "&": {
                    boxShadow: "none",
                    textTransform: "none",
                    borderRadius: "6px",
                    border: "1px solid var(--gery, #EBEBEB)",
                    background: "var(--grey-2, #F2F2F2)"
                },
                "&:hover":{
                    boxShadow: "none",
                    textTransform: "none",
                    borderRadius: "6px",
                    border: "1px solid var(--gery, #EBEBEB)",
                    background: "var(--grey-2, #F2F2F2)"
                }, "&:active":{
                    boxShadow: "none",
                    textTransform: "none",
                    borderRadius: "6px",
                    border: "1px solid var(--gery, #EBEBEB)",
                    background: "var(--grey-2, #F2F2F2)"
                }
            }} onClick={()=>{
                if (imageRef.current) {
                    imageRef.current.click();
                  }
            }}><img style={{ marginRight: "11px" }} src={AddImage} /> Add images</Button>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{
                "&": {
                    color: "#7A7B7C",
                    fontSize: "12px"
                }
            }}>jpg, jpeg and PNG only supported</Typography>
        </Grid>
    </Grid>
}

export default ImageSection;