/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  INPUT_BACKGROUND = "#FFFFFF",
  WHITE = "#ffffff",
  TEXT = "#212529",
  PRIMARY = "#1FCC79",
  SECONDARY = "#FF6464",
  SUCCESS = "#28a745",
  ERROR = "#dc3545",
  LIGHTER_BORDER = "#E0E0E0",
  NAVY = "#3E5481",
  TEXT_SECONDARY = "#9FA5C0",
  FORM = "#F4F5F7",
  TEXT_DARK = "#000",
  TEXT_DESCRIPTION = "#3D3D3D",
  GRAY_INDICATOR = "#D0DBEA"
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}
