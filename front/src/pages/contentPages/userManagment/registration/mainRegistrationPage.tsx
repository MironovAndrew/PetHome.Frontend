import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as React from "react";
import { NavLink } from "react-router";
import { ParticipantRegistrationPage } from "./participantRegistrationPage";
import { VolunteerRegistrationPage } from "./volunteerRegistrationPage";

export function MainRegistrationPage() {
  const participantTab = "participantTab";
  const volunteerTab = "volunteerTab";

  const [tabValue, setTabValue] = React.useState(volunteerTab);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ gridColumn: "span 4" }}>
        <NavLink to="/" className="text-lg p-20 text-blue-500 self-start">
          На главную
        </NavLink>
      </Box>
      <Box sx={{ gridColumn: "span 8" }}>
        <div className="flex  flex-col h-full w-full  justify-center items-start gap-5">
          <div className="flex flex-col flex-1 min-w-8 mx-auto items-center justify-center gap-9">
            <Box sx={{ width: "100%" }}>
              <TabContext value={tabValue}>
                <TabList
                  onChange={handleChangeTab}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="secondary tabs example"
                >
                  <Tab
                    value={participantTab}
                    label="Регистрация пользователя"
                  />
                  <Tab value={volunteerTab} label="Регистрация волонтёра" />
                </TabList>
                <div className="flex flex-1 min-w-8 mx-auto items-center justify-center gap-9">
                  <TabPanel value={participantTab}>
                    {ParticipantRegistrationPage()}
                  </TabPanel>
                  <TabPanel value={volunteerTab}>
                    {VolunteerRegistrationPage()}
                  </TabPanel>
                </div>
              </TabContext>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
}
