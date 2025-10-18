export default function PublicationList() {
  const pubs = [
    {
      id: 1,
      title: "CLAM: A Synergistic Deep Learning Model for Multi-Step Stock Trend Forecasting",
      venue: "Sage Journals, March 20, 2025",
      link: "https://journals.sagepub.com/doi/10.1177/17248035251322877",
      abs: "a hybrid deep learning framework that integrates CNNs, LSTMs, and Attention Mechanism (AM) for straightforward multi-step stock trend forecasting.",
    },
  ];

  return (
    <div className="sc-grid sc-grid--pubs">
      {pubs.map((p) => (
        <article className="sc-card sc-card--pub" key={p.id}>
          <div className="sc-card__body">
            <h3 className="sc-card__title">
              <a href={p.link} target="_blank" rel="noreferrer">{p.title}</a>
            </h3>
            <p className="sc-card__meta">{p.venue}</p>
            <p className="sc-card__desc">{p.abs}</p>
          </div>
          <div className="sc-card__actions">
            <a className="sc-btn sc-btn--solid" href={p.link} target="_blank" rel="noreferrer">
              View Paper
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
