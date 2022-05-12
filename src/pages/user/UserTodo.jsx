import React, { useState } from 'react';
import styled from "styled-components";
import UserTodoList from './UserTodoList';

import { useDispatch } from 'react-redux';

import { addTodoList } from '../../redux/modules/teamBoard';
import { deleteTodoList } from '../../redux/modules/teamBoard';
import { editTodoList } from '../../redux/modules/teamBoard';
import { checkTodoList } from '../../redux/modules/teamBoard';


const UserTodo = (props) => {

  const dispatch = useDispatch();

  const toDoList = props.TeamBoard.toDoList
  const weekTeamId = props.TeamBoard.teamId

  // 추가를 눌렀을때 인풋을 띄우기위한 스테이트
  const [add, setAdd] = useState(false);

  // 투두 추가 입력을 담기위한 스테이트
  const [todoWrite, setTodoWrite] = useState();

  const todoWritehandleEvent = (event) => {
    setTodoWrite(event.target.value);
  };

  // 투두 입력후 엔터 입력시 dispatch 해주는 로직
  const handleEvent = (e) => { 
    if (e.nativeEvent.isComposing) { 
      return; 
    } if (e.key !== "Enter") {
      return; 
    } 
    dispatch(addTodoList(weekTeamId, todoWrite));
    setAdd(!add);
  };



  return (
    <>
      {
        toDoList?.map((e, idx) => {
          return (
            <UserTodoList key={idx} e={e}></UserTodoList>
          )
        })
      }
      <button onClick={() => {setAdd(!add)}}>{add === false ? '+' : '-'}</button>
      {
        add === false 
        ? <></> 
        : <input onKeyDown={handleEvent} onChange={todoWritehandleEvent}></input>
      }
    </>
  );
};



export default UserTodo;