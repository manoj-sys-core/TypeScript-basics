import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Hello from "./Basics/start";
import Likes from "./Basics/like-rating";
import Todo from "./Basics/todo";
import GetData from "./Basics/api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Ts-Basics" {...a11yProps(0)} />
          <Tab label="Content-Likes" {...a11yProps(1)} />
          <Tab label="Todo-list" {...a11yProps(2)} />
          <Tab label="Api-Practice" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Hello name="Manoj S" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Likes
          content="A programming language developed by Microsoft that extends JavaScript by adding static types, interfaces, and compile-time checking. It helps catch errors early, improves code readability, and allows better tooling and autocompletion in editors. TypeScript code is compiled into standard JavaScript to run in browsers or Node.js."
          head="TypeScript (TS)"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Todo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GetData />
      </CustomTabPanel>
    </Box>
  );
}
