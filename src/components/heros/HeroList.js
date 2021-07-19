import { useMemo } from "react";
import { getHerosByPublisher } from "../../selectors/getHerosByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
    const heros = useMemo(() => getHerosByPublisher(publisher), [publisher]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 animate__animated animate__fadeIn">
            {heros.map((hero) => {
                return <HeroCard key={hero.id} {...hero} />;
            })}
        </div>
    );
};
