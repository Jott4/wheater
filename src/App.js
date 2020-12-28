import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import api from "./services/api";

import GlobalStyle from "./globalStyles";

import { Title, SecondTitle, Divider, ListCapitals } from "./styles";

const API_KEY = "YOUR_API_KEY";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: 0,
    border: "solid 1px rgba(241, 126, 40, 1)",
    width: "90vw",
    maxWidth: "500px",
    margin: "5%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

function App() {
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
    //get capitals wheater
    async function fetchData() {
      capitalsName.map((item) => {
        api
          .get("weather", {
            params: {
              q: item,
              APPID: API_KEY,
              units: "metric",
            },
          })
          .then(
            (res) => {
              console.log(res.data);
              setCapitals((capitals) => [...capitals, res.data]);
            },
            (err) => {
              console.log(err.data);
            }
          );
      }, []);
    }
    fetchData();
  });
  const classes = useStyles();
  return (
    <>
      <GlobalStyle />
      <Container maxWidth="sm">   
        <Grid container spacing={3}>
          <Title>Previsão do tempo</Title>

          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Insira aqui o nome da cidade"
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Divider />
        <Grid container direction="column" justify="center" alignItems="stretch">
          <SecondTitle>Capitais</SecondTitle>
          <ListCapitals>
            <Grid item xs={6}>
              <span>Min</span><span>Máx</span>
              {capitals.slice(0, 5).map((item) => (
                <p>{item.name}</p>
              ))}
            </Grid>
            <Grid xs={6}>
            <span>Min</span><span>Máx</span>
              {capitals.slice(5, 10).map((item) => (
                <p>{item}</p>
              ))}
            </Grid>
          </ListCapitals>
        </Grid>
      </Container>
    </>
  );
}

export default App;
