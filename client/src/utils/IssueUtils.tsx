import axios from "axios";

export const getIssues = async (routeName: String) => {
  try {
    let user_id = JSON.parse(localStorage.currentUser)._id
    const res = await axios.get(`http://localhost:8000/api/issues/${user_id}/${routeName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return res;
    // console.log("Issues");
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};