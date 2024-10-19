import {
  Box,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [fivedata, setFiveData] = useState([]);
  const apiKey = `f66d9727501911f62c328508b94c5e3e`;
  const city = ``;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
  const apii = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}
`;
  const onHandleSubmit = async (data) => {
    data.preventDefault();
    try {
      const res = await axios.get(`${api}`);
      setData(res?.data);
      const ress = await axios.get(`${apii}`);
      
      function dateChecker (){
        let arr = [];
        let date = '';
        ress?.data?.list.forEach((item)=>{
         let  dt = item.dt_txt.slice(0,10)
           if(date !== dt){
             date = dt;
             arr.push(item)
           }
        })
        console.log('arr',arr);
        setFiveData(arr.slice(0,5))
      }
      dateChecker()
    } catch (err) {
      console.log(err);
    }
    
  };

  
  


  console.log("fivedata", fivedata);

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
        
        <Box
          sx={{ padding: "20px 0px" }}
          component="form"
          onSubmit={onHandleSubmit}
        >
          <Grid container>
            <Grid
              item
              md={12}
              sx={{
                display: "flex",
                justifyContent: "center!important",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Search Here..."
                variant="outlined"
                sx={{ color: "#fff" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Grid>
            <button
              style={{
                margin: "auto",
                padding: "10px 20px",
                marginTop: "10px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
              type="submit"
            >
              Search
            </button>
          </Grid>
        </Box>
        {/* search bar end */}
        {/* several data card start */}
        <h1 style={{textAlign:"center"}}>Today's Weather</h1>
        <Box>
          <Grid container>
            {data?.weather?.map((item) => {
              return (
                <>
                  <Grid item sm={3}>
                    <CardContent
                      sx={{
                        border: "1px solid black",
                        margin: "5px",
                        minHeight: "30px",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        Description : {item?.description}
                      </Typography>
                    </CardContent>
                  </Grid>
                </>
              );
            })}
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Temprature : {Math.ceil(data?.main?.temp - 273)}°C
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Max-Temprature : {Math.ceil(data?.main?.temp_max - 273)}°C
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {
                    data?(<>
                    Min-Temprature : {Math.floor(data?.main?.temp_min - 273)}°C
                    </>):(
                      <>faizan</>
                    )
                  }
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Humidity : {data?.main?.humidity} %
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Sunrise :
                  {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Sun-Set :{" "}
                  {new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Country : {data?.sys?.country}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item md={3}>
              <CardContent
                sx={{
                  border: "1px solid black",
                  margin: "5px",
                  minHeight: "30px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Pressure : {data?.main?.pressure}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
        {/* several data card end */}

        {/* five card data start */}
        <Box sx={{ padding: "60px 0px" }}>
          <h1 style={{ textAlign: "center" }}>Five Day Forcast</h1>
          <Grid container>
            <Grid item md={3} sx={{display:"contents"}}>
              {fivedata?.filter((item,index)=>{
                return fivedata.indexOf(item) == index
              })?.map((item) => {
                return (
                  <>
                  <div style={{border:"1px solid black",padding:"20px 20px",margin:"15px"}}>
                   <b> Date</b> : {new Date(item?.dt * 1000).toLocaleString()} <br />
                    <b>Temprature </b>: { Math.ceil(item?.main?.temp - 273)}°C <br />
                     {item?.weather?.map((item)=>{
                        return(
                            <>
                            <b>Weather</b> : {item?.main}
                            </>
                        )
                     })}
                  </div>
                    
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
