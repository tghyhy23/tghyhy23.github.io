export default function TechstackList() {
  const tech = [
    { name: "HTML",        url: "https://developer.mozilla.org/docs/Web/HTML",         badge: <img src="https://skillicons.dev/icons?i=html"       width="48" alt="HTML" /> },
    { name: "CSS / SCSS",  url: "https://developer.mozilla.org/docs/Web/CSS",          badge: <img src="https://skillicons.dev/icons?i=css"        width="48" alt="CSS/SCSS" /> },
    { name: "JavaScript",  url: "https://developer.mozilla.org/docs/Web/JavaScript",   badge: <img src="https://skillicons.dev/icons?i=js"         width="48" alt="JavaScript" /> },
    { name: "React",       url: "https://react.dev/",                                  badge: <img src="https://skillicons.dev/icons?i=react"      width="48" alt="React" /> },
    { name: "Node.js",     url: "https://nodejs.org/",                                 badge: <img src="https://skillicons.dev/icons?i=nodejs"     width="48" alt="Node.js" /> },
    { name: "Express",     url: "https://expressjs.com/",                              badge: <img src="https://skillicons.dev/icons?i=express"    width="48" alt="Express" /> },
    { name: "Python",      url: "https://www.python.org/",                             badge: <img src="https://skillicons.dev/icons?i=python"     width="48" alt="Python" /> },
    { name: "PyTorch",     url: "https://pytorch.org/",                                badge: <img src="https://skillicons.dev/icons?i=pytorch"    width="48" alt="PyTorch" /> },
    { name: "TensorFlow",  url: "https://www.tensorflow.org/",                         badge: <img src="https://skillicons.dev/icons?i=tensorflow" width="48" alt="TensorFlow" /> },
    { name: "MongoDB",     url: "https://www.mongodb.com/",                            badge: <img src="https://skillicons.dev/icons?i=mongodb"    width="48" alt="MongoDB" /> },
    { name: "PostgreSQL",  url: "https://www.postgresql.org/",                         badge: <img src="https://skillicons.dev/icons?i=postgres"   width="48" alt="PostgreSQL" /> },
    { name: "GraphQL",     url: "https://graphql.org/",                                badge: <img src="https://skillicons.dev/icons?i=graphql"    width="48" alt="GraphQL" /> },
    { name: "Docker",      url: "https://www.docker.com/",                             badge: <img src="https://skillicons.dev/icons?i=docker"     width="48" alt="Docker" /> },
    { name: "Postman",     url: "https://www.postman.com/",                            badge: <img src="https://skillicons.dev/icons?i=postman"    width="48" alt="Postman" /> },
    { name: "Git",         url: "https://git-scm.com/",                                badge: <img src="https://skillicons.dev/icons?i=git"        width="48" alt="Git" /> },
    { name: "Figma",       url: "https://www.figma.com/",                              badge: <img src="https://skillicons.dev/icons?i=figma"      width="48" alt="Figma" /> },
  ];

  return (
    <div className="sc-grid sc-grid--tech">
      {tech.map((t) => (
        <a
          className="tech-chip"
          key={t.name}
          href={t.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.name} website`}
          title={t.name}
        >
          <span className="tech-chip__badge" aria-hidden>{t.badge}</span>
          <span className="tech-chip__name">{t.name}</span>
        </a>
      ))}
    </div>
  );
}
