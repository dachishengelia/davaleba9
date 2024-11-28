import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const TimerWithVideo = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [player, setPlayer] = useState(null);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleStopVideo = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const handleResumeVideo = () => {
    if (player) {
      player.playVideo();
    }
  };

  const onYouTubeIframeAPIReady = () => {
    const newPlayer = new window.YT.Player('video-iframe', {
      events: {
        onReady: () => {
          setPlayer(newPlayer);
        },
      },
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onload = onYouTubeIframeAPIReady;
    document.body.appendChild(script);
  }, []);

  const handleScoreReset = () => setScore(null);

  const handleAnswer = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    const correctAnswers = ['კი', 'კი', 'არა', 'კი'];
    let correctCount = 0;

    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    const percentage = (correctCount / correctAnswers.length) * 100;
    setScore(Math.round(percentage));
  };

  return (
    <div className="container">
      <div className="timer-container">
        <h1>Time: {time}s</h1>
        <div className="button-group">
          <button onClick={handleStart}>დაწყებააა</button>
          <button onClick={handleStop}>ვაით</button>
          <button onClick={handleReset}>რესეტ</button>
        </div>
      </div>

      <div className="image-container">
        <img src="/assets/1.png" alt="Zoomable" className="zoomableImage" />
      </div>

      <div className="video-section">
        <div className="videoContainer">
          <iframe
            id="video-iframe"
            width="600"
            height="400"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-controls">
          <button onClick={handleStopVideo}>პაუზ</button>
          <button onClick={handleResumeVideo}>რესუუუუმ</button>
        </div>
      </div>

      <div className="test">
        <h1>აბა მას, ვნახოთ ხართ თუ არა chill guy!</h1>
        <div className="question">
          <p>მოგწონთ ჩვენთან გაკვეთილების ჩატარება?</p>
          <button onClick={() => handleAnswer(0, 'კი')}>კი</button>
          <button onClick={() => handleAnswer(0, 'არა')}>არა</button>
        </div>

        <div className="question">
          <p>2. მარტივ ქვიზს შემოიტანთ?</p>
          <button onClick={() => handleAnswer(1, 'კი')}>კი</button>
          <button onClick={() => handleAnswer(1, 'არა')}>არა</button>
        </div>

        <div className="question">
          <p>3. რთულ დავალებას მოგვცემთ?</p>
          <button onClick={() => handleAnswer(2, 'კი')}>კი</button>
          <button onClick={() => handleAnswer(2, 'არა')}>არა</button>
        </div>

        <div className="question">
          <p>4. დამიწერთ 3 ქულას 3-დან?</p>
          <button onClick={() => handleAnswer(3, 'კი')}>კი</button>
          <button onClick={() => handleAnswer(3, 'არა')}>არა</button>
        </div>

        <div>
          <button onClick={calculateScore}>საბმიტ</button>
        </div>

        {score !== null && (
          <div className="score">
            <p>თქვენ ხართ chill guy: {score}% 100-დან!</p>
            <button onClick={handleScoreReset}>რესეტ ქულა!</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerWithVideo;
