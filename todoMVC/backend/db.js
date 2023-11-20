const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,             
    label TEXT NOT NULL,                
    completed BOOLEAN NOT NULL 
  )
`);

function clearCompleted() {
  const query = `
      DELETE FROM tasks
      WHERE completed = true
    `;

  return new Promise((resolve, reject) => {
    db.run(query, [], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(`Cleared completed tasks.`);
        resolve();
      }
    });
  });
}

function checkSingleBox(id) {
  const query = `
      UPDATE tasks
      SET completed = CASE WHEN completed = true THEN false ELSE true END
      WHERE id = ?
    `;
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(`Task with ID ${id} updated successfully.`);
        resolve();
      }
    });
  });
}

function addTaskToDb(task) {
  const { description, priority, label, completed } = task;
  const query = `
      INSERT INTO tasks (description, priority, label, completed)
      VALUES (?, ?, ?, ?)
    `;
  const values = [description, priority, label, completed];

  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(`Task added with ID: ${this.lastID}`);
        resolve(this.lastID);
      }
    });
  });
}

function getAllTasksFromDb() {
  const query = `
      SELECT id, description, priority, label, completed
      FROM tasks
    `;

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        const transformedRows = rows.map((row) => ({
          ...row,
          completed: row.completed === 1,
        }));
        resolve(transformedRows);
      }
    });
  });
}

function markAllCompleted(val) {
  let query = "";
  if (val == true) {
    query = `
        UPDATE tasks
        SET completed = true
        WHERE completed = false
      `;
  } else {
    query = `
        UPDATE tasks
        SET completed = false
        WHERE completed = true
      `;
  }

  return new Promise((resolve, reject) => {
    db.run(query, [], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(`Marked all tasks as completed.`);
        resolve();
      }
    });
  });
}

function deleteTaskFromDb(taskId) {
  const query = `
      DELETE FROM tasks
      WHERE id = ?
    `;

  return new Promise((resolve, reject) => {
    db.run(query, [taskId], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(`Task with ID ${taskId} deleted from the database.`);
        resolve();
      }
    });
  });
}

function updateTaskInDb(taskId, value) {
    return new Promise((resolve, reject) => {
        if (value.trim() !== '') {
          const query = `
            UPDATE tasks
            SET description = ?
            WHERE id = ?
          `;
    
          db.run(query, [value, taskId], function (err) {
            if (err) {
              console.error(err.message);
              reject(err);
            } else {
              console.log(`Task with ID ${taskId} updated successfully.`);
              resolve();
            }
          });
        } else {
            try {
                deleteTaskFromDb(taskId)
                console.log(`Task with ID ${taskId} deleted successfully.`)
                resolve();
            } catch (error) {
                console.log(error);
                reject();
            }
        }
      });
  }

module.exports = {
  addTaskToDb: addTaskToDb,
  getAllTasksFromDb: getAllTasksFromDb,
  markAllCompleted: markAllCompleted,
  checkSingleBox: checkSingleBox,
  clearCompleted: clearCompleted,
  deleteTaskFromDb: deleteTaskFromDb,
  updateTaskInDb: updateTaskInDb
};
