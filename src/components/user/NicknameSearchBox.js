import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

const NicknameSearchBox = ({ setNickname }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setNickname(e.target.value);
    }
  };
  return (
    <Box p={2}>
      <TextField
        label="유저 닉네임을 입력해주세요"
        onKeyDown={handleKeyPress}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton size="medium" onClick={() => {}}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Box>
  );
};

export default NicknameSearchBox;
