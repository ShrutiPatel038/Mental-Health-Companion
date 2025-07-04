import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({ data, startDate, endDate }) => {
  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={data}
      classForValue={value =>
        value ? 'bg-green-500' : 'bg-gray-200'
      }
      showWeekdayLabels
      tooltipDataAttrs={value =>
        value.date ? { 'data-tip': value.date } : {}
      }
      showOutOfRangeDays={false}
    />
  );
};
export default Heatmap;
