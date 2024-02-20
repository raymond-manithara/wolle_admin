import { useEffect, useState } from "react";
import { FetchPagesOfProduct } from "../../Api/APIMethods";
import { Box, Grid, Typography } from "@mui/material";
import './Collections.sass';

const downloadCollections = async (page: Number, count: Number, setCollection: Function) => {
    try {
        const responseCollection = await FetchPagesOfProduct(page, count);
        console.log(responseCollection);
        setCollection(responseCollection);
    } catch (error) {
        console.log(error);
    }
}
const Collection = () => {
    const count = 12;
    const [page, setPage] = useState(1);
    const [collections, setCollection] = useState([]);
    useEffect(() => {
        downloadCollections(page, count, setCollection);
        return () => { }
    }, []);
    return collections.length > 0 ? <Grid className="collection" container spacing={2} sx={{
        marginBottom: "2rem"
    }}>
        {collections.map((product: any, i: number) => {
            return <Grid key={`Product ${i.toString()}`} item sm={3}>
                <Box maxWidth={"234px"} height={"224px"} borderRadius={"12px"} width={"100%"} overflow={"hidden"}>
                    <img width={"100%"} height={"100%"} src={product?.images?.[0]?.imageData} />
                </Box>
                <Typography className="product_title">{product?.productName}</Typography>
                <Typography className="product_color_count">{product?.colorCount} Colors</Typography>
                <Box display={"flex"}><Typography className="base_price">${product?.basePrice}</Typography><Typography sx={{
                    marginRight: "6px",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "97.602%",
                    textTransform: "lowercase"
                }}>${product?.currentPrice}</Typography></Box>
            </Grid>
        })}
    </Grid> : <div>Loading...</div>
};

export default Collection;