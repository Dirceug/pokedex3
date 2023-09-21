import PokemonCard from "../card/PokemonCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GridPoke() {
  const [pokes, setPokes] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 1000; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    console.log(endpoints);

    var response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setPokes(res);
      })
      .catch((err) => {});
    return response;

    //   axios
    //     .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    //     .then((res) => {
    //       setPokes(res.data.results);
    //     })
    //     .catch((err) => {});
  };

  return (
    <div>
      <Container maxWidth="false">
        <Grid container spacing={4}>
          {pokes.map((poke, key) => (
            <Grid item xs={2} key={key}>
              <PokemonCard
                name={poke.data.name}
                image={poke.data.sprites.front_default}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
