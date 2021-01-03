import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import api from "./services/api";

import GlobalStyle from "./globalStyles";
import { Typography } from "@material-ui/core";
import { WrapperHeader, Hr, MinMaxWrapper, CapitalsWrapper } from "./styles";

const API_KEY = "a96866ed4173c7c1b51f7fac358f155a";

const useStyles = makeStyles((theme) => ({
  wrapperInput: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    border: "solid 1px rgba(241, 126, 40, 1)",
    width: "60%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "1.5rem",
    padding: "10px",
  },
  title: {
    fontSize: "4.5rem",
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: "3px",
  },
  subtitle: {
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: "2px",
    marginBottom: "20px",
  },
}));

function App() {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [capitals, setCapitals] = useState([]);
  const capitalsName = [
    "Rio de Janeiro",
    "São Paulo",
    "Belo Horizonte",
    "Brasília",
    "Belém",
    "Salvador",
    "Curitiba",
    "Fortaleza",
    "Manaus",
    "João Pessoa",
  ];

  useEffect(() => {
    async function getCapitalsData() {
      capitalsName.map(async (item) => {
        await api
          .get("weather", {
            params: {
              q: item,
              APPID: API_KEY,
              units: "metric",
            },
          })
          .then(
            (res) => {
              setCapitals((capitals) => [...capitals, res.data]);
            },
            (err) => {
              console.log(err)
            }
          );
      }, []);
    }
    getCapitalsData();
    console.log(capitals);
  }, []);

  const getWheaterCity = async () => {
  
    await api
    .get("weather", {
      params: {
        q: city,
        APPID: API_KEY,
        units: "metric",
      },
    })
    .then(
      (res) => {
        
      },
      (err) => {
        console.log(err)
      }
    );
  }

  const MakeLabelCapitals = ({ temp_min, temp_max, city }) => (
    <CapitalsWrapper>
      <div>{temp_min}°</div> <div>{temp_max}°</div> <div>{city}</div>
    </CapitalsWrapper>
  );
  return (
    <>
      <GlobalStyle />
      <Grid container>
        <Grid item md={3} sm={false} />
        <Grid item sm={12} md={6}>
          <WrapperHeader>
            <Typography variant="h1" className={classes.title} align="center">
              Previsão do tempo
            </Typography>
            <Paper className={classes.wrapperInput}>
              <InputBase
                className={classes.input}
                placeholder="Insira aqui o nome da cidade"
                onChange={(e) => setCity(e.target.value)}
              />
              <IconButton type="submit" aria-label="search" onClick={getWheaterCity}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </WrapperHeader>
          <Hr />
          <Grid container>
            <Grid item sm={false} md={2}></Grid>
            <Grid item sm={12} md={4}>
              <Typography variant="h3" className={classes.subtitle}>
                Capitais
              </Typography>
              <MinMaxWrapper>
                <Typography color="textSecondary">Min</Typography>
                <Typography color="textSecondary">Max</Typography>
              </MinMaxWrapper>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography variant="h3" className={classes.subtitle}>
                &nbsp;
              </Typography>
              <MinMaxWrapper>
                <Typography color="textSecondary">Min</Typography>
                <Typography color="textSecondary">Max</Typography>
              </MinMaxWrapper>
              {capitals.map((item) => (
                <MakeLabelCapitals
                  temp_min={item.main.temp_min}
                  temp_max={item.main.temp_max}
                  city={item.name}
                />
              ))}
            </Grid>
            <Grid item sm={false} md={2}></Grid>
          </Grid>
        </Grid>
        <Grid item md={3} sm={false} />
      </Grid>
    </>
  );
}

export default App;
