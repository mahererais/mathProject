import React, { useEffect, useState } from "react";
import "./Scores.scss";

import { api } from "../../../Api/api";

type ApiScore = {
  score: number;
  timer: string;
  user: {
    username: number
  }
}

type Props = {
  setShowScore: (value: boolean) => void;
}

const Scores: React.FC<Props> = ({setShowScore}: Props) => {
  const [scores, setScores] = useState<ApiScore[]>([])

  useEffect(() => {
    async function fetch() {
      const s = await api.getScores() as ApiScore[];
      setScores(s);
    }
    fetch()
  }, []);

  return (
    <div className="score_wrapper">
      <button onClick={() => {setShowScore(false);}}>X</button>
      <div className="score_container">
          {scores.map((score, index) => {
            return (
              <div key={index} className="score_body">
                  <p>{score.score}</p>
                  <p className="score_name">{score.user.username}</p>
                  <p className="score_timer">{score.timer}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Scores;
