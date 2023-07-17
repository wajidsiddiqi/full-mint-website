import "./Team.css";
import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import Twitter from "./assets/social-media-icons/twitter.png";

const Team = () => {
  return (
    <section className="team">
      <div className="center">
        <h1>Our Team</h1>
      </div>

      <div className="team-content">
        <div className="box">
          <img src={img1} alt="Team Member" className="pf" />
          <h3>Peter Joe</h3>
          <h5>Founder</h5>
          <div className="icons">
            <a href="#">
              <i>
                <img src={Twitter} alt="Twitter" />
              </i>
            </a>
          </div>
        </div>

        <div className="box">
          <img src={img2} alt="Team Member" className="pf" />
          <h3>Wajid</h3>
          <h5>Developer</h5>
          <div className="icons">
            <a href="https://twitter.com/abdulwajidsid" target="_blank">
              <i>
                <img src={Twitter} alt="Twitter" />
              </i>
            </a>
          </div>
        </div>

        <div className="box">
          <img src={img3} alt="Team Member" className="pf" />
          <h3>Tom Luka</h3>
          <h5>Artist</h5>
          <div className="icons">
            <a href="#">
              <i>
                <img src={Twitter} alt="Twitter" />
              </i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
