import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css';
import loadingImg from '../assets/images/loadingImg.png';
import TextComponent from '../components/TextComponent';
import axios from 'axios';

function LoggedLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('nickname');

    // 닉네임을 서버에서 가져오는 함수
    const fetchNicknameAndUpdateAge = async () => {
      try {
        // 1. 서버에서 닉네임을 가져오기
        const nicknameResponse = await axios.post('/logged/type/getResult');
        const { nickname } = nicknameResponse.data;

        if (!nickname) {
          console.error('닉네임을 가져오지 못했습니다.');
          return;
        }

        console.log('가져온 닉네임:', nickname);

        // 2. 가져온 닉네임을 사용해 나이 업데이트 API 호출
        const response = await axios.post('/logged/loading/updateState', {
          nickname,
        });
        console.log('서버 응답:', response.data);

        // 필요한 경우 닉네임을 다시 로컬스토리지에 저장
        localStorage.setItem('nickname', nickname);
      } catch (error) {
        console.error('나이 업데이트 중 오류 발생:', error);
      }
    };

    // 페이지 로드 시 닉네임을 가져오고 나이 계산 로직 호출
    fetchNicknameAndUpdateAge();

    // 3초 후에 다음 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/logged/type'); // 3초 후에 다음 페이지로 이동
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loadingPage">
      <img className="imgComponent" src={loadingImg} width={198} />
      <TextComponent
        text={
          <>
            인터넷 나이
            <br />
            계산중
            <br />
            .........
          </>
        }
        fontSize="42px"
        shadowSize="3.2px"
      />
    </div>
  );
}

export default LoggedLoading;
