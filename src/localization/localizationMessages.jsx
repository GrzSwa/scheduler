const allDayLocalizationMessages = {
    'pl-PL': {
      allDay: 'Cały dzień',
    },
    'en-US': {
      allDay: 'All Day',
    }
  };
  
const editingLocalizationMessages = {
    'pl-PL': {
      deleteButton: 'Usuń',
      cancelButton: 'Anuluj',
      commitButton: 'Zatwierdź',
    },
    'en-US': {
      deleteButton: 'Delete',
      cancelButton: 'Cancel',
      commitButton: 'Save',
    }
  };
  
const schedulerLocalizationMessages = {
    'pl-PL': {
      today: 'Dziś',
      day: 'Dzień',
      week: 'Tydzień',
      month: 'Miesiąc',
    },
    'en-US': {
      today: 'Today',
      day: 'Day',
      week: 'Week',
      month: 'Month',
    }
  };
  
  export const getAllDayMessages = locale => allDayLocalizationMessages[locale];
  export const getEditingMessages = locale => editingLocalizationMessages[locale];
  export const getSchedulerMessages = locale => schedulerLocalizationMessages[locale];
  