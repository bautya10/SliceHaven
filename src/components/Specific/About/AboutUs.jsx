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
      linkedin: "https://www.linkedin.com/in/agust%C3%ADn-taranc%C3%B3n-494b91283/",
      github: "https://github.com/agustintarancon",
      image: imagen1
    },
    {
      name: "Bautista Arias",
      description: "18 Años. Me gusta el futbol, el gym y programar.",
      linkedin: "https://www.linkedin.com/in/bautista-arias-402910283/",
      github: "https://github.com/bautya10",
      image: imagen2
    },
    {
      name: "Dana Rocío Diaz",
      description: "Tengo 24 años soy profe de yoga y me encanta viajar!",
      linkedin: "https://www.linkedin.com/in/dana-rocio-diaz-5a2b52275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/danadiaz1999",
      image: imagen3
    },
    {
      name: "Emiliano Gasco",
      description: "Soy Gasco, 24 años, me gusta programar.",
      linkedin: "https://www.linkedin.com/in/emiliano-augusto-gasco-56ba40224/",
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
