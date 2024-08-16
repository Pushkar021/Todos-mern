const express = require("express");
const { createtodo, updatetodo } = require("./schema");
const { todo } = require("./db");
const app = express();
const port = 3000;
const cors = require("cors")
app.use(cors())
app.use(express.json());

app.post("/todo", (req, res) => {
  const x = req.body;
  const y = createtodo.safeParse(x);
  if (!y.success) {
    res.json({
      msg: "you have not given a vaild inputs",
    });
  } else {
    todo
      .create({
        title: x.title,
        description: x.description,
        completed:false
      })
      .then(() => {
        res.json({
          msg: "todo created",
        });
      });
  }
});

app.get("/alltodo", async (req, res) => {
  let x = await todo.find({});
  res.json({
    todos: { x },
  });
});

app.put("/completed", async (req, res) => {
  const x = req.body;
  const y = updatetodo.safeParse(x);
  if (!y.success) {
    res.json({
      msg: "you have not given a vaild inputs",
    });
  }
  await todo.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.json({
    msg:"todos has been updated"
  })
});


app.delete("/delete", async (req, res) => {
try{
  const x  = req.body
const y = updatetodo.safeParse(x)
if(!y.success){
 res.json({
   msg: "you have not given a vaild inputs",
 });
}
else{
await todo.deleteOne({ _id:x.id}).then(()=>{
  res.json({
    msg:"Deleted"
  })
})
}
}
catch(err){
  res.send(err)
}
});



app.listen(port, () => {
  console.log(`app is runnin on ${port}`);
});
