import * as React from "react";
import { DataGrid, GridActionsCellItem, ptBR } from "@mui/x-data-grid";

import { Backdrop, CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InteressadosApi from "../../service/apis/interessados";
import { enqueueSnackbar } from "notistack";
import { Delete } from "@mui/icons-material";

const EspecieCell = (params) => {
  const especie = params.value;
  const LabelsEspecies = {
    CACHORRO: "Cachorro",
    GATO: "Gato",
    OUTROS: "Outros",
  };
  return LabelsEspecies[especie] || "Não informado";
};

export default function TabelaMeusInteressados() {
  const queryClient = useQueryClient();
  const { data: allPets, isLoading } = useQuery({
    queryKey: ["getAllMeusInteressados"],
    queryFn: () => InteressadosApi.findAllMeusInteresses(),
  });

  const {
    mutate,
    isPending: isPendingUpdate,
    isLoading: isLoadingUpdate,
  } = useMutation({
    mutationFn: async (idInteresse) => {
      return await InteressadosApi.remove(idInteresse);
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ["getAllMeusInteressados"],
      });
      enqueueSnackbar("Interesse removido com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
  });

  const columns = React.useMemo(
    () => [
      {
        field: "pet",
        headerName: "Pet",
        type: "string",
        flex: 0.5,
        valueGetter: (params) => params.row.pet.nome,
      },
      {
        field: "especie",
        headerName: "Especie",
        type: "string",
        flex: 0.5,
        renderCell: EspecieCell,
        valueGetter: (params) => params.row.pet.especie,
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
        width: 100,
        flex: 0.4,
        headerAlign: "center",
        headerName: "Remover intereese ? ",
        align: "center",
        getActions: (params) => [
          <GridActionsCellItem
            key={2}
            icon={<Delete />}
            label="Remover interesse"
            onClick={() => {
              mutate(params.id);
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
