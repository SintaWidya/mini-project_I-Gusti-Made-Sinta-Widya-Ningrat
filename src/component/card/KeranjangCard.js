import React, { useState } from "react";
import { Button, Grid, IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function KeranjangCard({ gambar, nama, harga, jumlah }) {
  const [nilai, setNilai] = useState(jumlah);
  return (
    <>
      <Grid
        container
        width="90vw"
        borderRadius="30px"
        m="10px"
        mx="50px"
        border="2px solid black"
      >
        <Grid item m="10px">
          <img
            src={gambar}
            alt="gambar"
            style={{ width: "300px", borderRadius: "20px" }}
          />
        </Grid>

        <Grid
          item
          xs={7}
          my="10px"
          container
          direction="column"
          justifyContent="center"
        >
          <Grid item>
            <h2>{nama}</h2>
            <h3>Rp.{harga * nilai}</h3>
            <Box
              border="2px solid black"
              width="10vw"
              borderRadius="30px"
              display="flex"
            >
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => setNilai(nilai + -1)}
              >
                <Box border="2px solid black" borderRadius="100%" px="8px">
                  -
                </Box>
              </IconButton>
              <Box
                width="5vw"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <p>{nilai}</p>
              </Box>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => setNilai(nilai + 1)}
              >
                <Box border="2px solid black" borderRadius="100%" px="6px">
                  +
                </Box>
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row-reverse"
          xs={1.2}
          alignItems="flex-end"
        >
          <IconButton aria-label="delete" color="error" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
