import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import InputBox from '../components/InputBox';
import mainImg from '../assets/images/mainImg.png';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && password) {
      try {
        const response = await axios.post('/login/process', { name, password });
        const data = response.data;

        if (data.success) {
          alert('로그인 성공!');
          navigate('/'); // 로그인 성공 시 메인 페이지로 이동
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
        alert('아이디 또는 비밀번호를 확인하세요.');
      }
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="loginPage">
      <TextComponent text="로그인" fontSize="28px" strokeWidth="0.2px" />

      <BoxComponent height="426px">
        <TextComponent
          text="신조어 공부는 많이 하셨어요?"
          colorClass="textYellow"
          fontSize="24px"
          strokeWidth="0.1px"
        />
        <img className="mainImg" src={mainImg} width={185} />
        <InputBox text="이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
        <InputBox
          text="비밀번호를 입력해주세요."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </BoxComponent>
      <MainBtn text="로그인" subText="비밀번호 까먹었어요 .." onClick={handleSubmit} />
    </div>
  );
}

export default Login;
