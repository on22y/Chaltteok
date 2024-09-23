import React, { useState } from 'react';

const Voice = () => {
  const [transcript, setTranscript] = useState('');
  const [modifiedTranscript, setModifiedTranscript] = useState('');

  const handleSpeechRecognition = async () => {
    try {
      // 음성 인식을 시작하는 부분
      const response = await fetch('YOUR_BACKEND_API/speech-to-text', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.transcript) {
        setTranscript(data.transcript);

        // 받은 텍스트를 백엔드로 보내서 특정 단어를 교체하는 부분
        const modifyResponse = await fetch('YOUR_BACKEND_API/modify-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: data.transcript }),
        });

        const modifiedData = await modifyResponse.json();
        setModifiedTranscript(modifiedData.modifiedText);
      }
    } catch (error) {
      console.error('Error during speech recognition:', error);
    }
  };

  return (
    <div className="voice">
      <h1>음성 인식 테스트 페이지</h1>
      <button onClick={handleSpeechRecognition}>음성 인식 시작</button>

      <h2>기존 음성</h2>
      <p>{transcript}</p>

      <h2>변환된 음성</h2>
      <p>{modifiedTranscript}</p>
    </div>
  );
};

export default Voice;
