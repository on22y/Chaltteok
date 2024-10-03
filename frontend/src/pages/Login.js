import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import InputBox from '../components/InputBox';
import loginpageImg from '../assets/images/loginpageImg.png';
import backBtn from '../assets/images/backBtn.png';

function Login() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // nickname 값은 영어만 입력 가능
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;

    if (regex.test(value)) {
      setNickname(value);
    } else {
      // 영어나 숫자가 아닌 값이 포함되면 경고창 표시
      alert('닉네임은 영문자와 숫자만 입력 가능합니다.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nickname && password) {
      try {
        const response = await axios.post('/process/login', {
          nickname,
          password,
        });
        const data = response.data;

        if (data.success) {
          alert('로그인 성공!');
          navigate('/mypage'); // 로그인 성공 시 마이페이지로 이동
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

  // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="loginPage">
      <div className="backBtn-content">
        <img className="backBtn" src={backBtn} width={19.35} height={38.35} onClick={handleBackClick} />
      </div>

      <TextComponent text="로그인" fontSize="28px" shadowSize="2.2px" />

      <BoxComponent height="426px">
        <TextComponent text="신조어 공부는 많이 하셨어요?" colorClass="textYellow" fontSize="24px" shadowSize="2.1px" />
        <img className="imgComponent" src={loginpageImg} width={185} />
        <InputBox text="닉네임을 입력해주세요." value={nickname} onChange={handleNicknameChange} />
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
