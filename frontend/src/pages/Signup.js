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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && password) {
      const signupData = {
        name,
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
        <TextComponent text="여러분의 결과 저장 이외에" colorClass="textYellow" fontSize="24px" strokeWidth="0.1px" />{' '}
        <TextComponent
          text="아무곳에도 활용되지 않습니다."
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
      <MainBtn text="회원가입" subText="동의한사람만눌러주세요." onClick={handleSubmit} />
    </div>
  );
}

export default Signup;
