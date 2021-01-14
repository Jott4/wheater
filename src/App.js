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
import {
  Box,
  CardHeader,
  Divider,
  Hidden,
  Typography,
} from "@material-ui/core";
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
    width: "100%",
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
    width: "100%",
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
  centerResponsive: {
    justifyContent: "center",
  },
  [theme.breakpoints.down("xs")]: {
    centerResponsive: { justifyContent: "center" },
  },

  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [cityContent, setCityContent] = useState({});
  const [capitals, setCapitals] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const today = new Date();
  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (res) => {
        console.log(res);
        await api
          .get("onecall", {
            params: {
              lat: res.coords.latitude,
              lon: res.coords.longitude,
              exclude: ["minutely", "hourly", "alerts"],
              APPID: API_KEY,
              units: "metric",
              lang: "pt_br",
            },
          })
          .then(
            (res) => {
              console.log(res.data);
              setCityContent(res.data);
              setLoading(true);
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        alert("AMIGÃO HABILITA A GEOLOCALIZAÇÃO AI PA NOIS");
      }
    );

    const getCapitalsData = async () => {
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
    };
    getCapitalsData();
  }, []);

  const MakeLabelCapitals = ({ temp_min, temp_max, city }) => (
    <CapitalsWrapper>
      <div>{Math.round(temp_min)}°</div> <div>{Math.round(temp_max)}°</div>{" "}
      <div>{city}</div>
    </CapitalsWrapper>
  );

  const DayOfWeekWrapper = ({ n_day }) => (
    <Typography className={classNames(classes.bold, classes.column)}>
      <strong>{n_day > 6 ? days[n_day - 7] : days[n_day]}</strong>

      <Typography
        color="textSecondary"
        className={classNames(classes.center, classes.bold)}
      >
        <ArrowDownwardIcon className={classes.icon} />
        &nbsp;{loading ? `${cityContent.daily[n_day].temp.min}°` : ""}
      </Typography>

      <Typography
        color="textSecondary"
        className={classNames(classes.center, classes.bold)}
      >
        <ArrowUpwardIcon className={classes.icon} />
        <strong>
          &nbsp;
          {loading ? `${cityContent.daily[n_day].temp.max}°` : ""}
        </strong>
      </Typography>
    </Typography>
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
                subheader={loading ? `${days[today.getDay()]}-Feira` : ""}
                action={
                  <IconButton aria-label="settings">
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography
                  variant="h3"
                  component="h2"
                  className={classes.bold}
                  style={{
                    textTransform: "capitalize",
                    marginBottom: "16px",
                    textAlign: "center",
                  }}
                >
                  {loading
                    ? `${cityContent.current.temp}° ${cityContent.current.weather[0].description}`
                    : ""}
                </Typography>
                <Grid container>
                  <Grid item xs={false} sm={2} />
                  <Grid item container spacing={1} xs={12} sm={8}>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      className={classes.centerResponsive}
                    >
                      <Typography
                        color="textSecondary"
                        className={classNames(classes.center, classes.bold)}
                      >
                        <ArrowDownwardIcon className={classes.icon} />
                        &nbsp;
                        {loading ? `${cityContent.daily[0].temp.min}°` : ""}
                      </Typography>

                      <Typography
                        color="textSecondary"
                        className={classNames(classes.center, classes.bold)}
                      >
                        <ArrowUpwardIcon className={classes.icon} />
                        <strong>
                          &nbsp;
                          {loading ? `${cityContent.daily[0].temp.max}°` : ""}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      className={classes.centerResponsive}
                    >
                      <Typography color="textSecondary">
                        Sensação:&nbsp;
                        <strong className={classes.bold}>
                          {loading
                            ? `${Math.round(cityContent.current.feels_like)}°`
                            : ""}
                        </strong>
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      className={classes.centerResponsive}
                    >
                      <Typography
                        color="textSecondary"
                        className={classes.center}
                      >
                        {loading
                          ? `${new Date(
                              cityContent.current.sunrise * 1000
                            ).getHours()}:
                      ${new Date(
                        cityContent.current.sunrise * 1000
                      ).getMinutes()}`
                          : ""}
                        &nbsp;
                        <WbSunnyIcon />
                        &nbsp;
                        {loading
                          ? `${new Date(
                              cityContent.current.sunset * 1000
                            ).getHours()}:
                      ${new Date(
                        cityContent.current.sunset * 1000
                      ).getMinutes()}`
                          : ""}
                        &nbsp;
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      className={classes.centerResponsive}
                    >
                      <Typography color="textSecondary">
                        Humidade:&nbsp;
                        <strong className={classes.bold}>
                          {loading ? `${cityContent.current.humidity}%` : ""}
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={false} sm={2} />
                </Grid>
                <Divider
                  style={{ backgroundColor: "orange", margin: "16px 0px" }}
                />

                <Box display="flex" style={{ justifyContent: "space-evenly" }}>
                  <DayOfWeekWrapper n_day={1} />
                  <DayOfWeekWrapper n_day={2} />
                  <DayOfWeekWrapper n_day={3} />
                  <Hidden smDown>
                    <DayOfWeekWrapper n_day={4} />
                    <DayOfWeekWrapper n_day={5} />
                  </Hidden>
                </Box>
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
                            key={item.id}
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
