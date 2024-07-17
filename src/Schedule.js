import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Checkbox
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TimeDropdown from "./TimeDropdown";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

const defaultStaff = [
  {
    id: 1,
    name: "Ryan",
    color: "#ffa6a6",
    title: "Cloud System Engineer",
    img: "https://img.mobiscroll.com/demos/m1.png",
    rate: 45
  },
  {
    id: 2,
    name: "Kate",
    color: "#b0f28f",
    title: "Help Desk Specialist",
    img: "https://img.mobiscroll.com/demos/f1.png",
    rate: 30
  },
  {
    id: 3,
    name: "John",
    color: "#8eccff",
    title: "Application Developer",
    img: "https://img.mobiscroll.com/demos/m2.png",
    rate: 50
  },
  {
    id: 4,
    name: "Mark",
    color: "#ffc1f8",
    title: "Network Administrator",
    img: "https://img.mobiscroll.com/demos/m3.png",
    rate: 40
  },
  {
    id: 5,
    name: "Sharon",
    color: "#fffb97",
    title: "Data Quality Manager",
    img: "https://img.mobiscroll.com/demos/f2.png",
    rate: 55
  },
  {
    id: 6,
    name: "Emma",
    color: "#bdffea",
    title: "Product Tactics Agent",
    img: "https://img.mobiscroll.com/demos/f3.png",
    rate: 35
  }
];

const defaultShiftsData = [
  {
    start: "2024-07-15T07:00",
    end: "2024-07-15T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    shiftId: 1
  },
  {
    start: "2024-07-15T07:00",
    end: "2024-07-15T13:00",
    title: "07:00 - 13:00",
    resource: 2,
    shiftId: 1
  },
  {
    start: "2024-07-15T07:00",
    end: "2024-07-15T13:00",
    title: "07:00 - 13:00",
    resource: 6,
    shiftId: 1
  },
  {
    start: "2024-07-15T12:00",
    end: "2024-07-15T18:00",
    title: "12:00 - 18:00",
    resource: 3,
    shiftId: 2
  },
  {
    start: "2024-07-15T12:00",
    end: "2024-07-15T18:00",
    title: "12:00 - 18:00",
    resource: 5,
    shiftId: 2
  },
  {
    start: "2024-07-16T07:00",
    end: "2024-07-16T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    shiftId: 1
  },
  {
    start: "2024-07-16T07:00",
    end: "2024-07-16T13:00",
    title: "07:00 - 13:00",
    resource: 3,
    shiftId: 1
  },
  {
    start: "2024-07-16T07:00",
    end: "2024-07-16T13:00",
    title: "07:00 - 13:00",
    resource: 4,
    shiftId: 1
  },
  {
    start: "2024-07-16T12:00",
    end: "2024-07-16T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    shiftId: 2
  },
  {
    start: "2024-07-16T12:00",
    end: "2024-07-16T18:00",
    title: "12:00 - 18:00",
    resource: 6,
    shiftId: 2
  },
  {
    start: "2024-07-17T07:00",
    end: "2024-07-17T13:00",
    title: "07:00 - 13:00",
    resource: 5,
    shiftId: 1
  },
  {
    start: "2024-07-17T07:00",
    end: "2024-07-17T13:00",
    title: "07:00 - 13:00",
    resource: 6,
    shiftId: 1
  },
  {
    start: "2024-07-17T12:00",
    end: "2024-07-17T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    shiftId: 2
  },
  {
    start: "2024-07-17T12:00",
    end: "2024-07-17T18:00",
    title: "12:00 - 18:00",
    resource: 4,
    shiftId: 2
  },
  {
    start: "2024-07-18T07:00",
    end: "2024-07-18T13:00",
    title: "07:00 - 13:00",
    resource: 1,
    shiftId: 1
  },
  {
    start: "2024-07-18T07:00",
    end: "2024-07-18T13:00",
    title: "07:00 - 13:00",
    resource: 5,
    shiftId: 1
  },
  {
    start: "2024-07-18T12:00",
    end: "2024-07-18T18:00",
    title: "12:00 - 18:00",
    resource: 2,
    shiftId: 1
  },
  {
    start: "2024-07-18T12:00",
    end: "2024-07-18T18:00",
    title: "12:00 - 18:00",
    resource: 3,
    shiftId: 2
  },
  {
    start: "2024-07-18T12:00",
    end: "2024-07-18T18:00",
    title: "12:00 - 18:00",
    resource: 6,
    shiftId: 2
  },
  {
    start: "2024-07-19T12:00",
    end: "2024-07-19T18:00",
    title: "12:00 - 18:00",
    resource: 3,
    shiftId: 2
  },
  {
    start: "2024-07-19T12:00",
    end: "2024-07-19T18:00",
    title: "12:00 - 18:00",
    resource: 6,
    shiftId: 1
  }
];

const Schedule = () => {
  const [open, setOpen] = React.useState(false);
  const [currentWeek, setCurrentWeek] = React.useState(
    dayjs().startOf("week").add(1, "day").toDate()
  );
  const [checked, setChecked] = React.useState(false);
  const [shifts, setShifts] = React.useState([
    { id: 1, name: "Morning" },
    { id: 2, name: "Evening" }
  ]);
  const [staff, setStaff] = useState(defaultStaff);
  const [defaultShifts, setDefaultShifts] = React.useState(defaultShiftsData);
  const [shiftDetails, setShiftDetails] = React.useState({
    date: "",
    day: "",
    start: "",
    end: "",
    title: "",
    notes: ""
  });
  const todayRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const staffImages = [
    "https://www.svgrepo.com/show/382101/male-avatar-boy-face-man-user.svg",
    "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg",
    "https://www.svgrepo.com/show/382108/male-avatar-boy-face-man-user-4.svg",
    "https://www.svgrepo.com/show/382107/male-avatar-boy-face-man-user-6.svg",
    "https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg",
    "https://www.svgrepo.com/show/382112/female-avatar-girl-face-woman-user-8.svg"
  ];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * staffImages.length);
    return staffImages[randomIndex];
  }
  function processBackendData(response) {
    const shiftData = response.payload.DATA[0];
    console.log(shiftData);

    // Create shifts array
    const shifts = [{ id: shiftData.id, name: shiftData.name }];

    // Create staff array
    const staffArray = shiftData.shiftEmployeeDetail.map((employee) => ({
      id: employee.employeeId,
      name: employee.employeeName,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      title: employee.employeeDesignation,
      img: "https://example.com/placeholder.png",
      rate: employee.hourlyRate || 0
    }));

    // Process shift details
    const processedShifts = shiftData.shiftDetail.map((detail) => ({
      start: detail.start,
      end: detail.end,
      title: detail.title,
      resource: detail.employeeId,
      shiftId: detail.shiftId
    }));

    return { shifts, staffArray, processedShifts };
  }
  const scrollToToday = () => {
    if (containerRef.current && todayRef.current) {
      const container = containerRef.current;
      const todayElement = todayRef.current;

      const containerRect = container.getBoundingClientRect();
      const todayRect = todayElement.getBoundingClientRect();

      const offsetLeft =
        todayRect.left - containerRect.left + container.scrollLeft;
      const offsetTop = todayRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        left: offsetLeft,
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  // React.useEffect(() => {
  //     let formdata = new FormData();
  //     formdata.append('companyId', '31')
  //     dispatch(getAllShiftsByCompanyId(formdata))
  //         .then((result) => {
  //             if (result.payload.SUCCESS === 1) {
  //                 const { shifts, staffArray, processedShifts } = processBackendData(result);
  //                 setShifts(shifts);
  //                 setStaff(staffArray);
  //                 setDefaultShifts(processedShifts);
  //                 // const transformedShifts = result.payload.DATA.map(normalizeShiftData)
  //                 // console.log([...new Set(result.payload.DATA[0].shiftDetail.map(item => item.employeeId))])
  //                 // setShifts(transformedShifts)
  //                 // setAlert({
  //                 //     open: true,
  //                 //     severity: 'success',
  //                 //     message: 'Retrieved employees list successfully'
  //                 // })
  //             }
  //             else {
  //                 setAlert({
  //                     open: true,
  //                     severity: 'error',
  //                     message: result.payload
  //                 })
  //             }
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //             setAlert({
  //                 open: true,
  //                 severity: 'error',
  //                 message: err.USER_MESSAGE || 'Something went wrong.'
  //             })
  //         });

  // }, [])

  const handleClickOpen = (slotData, shiftData) => {
    console.log(slotData, shiftData);
    setShiftDetails((prevState) => ({
      ...prevState,
      ...slotData,
      start: slotData.title.split(" - ")[0],
      end: slotData.title.split(" - ")[1],
      shiftId: slotData.shiftId,
      date: shiftData.date,
      day: shiftData.day
    }));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editShift = () => {
    console.log(shiftDetails.staff.id, shiftDetails.shiftId);
    setDefaultShifts((prevShifts) => {
      const updatedShifts = prevShifts.map((shift) => {
        if (
          shift.resource === shiftDetails.staff.id &&
          shift.shiftId === shiftDetails.shiftId &&
          dayjs(shift.start).isSame(dayjs(shiftDetails.date), "day")
        ) {
          return {
            ...shift,
            start: `${dayjs(shiftDetails.date).format("YYYY-MM-DD")}T${dayjs(
              shiftDetails.start,
              "h:mm A"
            ).format("HH:mm")}`,
            end: `${dayjs(shiftDetails.date).format("YYYY-MM-DD")}T${dayjs(
              shiftDetails.end,
              "h:mm A"
            ).format("HH:mm")}`,
            title: `${dayjs(shiftDetails.start, "h:mm A").format(
              "HH:mm"
            )} - ${dayjs(shiftDetails.end, "h:mm A").format("HH:mm")}`
          };
        }
        return shift;
      });

      if (
        !prevShifts.some(
          (shift) =>
            shift.resource === shiftDetails.staff.id &&
            shift.shiftId === shiftDetails.shiftId &&
            dayjs(shift.start).isSame(dayjs(shiftDetails.date), "day")
        )
      ) {
        updatedShifts.push({
          start: `${dayjs(shiftDetails.date).format("YYYY-MM-DD")}T${dayjs(
            shiftDetails.start,
            "h:mm A"
          ).format("HH:mm")}`,
          end: `${dayjs(shiftDetails.date).format("YYYY-MM-DD")}T${dayjs(
            shiftDetails.end,
            "h:mm A"
          ).format("HH:mm")}`,
          title: `${dayjs(shiftDetails.start, "h:mm A").format(
            "HH:mm"
          )} - ${dayjs(shiftDetails.end, "h:mm A").format("HH:mm")}`,
          resource: shiftDetails.staff.id,
          shiftId: shiftDetails.shiftId
        });
      }

      return updatedShifts;
    });

    setOpen(false);
  };

  const handleDelete = () => {
    const editData = defaultShifts.find(
      (shift) =>
        shift.resource === shiftDetails.staff.id &&
        shift.slot === shiftDetails.slot &&
        shift.start ===
          `${dayjs(shiftDetails.date).format("YYYY-MM-DD")}T${
            shiftDetails.start
          }`
    );
    const updatedShiftsArr = defaultShifts.filter(
      (shiftData) => shiftData !== editData
    );
    setDefaultShifts(updatedShiftsArr);

    setOpen(false);
  };

  const handleChange = (e) => {
    setShiftDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  console.log(shiftDetails, "shiftDetails");
  console.log(defaultShifts, "defaultShifts");

  useEffect(() => {}, [open]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  function getNextDateOfWeek(dayOfWeek, baseDate) {
    const dayIndex = daysOfWeek.indexOf(dayOfWeek) + 1;
    const baseDayIndex = ((baseDate.getDay() + 6) % 7) + 1;

    // Calculate the difference between the desired day and the base day
    let dayDifference = dayIndex - baseDayIndex;

    if (dayDifference < 0) {
      dayDifference += 7;
    }

    // Calculate the date for the next occurrence of the desired day
    const nextDate = new Date(baseDate);
    nextDate.setDate(baseDate.getDate() + dayDifference);

    return nextDate;
  }

  const handleWeekChange = (direction) => {
    setCurrentWeek((prevWeek) => {
      const newWeek = dayjs(prevWeek)
        .add(direction === "next" ? 1 : -1, "week")
        .toDate();
      return newWeek;
    });
  };

  const shiftDays = [
    {
      id: 1,
      day: "Monday",
      date: getNextDateOfWeek("Monday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 2,
      day: "Tuesday",
      date: getNextDateOfWeek("Tuesday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 3,
      day: "Wednesday",
      date: getNextDateOfWeek("Wednesday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 4,
      day: "Thursday",
      date: getNextDateOfWeek("Thursday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 5,
      day: "Friday",
      date: getNextDateOfWeek("Friday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 6,
      day: "Saturday",
      date: getNextDateOfWeek("Saturday", currentWeek),
      morning: [],
      afternoon: []
    },
    {
      id: 7,
      day: "Sunday",
      date: getNextDateOfWeek("Sunday", currentWeek),
      morning: [],
      afternoon: []
    }
  ];

  console.log(shiftDays);

  // Function to parse the date from the shift
  function parseDate(shift) {
    return new Date(shift.start.split("T")[0]);
  }

  // Function to compare two dates ignoring the time part
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Function to map default shifts to shift days
  function mapShiftsToDays(shiftDays, defaultShifts, staff, shifts) {
    shiftDays.forEach((shiftDay) => {
      const shiftDate = shiftDay.date;

      shiftDay.shifts = shifts.map((shift) => ({
        ...shift,
        employees: staff.map((staffMember) => ({
          staff: staffMember,
          title: "",
          shiftId: shift.id,
          start: "",
          end: ""
        }))
      }));

      defaultShifts
        .filter((shift) => isSameDay(parseDate(shift), shiftDate))
        .forEach((shift) => {
          const shiftIndex = shiftDay.shifts.findIndex(
            (s) => s.id === shift.shiftId
          );
          if (shiftIndex !== -1) {
            const staffIndex = shiftDay.shifts[shiftIndex].employees.findIndex(
              (s) => s.staff.id === shift.resource
            );
            if (staffIndex !== -1) {
              shiftDay.shifts[shiftIndex].employees[staffIndex] = {
                ...shift,
                staff: shiftDay.shifts[shiftIndex].employees[staffIndex].staff
              };
            }
          }
        });
    });

    // shiftDays.unshift({
    //     id: 8,
    //     staff: staff
    // })

    return shiftDays;
  }

  // Call the function to map shifts to days
  const updatedShiftDays = mapShiftsToDays(
    shiftDays,
    defaultShifts,
    staff,
    shifts
  );

  console.log(updatedShiftDays);

  const disabled = !shiftDetails.start || !shiftDetails.end;

  console.log(currentWeek, "currentweek");

  function calculateHours(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // Calculate difference in milliseconds and convert to hours
    const diffInHours = end.diff(start, "hour", true);
    console.log(Math.abs(diffInHours));
    return Math.abs(diffInHours);
  }

  const totalHours = (shiftData, shiftId) => {
    let hours = 0;
    const shiftSlots =
      shiftData.shifts.find((shift) => shift.id === shiftId)?.employees || [];

    shiftSlots.forEach((slot) => {
      if (slot.title) {
        const { start, end } = slot;
        const dayHours = calculateHours(start, end);
        hours += dayHours;
      }
    });

    return hours > 0 ? `${hours} hrs` : "";
  };

  function totalHoursWeekly(id) {
    const currentWeekStart = currentWeek;
    const currentWeekEnd = dayjs(currentWeek).add(6, "days").toDate();

    const resourceWeeklyData = defaultShifts.filter((shift) => {
      const shiftStartDate = dayjs(shift.start).toDate();
      return (
        shift.resource === id &&
        shiftStartDate >= currentWeekStart &&
        shiftStartDate <= currentWeekEnd
      );
    });

    let weeklyHours = 0;

    resourceWeeklyData.map((data) => {
      const { start, end } = data;

      const shiftHours = calculateHours(start, end);
      weeklyHours += shiftHours;
    });
    console.log(resourceWeeklyData);
    return weeklyHours > 0 && `${weeklyHours} hrs`;
  }

  console.log(dayjs("2024-05-20T07:00"));

  const shiftHours = () => {
    const startTime = dayjs(shiftDetails.start, "hh:mm A");
    const endTime = dayjs(shiftDetails.end, "hh:mm A");

    // Check if the parsing was successful
    if (!startTime.isValid() || !endTime.isValid()) {
      console.error("Invalid time format");
    } else {
      const difference = dayjs.duration(endTime.diff(startTime));
      const hours = difference.asHours();

      console.log(hours); // Should log 6.5

      return hours;
    }
  };

  const copyShiftsToAll = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
    }
  };
  useEffect(() => {
    scrollToToday();
  }, [currentWeek]);
  const startOfWeek = dayjs(currentWeek)
    .startOf("week")
    .add(1, "day")
    .format("D MMMM");
  const endOfWeek = dayjs(currentWeek)
    .endOf("week")
    .add(1, "day")
    .format("D MMMM");

  return (
    <Box py={3} sx={{ maxWidth: "80%", mx: "auto" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px"
          }
        }}
      >
        <DialogTitle sx={{ py: 2 }} className="bg-blue-500 text-white">
          <Stack direction="column">
            <Typography variant="h5" className="text-white">
              New Shift
            </Typography>
            <Typography variant="subtitle1">{`${shiftDetails.day} ${
              shiftDetails.slot === 1 ? "Morning" : "Afternoon"
            }, ${dayjs(shiftDetails.date).format("DD MMM YYYY")}`}</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            m: 2
          }}
        >
          <Stack direction="column">
            <Stack
              sx={{ px: "0px !important" }}
              direction="row"
              justifyContent="space-between"
              alignItems={"center"}
              spacing={2}
              p={1}
            >
              <Typography
                fontWeight={"600"}
                variant="body1"
                className="text-black"
              >
                Shift start:
              </Typography>
              <TimeDropdown
                slot={shiftDetails.slot}
                name="start"
                value={dayjs(shiftDetails.start, "HH:mm").format("h:mm A")}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Stack>
            <Stack
              sx={{ px: "0px !important" }}
              direction="row"
              justifyContent="space-between"
              alignItems={"center"}
              spacing={2}
              p={1}
            >
              <Typography
                fontWeight={"600"}
                variant="body1"
                className="text-black"
              >
                Shift end:
              </Typography>
              <TimeDropdown
                slot={shiftDetails.slot}
                name="end"
                value={dayjs(shiftDetails.end, "HH:mm").format("h:mm A")}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Stack>

            <Stack
              sx={{ px: "0px !important" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={5}
              p={1}
            >
              <Stack
                sx={{ px: "0px !important" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                p={1}
              >
                <Typography
                  fontWeight={"600"}
                  variant="body1"
                  className="text-black"
                >
                  Hours:
                </Typography>
                <Typography variant="body1" className="text-black">
                  {shiftHours() || 0}
                </Typography>
              </Stack>
              <Stack
                sx={{ px: "0px !important" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                p={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  className="text-black"
                >
                  Copy Shift to All:
                </Typography>
                <Checkbox checked={checked} onChange={copyShiftsToAll} />
              </Stack>
            </Stack>

            <Stack
              sx={{ px: "0px !important" }}
              direction="row"
              justifyContent="space-between"
              p={1}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                className="text-black"
              >
                Notes:
              </Typography>
              <TextField
                name="notes"
                value={shiftDetails.notes}
                onChange={handleChange}
                multiline
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>

          {shiftDetails.title && (
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                fullWidth
                variant="outlined"
                onClick={handleDelete}
                sx={{
                  borderColor: "#FA896B",
                  color: "#FA896B !important",
                  bgcolor: "#fff !important",
                  ":hover": {
                    borderColor: "#FA896B"
                  }
                }}
              >
                Delete shift
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              mr: 1,

              bgcolor: "#fff !important"
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            variant="contained"
            sx={{ bgcolor: disabled && "#d8dbdd !important" }}
            onClick={editShift}
          >
            {shiftDetails.title ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={8} className="relative w-full">
        <Box
          sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          className="bg-gray-100 sticky left-0"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
          >
            <Typography
              sx={{ fontSize: "1.5rem;", fontWeight: 500 }}
              mt={1}
              variant="h4"
              color="primary"
            >
              {`${startOfWeek} - ${endOfWeek}, ${dayjs().format("YYYY")}`}
            </Typography>

            <Box className="space-x-2">
              <IconButton onClick={() => handleWeekChange("prev")}>
                <KeyboardArrowLeftIcon color="primary" />
              </IconButton>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setCurrentWeek(
                    dayjs().startOf("week").add(1, "day").toDate()
                  );
                }}
              >
                Today
              </Button>

              <IconButton onClick={() => handleWeekChange("next")}>
                <KeyboardArrowRightIcon color="primary" />
              </IconButton>
            </Box>
          </Stack>
        </Box>
        {/* removed border here. Seems like giving fixed widths to chidlren was causing issues  */}
        <Grid
          container
          sx={{ scrollbarWidth: "thin" }}
          flexWrap={"nowrap"}
          className="relative "
        >
          {/* Staff Grid */}
          <Grid
            item
            xs={2}
            className="border-r min-w-[15rem] sticky left-0 bg-white"
          >
            <Typography className="px-2 py-1 border-b border-white text-white">
              Employees
            </Typography>
            <Grid container columns={2}>
              <Grid item xs={2}>
                <Typography className="px-2 py-1 border-b text-white">
                  Name
                </Typography>
                <Grid container direction="column" columns={2}>
                  {staff.map((data, idx) => (
                    <Grid key={idx} item xs={1} className="border-b">
                      <Box
                        sx={{ height: "50px" }}
                        className="p-2 flex flex-row justify-start space-x-2 align-top"
                      >
                        <img src={data.img} className="w-8" />
                        <Stack sx={{ width: "100%" }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="start"
                            sx={{ width: "100%" }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 600 }}
                            >
                              {data.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "11px", fontWeight: 500 }}
                              className="text-gray-400 pr-2"
                            >
                              {data.rate}/hr
                            </Typography>
                          </Stack>
                          <Typography
                            sx={{ fontSize: "11px", fontWeight: 600 }}
                            className="text-overflow-ellipsis whitespace-nowrap text-start"
                          >
                            {data.title}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexWrap={"nowrap"}
            className="overflow-auto"
            sx={{ scrollbarWidth: "thin" }}
            ref={containerRef}
          >
            {/* Shifts Grid */}
            {updatedShiftDays.map((shiftData, index) => (
              <Grid
                key={index}
                item
                sx={{ minWidth: `${shifts.length * 8}rem` }}
                className={shiftData.id === 8 ? "sticky left-0 bg-white" : ""}
              >
                <Box
                  sx={{ borderRadius: "0px !important" }}
                  className={`px-2 py-1 relative ${
                    updatedShiftDays.length - 1 !== index && "border-r"
                  } border-b`}
                >
                  <Typography
                    ref={
                      isSameDay(shiftData.date, new Date()) ? todayRef : null
                    }
                    fontWeight={500}
                    className={`text-center w-fit sticky left-2 ${
                      isSameDay(shiftData.date, new Date())
                        ? "bg-blue-500 px-5 text-white rounded-full"
                        : ""
                    }`}
                  >
                    {dayjs(shiftData.date).format("D ddd MMM")}
                  </Typography>
                </Box>

                <Grid container columns={shifts.length}>
                  {shifts.map((shift, shiftIndex) => (
                    <Grid item xs={1} key={shift.id} className="">
                      <Typography
                        sx={{ fontWeight: 600 }}
                        className={`px-2 py-1 border-r border-b`}
                      >
                        {shift.name}
                      </Typography>
                      <Grid
                        container
                        direction="column"
                        columns={1}
                        className="border-r"
                      >
                        {shiftData.shifts[shiftIndex].employees.map(
                          (slot, slotIndex) => (
                            <Grid
                              key={slotIndex}
                              item
                              xs={1}
                              className="border-b"
                            >
                              <Box
                                onDoubleClick={() =>
                                  handleClickOpen(slot, shiftData)
                                }
                                sx={{ height: "50px" }}
                                className="p-2"
                              >
                                {slot.title ? (
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      bgcolor: slot.staff.color,

                                      fontWeight: "bold"
                                    }}
                                    className="text-center py-1 cursor-pointer rounded-sm"
                                  >
                                    {slot.title}
                                  </Typography>
                                ) : null}
                              </Box>
                            </Grid>
                          )
                        )}
                        <Grid item xs={1}>
                          <Box sx={{ height: "50px" }} className="p-2">
                            <Typography
                              sx={{ fontSize: 12 }}
                              className="text-center cursor-pointer rounded-sm"
                            >
                              {totalHours(shiftData, shift.id)}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} className="border-l">
            <Typography className="px-2 py-1 border-b border-white text-white">
              Employees
            </Typography>
            <Grid container columns={2}>
              <Grid item xs={2}>
                <Typography className="px-2 py-1 border-b text-white">
                  Name
                </Typography>
                <Grid container direction="column" columns={2}>
                  {staff.map((staffData, indx) => (
                    <Grid key={indx} item xs={1} className="border-b">
                      <Box sx={{ height: "50px" }} className="p-2">
                        <Typography
                          sx={{ fontSize: 12 }}
                          className="text-center cursor-pointer rounded-sm"
                        >
                          {totalHoursWeekly(staffData.id)}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Schedule;
