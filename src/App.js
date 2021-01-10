import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CloseIcon from "@material-ui/icons/Close";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import api from "./services/api";

import classNames from "classnames";

import GlobalStyle from "./globalStyles";
import { Box, CardHeader, Hidden, Typography } from "@material-ui/core";
import {
  WrapperHeader,
  Hr,
  MinMaxWrapper,
  CapitalsWrapper,
  Wrapper,
} from "./styles";

const API_KEY = "YOUR_API_KEY";

const useStyles = makeStyles((theme) => ({
  wrapperInput: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    border: "solid 1px rgba(241, 126, 40, 1)",
    width: "80%",
  },
  input: {
    flex: 1,
    fontSize: "1rem",
    padding: "10px",
  },
  subtitle: {
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: "2px",
    marginBottom: "20px",
  },
  card: {
    width: "80%",
    borderRadius: "0px",
  },

  icon: {
    color: "orange",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    color: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
  },
  daysOfWeek: {
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [cityContent, setCityContent] = useState({
    coord: {
      lon: -51.1628,
      lat: -23.3103,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "algumas nuvens",
        icon: "02n",
      },
    ],
    base: "stations",
    main: {
      temp: 27,
      feels_like: 31.43,
      temp_min: 27,
      temp_max: 27,
      pressure: 1014,
      humidity: 78,
    },
    visibility: 10000,
    wind: {
      speed: 1.03,
      deg: 120,
    },
    clouds: {
      all: 20,
    },
    dt: 1610242823,
    sys: {
      type: 1,
      id: 8399,
      country: "BR",
      sunrise: 1610182049,
      sunset: 1610230550,
    },
    timezone: -10800,
    id: 3458449,
    name: "Londrina",
    cod: 200,
  });
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

  const getWheaterCity = async (city) => {
    await api
      .get("weather", {
        params: {
          q: city,
          units: "metric",
          lang: "pt_br",
          APPID: API_KEY,
        },
      })
      .then(
        async (res) => {
          console.log(res);
          setCityContent(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  };

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
              console.log(err);
            }
          );
      }, []);
    }

    getCapitalsData();
  }, []);

  const MakeLabelCapitals = ({ temp_min, temp_max, city }) => (
    <CapitalsWrapper>
      <div>{Math.round(temp_min)}°</div> <div>{Math.round(temp_max)}°</div>{" "}
      <div>{city}</div>
    </CapitalsWrapper>
  );
  return (
    <>
      <GlobalStyle />
      <Grid container>
        <Grid item xs={false} md={3} />
        <Grid item xs={12} md={6}>
          <WrapperHeader>
            <Typography
              className={classes.subtitle}
              variant="h2"
              component="h1"
            >
              Previsão do tempo
            </Typography>
            <Card className={classes.card}>
              <CardHeader
                style={{ paddingBottom: "0px" }}
                subheader={`${cityContent.name} - ${cityContent.sys.country}`}
                action={
                  <IconButton aria-label="settings">
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography
                  variant="h2"
                  component="h2"
                  className={classes.bold}
                  style={{ textTransform: "capitalize" }}
                >
                  {cityContent.main.temp}° {cityContent.weather[0].description}
                </Typography>
                <Wrapper>
                  <Box display="flex">
                    <Typography
                      color="textSecondary"
                      className={classNames(classes.center, classes.bold)}
                    >
                      <ArrowDownwardIcon className={classes.icon} />
                      &nbsp;{cityContent.main.temp_min}°
                    </Typography>

                    <Typography
                      color="textSecondary"
                      className={classNames(classes.center, classes.bold)}
                    >
                      <ArrowUpwardIcon className={classes.icon} />
                      <strong>&nbsp;{cityContent.main.temp_max}°</strong>
                    </Typography>
                  </Box>

                  <Typography color="textSecondary">
                    Sensação:&nbsp;
                    <strong className={classes.bold}>
                      {Math.round(cityContent.main.feels_like)}°
                    </strong>
                  </Typography>

                  <Typography color="textSecondary" className={classes.center}>
                    {new Date(cityContent.sys.sunrise * 1000).getHours()}:
                    {new Date(cityContent.sys.sunrise * 1000).getMinutes()}
                    &nbsp;
                    <WbSunnyIcon />
                    &nbsp;
                    {new Date(cityContent.sys.sunset * 1000).getHours()}:
                    {new Date(cityContent.sys.sunset * 1000).getMinutes()}
                    &nbsp;
                  </Typography>
                </Wrapper>
                <Wrapper>
                  <Typography color="textSecondary">
                    Vento:&nbsp;
                    <strong className={classes.bold}>
                      {Math.round(cityContent.wind.speed * 3.6)} km/h -{" "}
                      {cityContent.wind.deg}°
                    </strong>
                  </Typography>
                  <Typography color="textSecondary">
                    Pressão:&nbsp;
                    <strong className={classes.bold}>
                      {Math.round(cityContent.main.pressure * 0.75)} mmHg
                    </strong>
                  </Typography>
                  <Typography color="textSecondary">
                    Humidade:&nbsp;
                    <strong className={classes.bold}>
                      {cityContent.main.humidity}%
                    </strong>
                  </Typography>
                </Wrapper>
              </CardContent>
            </Card>
            <Paper className={classes.wrapperInput}>
              <InputBase
                className={classes.input}
                placeholder="Insira o nome da cidade"
                onChange={(e) => setCity(e.target.value)}
              />
              <IconButton
                type="submit"
                aria-label="search"
                onClick={() => getWheaterCity(city)}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </WrapperHeader>
          <Hr />
          <Grid container>
            <Grid item xs={false} md={2} />
            <Grid item xs={12} md={8}>
              <Box mx={3} m={2}>
                <Grid container>
                  <Grid item xs={12} md={10}>
                    <Typography variant="h3" className={classes.subtitle}>
                      Capitais
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MinMaxWrapper>
                      <Typography color="textSecondary">Min</Typography>
                      <Typography color="textSecondary">Max</Typography>
                    </MinMaxWrapper>
                  </Grid>
                  <Grid item xs={false} md={6}>
                    <Hidden smDown>
                      <MinMaxWrapper>
                        <Typography color="textSecondary">Min</Typography>
                        <Typography color="textSecondary">Max</Typography>
                      </MinMaxWrapper>
                    </Hidden>
                  </Grid>

                  {capitals.map((item) => (
                    <>
                      <Grid item xs={12} md={6}>
                        <Box my={1}>
                          <MakeLabelCapitals
                            key={item.name}
                            temp_min={item.main.temp_min}
                            temp_max={item.main.temp_max}
                            city={item.name}
                          />
                        </Box>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={false} md={2} />
          </Grid>
        </Grid>
        <Grid item md={3} xs={false} />
      </Grid>
    </>
  );
}

export default App;
