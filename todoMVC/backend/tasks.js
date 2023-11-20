const express = require("express");
const router = express.Router();
const {addTaskToDb, getAllTasksFromDb, markAllCompleted, checkSingleBox, 
  clearCompleted, deleteTaskFromDb, updateTaskInDb} = require("./db.js")

router.get("/tasks", async (req, res) => {
  const tasks = await getAllTasksFromDb();
  res.send({ tasks: tasks }); // Replace with your actual tasks data
});

router.post("/tasks", async (req, res) => {
  const todoItem = req.body;
  try {
    await addTaskToDb(todoItem)
    const tasks = await getAllTasksFromDb();
    res.send({success: true, tasks: tasks})
  } catch (error) {
    res.send({success: false});
  }
});

router.get("/markAllCompleted", async(req, res) => {
  try {
    await markAllCompleted(true);
    res.send({success: true})
  } catch (error) {
    res.send({success: false})
  }
});
router.get("/markAllNotCompleted", async(req, res) => {
  try {
    await markAllCompleted(false);
    res.send({success: true})
  } catch (error) {
    res.send({success: false})
  }
})

router.post("/checkSingleBox", async (req, res) => {
  try {
    await checkSingleBox(req.body.id);
    const tasks = await getAllTasksFromDb();
    res.json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.get("/clearCompleted", async(req, res) => {
  try {
    await clearCompleted()
    res.send({success:true})
  }catch (error) {
    console.log(error)
    res.send({success: false})
  }
})

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const value = req.body.value;
    await updateTaskInDb(taskId, value);
    const tasks = await getAllTasksFromDb();
    res.json({ success: true, tasks: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await deleteTaskFromDb(taskId);
    const tasks = await getAllTasksFromDb();
    res.json({ success: true, tasks: tasks });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

module.exports = router;
