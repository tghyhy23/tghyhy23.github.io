import { Link } from "react-router-dom";

import bloo from "../../assets/bloo.jpg";
import arrowIcon from "../../assets/up-right-arrow.png";

export default function ProjectList() {
    const projects = [
        {
            id: 1,
            title: "Sai Gon Tam Duc Web Admin",
            slug: "sgtd-web-admin",
            desc: "An administrative dashboard for managing dental clinic operations, mobile app content, and appointment bookings across multiple branches.",
        },
        {
            id: 2,
            title: "Sai Gon Tam Duc Mobile App",
            slug: "sgtd-mobile-app",
            desc: "A mobile application that allows patients to explore dental services and book appointments at Sai Gon Tam Duc dental clinics across Vietnam.",
        },
        {
            id: 3,
            title: "BlooMart: An E-commerce Website",
            slug: "bloomart",
            desc: "A multi-vendor e-commerce platform where customers can browse products, place orders, pay via MoMo, and receive deliveries from shippers.",
            image: bloo,
        },
        {
            id: 4,
            title: "Wander: A Tourism Forum Website",
            slug: "wander",
            desc: "A tourism community platform where users can share travel experiences, discuss destinations, explore services, and make bookings with integrated payments.",
        },
    ];

    return (
        <div className="sc-grid">
            {projects.map((p) => (
                <article className="sc-card" key={p.id}>

                    {/* PROJECT IMAGE */}
                    <div className="sc-card__thumb">
                        <div className="sc-card__thumb-inner">
                            {p.image ? (
                                <img
                                    src={p.image}
                                    alt={`${p.title} preview`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className="sc-card__thumb--ph" />
                            )}
                        </div>
                    </div>

                    {/* PROJECT CONTENT */}
                    <div className="sc-card__body">
                        <h3 className="sc-card__title">
                            {p.title}
                        </h3>

                        <p className="sc-card__desc">
                            {p.desc}
                        </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="sc-card__actions">
                        <Link
                            to={`/projects/${p.slug}`}
                            className="sc-btn sc-btn--solid"
                        >
                            Details

                            <img
                                src={arrowIcon}
                                alt=""
                                className="sc-btn__icon"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                </article>
            ))}
        </div>
    );
}