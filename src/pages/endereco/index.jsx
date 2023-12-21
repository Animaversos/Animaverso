import { Box, Button, Divider, TextField, Typography } from "@mui/material";

export default function EnderecoPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          width: "70%",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={"bold"}>
            Endereço
          </Typography>
          <Typography variant="p">
            Aqui voce podera preencher suas informações de endereço que sera
            utilizada para a saber aonde o Pet está.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label={"Nome"}
            fullWidth
            //defaultValue={data.nome}
            helperText={
              "Este é o seu nome de exibição público. Pode ser seu nome real ou um pseudônimo."
            }
            size="small"
          />
          <TextField
            label={"E-mail"}
            fullWidth
            size="small"
            //defaultValue={data.email}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Biografia"
            size="small"
            multiline
            rows={4}
            fullWidth
            helperText={
              "A biografica será apresentada para as pessoas que estejam vendo os pets que você cadastro ao clicar no seu nome."
            }
          />
          <Button
            variant={"contained"}
            sx={{ width: "180px", textTransform: "none" }}
            size="small"
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </>
  );
}
