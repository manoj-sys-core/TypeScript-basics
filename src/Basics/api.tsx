import { useState } from "react";
import Lightning from "../components/Beems";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import GlitchText from "../components/splittext";

type LocationInfo = {
  name: string;
};

type apidata = {
  name: string;
  gender: string;
  status: string;
  species: string;
  location: LocationInfo;
  origin: LocationInfo;
  episode: string[];
  image: string;
};

export default function GetData() {
  const [inp, setInp] = useState<string>("");
  const [data, setData] = useState<apidata | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!inp) return; // prevent empty input
    setLoad(true);
    setError(null); // reset previous error
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${inp}`
      );
      if (!res.ok) throw new Error("Character not found"); // handle 404
      const items = await res.json();
      setData(items);
      console.log(items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // safe access
      } else {
        setError(String(err)); // fallback
      }
    } finally {
      setTimeout(() => setLoad(false), 500); // optional delay for spinner
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchData();
  };

  return (
    <div style={{ width: "100%", height: "120vh", position: "relative" }}>
      <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "left",
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "10px",
          backdropFilter: "blur(10px) brightness(50%)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <GlitchText
          speed={1}
          enableShadows={true}
          className="text-sm font-bold"
        >Api Test</GlitchText>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            onChange={(e) => setInp(e.target.value)}
            onKeyPress={handleKeyPress}
            color="success"
            id="outlined-basic"
            label="Character ID"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <IconButton
            aria-label="fingerprint"
            onClick={fetchData}
            size="large"
            color="success"
          >
            <Fingerprint />
          </IconButton>
        </Stack>

        <div style={{ marginTop: "20px" }}>
          {load ? (
            <CircularProgress
              color="success"
              sx={{
                ml: "40%",
              }}
            />
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : data ? (
            <>
              <h1>{data.name}</h1>
              <p>Gender: {data.gender}</p>
              <p>Status: {data.status}</p>
              <p>Species: {data.species}</p>
              <p>Origin: {data.origin.name}</p>
              <p>Location: {data.location.name}</p>
              <h3>Episodes:</h3>
              <ul>
                {data.episode.map((ep, i) => (
                  <li key={i}>
                    <a
                      href={ep}
                      style={{
                        textDecoration: "none",
                        color: "lightblue",
                      }}
                    >
                      <span style={{ color: "white" }}>Episode {i + 1}:</span>{" "}
                      {ep}{" "}
                    </a>
                  </li>
                ))}
              </ul>
              <img
                src={data.image}
                alt={data.name}
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
                  width: "100%",
                }}
              />
            </>
          ) : (
            <p>Enter a valid character ID and click the button</p>
          )}
        </div>
      </div>
    </div>
  );
}
