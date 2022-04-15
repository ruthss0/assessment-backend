const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
           
  ];

  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});


app.get("/api/fortune", (req, res) => {
  const fortunes = ["Believe it can be done.",
					 "Don’t just think, act!",
					 "Go take a rest; you deserve it.",
           "Happy life is just in front of you.",
           "Savor your freedom - it is precious"
           
  ];

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});

let planId = 0;
const goal = {
  name: "",
  planningList: [],
}

app.post('/api/goals', (req, res) => {
  const { name } = req.body;
  goal.name = name;
  goal.planningList = [];
  res.send(goal);
});

app.post('/api/goals/planning', (req, res) => {
  const {name} = req.body;
  const planItem = {
    name,
    checked: false,
    id: planId
  }
  planId++;
  goal.planningList.push(planItem)
  res.send(goal);
});

app.put('/api/goals/planning', (req, res) => {
  const { id, checked } = req.body;
  const foundIndex = goal.planningList.findIndex(plan => plan.id === id)
  goal.planningList[foundIndex].checked = checked;
  res.send(goal)
});

app.delete('/api/goals/planning/:id', (req, res) => {
  const { id } = req.params;
  const foundIndex = goal.planningList.findIndex(plan => plan.id === id)
  goal.planningList.splice(foundIndex, 1)
  res.send(goal);
});

app.listen(4000, () => console.log("Server running on 4000"));