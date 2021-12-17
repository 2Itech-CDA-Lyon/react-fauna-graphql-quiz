import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentGameContext } from "../contexts/current-game"

const PlaySwitch: FC = () => {
  const { data } = useCurrentGameContext();

  if (data.currentQuestion === null) {
    return <Navigate to="/" />
  } else {
    return <Navigate to={`/play/${data.currentQuestion?.quiz?._id}/${data.currentQuestion?.order}`} />
  }
}

export default PlaySwitch;
