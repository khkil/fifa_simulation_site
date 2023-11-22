import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useMemo } from "react";

const MatchTypeTabs = ({ matchTypes, selectedMatchType, setSelectedMatchType }) => {
  const sortedMatchType = useMemo(() => {
    const mainMatchTypes = [
      52, //감독모드
      60, // 공식 친선
      30, // 리그 친선
      50, //공식경기
    ];
    return matchTypes.sort((a, b) => mainMatchTypes.indexOf(b.matchtype) - mainMatchTypes.indexOf(a.matchtype));
  }, [matchTypes]);

  return (
    <ToggleButtonGroup value={selectedMatchType} sx={{ p: 2, pb: 0 }} color="info">
      {sortedMatchType.map(({ matchtype, desc }) => (
        <ToggleButton
          onClick={(e) => {
            setSelectedMatchType(Number(e.target.value));
          }}
          key={matchtype}
          value={matchtype}
        >
          {desc}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default MatchTypeTabs;
