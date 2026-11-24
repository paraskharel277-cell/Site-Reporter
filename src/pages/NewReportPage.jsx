import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "environment",
};

function NewReportPage({ addReport }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fault");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setShowCamera(false);
  }, [webcamRef]);

  const geoFindMe = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setStatus("");
    setLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
  };

  const error = () => {
    setStatus("Unable to retrieve your location");
  };

  function openCamera() {
    setCameraError("");
    setShowCamera(true);
  }

  function handleCameraError() {
    setShowCamera(false);
    setCameraError("Could not use the camera. Please allow access.");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setTitleError("Please enter a title.");
      return;
    }

    addReport({
      id: Date.now(),
      title: title,
      category: category,
      description: description,
      location: link,
      photo: photo,
      date: new Date().toLocaleDateString("en-GB"),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">New report</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p className="text-red-600">{titleError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option>Fault</option>
          <option>Wildlife</option>
          <option>Maintenance</option>
          <option>Fly-tipping</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Button type="button" variant="outline" onClick={geoFindMe}>
          Use my location
        </Button>

        <p className="text-sm">{status}</p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            Location added. View on map
          </a>
        )}
      </div>

      <div className="space-y-2">
        {!showCamera && (
          <Button type="button" variant="outline" onClick={openCamera}>
            {photo ? "Retake photo" : "Open camera"}
          </Button>
        )}

        {cameraError && <p className="text-red-600">{cameraError}</p>}

        {showCamera && (
          <div className="space-y-2">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.6}
              videoConstraints={videoConstraints}
              onUserMediaError={handleCameraError}
              className="w-full"
            />
            <Button type="button" onClick={capture}>
              Capture photo
            </Button>
          </div>
        )}

        {photo && !showCamera && (
          <img src={photo} alt="Report" className="w-full" />
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save report</Button>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NewReportPage;