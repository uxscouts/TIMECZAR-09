import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormText,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";



const initialGoals = [
  { id: "84", userid: "1001", categoryid: "8", catname: "Drawing", hours: "0", active: "1", timeperiod: "week", timestamp: "2020-04-07 13:40:54" },
  { id: "130", userid: "1001", categoryid: "2", catname: "Norsk", hours: "0", active: "1", timeperiod: "week", timestamp: "2021-06-30 07:44:03" },
  { id: "142", userid: "1001", categoryid: "7", catname: "Exercise", hours: "0", active: "1", timeperiod: "week", timestamp: "2021-10-21 12:45:48" },
  { id: "149", userid: "1001", categoryid: "3", catname: "Study", hours: "15", active: "1", timeperiod: "week", timestamp: "2021-12-13 15:12:13" },
  { id: "153", userid: "1001", categoryid: "9", catname: "Design", hours: "10", active: "1", timeperiod: "week", timestamp: "2021-12-13 15:13:06" },
  { id: "155", userid: "1001", categoryid: "6", catname: "Task", hours: "10", active: "1", timeperiod: "week", timestamp: "2021-12-13 15:13:28" },
  { id: "158", userid: "1001", categoryid: "23", catname: "Kids", hours: "0", active: "1", timeperiod: "week", timestamp: "2022-10-11 11:55:21" },
  { id: "159", userid: "1001", categoryid: "24", catname: "Organize", hours: "0", active: "1", timeperiod: "week", timestamp: "2023-07-29 14:08:11" },
  { id: "160", userid: "1001", categoryid: "1", catname: "Code", hours: "30", active: "1", timeperiod: "week", timestamp: "2023-09-02 19:41:25" },
  { id: "161", userid: "1001", categoryid: "5", catname: "Guitar", hours: "5", active: "1", timeperiod: "week", timestamp: "2023-09-02 21:12:24" },
  { id: "162", userid: "1001", categoryid: "14", catname: "Job Search", hours: "20", active: "1", timeperiod: "week", timestamp: "2023-09-02 21:28:47" },
  { id: "163", userid: "1001", categoryid: "20", catname: "Business", hours: "4", active: "1", timeperiod: "week", timestamp: "2023-09-05 09:04:05" },
  { id: "164", userid: "1001", categoryid: "25", catname: "UX Scout", hours: "0", active: "1", timeperiod: "week", timestamp: "2023-11-14 23:24:02" },
  { id: "165", userid: "1001", categoryid: "26", catname: "UX/UI", hours: "0", active: "1", timeperiod: "week", timestamp: "2024-01-04 18:21:01" },
];

function formatSqlTimestamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

export default function GoalsComponent({ startingGoals = initialGoals }) {
  const [goals, setGoals] = useState(startingGoals);
  const [catname, setCatname] = useState("");
  const [categoryid, setCategoryid] = useState("1");
  const [hours, setHours] = useState("0");
  const [timeperiod, setTimeperiod] = useState("week");
  const [active, setActive] = useState("1");
  const [userid, setUserid] = useState("1001");

  function handleCreateGoal(e) {
    e.preventDefault();
    const trimmedName = catname.trim();
    if (!trimmedName) return;

    const newGoal = {
      id: String(Date.now()),
      userid: String(userid).trim() || "1001",
      categoryid: String(categoryid).trim() || "0",
      catname: trimmedName,
      hours: String(hours === "" ? "0" : hours),
      active: active ? "1" : "0",
      timeperiod,
      timestamp: formatSqlTimestamp(),
    };

    setGoals((prevGoals) => [newGoal, ...prevGoals]);

    setCatname("");
    setHours("0");
    setActive("1");
  }

  return (
    <>
    <Container className="my-4" style={{ maxWidth: "720px" }}>
       <Card className="shadow-sm">  
        <CardBody> 
      <h2>Create Goal</h2>
      <Form onSubmit={handleCreateGoal}>

        <FormGroup>
          <Label>
            Category Name
            </Label>
            <Input
              type="text"
              value={catname}
              onChange={(e) => setCatname(e.target.value)}
              placeholder="e.g., Reading"
              required
            />
        </FormGroup>

        <FormGroup>
          <Label>
            Target Hours
            </Label>
            <Input
              type="number"
              min="0"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
        </FormGroup>

            <FormGroup>
              <Label for="tomnato_count">Tomato Count</Label>
              <Input
                type="number"
                name="tomnato_count"
                id="tomnato_count"
                min={1}
                max={20}
               // value={formData.duration_mins ?? 25}
              //  onChange={handleChange}
                required
              />
            </FormGroup>

        <FormGroup>
          <Label>
            Time Period
          </Label>
            <Input
            type="select"
            name="timeperiod"
            value={timeperiod}
            onChange={(e) => setTimeperiod(e.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </Input>
        </FormGroup>


        <FormGroup>
          <label>
            <input
              type="checkbox"
              checked={active === "1"}
              onChange={(e) => setActive(e.target.checked ? "1" : "0")}
            />{" "}
            Active
          </label>
        </FormGroup>

            <Button color="primary" type="submit">
              Create Goal
            </Button>
      </Form>
      </CardBody> 
      </Card>

      <h2>Current Goals ({goals.length})</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.catname}</strong> — <strong>{goal.hours} hrs</strong> /{" "}
            {goal.timeperiod}{" "}
            <span>
              (id: {goal.id}, categoryid: {goal.categoryid}, userid: {goal.userid},
              active: {goal.active}, timestamp: {goal.timestamp})
            </span>
          </li>
        ))}
      </ul>
    </Container>
    </>
  );
}