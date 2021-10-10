import MenuAppBar from "../../components/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MyCard from "../../components/Card";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import { BiSearchAlt, BiPhoneCall } from "react-icons/bi";
import {
  RiRefreshLine,
  RiContactsBookLine,
  RiArchiveDrawerLine,
} from "react-icons/ri";
import { FiUsers, FiSend } from "react-icons/fi";
import { MdVideoCall } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import {
  db,
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  onSnapshot,
  addDoc,
  orderBy,
  updateDoc,
} from "../../config/Firebase";
function Chat(props) {
  const location = useLocation();
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessage] = useState([]);
  const [groupuser, setgroupuser] = useState(true);
  const [added, setadded] = useState(true);
  const [groupUsers, setgroupUsers] = useState([]);
  const [validateGroupUsers, setvalidateGroupUsers] = useState([]);
  const [groupName, setgroupName] = useState("");
  const [groupUserName, setgroupUserName] = useState([]);
  const [groups, setgroups] = useState([]);

  const getAllUsers = async () => {
    const docRef = query(collection(db, "users"), where("uid", "!=", uid));
    const querySnapshot = await getDocs(docRef);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setUsers(arr);
  };
  const getGroupUsers = async () => {
    for (var i = 0; i < groupUsers.length; i++) {
      console.log(groupUsers[i]);
      const docRef = query(
        collection(db, "users"),
        where("uid", "!=", groupUsers[i])
      );
      const querySnapshot = await getDocs(docRef);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setvalidateGroupUsers(arr);
      // alert("hello")
    }
    console.log(groupUsers);
  };
  console.log(groupUsers);
  console.log(validateGroupUsers);

  useEffect(() => {
    getGroups();
    getGroupUsers();
    getAllUsers();
  }, []);
// useEffect(() => {
//   const getAllMessages = async () => {
  
//     const q = query(
//       collection(db, "messages"),
//       where("chat_id", "==", currentChat.groupId),
//       orderBy("timestamp", "desc")
//     );
//     onSnapshot(q, (querySnapshot) => {
//       const arr = [];
//       querySnapshot.forEach((doc) => {
//         arr.push(doc.data());
//       });
//       setAllMessage(arr);
//     });
//   };
//   getAllMessages()
// }, [currentChat])
  const getAllMessages = async () => {
    let chat_id = "";
    if (uid < currentChat.uid) {
      chat_id = uid + currentChat.uid;
    } else {
      chat_id = currentChat.uid + uid;
    }
    console.log(currentChat.groupId)
    const q = query(
      collection(db, "messages"),
      where("chat_id", "==", chat_id),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setAllMessage(arr);
    });
  };
  const getAllGroupMessages = async () => {
    let chat_id = "";
    if (uid < currentChat.uid) {
      chat_id = uid + currentChat.uid;
    } else {
      chat_id = currentChat.uid + uid;
    }
    const q = query(
      collection(db, "messages"),
      where("chat_id", "==", chat_id),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setAllMessage(arr);
    });
  };

  console.log("messages==>", allMessages);

  useEffect(() => {
    setAllMessage([]);
  }, [currentChat]);

  const send_message = async (event) => {
    if (event.keyCode === 13) {
      let chat_id = "";
      if (uid < currentChat.uid) {
        chat_id = uid + currentChat.uid;
        console.log(chat_id);
      } else {
        chat_id = currentChat.uid + uid;
        console.log(chat_id);
      }
      let collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        message,
        uid,
        chat_id,
        timestamp: new Date(),
      }).then(() => {
        setMessage("");
      });
    }
  };
  const send_messageinGroup = async (event, groupId) => {
    if(event.keyCode == 13){

      let collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        message,
        groupId,
        uid,
        timestamp: new Date(),
      })
    // alert(groupId);
    }
  };

  const addToGroup = async () => {
    const docRef = await addDoc(collection(db, "groups"), {
      added: true,
      groupUsers: [],
    });
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem("groupId", docRef.id);
    setadded(false);
    console.log(groupUsers);
    console.log(groupName);
  };
  useEffect(() => {
    setgroupUsers(groupUsers);
  }, [groupUsers]);


  const addMember = async (val, event) => {
    let groupId = localStorage.getItem("groupId");
    // console.log(groupId);
    let groupChatId = ""
    if (uid < groupId) {
      groupChatId = uid + groupId;
    } else {
      groupChatId = groupId + uid;
    }
    
    const washingtonRef = doc(db, "groups", groupId);

    await updateDoc(washingtonRef, {
      groupChatId: groupChatId,
      groupName,
      groupUserName,
      groupUsers: groupUsers,
    });
    document.getElementById("clickToBack").click();
    let newgroupusers = [...groupUsers];
    newgroupusers.push(val.uid);

    event.target.style.display = "none";
    setgroupUsers(newgroupusers);
    let newgusername = [...groupUserName];
    newgusername.push(val.fullName);
    setgroupUserName(newgusername);
  };

  const getGroups = async () => {
    const docRef = collection(db, "groups");
    const querySnapshot = await getDocs(docRef);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setgroups(arr);
  };
  console.log(currentChat);
  return (
    <div>
      <MenuAppBar title="Login" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="users_sidebar">
              <div className="search_box">
                <div className="search_bar">
                  <BiSearchAlt color="#fff" size={24} />
                  <input type="text" placeholder="search" />
                </div>
              </div>
              <div className="icons">
                <RiRefreshLine color="#fff" size={24} />
                <FiUsers color="#fff" size={24} />
                <RiContactsBookLine color="#fff" size={24} />
                <RiArchiveDrawerLine color="#fff" size={24} />
              </div>
              <div
                className="modal fade"
                id="exampleModalToggle"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabindex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalToggleLabel">
                        Modal 1
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="text"
                        onChange={(e) => setgroupName(e.target.value)}
                        className=" form-control"
                        name=""
                        placeholder="Enter Group Name"
                        id=""
                      />
                      Click On Add Members To Add Members
                      <h1>Added Users</h1>
                      <div className="users_list">
                        {groupUserName.map((v, i) => {
                          return (
                            <h6
                              className="user_card"
                              onClick={(e) => addMember(v, e)}
                            >
                              {v}
                            </h6>
                          );
                        })}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-success"
                        onClick={addToGroup}
                        // style={{display}}
                      >
                        Create Group
                      </button>
                      <button
                        className="btn btn-primary"
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                        onClick={() => getGroupUsers()}
                      >
                        Add Members
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="exampleModalToggle2"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel2"
                tabindex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalToggleLabel2">
                        Modal 2
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="users_list">
                        {users.map((v, i) => {
                          return (
                            <h6
                              className="user_card"
                              onClick={(e) => addMember(v, e)}
                            >
                              {v.fullName}
                            </h6>
                          );
                        })}
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        className="btn btn-primary"
                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal"
                        id="clickToBack"
                      >
                        Back to first
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="btn btn-success mt-2 d-block m-auto"
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
              >
                Create Group
              </a>

              <div className="users_list">
                {groups.map((v, i) => {
                  return (
                    <div
                      onClick={() => setCurrentChat(groups[i])}
                      key={i}
                      className="user_card"
                    >
                      <div className="user_card_pic">
                        <img
                          src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="user_data">
                        <h6>{v.groupName}</h6>
                        <span>Hi,how are you?</span>
                      </div>
                      <div className="my_badge">
                        <span>2</span>
                      </div>
                    </div>
                  );
                })}
                {users.map((v, i) => {
                  return (
                    <div
                      onClick={() => setCurrentChat(users[i])}
                      key={i}
                      className="user_card"
                    >
                      <div className="user_card_pic">
                        <img
                          src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="user_data">
                        <h6>{v.fullName}</h6>
                        <span>Hi,how are you?</span>
                      </div>
                      <div className="my_badge">
                        <span>2</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-9">
            {Object.keys(currentChat).length ? (
              <div className="chat_container">
                <div className="header">
                  <div className="online_dot"></div>
                  <div className="username">
                    <h4>{currentChat.fullName}</h4>
                    <h4>{currentChat.groupName}</h4>
                    <p>{currentChat.groupUserName?.map((v) => v)}</p>
                  </div>
                  <div className="chat_icons">
                    <div className="icon_box">
                      <BiPhoneCall size={24} color="#fff" />
                    </div>
                    <div className="icon_box">
                      <MdVideoCall size={24} color="#fff" />
                    </div>
                  </div>
                </div>
                <div className="messages">
                  {allMessages
                    .map((v, i) => {
                      return v.uid === uid ? (
                        <div className="message_left message_right">
                          <div className="user_message">
                            {v.message}
                            <div className="message_arrow_right"></div>
                          </div>
                          <div className="message_right_image">
                            <img
                              src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="message_left">
                          <div>
                            <img
                              src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg"
                              alt=""
                            />
                          </div>
                          <div className="user_message">
                            {v.message}
                            <div className="message_arrow"></div>
                          </div>
                        </div>
                      );
                    })
                    .reverse()}
                </div>
                <div className="message_box">
                  {currentChat.groupId ? (
                    <div className="message_input">
                      <input
                        onKeyUp={
                         (e)=> send_messageinGroup(e, currentChat.groupId)
                        }
                        // onKeyUp={(currentChat?.groupId) => currentChat.groupId? }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type your message here"
                      />
                    </div>
                  ) : (
                    <div className="message_input">
                      <input
                        onKeyUp={
                         send_message
                        }
                        // onKeyUp={(currentChat?.groupId) => currentChat.groupId? }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type your message here"
                      />
                    </div>
                  )}

                  <div>
                    <FaRegSmile color="grey" size={28} />
                  </div>
                  <div className="icon_box_send">
                    <FiSend color="#fff" size={18} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
