import { Box,  CircularProgress, Grid, Typography } from '@mui/material';
import './home.sass';
import Header from '../../Components/Header/Header';
import { useEffect, useState } from 'react';
import { FetchPagesOfCategory, FetchPagesOfMaterial, FetchPagesOfProduct } from '../../Api/APIMethods';
import SearchIcon from '/src/assets/search.svg';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductListing from '../../Components/ProductListing/ProductListing';
import CategoryListing from '../../Components/CategoryListing/CategoryListing';
import MaterialListing from '../../Components/MaterialListing/MaterialListing';


function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const downloadCollections = async (page: Number, count: Number, setCollection: Function, setTotalCount: Function) => {
    try {
        const responseCollection = await FetchPagesOfProduct(page, count);
        console.log(responseCollection);
        setCollection(responseCollection.products);
        setTotalCount(responseCollection.totalProducts);
    } catch (error) {
        console.log(error);
    }
}
const downloadCategories = async (page: Number, count: Number, setCategories: Function, setTotalCountCategories: Function) => {
    try {
        const responseCollection = await FetchPagesOfCategory(page, count);
        console.log(responseCollection);
        setCategories(responseCollection.categories);
        console.log("Total count ----------",responseCollection.totalCount);
        setTotalCountCategories(responseCollection.totalCount);
    } catch (error) {
        console.log(error);
    }
}
const downloadMaterial = async (page: Number, count: Number, setMaterial: Function, setTotalCountMaterial: Function) => {
    try {
        const responseCollection = await FetchPagesOfMaterial(page, count);
        console.log(responseCollection);
        setMaterial(responseCollection.categories);
        console.log("Total count ----------",responseCollection.totalCount);
        setTotalCountMaterial(responseCollection.totalCount);
    } catch (error) {
        console.log(error);
    }
}
const Home = () => {
    const count = 12;
    const [page, setPage] = useState(1);
    const [categoryPage, setCategoryPage] = useState(1);
    const [materialPage, setMaterialPage] = useState(1);
    const [totalCountCategory, setTotalCountCategory] = useState(0);
    const [collections, setCollection] = useState([]);
    const [categories,setCategories] = useState([]);
    const [materials,setMaterials] = useState([]);
    const [totalCountMaterials, setTotalCountMaterials] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [tab, setTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const navigate = useNavigate();
    useEffect(() => {
        downloadCollections(page, count, setCollection, setTotalCount);
        downloadCategories(categoryPage,count,setCategories,setTotalCountCategory);
        downloadMaterial(materialPage,count,setMaterials,setTotalCountMaterials);
        return () => { }
    }, []);

    return collections.length > 0 ? <Grid container sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    }}>
        <Grid item xs={12}><Header /></Grid>
        <Grid item xs={12} sx={{
            "&": {
                marginTop: "20vh",
                marginLeft: "6vw"
            }
        }}>
            <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                <Tab label="Product" {...a11yProps(0)} />
                <Tab label="Category" {...a11yProps(1)} />
                <Tab label="Material" {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={tab} index={0}>
                <Box maxHeight={"70vh"} height={"100%"} overflow={"auto"}>
                    <ProductListing collections={collections} page={page} toatlCount={totalCount} navigate={navigate} SearchIcon={SearchIcon} onPageChange={(num: any) => {
                        downloadCollections(num, count, setCollection, setTotalCount);
                        setPage(num);
                    }} />
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <Box maxHeight={"70vh"} height={"100%"} overflow={"auto"}>
                <CategoryListing categories={categories} page={categoryPage} totalCount={totalCountCategory} navigate={navigate} SearchIcon={SearchIcon} onPageChange={(num: any) => {
                        downloadCategories(num, count, setCategories, setTotalCountCategory);
                        setCategoryPage(num);
                    }} />
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
            <MaterialListing materials={materials} page={materialPage} totalCount={totalCountMaterials} navigate={navigate} SearchIcon={SearchIcon} onPageChange={(num: any) => {
                        downloadMaterial(num, count, setMaterials, setTotalCountMaterials);
                        setMaterialPage(num);
                    }} />
            </CustomTabPanel>

        </Grid>



    </Grid> : <Box width={"100vw"} height={"100vh"} bgcolor={"#FFF"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CircularProgress />
    </Box>
};
export default Home;