import React from 'react';
import MypageComponent from '../components/MypageComponent';

function Mypage() {
  return (
    <div className="myPage">
      <MypageComponent
        type="당신은 'K-고딩'!"
        detail={
          <>
            당장 주변 고등학교로 뛰어가서
            <br />
            즐거운 대화를 나누세요.
          </>
        }
      />
    </div>
  );
}

export default Mypage;
