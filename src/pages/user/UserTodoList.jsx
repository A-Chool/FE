import React, { useState } from 'react';
import styled from "styled-components";

import { useDispatch } from 'react-redux';

import { addTodoList } from '../../redux/modules/teamBoard';
import { deleteTodoList } from '../../redux/modules/teamBoard';
import { editTodoList } from '../../redux/modules/teamBoard';
import { checkTodoList } from '../../redux/modules/teamBoard';

const UserTodoList = (props) => {

  const dispatch = useDispatch();

    // 수정버튼 클릭시 인풋으로 교체해주는 스테이트
    const [edit, setEdit] = useState(false);

    // 투두 수정 입력을 담기위한 스테이트
    const [todoEdit, setTodoEdit] = useState();
  
    const todoEdithandleEvent = (event) => {
      setTodoEdit(event.target.value);
    };

  // 투두 입력후 엔터 입력시 dispatch 해주는 로직
  const handleEvent = (e) => { 
    if (e.nativeEvent.isComposing) { 
      return; 
    } if (e.key !== "Enter") {
      return; 
    } 
    dispatch(editTodoList(props.e.todoId, todoEdit));
    setEdit(false)
  };


  return (
    <Todo style={{color : props.e.todoCheck === false ? 'black' : 'green'}}>
    <div 
    style={{float : 'left', display : 'inlineBlock'}}
    onClick={() => {dispatch(checkTodoList(props.e.todoId))}}
    >
      체크박스될거임 : 
      </div>
    {
      edit === false 
      ?
      <AllTodoList>{props.e.todoContent}</AllTodoList>
      :
      <input defaultValue={props.e.todoContent} onKeyDown={handleEvent} onChange={todoEdithandleEvent}></input>
    }
    <HideBtn onClick={() => {setEdit(true)}}>수정</HideBtn>
    <HideBtn onClick={() => {dispatch(deleteTodoList(props.e.todoId))}}>삭제</HideBtn>
  </Todo>
  );
};

const Todo = styled.div`
  background-color : white;
  margin : 5px;
  :hover {
    background-color : red;
    
  }
`

const HideBtn = styled.div`
  display : none;
  ${Todo}:hover & {
    display : inline-block;
    background-color : red;
    margin : 0 5px;
  }
`

const AllTodoList = styled.div`
  width : 300px;
  display : inline-block;
`

export default UserTodoList;