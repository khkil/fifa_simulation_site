import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const NicknameSearchBox = () => {
  const { pathname, query, push } = useRouter();
  const [nickname, setNickname] = useState(query.nickname);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      push({
        pathname,
        query: {
          nickname: e.target.value,
        },
      });
      setNickname(e.target.value);
    }
  };

  return (
    <Box p={2}>
      <TextField
        label="유저 닉네임을 입력해주세요"
        value={nickname}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="medium"
                onClick={(e) => {
                  setNickname(e.target.value);
                }}
              >
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
