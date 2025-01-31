import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { NavLink, useNavigate } from "react-router";
import { ParticipantRegistrationPage } from "./participantRegistrationPage";
import { VolunteerRegistrationPage } from "./volunteerRegistrationPage";
import { requisiteForm } from "../../../../models/content/requisiteForm";

export function MainRegistrationPage() {
  const participantTab = "participantTab";
  const volunteerTab = "volunteerTab";

  const [tabValue, setTabValue] = React.useState(participantTab);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <div className="p-10">
        <NavLink to="/" className="text-lg text-blue-500 self-start">
          На главную
        </NavLink>
      </div>
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
                <Tab value={participantTab} label="Регистрация пользователя" />
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
    </div>
  );
}
