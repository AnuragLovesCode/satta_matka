import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(new Date()); // Set the default date when the component mounts
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      disabled={true}
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/dd/yyyy"
      className="my-custom-datepicker"
    />
  );
};
