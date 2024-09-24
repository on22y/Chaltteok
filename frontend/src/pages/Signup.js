import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import InputBox from '../components/InputBox';
import mainImg from '../assets/images/mainImg.png';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // nickname 값은 영어만 입력 가능
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z]*$/;

    if (regex.test(value)) {
      setNickname(value);
    } else {
      // 영어가 아닌 값이 포함되면 경고창 표시
      alert('닉네임은 영문자만 입력 가능합니다.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nickname && password) {
      const signupData = {
        nickname,
        password,
      };

      try {
        // 서버로 회원가입 요청을 보냄
        const response = await axios.post('/process/signup', signupData);
        const result = response.data;

        if (result.success) {
          alert('회원가입 성공!');
          navigate('/loginpage');
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('회원가입 요청 중 오류 발생:', error);
        alert('회원가입 요청 중 오류가 발생했습니다.');
      }
    } else {
      alert('필수 정보를 입력해주세요.');
    }
  };

  return (
    <div className="signupPage">
      <TextComponent text="회원가입" fontSize="28px" strokeWidth="0.2px" />

      <BoxComponent height="467px">
        <TextComponent
          text={
            <>
              여러분의 결과 저장 이외에
              <br />
              아무곳에도 활용되지 않습니다.
            </>
          }
          colorClass="textYellow"
          fontSize="24px"
          strokeWidth="0.1px"
        />

        <img className="mainImg" src={mainImg} width={185} />

        <InputBox text="닉네임을 입력해주세요." value={nickname} onChange={handleNicknameChange} />
        <InputBox
          text="비밀번호를 입력해주세요."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </BoxComponent>
      <MainBtn text="회원가입" subText="동의한사람만눌러주세요." onClick={handleSubmit} />
    </div>
  );
}

export default Signup;
