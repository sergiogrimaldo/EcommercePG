import React from "react";
import s from "./About.module.css";

function About() {
    console.log("About");
    return (
        <div>
            <div className={s.aboutContainer}>
                <h1 className={s.title}>About us</h1>

                <div className={s.text}>
                    <p className={s.text}>
                        Hello! We're <b>CACTUSSHOES</b>. This e-commerce was developed with the combined effort of eight
                        <a href="https://www.soyhenry.com"> HENRY</a> students and the support of our TL (). In this bootcamp over the last four
                        months, we were intensively taught, over +800 hours of study, the basics of several state-of-the-art technologies such as{" "}
                        <span style={{ color: "#52B9D4", fontWeight: "bold" }}>React</span>,
                        <span style={{ color: "#7649BB", fontWeight: "bold" }}> Redux</span>,
                        <span style={{ color: "#8BC74B", fontWeight: "bold" }}> Express</span>,
                        <span style={{ color: "#8BC74B", fontWeight: "bold" }}> Node.js</span>,
                        <span style={{ color: "#03AEEE", fontWeight: "bold" }}> Sequelize</span>, among many others. Over the last month, our group
                        has been putting all this knowledge into practice and also familiarising ourselves with agile methodologies such as{" "}
                        <span style={{ color: "#40586F", fontWeight: "bold" }}>SCRUM</span>. HENRY's ultimate goal is to enable us to start our
                        careers in this exciting field that is becoming more and more important in everyone's daily life.
                    </p>
                </div>
            </div>

            <h1 className={s.title}>Our team</h1>

            <div className={s.teamsContainer}>
                <div className={s.box}>
                    <div>
                        <img className={s.imgBox} alt="team" src="fotos-portfolio1.jpg" style={{ width: "110px", height: "130px" }} />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Alan Castillo</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/alancastillofullstackdeveloper/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/AlanMauricioCastillo" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://www.twitter.com/@AlanCas94011193" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/twitter.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>
                <div className={s.box}>
                    <div>
                        <img className={s.imgBox} alt="team" src="fran_Img1.jpg" />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Francisco Berthet</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/franciscoberthet/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/frann11" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img className={s.imgBox} alt="team" src="sergio_Img1.jpg" />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Sergio Grimaldo</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/sergio-grimaldo-desarrollador-junior/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/sergiogrimaldo" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img
                            className={s.imgBox}
                            alt="team"
                            src="fer_Img1.jpg"
                        />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Fernando Ruiz</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/fernando-ruiz-68660279/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/FernandoRuizParietti" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img
                            className={s.imgBox}
                            alt="team"
                            src="leo_Img1.jpg"
                        />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Leonardo Marussig</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/leonardo-marussig-dev/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/elmaruz" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img
                            className={s.imgBox}
                            alt="team"
                            src="flor_Img1.jpg"
                        />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Florencia Lodosa</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/florencia-lodosa/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/florlodosa" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img
                            className={s.imgBox}
                            alt="team"
                            src="joaco_Img1.jpg"
                        />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Joaquín Trovato</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/joaquintrovato/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/JoacoTrovato" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>

                <div className={s.box}>
                    <div>
                        <img
                            className={s.imgBox}
                            alt="team"
                            src="cristian_Img1.jpg"
                        />
                    </div>
                    <div className={s.infoBox}>
                        <h3>Cristian Reyes</h3>
                        <h4>Full-Stack Developer</h4>
                        <span className="links-container">
                            <a href="https://www.linkedin.com/in/cristian-reyes-parra-developer/" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/stikersDeContacto/linked-in-alt.svg"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                            <a href="https://github.com/careyesp95" target="_blank">
                                <img
                                    src="https://raw.githubusercontent.com/AlanMauricioCastillo/Portfolio/master/public/GitHubImg.png"
                                    alt=""
                                    width="20px"
                                    height="20px"
                                />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default About
