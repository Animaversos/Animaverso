import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoadingCadastroEditaoPet = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={5} lg={5}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            animation={"wave"}
            sx={{
              borderRadius: "25px",
            }}
          />
        </Grid>

        <Grid item xs={12} md={7} lg={7} rowSpacing={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Skeleton
                variant="rectangular"
                width={322}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <Skeleton
                variant="rectangular"
                width={102}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Skeleton
                variant="rectangular"
                width={212}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Skeleton
                variant="rectangular"
                width={322}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Skeleton
                variant="rectangular"
                width={157}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Skeleton
                variant="rectangular"
                width={157}
                height={40}
                animation={"wave"}
                sx={{
                  borderRadius: "2px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} marginTop={2}>
          <Skeleton
            variant="rectangular"
            width={552}
            height={125}
            animation={"wave"}
            sx={{
              borderRadius: "2px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonLoadingCadastroEditaoPet;
