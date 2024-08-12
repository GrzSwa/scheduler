import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
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
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import { getAllDayMessages, getEditingMessages, getSchedulerMessages } from '../localization/localizationMessages.jsx';
import LocaleSwitcher from '../components/localeSwitcher.jsx';

const appointments = []

export function SchedulerView(){
  const [data, setData] = useState(appointments);
  const [locale, setLocale] = useState('pl-PL');

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let updatedData = prevData;
      if (added) {
        const startingAddedId = updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;
        updatedData = [...updatedData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        updatedData = updatedData.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        updatedData = updatedData.filter(appointment => appointment.id !== deleted);
      }
      return updatedData;
    });
  };

  return (
    <div>
      <LocaleSwitcher currentLocale={locale} onLocaleChange={(newLocale) => setLocale(newLocale)} />
      <Paper>
        <Scheduler
          data={data}
          locale={locale}
          height={'auto'}
        >
          <ViewState
            defaultCurrentDate="2018-07-25"
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
          <MonthView
            messages={getSchedulerMessages(locale)}
          />
          <ConfirmationDialog messages={getEditingMessages(locale)} />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={getSchedulerMessages(locale)}/>
          <ViewSwitcher messages={getSchedulerMessages(locale)}/>
          <Appointments />
          <AllDayPanel messages={getAllDayMessages(locale)} />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm messages={getSchedulerMessages(locale)}/>
        </Scheduler>
      </Paper>
    </div>
  );
}