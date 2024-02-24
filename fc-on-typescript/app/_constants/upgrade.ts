export const UPGRADE_INGREDIENT_MAX_COUNT = 5; // 선수 강화시 사용가능한 재료 수
export const UPGRADEABLE_MIN_OVR_DIFF = 5; // 선수 강화시 최소 오버롤 차이
export const UPGRADEABLE_MAX_OVR_DIFF = 6; // 선수 강화시 최대 오버롤 차이

// 강화 게이지(강화수치: +1 ~ +8, 오버롤 차이: -5 ~ +6)
export const UPGRADE_GAUGES: number[][] = [
  [0.81, 0.81, 1.07, 1.42, 1.88, 2.5, 3.31, 4.39, 5, 5, 5, 5], // 1 > 2
  [0, 0.54, 0.71, 0.94, 1.25, 1.66, 2.2, 2.93, 3.89, 5, 5, 5], // 2 > 3
  [0, 0, 0.53, 0.71, 0.94, 1.25, 1.65, 2.2, 2.92, 3.88, 5, 5], // 3 > 4
  [0, 0, 0, 0.57, 0.75, 1, 1.33, 1.67, 2.34, 3.12, 4.15, 5], // 4 > 5
  [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.35, 3.13, 4.16, 5], // 5 > 6
  [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.36, 3.14, 4.18, 5], // 6 > 7
  [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.36, 3.16, 4.21, 5], // 7 > 8
];