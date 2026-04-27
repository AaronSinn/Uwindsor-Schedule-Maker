import html2canvas from "html2canvas";
import { Button } from 'primereact/button';

export default function DownloadButton() {
  const downloadSchedule = () => {
    const timetable = document.getElementById("grid-container");

    html2canvas(timetable, {
      scale: 2,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = "timetable.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="image-download-container">
      <Button
        id="download-image-button"
        label="Download Schedule as PNG 📷"
        severity="info"
        raised
        onClick={downloadSchedule}
      />
    </div>
  );
}