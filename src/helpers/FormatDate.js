import dayjs from 'dayjs'

export default function FormatDate(date, format = 'MM/DD/YYYY HH:mm:ss') {
  return dayjs(date).format(format)
}