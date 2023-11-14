import style from './AboutUs.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import imagen1 from '../../../assets/AboutUs/Agustin.jpeg';
import imagen2 from '../../../assets/AboutUs/Bautista.jpeg';
import imagen3 from '../../../assets/AboutUs/Dana.jpeg';
import imagen4 from '../../../assets/AboutUs/Emiliano.jpeg';

const AboutUs = () => {
  const members = [
    {
      name: "Agustin Tarancon",
      description: "Soy Agustin, tengo 21 años y me gusta programar.",
      linkedin: "",
      instagram: "https://www.instagram.com/agustintarancon_/",
      github: "https://github.com/agustintarancon",
      image: imagen1
    },
    {
      name: "Bautista Arias",
      description: "18 Años. Me gusta el futbol, el gym y programar.",
      linkedin: "URL de LinkedIn del Miembro 2",
      instagram: "https://www.instagram.com/bautia__/",
      github: "https://github.com/bautya10",
      image: imagen2
    },
    {
      name: "Dana Rocío Diaz",
      description: "Tengo 24 años soy profe de yoga y me encanta viajar!",
      linkedin: "URL de LinkedIn del Miembro 2",
      instagram: "https://www.instagram.com/danarodiaz/",
      github: "https://github.com/danadiaz1999",
      image: imagen3
    },
    {
      name: "Emiliano Gasco",
      description: "Soy Gasco, 24 años, me gusta programar.",
      instagram: "https://www.instagram.com/gascoemiliano/",
      github: "https://github.com/emilianogasco",
      image: imagen4
    }
  ];

  return (
    <div>
      <h1 className={style.title}>¿Quiénes somos?</h1>
      <div className={`row ${style.aboutUs}`}>
        {members.map((member, index) => (
          <div key={index} className={`col-12 col-md-6 col-lg-3 col-xl-3 ${style.memberCard}`}> 
            <div>
              <img src={member.image} alt={member.name} className={style.memberImage}/>
              <h2 className={style.memberName}>{member.name}</h2>
              <p className={style.memberDescription}>{member.description}</p>
              <div className={style.socialIcons}>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <i className={`bi bi-linkedin ${style.linkedinIcon}`}></i>
                </a>
                <a href={member.instagram} target="_blank" rel="noreferrer">
                  <i className={`bi bi-instagram ${style.instagramIcon}`}></i>
                </a>
                <a href={member.github} target="_blank" rel="noreferrer">
                  <i className={`bi bi-github ${style.githubIcon}`}></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
