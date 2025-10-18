export default function ProjectList() {
  const projects = [
    {
      id: 1,
      title: "Text-To-SQL",
      desc: "An application that leverages Small Language Models (SLMs) for domain-related Text-to-SQL tasks.",
      details: "#",
    },
    {
      id: 2,
      title: "CryptoBot",
      desc: "An application that performs comprehensive financial and technical analysis on any cryptocurrency using historical data from the Binance API.",
      details: "#",
    },
    {
      id: 3,
      title: "BlooMart",
      desc: "This MERN platform is a multi-category e-commerce web app built for a fast, friendly, and trustworthy shopping experience.",
      details: "#",
    },
    {
      id: 4,
      title: "Fashion Website - Flask App",
      desc: "A website uses machine learning to generate positive or negative labels to help users make purchases.",
      details: "#",
    },
  ];

  return (
    <div className="sc-grid">
      {projects.map((p) => (
        <article className="sc-card" key={p.id}>
          <div className="sc-card__thumb" aria-hidden>
            hello
          </div>
          <div className="sc-card__body">
            <h3 className="sc-card__title">{p.title}</h3>
            <p className="sc-card__desc">{p.desc}</p>
          </div>
          <div className="sc-card__actions">
            <a
              className="sc-btn sc-btn--solid"
              href={p.details}
              target="_blank"
              rel="noreferrer"
            >
              Details
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
