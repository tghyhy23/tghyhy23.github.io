export default function ProjectList() {
  const projects = [
    {
      id: 1,
      title: "Arithmetika Solver",
      desc: "Mini app tính toán nâng cao với UI tối, hỗ trợ biểu thức & lịch sử.",
      demo: "#",
      details: "#",
    },
    {
      id: 2,
      title: "AutoChat Discord",
      desc: "Bot Discord tự động trả lời, slash commands, deploy dễ dàng.",
      demo: "#",
      details: "#",
    },
    {
      id: 3,
      title: "NoteBook Web",
      desc: "Ghi chú markdown, đồng bộ localStorage, tìm kiếm tức thời.",
      demo: "#",
      details: "#",
    },
    {
      id: 4,
      title: "BlooMart",
      desc: "MERN marketplace đa vai trò: customer/vendor/shipper, payment.",
      demo: "#",
      details: "#",
    },
    {
      id: 5,
      title: "RAG Assistant",
      desc: "Assistant tra cứu tài liệu, vector search & embeddings.",
      demo: "#",
      details: "#",
    },
    {
      id: 6,
      title: "Portfolio v2",
      desc: "React + SCSS, hiệu ứng glow, tối ưu Lighthouse.",
      demo: "#",
      details: "#",
    },
  ];

  return (
    <div className="sc-grid">
      {projects.map((p) => (
        <article className="sc-card" key={p.id}>
          <div className="sc-card__thumb" aria-hidden />
          <div className="sc-card__body">
            <h3 className="sc-card__title">{p.title}</h3>
            <p className="sc-card__desc">{p.desc}</p>
          </div>
          <div className="sc-card__actions">
            <a className="sc-btn sc-btn--ghost" href={p.demo} target="_blank" rel="noreferrer">
              Live Demo ↗
            </a>
            <a className="sc-btn sc-btn--solid" href={p.details} target="_blank" rel="noreferrer">
              Details
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
