import React, { useEffect } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import dateFormat from "dateformat";

import Modal from "../Modal/Modal";
import Editable from "../Editabled/Editable";
import Avatar from "../Avatar/avatar";
import _ from "lodash"

import "./CardInfo.css";
import useToggle from "../../hooks/useToggle"
import useCardAPI from "../../hooks/useCardAPI";
import useLabelAPI from "../../hooks/useLableAPI";
import useTaskAPI from "../../hooks/useTaskAPI";
import useCommentAPI from "../../hooks/useCommentAPI";

import MemberEdit from "./InfoEditable/MemberEdit/MemberEdit";
import LablesEdit from "./InfoEditable/LablesEdit/LablesEdit";
import DateEdit from "./InfoEditable/DateEdit/DateEdit";
import FileEdit from "./InfoEditable/FileEdit/FileEdit";
import DeleteEdit from "./InfoEditable/DeleteEdit/DeleteEdit";

import { AiOutlineUser, AiOutlinePaperClip, AiOutlineClose, AiOutlineComment } from "react-icons/ai";
import { BsTag, BsArchive } from "react-icons/bs";
export default function CardInfo(props) {

  const [updateCard, addCardUser, delCardUser] = useCardAPI();
  const [addCardLabel, delCardLable, updateBoardLable] = useLabelAPI();
  const [addCardTask, delCardTask, updateCardTask] = useTaskAPI();
  const [addCardComment, updateCardComment, delCardComment] = useCommentAPI();

  const cardId = props.cardInfo.id;

  console.log(props.cardInfo);

  const updateTitle = (value) => {
    props.setCardInfo({ ...props.cardInfo, cardTitle: value });
    updateCard({ cardTitle: value }, cardId)
  };

  const updateDesc = (value) => {
    props.setCardInfo({ ...props.cardInfo, description: value });
    updateCard({ description: value }, cardId)
  };

  const updateDate = (date) => {
    if (!date) return;
    props.setCardInfo({ ...props.cardInfo, dueDate: date.toDateString() });
    updateCard({ dueDate: date }, cardId)
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,  //虽然数据库会自动加id但是这里不自定义一个的话 删除的时候会undefine
      completed: false,
      description: value,
      CardId: cardId
    };
    props.setCardInfo({
      ...props.cardInfo,
      Tasks: [...props.cardInfo.Tasks, task],
    });
    addCardTask(task)//默认未完成
  };

  const removeTask = (id) => {
    delCardTask(id);
    const tasks = [...props.cardInfo.Tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    props.setCardInfo({
      ...props.cardInfo,
      Tasks: tempTasks,
    });
  };

  const updateTaskCompleted = (id, value) => {
    const tasks = [...props.cardInfo.Tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    props.setCardInfo({
      ...props.cardInfo,
      Tasks: tasks
    });
    updateCardTask({ completed: value }, id)
  };

  const addComment = (value) => {
    const comment = {
      id: Date.now() + Math.random() * 2,  //虽然数据库会自动加id但是这里不自定义一个的话 删除的时候会undefine
      content: value,
      CardId: cardId
    };
    props.setCardInfo({
      ...props.cardInfo,
      Comments: [...props.cardInfo.Comments, comment],
    });
    addCardComment(comment);
    props.setRefreshCard();
  };

  const calculatePercent = () => {
    if (!props.cardInfo.Tasks?.length) return 0;
    const completed = props.cardInfo.Tasks?.filter((item) => item.completed)?.length;
    return (completed / props.cardInfo.Tasks?.length) * 100;
  };

  const addMember = (value) => {
    props.setCardInfo({
      ...props.cardInfo,
      Users: [...props.cardInfo.Users, value],
    });
    addCardUser(cardId, value.id);
  };
  const removeMember = (id) => {
    const members = [...props.cardInfo.Users];
    const tempMembers = members.filter((item) => item.id !== id);
    props.setCardInfo({
      ...props.cardInfo,
      Users: tempMembers,
    });
    delCardUser(cardId, id);
  };


  const addLabel = (label) => {
    // const index = props.cardInfo.Labels.findIndex((item) => item.text === label.text);
    // if (index > -1) return;
    console.log(label.color + ",,,,,,,,")
    props.setCardInfo({
      ...props.cardInfo,
      Labels: [...props.cardInfo.Labels, label],
    });

    addCardLabel(label.id, cardId)
  };
  const removeLabel = (label) => {
    const tempLabels = props.cardInfo.Labels.filter((item) => item.id !== label.id);

    props.setCardInfo({
      ...props.cardInfo,
      Labels: tempLabels,
    });

    delCardLable(label.id, cardId);
  };
  const updateLabel = (newlabel) => {
    const boardlabels = [...props.boardInfo.Labels];
    const cardlabels = [...props.cardInfo.Labels];
    const index1 = boardlabels.findIndex((item) => item.id === newlabel.id);
    const index2 = cardlabels.findIndex((item) => item.id === newlabel.id);
    if (index1 < 0) return;
    boardlabels[index1] = newlabel;
    if (!index2 < 0) {
      cardlabels[index2] = newlabel;
      props.setCardInfo({
        ...props.cardInfo,
        Labels: cardlabels,
      });
    }
    props.setBoardInfo({
      ...props.boardInfo,
      Labels: boardlabels,
    });

    updateBoardLable({ text: newlabel.text, color: newlabel.color }, newlabel.id);
  };

  //当信息变化时更新card
  useEffect(() => {
    if (props.updateCard) {
      props.updateCard(props.boardId, props.cardInfo.id, props.cardInfo);
    }
  }, [props.cardInfo]
  );


  const [isMemberEdit, setIsMemberEdit] = useToggle(false);
  const [isLableEdit, setIsLableEdit] = useToggle(false);
  const [isDateEdit, setIsDateEdit] = useToggle(false);
  const [isFileEdit, setIsFileEdit] = useToggle(false);
  const [isDeleteEdit, setIsDeleteEdit] = useToggle(false);


  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <button className="closebtn" onClick={props.cardInfoToggle}><AiOutlineClose className="closeicon" /></button>
        <div className="info1">
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Type className="icon" />
              <p>Title</p>
            </div>
            <Editable
              defaultValue={props.cardInfo.cardTitle}
              text={props.cardInfo.cardTitle}
              placeholder="Enter Title"
              onSubmit={updateTitle}
            />
            <h className="listtext">在列表 {props.list.listTitle} 中</h>
          </div>

          <div className="cardinfo_box_2">
            <div className="manyboxes">
              {
                (!_.isEmpty(props.cardInfo.Users)) ?
                  <div className="cardinfo_box_1">
                    <label className="box_title">成员</label>
                    <div className="avatars">
                      {props.cardInfo.Users.map(member =>
                        <Avatar userInfo={member} />
                      )}
                    </div>
                  </div>
                  : null
              }
              {
                (!_.isEmpty(props.cardInfo.Labels)) ?
                  <div className="cardinfo_box_1">
                    <label className="box_title">标签</label>
                    <div className="labels">
                      {props.cardInfo.Labels.map((lable, index) =>
                        <label
                          className="lablelist"
                          key={index}
                          style={{ backgroundColor: lable.color, color: "#fff" }}
                        >
                          {lable.text ? lable.text : ""}
                        </label>
                      )}
                    </div>
                  </div>
                  : null
              }
              {
                props.cardInfo.dueDate ?
                  <div className="cardinfo_box_2">
                    <label className="box_title">到期日</label>
                    <div className="duedate">{props.cardInfo.dueDate}</div>
                  </div>
                  : null
              }
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List className="icon" />
              <p>Description</p>
            </div>
            <Editable
              defaultValue={props.cardInfo.description}
              text={props.cardInfo.description || "Add a Description"}
              placeholder="Enter description"
              onSubmit={updateDesc}
            />
          </div>
          {
            (!_.isEmpty(props.cardInfo.Attachments)) ?
              <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <List className="icon" />
                  <p>Attachment</p>
                </div>
                <div className="cardinfo_box_file_list">
                  {
                    props.cardInfo.Attachments.map(file =>
                      <div className="cardinfo_box_file">
                        <a href={file.path}>
                          <span>{file.type}</span>
                        </a>
                        <span>{file.name}</span>
                      </div>
                    )}
                </div>
              </div>
              : null
          }
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <CheckSquare className="icon" />
              <p>Tasks</p>
            </div>
            <div className="cardinfo_box_progress-bar">
              <div
                className="cardinfo_box_progress"
                style={{
                  width: `${calculatePercent()}%`,
                  backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                }}
              />
            </div>
            <div className="cardinfo_box_task_list">
              {props.cardInfo.Tasks?.map((item) => (
                <div key={item.id} className="cardinfo_box_task_checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    onChange={(event) =>
                      updateTaskCompleted(item.id, event.target.checked)
                    }
                  />
                  <p className={item.completed ? "completed" : ""}>{item.description}</p>
                  <Trash onClick={() => removeTask(item.id)} />
                </div>
              ))}
            </div>
            <div className="taskeditable">
              <Editable
                text={"Add a Task"}
                placeholder="Enter task"
                onSubmit={addTask}
              />
            </div>
          </div>
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <AiOutlineComment className="icon" />
              <p>Comment</p>
            </div>

            <div className="commenteditable">
              <Editable
                text={"Add a Comment"}
                placeholder="Enter Comment"
                onSubmit={addComment}
              />
            </div>
            <div className="cardinfo_box_comment_list">
              {props.cardInfo.Comments?.map((item) => (

                item.User ?
                  <div key={item.id} className="comment_small_box">
                    <Avatar userInfo={item.User} />
                    <div className="comment_small_box_1">
                      <div className="comment_title">
                        <p>{item.User.name}</p>
                        <p>{dateFormat(item.createdAt, "yyyy-mm-dd hh:MM:ss")}</p>
                      </div>
                      <div className="content_box">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                  : null

              ))}
            </div>
          </div>
        </div>

        <div className="info2">
          <div className="addbox">
            <h>add to card</h>
            <button className="btn" onClick={setIsMemberEdit} ><AiOutlineUser className="icon" />Members</button>
            {
              isMemberEdit
                ?
                <MemberEdit
                  addMember={addMember}
                  removeMember={removeMember}
                  cardInfo={props.cardInfo}
                  boardInfo={props.boardInfo}
                  setIsMemberEdit={setIsMemberEdit}
                />
                :
                null
            }
            <button className="btn" onClick={setIsLableEdit}><BsTag className="icon" />Lables</button>
            {
              isLableEdit
                ?
                <LablesEdit
                  updateLabel={updateLabel}
                  addLabel={addLabel}
                  removeLabel={removeLabel}
                  cardInfo={props.cardInfo}
                  boardLabels={props.boardInfo.Labels}
                  setIsLableEdit={setIsLableEdit} />
                :
                null
            }
            <button className="btn" onClick={setIsDateEdit}><Calendar className="icon" />Date</button>
            {
              isDateEdit
                ?
                <DateEdit
                  updateDate={updateDate}
                  setIsDateEdit={setIsDateEdit} />
                :
                null
            }
            <button className="btn" onClick={setIsFileEdit}><AiOutlinePaperClip className="icon" />Files</button>
            {
              isFileEdit
                ?
                <FileEdit
                  cardId={cardId}
                  setIsFileEdit={setIsFileEdit}
                  setRefreshCard={props.setRefreshCard}
                />
                :
                null
            }

          </div>
          <div className="otherbox">
            <h>others</h>
            <button className="btn" onClick={setIsDeleteEdit}><BsArchive className="icon" />Delete</button>
            {
              isDeleteEdit
                ?
                <DeleteEdit
                  setIsDeleteEdit={setIsDeleteEdit}
                  cardId={props.cardId}
                  deleteCard={props.deleteCard}
                />
                :
                null
            }
          </div>
        </div>
      </div>
    </Modal >
  );
}