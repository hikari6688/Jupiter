import { useState } from 'react';
function useFullScreen(element: any) {
  const [isFullscreen, setFullscreen] = useState(false);
  const launchFullscreen = () => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const exitFullscreen = () => {
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    }
  };
  const toggleFullScreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      launchFullscreen();
      setFullscreen(true);
    }
  };
  return { launchFullscreen, exitFullscreen, toggleFullScreen };
}

export default useFullScreen;
