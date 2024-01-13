import * as React from "react";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { Backdrop, CircularProgress, Switch } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InteressadosApi from "../../service/apis/interessados";
import PetsApi from "../../service/apis/pets";
import { enqueueSnackbar } from "notistack";

export default function TabelaInteressados() {
  const queryClient = useQueryClient();
  const { data: allPets, isLoading } = useQuery({
    queryKey: ["getAllInteressados"],
    queryFn: () => InteressadosApi.findAll(),
  });

  const {
    mutate,
    isPending: isPendingUpdate,
    isLoading: isLoadingUpdate,
  } = useMutation({
    mutationFn: async (idPet) => {
      return await PetsApi.adota(idPet);
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: ["getAllInteressados"] });
      enqueueSnackbar("Pet adotado com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
  });

  const columns = React.useMemo(
    () => [
      {
        field: "usuarioNome",
        headerName: "Pessoa interessada",
        type: "string",
        width: 300,
        flex: 0.7,
        valueGetter: (params) => params.row.usuario.nome,
      },
      {
        field: "pet",
        headerName: "Pet",
        type: "string",
        flex: 0.5,
        valueGetter: (params) => params.row.pet.nome,
      },
      {
        field: "localidade",
        headerName: "Localidade do pet",
        type: "string",
        width: 300,
        flex: 0.5,
        valueGetter: (params) =>
          `${params.row.pet.usuario.endereco.estado.uf} - ${params.row.pet.usuario.endereco.cidades.nome}`,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Adotou ?",
        width: 100,
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        getActions: (params) => [
          <Switch
            key={1}
            disabled={params.row.pet.adotado === "SIM"}
            defaultChecked={params.row.pet.adotado === "SIM"}
            onChange={(event) => {
              if (event.target.checked) {
                mutate(params.row.id_pet);
              }
            }}
            inputProps={{
              "aria-label": "controlled",
            }}
          />,
        ],
      },
    ],
    [mutate]
  );

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={allPets || []}
        disableColumnFilter
        disableColumnMenu
        autoHeight
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnResize
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <Backdrop
        open={isLoading || isPendingUpdate || isLoadingUpdate || false}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
