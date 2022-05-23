/* eslint-disable */
import React, { useState } from 'react';
import styled from "styled-components";

import { useDispatch } from 'react-redux';

import { addTodoList } from '../../redux/modules/teamBoard';
import { deleteTodoList } from '../../redux/modules/teamBoard';
import { editTodoList } from '../../redux/modules/teamBoard';
import { checkTodoList } from '../../redux/modules/teamBoard';

import todoCheckOnImg from '../../assets/img/todoCheckOn.svg'
import todoCheckOffImg from '../../assets/img/todoCheckOff.svg'
import deleteBtnImg from '../../assets/img/deleteBtn.svg'
import editBtnImg from '../../assets/img/editBtn.svg'
import todoUpBtnImg from '../../assets/img/todoUpBtn.svg'

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
    <Todo>
    {
      props.e.todoCheck === false
      ?
      <img 
      src = {todoCheckOffImg}
      style={{float : 'left', display : 'inlineBlock', margin : '5px 8px 5px 6px'}}
      onClick={() => {dispatch(checkTodoList(props.e.todoId))}}
      />
      :
      <img 
      src = {todoCheckOnImg}
      style={{float : 'left', display : 'inlineBlock', margin : '5px 8px 5px 6px'}}
      onClick={() => {dispatch(checkTodoList(props.e.todoId))}}
      />
    }

    {
      edit === false 
      ?
      <AllTodoList style={{textDecoration : props.e.todoCheck === false ? 'none' : 'line-through'}}>{props.e.todoContent}</AllTodoList>
      :
      <TodoInput defaultValue={props.e.todoContent} onKeyDown={handleEvent} onChange={todoEdithandleEvent} maxLength="40"></TodoInput>
    }
    {
      edit === false 
      ?
      <HideBtn src={editBtnImg} onClick={() => {setEdit(true)}}  style={{float : 'left'}} edit={edit}></HideBtn>
      :
      <></>
    }
    {
      edit === false 
      ?
      <HideBtn src={deleteBtnImg} onClick={() => {dispatch(deleteTodoList(props.e.todoId))}} edit={edit}></HideBtn>
      :
      <></>
    }
    {
      edit === true  
      ?
      <img 
            src={todoUpBtnImg}  
            style={{margin : '2px 0 0 8px'}} 
            onClick={() => {
              dispatch(addTodoList(weekTeamId, todoWrite));
              setAdd(!add);
            }}>
          </img>
      :
      <></>
    }
          
  </Todo>
  );
};

const Todo = styled.div`
  width: 674px;
  height: 29px;
  margin : 0px auto;
  border-radius: 16px;
  :hover {
    background-color: rgba(255, 249, 217, 0.5);
  }
`

const TodoInput = styled.input`
  height : 24px;
  width: 579px;
  margin : 0 0 0 0px;
  border : none;
  border-bottom : 1px solid #FF5F00;
  background-color : transparent;
  float : left;
  background-color: none;
  &:focus {
    outline : none;
  }
`

const HideBtn = styled.img`
  display: ${({ edit }) => (edit === false ? 'none' : 'none')};
  ${Todo}:hover & {
    display : inline-block;
    margin : 0px 4px;
  }
`

const AllTodoList = styled.div`
  display : inline-block;
  height : 28px;
  width: 560px;
  font-weight: 400;
  font-size: 14px;
  line-height : 28px;
  float : left;
`

export default UserTodoList;