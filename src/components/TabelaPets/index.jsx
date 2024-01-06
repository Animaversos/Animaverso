import * as React from "react";
import { DataGrid, GridActionsCellItem, ptBR } from "@mui/x-data-grid";

import { Create, Delete } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import userUserStore from "../../hooks/userUserStore";
import PetsApi from "../../service/apis/pets";
import CadastrarEditarPet from "../modals/cadastrarEditarPet";
import { useState } from "react";

export default function TabelaPets() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setModalOpen(false);
  };
  const { user } = userUserStore();

  const { data: allPets } = useQuery({
    queryKey: ["getAllPets"],
    queryFn: async () => await PetsApi.getAllPetsByIdUsuario(user.usuario.id),
  });

  const StatusCell = (params) => {
    const status = params.value;

    const labelStatus = {
      SIM: "Adotado",
      NAO: "Não Adotado",
    };
    const labelColor = {
      SIM: "success",
      NAO: "error",
    };
    return (
      <Chip
        label={labelStatus[status] || "Não informado"}
        color={labelColor[status] || "default"}
      />
    );
  };

  const EspecieCell = (params) => {
    const especie = params.value;
    const LabelsEspecies = {
      CACHORRO: "Cachorro",
      GATO: "Gato",
      OUTROS: "Outros",
    };
    return LabelsEspecies[especie] || "Não informado";
  };

  const PorteCell = (params) => {
    const porte = params.value;
    const LabelsPortes = {
      PEQUENO: "Pequeno",
      MEDIO: "Médio",
      GRANDE: "Grande",
    };
    return LabelsPortes[porte] || "Não informado";
  };

  const columns = React.useMemo(
    () => [
      {
        field: "nome",
        headerName: "Nome",
        type: "string",
        width: 300,
        flex: 0.7,
      },
      {
        field: "especie",
        headerName: "Especie",
        type: "string",
        flex: 0.2,
        renderCell: EspecieCell,
      },
      {
        field: "porte",
        headerName: "Porte",
        type: "string",
        flex: 0.2,
        renderCell: PorteCell,
      },
      { field: "peso", headerName: "Peso (Kg)", type: "number", flex: 0.2 },
      {
        field: "adotado",
        headerName: "Adotado ?",
        type: "string",
        flex: 0.3,
        renderCell: StatusCell,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        flex: 0.3,
        headerAlign: "right",
        align: "right",
        getActions: (params) => [
          <GridActionsCellItem
            key={1}
            icon={<Create />}
            label="Editar"
            onClick={() => {
              handleOpenModal(params.id);
            }}
          />,
          <GridActionsCellItem
            key={2}
            icon={<Delete />}
            label="Deletar"
            onClick={() => {
              console.log(params.id);
            }}
          />,
        ],
      },
    ],
    []
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
      <CadastrarEditarPet
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        id={selectedId}
      />
    </div>
  );
}
