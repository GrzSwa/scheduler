import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  DateNavigator,
  TodayButton,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  getAllDayMessages,
  getEditingMessages,
  getSchedulerMessages,
} from "../localization/localizationMessages.jsx";
import LocaleSwitcher from "../components/localeSwitcher.jsx";

import {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../services/firesotreService.jsx";

export function SchedulerView() {
  const [data, setData] = useState([]);
  const [locale, setLocale] = useState("pl-PL");
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAppointments();
        const formattedDate = result.map((appointments) => ({
          ...appointments,
          startDate: appointments.startDate.toDate(),
          endDate: appointments.endDate.toDate(),
        }));
        setData(formattedDate);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let updatedData = prevData;

      if (added) {
        updatedData = [...updatedData, { ...added }];
        addAppointment(added);
      }

      if (changed) {
        {
          updatedData = updatedData.map((appointment) => {
            if (changed[appointment.id]) {
              let { id, ...rest } = appointment || {};
              let result = { ...rest, ...changed[appointment.id] };
              updateAppointment(appointment.id, result);
              return result;
            } else {
              return appointment;
            }
          });
        }
      }

      if (deleted !== undefined) {
        updatedData = updatedData.filter(
          (appointment) => appointment.id !== deleted
        );
        deleteAppointment(deleted);
      }
      return updatedData;
    });
  };

  return (
    <div>
      <LocaleSwitcher
        currentLocale={locale}
        onLocaleChange={(newLocale) => setLocale(newLocale)}
      />
      <Paper>
        <Scheduler data={data} locale={locale} height={"auto"}>
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={commitChanges}
            messages={getSchedulerMessages(locale)}
          />
          <IntegratedEditing />
          <DayView
            startDayHour={7}
            endDayHour={22}
            messages={getSchedulerMessages(locale)}
          />
          <WeekView
            startDayHour={7}
            endDayHour={22}
            messages={getSchedulerMessages(locale)}
          />
          <MonthView messages={getSchedulerMessages(locale)} />
          <ConfirmationDialog messages={getEditingMessages(locale)} />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={getSchedulerMessages(locale)} />
          <ViewSwitcher messages={getSchedulerMessages(locale)} />
          <Appointments />
          <AllDayPanel messages={getAllDayMessages(locale)} />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm messages={getSchedulerMessages(locale)} />
        </Scheduler>
      </Paper>
    </div>
  );
}
