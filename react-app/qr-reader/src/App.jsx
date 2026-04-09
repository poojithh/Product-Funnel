import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {

  const [qrData, setQrData] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true
      },
      false
    );

    scanner.render(
      (decodedText) => {

        console.log("QR DETECTED:", decodedText);
        setQrData(decodedText);
setHistory(prev => [...prev, decodedText]);

if(decodedText.startsWith("http")){
  window.open(decodedText, "_blank");
}

      },
      (errorMessage) => {
        // ignore scan errors
      }
    );

  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial",
        padding: "40px"
      }}
    >

      <h1>QR Code Reader</h1>

      <p>Scan any QR code instantly</p>

      {/* Scanner Box */}
      <div
        id="reader"
        style={{
          width: "350px",
          margin: "auto",
          border: "2px solid #333",
          padding: "10px",
          borderRadius: "10px"
        }}
      ></div>

      {/* Result Display */}
{qrData && (
  <div style={{ marginTop: "20px" }}>
    <h3>Scanned Result:</h3>
    <p>{qrData}</p>
  </div>
)}

{/* Scan History Section */}
<h3 style={{marginTop:"30px"}}>Scan History</h3>

<ul style={{listStyle:"none", padding:0}}>
  {history.map((item,index)=>(
    <li
      key={index}
      style={{
        background:"#f2f2f2",
        margin:"5px",
        padding:"10px",
        borderRadius:"5px"
      }}
    >
      {item}
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;