const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();

app.use(express.json());

const jsonPath = path.resolve('./file/tasks.json');

// GET obtención de datos
app.get('/tasks', async (req, res) => {
  const jsonFile = await fs.readFile(jsonPath, 'utf8');
  res.send(jsonFile);
});

// POST ingreso de datos
app.post('/tasks', async (req, res) => {
  const user = req.body;
  console.log(user);

  const usersArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

  const lastIndex = usersArray.length - 1;
  const newId = usersArray[lastIndex].id + 1;
  usersArray.push({id: newId, ...user});
  
  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  res.end();
});

// PUT actualiazión de datos (solo status)
app.put('/tasks', async (req, res) => {
  const user = req.body;

  const usersArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const index = usersArray.findIndex(e => {
    return e.id === user.id;
  });
  usersArray[index].status = user.status;

  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  res.end();
});


// DELETE borrado de datos
app.delete('/tasks', async (req, res) => {
  const user = req.body;

  const usersArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

  const index = usersArray.findIndex(e => {
    return e.id === user.id;
  });
  usersArray.splice(index, 1);

  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  res.end();
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});