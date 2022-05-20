import {
  Button,
  Grid,
  IconButton,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

export default function Navbar({ setName, name }) {
  const currentURL = window.location.href;
  const versiHP = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Grid container m="10px">
        <Grid item container justifyContent="center" xs={3}>
          <p
            style={{
              fontWeight: 700,
              color: "#9C42E2",
              fontSize: versiHP ? "10px" : "34px",
              lineHeight: "40px",
              fontFamily: "Roboto",
              height: "40px",
            }}
          >
            BALI TENUN SHOP
          </p>
        </Grid>
        {!versiHP && (
          <Grid
            item
            xs={4}
            bgcolor={
              !(
                currentURL !==
                ("http://localhost:3000" ||
                  "https://miniproject-igustimadesintawidyaningrat.netlify.app") +
                  "/"
              )
                ? "#E3E3E3"
                : "#FFFFFFF"
            }
          >
            {!(currentURL !== "http://localhost:3000/") && (
              <>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => console.log(name)}
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  onChange={(e) => setName(e.target.value)}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Cari kain tenun di sini ..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </>
            )}
          </Grid>
        )}
        <Grid
          item
          container
          pr={versiHP ? "" : "40px"}
          justifyContent="flex-end"
          xs={5}
        >
          <Grid item>
            <div>
              <Button
                variant="text"
                href="/"
                style={{ textTransform: "none", color: "black" }}
              >
                beranda
              </Button>
              {currentURL ===
                ("http://localhost:3000" ||
                  "https://miniproject-igustimadesintawidyaningrat.netlify.app") +
                  "/" && (
                <hr
                  style={{
                    marginTop: "-10px",
                    marginLeft: "10px",
                    width: "30px",
                    height: "1px",
                    backgroundColor: "#2537DD",
                  }}
                />
              )}
            </div>
          </Grid>
          {/* <Grid item>
            <Button
              variant="text"
              href="/keranjang"
              style={{ textTransform: "none", color: "black" }}
            >
              keranjang
            </Button>
            {currentURL === "http://localhost:3000/keranjang" && (
              <hr
                style={{
                  marginTop: "-10px",
                  marginLeft: "10px",
                  width: "30px",
                  height: "1px",
                  backgroundColor: "#2537DD",
                }}
              />
            )}
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
