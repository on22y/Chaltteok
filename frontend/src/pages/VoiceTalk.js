import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceTalk.css';
import axios from 'axios';
import MainVoiceBtn from '../components/MainVoiceBtn';
import UnderlineVoiceBtn from '../components/UnderlineVoiceBtn';

function VoiceTalk() {
  const navigate = useNavigate();

  const handleStop = () => {
    navigate('/voice/home');
  };

  const handleTest = () => {
    navigate('/');
  };

  return (
    <div className="voicetalkPage">
      <div className="voicetext">음성 인식 내용</div>

      <MainVoiceBtn text="그만하기" width="165px" height="63.17px" fontSize="24px" onClick={handleStop} />

      <UnderlineVoiceBtn subText="또는," text="인터넷 나이 측정하기" onClick={handleTest} />
    </div>
  );
}

export default VoiceTalk;
