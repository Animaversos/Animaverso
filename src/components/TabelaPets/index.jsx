import * as React from "react";
import { DataGrid, GridActionsCellItem, ptBR } from "@mui/x-data-grid";

import { Create, Delete } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function TabelaPets() {
  const initialRows = [
    {
      id: 1,
      nome: "Bolota",
      peso: 2,
      especie: "Cachorro",
      porte: "Pequeno",
      status: "Adotado",
    },
  ];
  const [rows, setRows] = React.useState(initialRows);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const StatusCell = (params) => {
    const status = params.value;

    // Personalize a cor da label com base no valor do status
    const labelColor =
      status === "Adotado"
        ? "success"
        : status === "Em adoção"
        ? "info"
        : "warning";

    return <Chip label={status} color={labelColor} />;
  };

  const columns = React.useMemo(
    () => [
      {
        field: "nome",
        headerName: "Nome",
        type: "string",
        width: 300,
        flex: 1,
      },
      { field: "especie", headerName: "Especie", type: "string", flex: 0.5 },
      { field: "porte", headerName: "Porte", type: "string", flex: 0.3 },
      { field: "peso", headerName: "Peso (Kg)", type: "number", flex: 0.3 },
      {
        field: "status",
        headerName: "Status",
        type: "string",
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
              console.log(params);
            }}
          />,
          <GridActionsCellItem
            key={2}
            icon={<Delete />}
            label="Deletar"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser]
  );

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
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
    </div>
  );
}
