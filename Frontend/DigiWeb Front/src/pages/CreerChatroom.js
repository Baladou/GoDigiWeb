import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreerChatroom = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <br></br>
      <div className="chatroomSection">
        <div className="cardHeader">Chatrooms</div>
        <br></br>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="chatroomName">Chatroom Name</label>
            <input
              type="text"
              name="chatroomName"
              id="chatroomName"
              placeholder="ChatterBox Nepal"
            />
          </div>
        </div>
        <button>Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={"/chatroom/" + chatroom._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreerChatroom;