import reactLogo from "./assets/react.svg";

export default function Footer() {
  return (
    <div className="Footer">
      <p>
        <img className="react-logo" src={reactLogo} alt="React logo" /> React
        Weather App{" "}
        <img className="react-logo" src={reactLogo} alt="React logo" /> was
        coded by{" "}
        <a
          className="footer-link"
          href="https://desing-main-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pam Ortega{" "}
        </a>
        and is open-source{" "}
        <a
          className="footer-link"
          href="https://github.com/Pampinup/weather-react-vite/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
