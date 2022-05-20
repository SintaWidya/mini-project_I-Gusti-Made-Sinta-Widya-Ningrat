import { Button, Grid, styled, TextField, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { grey, purple } from "@mui/material/colors";

export default function Detail() {
  const params = useParams();
  const versiHP = useMediaQuery("(max-width:600px)");
  const [comment, setComment] = useState({
    fabric_id: params.id,
    name: "",
    comment: "",
  });
  const [reload, setReload] = useState(1);
  const { data, loading, error } = useQuery(
    gql`
      query MyQuery($id: Int!) {
        fabric_by_pk(id: $id) {
          description
          id
          name
          price
          picture
          phone
        }
      }
    `,
    { variables: { id: params.id } }
  );

  const {
    data: dataComment,
    loading: loading1,
    error: error1,
  } = useQuery(
    gql`
      query MyQuery($id: Int!) {
        fabric_comment(
          where: { fabric_id: { _eq: $id } }
          order_by: { id: desc }
        ) {
          comment
          name
        }
      }
    `,
    { variables: { id: params.id } }
  );

  const [insertComment, { data: dataInsert }] = useMutation(
    gql`
      mutation MyMutation($object: fabric_comment_insert_input!) {
        insert_fabric_comment_one(object: $object) {
          name
          comment
        }
      }
    `
  );

  // const dataComment = [
  //   {
  //     nama: "Nama User",
  //     comment:
  //       "Id et officia sint esse mollit. Officia labore veniam tempor quis ut nisi commodo. Laborum qui elit nulla laborum irure cupidatat tempor nulla reprehenderit in mollit.",
  //   },
  //   {
  //     nama: "Nama User",
  //     comment:
  //       "Occaecat deserunt consectetur nisi dolore pariatur anim. Nulla Lorem aliqua ea incididunt ea qui ut tempor dolore. Laborum laborum mollit nulla aute labore irure. Adipisicing in laboris culpa in magna velit eu nostrud non ullamco consequat. Aliquip qui dolore officia incididunt sit aliqua elit voluptate. Exercitation ut ullamco fugiat qui eu minim voluptate aliquip tempor ut ea aliqua nostrud. Consequat aliquip nostrud magna reprehenderit ex aliqua pariatur id excepteur est cillum nulla.Cupidatat tempor aliqua tempor culpa tempor et tempor ad. Labore cupidatat amet dolore cupidatat esse fugiat. Mollit reprehenderit fugiat minim duis incididunt amet ex. Esse commodo duis eu ipsum occaecat commodo irure tempor nostrud enim sint et ullamco laborum. Minim excepteur tempor id exercitation amet et labore ullamco ad do.Exercitation aliqua excepteur commodo velit. Occaecat est est qui nulla voluptate excepteur. Fugiat amet laborum in in id.",
  //   },
  // ];

  useEffect(() => {
    if (dataInsert !== undefined) {
      window.location.reload();
    }
  }, [dataInsert]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };
  const handleSend = (event) => {
    console.log(comment);
    insertComment({
      variables: {
        object: comment,
      },
    });
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: "white",
    "&:hover": {
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: grey[500],
    },
    borderRadius: "30px",
  }));

  if (loading || loading1) {
    return <p>loading..</p>;
  }
  if (error || error1) {
    return <p>error</p>;
  }
  return (
    <div>
      <Box py="20px">
        <center>
          <h1>Detail Barang</h1>
        </center>
      </Box>
      <Grid container justifyItems="center">
        <Grid item xs={12} sm={6}>
          <Box px="20px">
            <img
              src={data?.fabric_by_pk.picture}
              alt="headers"
              style={{ width: "100%", height: "500px" }}
            />
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          border="2px solid black"
          p="10px"
          px="20px"
          borderRadius="40px"
          direction="column"
          minHeight="50vh"
          mx={versiHP ? "10px" : "-10px"}
        >
          <Grid item xs={1} container>
            <Box pt="10px">
              <h3>{data?.fabric_by_pk.name} </h3>
            </Box>
          </Grid>
          <Grid item xs={1} container>
            <Box pt="10px">
              <h4>Rp.{data?.fabric_by_pk.price} </h4>
              <h4>{data?.fabric_by_pk.fabric} </h4>
            </Box>
          </Grid>
          <Grid item xs={8} container>
            <Box pt="10px">
              <p>{data?.fabric_by_pk.description} </p>
            </Box>
          </Grid>
          <Grid item xs={1} container>
            <ColorButton
              href={
                "https://wa.me/" +
                data?.fabric_by_pk.phone +
                "?text=halo%20kak%2C%20perkenalkan%20saya%20(nama%20anda)%20kebetulan%20saya%20ingin%20membeli%20produk%20" +
                data?.fabric_by_pk.name +
                "%20dimana%20saya%20melihat-nya%20di%20website%20Bali%20Tenun%20Shop%2C%20apakah%20untuk%20produk-nya%20masih%20tersedia%3F"
              }
              variant="outlined"
              fullWidth
            >
              chat via whatsapp
            </ColorButton>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Box width="99vw">
        <Box
          minHeight="50vh"
          border="2px solid black"
          m="20px"
          p="20px"
          borderRadius="40px"
        >
          <center>
            <h3>Komentar</h3>
          </center>
          <div className="overflow-scroll" style={{ height: "50vh" }}>
            {dataComment?.fabric_comment.map((item) => (
              <Box minHeight="10vh" m="20px">
                <h4>{item.name}</h4>
                <p>{item.comment}</p>
              </Box>
            ))}
          </div>
          <Box m="20px" border="2px solid black" borderRadius="25px" p="20px">
            <TextField
              id="standard-basic"
              label="Nama User"
              variant="standard"
              name="name"
              value={comment.name}
              onChange={handleChange}
            />
            <Box my="10px">
              <TextField
                id="outlined-multiline-flexible"
                label="komentar"
                name="comment"
                multiline
                fullWidth
                maxRows={4}
                value={comment.comment}
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" onClick={handleSend}>
                send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
