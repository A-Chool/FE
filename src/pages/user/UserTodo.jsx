/* eslint-disable */
import React, { useState } from 'react';
import styled from "styled-components";
import UserTodoList from './UserTodoList';

import { useDispatch } from 'react-redux';

import { addTodoList } from '../../redux/modules/teamBoard';
import { deleteTodoList } from '../../redux/modules/teamBoard';
import { editTodoList } from '../../redux/modules/teamBoard';
import { checkTodoList } from '../../redux/modules/teamBoard';

import todoImg from '../../assets/img/todo.svg'
import todoAddBtnImg from '../../assets/img/todoAddBtn.svg'
import todoUpBtnImg from '../../assets/img/todoUpBtn.svg'

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
    <TodoWrapper>
      <img src={todoImg} style={{margin : '12px 0px 6px 12px'}} /> 
      <hr style={{width : '98%', margin : 'auto', border : '1px solid #E0E0E0'}}/>
      <ScrollBox>
      {
        toDoList?.map((e, idx) => {
          return (
            <UserTodoList key={idx} e={e}></UserTodoList>
          )
        })
      }
      <img 
        src={todoAddBtnImg}  
        style={{margin : '8px 0 0 10px', float : 'left'}} 
        onClick={() => {setAdd(!add)}}>
      </img>
      {
        add === false 
        ? <></> 
        : <TodoInput onKeyDown={handleEvent} onChange={todoWritehandleEvent} maxLength="40" />
      }
      {
        add === false 
        ? <></> 
        : <img 
            src={todoUpBtnImg}  
            style={{margin : '5px 0 0 5px', float : 'left'}} 
            onClick={() => {
              dispatch(addTodoList(weekTeamId, todoWrite));
              setAdd(!add);
            }}>
          </img>
      }
      </ScrollBox>

    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  width : 62%;
  height : 180px;
  background-color: #FFFFFF;
  border-radius: 16px;
  @media screen and (min-width: 2560px) {
    height: 400px;
  }
`
const TodoInput = styled.input`
  height : 18px;
  width: 88%;
  margin : 8px 0 0 10px;
  border : none;
  border-bottom : 1px solid #FF5F00;
  float : left;
  &:focus {
    outline : none;
  }
`

const ScrollBox = styled.div`
height : 130px;
overflow: scroll;
overflow-x: hidden;
&::-webkit-scrollbar {
  width: 4px;
}
&::-webkit-scrollbar-thumb {
  width: 4px;
  background: #c4c4c4;
  border-radius: 4px;
}
&::-webkit-scrollbar-track {
  background: transition;
}
@media screen and (min-width: 2560px) {
  height: 340px;
}
`



export default UserTodo;