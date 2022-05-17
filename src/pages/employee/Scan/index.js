import React, { lazy, Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';

const BarcodeScanner = lazy(() => import('./BarcodeScanner'));

const Test = styled.div`
  .cameraHandler__message {
    padding: 40px;
    font-size: 20px;
    color: #fff;

    @media (min-width: 768px) {
      color: #000;
    }
  }

  button {
    width: 200px;
    margin-top: 20px;
  }
`;

const ScannerContainer = styled.div`
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #f4f4f4;

  @media (min-width: 768px) {
    height: 80%;
    width: 80%;
    margin: 0 auto;
  }
`;

const cameraPermissionGranted = () => {
  localStorage.setItem('CAM_PERMISSION', 'true');
};

const isCameraPermissionGranted = () => {
  return localStorage.getItem('CAM_PERMISSION') !== null;
};

const Scan = () => {
  const [isCameraSupported, setIsCameraSupported] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(
    isCameraPermissionGranted()
  );

  const onCamEnabled = () => {
    cameraPermissionGranted();
    setIsCameraEnabled(true);
  };

  useEffect(() => {
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    setIsCameraSupported(true);
    // }
  }, []);

  return (
    <Test>
      {isCameraSupported ? (
        isCameraEnabled ? (
          <Suspense fallback={<div>Loading...</div>}>
            <ScannerContainer>
              <BarcodeScanner />
            </ScannerContainer>
          </Suspense>
        ) : (
          <div className="cameraHandler__message">
            Enable your camera with the button below
            <Button
              aria-label="Enable Camera"
              className="btn__round camera__enable"
              onClick={onCamEnabled}
              block
            >
              Turn Camera On
            </Button>
          </div>
        )
      ) : (
        <div>Camera is not supported.</div>
      )}
    </Test>
  );
};

export default Scan;

// class CameraHandler extends Component {

//   onCamEnabled = () => {
//     dataHandler.cameraPermissionGranted();
//     this.setState({
//       isCamEnabled: true
//     });
//   }

//   componentWillMount() {
//     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       this.setState({
//         isCameraSupported: true
//       });
//     }
//   }

//   render() {
//     return (
//       <>
//         {this.state.isCameraSupported ?
//           this.state.isCamEnabled ?
//           <Suspense fallback={<div>Loading...</div>}>
//             <Video />
//           </Suspense>
//           :
//           <div className="cameraHandler__message">Enable your camera with the button below
//           <br/>
//           <div className="cameraHandler__messageIcon"><ArrowDown size={35}/></div>
//           </div>
//           :
//           <div>Camera is not supported 😢</div>
//         }
//         {this.state.isCamEnabled ?
//           ''
//           :
//           <button aria-label="Enable Camera" className="btn__round camera__enable" onClick={this.onCamEnabled}>
//             <Camera />
//           </button>
//         }
//       </>
//     );
//   }
// }

// export default CameraHandler;
