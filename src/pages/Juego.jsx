import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const Juego = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: '/unity/Build/game.loader.js',
    dataUrl: '/unity/Build/game.data',
    frameworkUrl: '/unity/Build/game.framework.js',
    codeUrl: '/unity/Build/game.wasm',
  });

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Juego;
