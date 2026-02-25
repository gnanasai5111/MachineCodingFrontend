import { lazy } from "react";

const getImagePath = (path: string) => `/images${path}.png`;

const screens = [
  { name: "Home", path: "/", file: "Home" },
  {
    name: "Infinite Scrolling",
    path: "/infinite-scrolling",
    file: "InfiniteScrolling/InfiniteScrolling",
  },
  { name: "Accordion", path: "/accordion", file: "Accordion/Accordion" },
  { name: "Todo", path: "/todo", file: "Todo/Todo" },
  { name: "Input Chips", path: "/input-chips", file: "InputChip/InputChip" },
  { name: "TicTacToe", path: "/tictactoe", file: "TicTacToe/TicTacToe" },
  {
    name: "NestedComments",
    path: "/nested-comments",
    file: "NestedComments/NestedComments",
  },
  {
    name: "CustomTable",
    path: "/custom-table",
    file: "CustomTable/CustomTable",
  },
  {
    name: "CustomPagination",
    path: "/custom-pagination",
    file: "CustomPagination/CustomPagination",
  },
  {
    name: "ProgressBarQueueManager",
    path: "/progress-bar-queue-manager",
    file: "ProgressBarQueueManager/ProgressBarQueueManager",
  },
  {
    name: "VirtualScroll",
    path: "/virtual-scroll",
    file: "VirtualScroll/VirtualScroll",
  },
  {
    name: "Timer",
    path: "/timer",
    file: "Timer/Timer",
  },
  {
    name: "FileExplorer",
    path: "/file-explorer",
    file: "FileExplorer/FileExplorer",
  },
];

export const filePaths = screens.map(({ name, path, file }) => ({
  name,
  path,
  element: lazy(() => import(`../screens/${file}`)),
  image: path === "/" ? undefined : getImagePath(path),
}));
