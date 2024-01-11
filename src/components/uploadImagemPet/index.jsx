import { CloudUpload, Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { func, string } from "prop-types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
  borderRadius: "25px",
});

const Image = styled("img")({
  width: "200px",
  height: "200px",
  borderRadius: "25px",
  objectFit: "cover",

  transition: "opacity 0.3s ease-in-out",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "200px",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  borderRadius: "25px",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  "&:hover": {
    opacity: 1,
  },
});

const StyledIconButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Substitua por sua cor desejada
  },
});

const UploadImagemPet = ({ register, url_image }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(url_image || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  useEffect(() => {
    setPreview(url_image || "");
  }, [url_image]);

  return (
    <Box
      sx={{
        border: "1px dashed var(--primary)",
        borderRadius: "25px",
        width: "202px",
        height: "202px",
      }}
    >
      {!file && !preview ? (
        <Box
          sx={{
            display: "grid",
            height: "100%",
            placeItems: "center",
          }}
        >
          <Button
            component="label"
            variant="outlined"
            onChange={handleFileChange}
            sx={{
              border: "1px dashed var(--primary)",
            }}
          >
            <CloudUpload />
            <VisuallyHiddenInput
              name="image"
              type="file"
              onChange={handleFileChange}
              {...register("image")}
            />
          </Button>
        </Box>
      ) : (
        <ImageContainer
          onMouseEnter={() => {
            setIsHovered((prev) => !prev);
          }}
          onMouseLeave={() => {
            setIsHovered((prev) => !prev);
          }}
        >
          <Image src={preview} alt="File Preview" onClick={removeFile} />

          {isHovered && (
            <Overlay>
              <StyledIconButton onClick={removeFile}>
                <Delete color="primary" />
              </StyledIconButton>
            </Overlay>
          )}
        </ImageContainer>
      )}
    </Box>
  );
};

UploadImagemPet.propTypes = {
  register: func.isRequired,
  url_image: string,
};
export default UploadImagemPet;
