import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import LoggedTest from './pages/LoggedTest';
import Voice from './components/Voice';
import WordInput from './pages/WordInput';
import IsLoggedType from './pages/IsLoggedType';
import LoggedType from './pages/LoggedType';
import Loading from './pages/Loading';
import LoggedLoading from './pages/LoggedLoading';
import Mypage from './pages/Mypage';
import IsLoggedTest from './pages/IsLoggedTest';
import IsLoggedAnswer from './pages/IsLoggedAnswer';
import LoggedAnswer from './pages/LoggedAnswer';
import AdWordCheck from './pages/AdWordCheck';
import AdWordList from './pages/AdWordList';

function App() {
  const updateScale = () => {
    const scaleWidth = window.innerWidth / 393;
    const scaleHeight = window.innerHeight / 852;
    const scale = Math.min(scaleWidth, scaleHeight);
    document.documentElement.style.setProperty('--scale', scale);

    const appContainer = document.querySelector('.appContainer');
    if (scale < 1) {
      // 작은 화면에서는 스케일을 줄여서 맞춤
      appContainer.style.transform = `scale(${scale})`;
    } else {
      // 큰 화면에서는 고정 크기로 유지 (393x852)하고 중앙에 배치
      appContainer.style.transform = 'scale(1)';
    }
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div className="appContainer">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signuppage" element={<Signup />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/isLogged/test" element={<IsLoggedTest />} />
          <Route path="/Logged/test" element={<LoggedTest />} />
          <Route path="/speech_to_text" element={<Voice />} />
          <Route path="/word/input" element={<WordInput />} />
          <Route path="/isLogged/type" element={<IsLoggedType />} />
          <Route path="/Logged/type" element={<LoggedType />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/logged/loading" element={<LoggedLoading />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/isLogged/answer" element={<IsLoggedAnswer />} />
          <Route path="/Logged/answer" element={<LoggedAnswer />} />
          <Route path="/word/check" element={<AdWordCheck />} />
          <Route path="/word/list" element={<AdWordList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
