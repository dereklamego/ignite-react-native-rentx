import { eachDayOfInterval, format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { MarkedDateProps, DayProps } from ".";

import theme from "../../styles/theme";
import { parseISO } from "date-fns";

export function generateInterval(start:DayProps, end:DayProps){
  let interval: MarkedDateProps ={}

  eachDayOfInterval({start: parseISO(start.dateString), end: parseISO(end.dateString)})
  .forEach((item)=>{
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    interval={
      ...interval,
      [date]:{
        color: start.dateString === date || end.dateString === date 
        ? theme.colors.main:theme.colors.main_light,

        textColor: start.dateString === date || end.dateString === date 
        ? theme.colors.background_primary : theme.colors.main,
        
        disabled: true,
        disableTouchEvent: true,
      }
    }
  })

  return interval;
}
