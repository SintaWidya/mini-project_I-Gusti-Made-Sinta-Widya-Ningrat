import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

export default function Homepage({ name }) {
  const versiHP = useMediaQuery("(max-width:600px)");
  const [reload, setReload] = useState(1);
  const [getData, { data, loading, error }] = useLazyQuery(gql`
    query MyQuery($where: fabric_bool_exp) {
      fabric(where: $where) {
        id
        name
        picture
      }
    }
  `);

  useEffect(() => {
    console.log(name);
    setReload(reload + 1);
  }, [name]);

  useEffect(() => {
    if (name === "") {
      getData();
    } else {
      getData({ variables: { where: { name: { _ilike: "%" + name + "%" } } } });
    }
    console.log(data);
  }, [reload]);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <img
        src="asset/homepage/kotak.png"
        alt="headers"
        style={{ width: "100vw", height: "34px" }}
      />
      <Box px={versiHP ? "" : "100px"}>
        <p style={{ fontWeight: 700, paddingTop: "40px" }}>
          Menampilkan jenis Kain Tenun BALI
        </p>
        <Grid container direction="row" spacing={2}>
          {data?.fabric.map((item) => (
            <Grid item container direction="column" spacing={1} xs={12} sm={6}>
              <Grid item container justifyContent="center">
                <Box mx="20px">
                  <img
                    src={item.picture}
                    alt="headers"
                    style={{
                      width: "100%",
                      height: "273px",
                      position: "relative",
                    }}
                  />
                  <Box>
                    <p
                      style={{
                        marginTop: "-60px",
                        marginLeft: "20px",
                        fontWeight: "700",
                        padding: "10px",
                        width: "200px",
                        borderRadius: "30px",
                        textAlign: "center",
                        position: "absolute",
                        color: "white",
                        backgroundColor:
                          "#" +
                          Math.floor(Math.random() * 16777215).toString(16),
                      }}
                    >
                      {item.name}
                    </p>
                  </Box>
                </Box>
              </Grid>
              <Grid item my="20px" mx={versiHP ? "10px" : "150px"}>
                <Button
                  variant="contained"
                  fullWidth
                  href={"/detail/" + item.id}
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "yellow",
                    color: "black",
                    fontWeight: 700,
                  }}
                >
                  lihat detail
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
