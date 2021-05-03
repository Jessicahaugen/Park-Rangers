const express = require("express");
const app = express();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://trvnebvemlsnomuzdgff.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDA2MTU1NCwiZXhwIjoxOTM1NjM3NTU0fQ.J892pC3M_hmQCZ91fkQoo-iUXuOoQuNrYzZ7la_idIk"
);

const PORT = 3000;

// creates entry into "Parks" method using data supplied. Can pull this data from a form on site.
app.post("/create", async (req, res) => {
  const { data, error } = await supabase.from("Parks").insert([
    {
      parkName: "Mojave Desert",
      directionsURL: "www.mojave.com",
      moreInfoURL: "wwww.moremojaveinfo.com",
      userId: 3,
    },
  ]);
  res.send("WORKED!");
});

// Pulls all data from "Users" table. Console logging to ensure data is pulled correctly.
app.get("/getdata", async (req, res) => {
  const { data, error } = await supabase.from("Users").select();
  console.log(data);
  res.send("GOT THE DATA!");
});

// finds User named "Bob" and updates their name to "New Zealand". Can match with any of the column names (id, lastName, etc).
app.post("/updatedata", async (req, res) => {
  const { data, error } = await supabase
    .from("Users")
    .update({ firstName: "New Zealand" })
    .match({ firstName: "Bob" });
  console.log(data);
  res.send("CHANGED!");
});

// deletes data from "Parks" table with the name of "Yellowstone"
app.post("/deletedata", async (req, res) => {
  const { data, error } = await supabase
    .from("Parks")
    .delete()
    .match({ parkName: "Yellowstone" });
  res.send("GONE!");
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
