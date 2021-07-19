import { getHerosByPublisher } from "../../selectors/getHerosByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
    const heros = getHerosByPublisher(publisher);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {heros.map((hero) => {
                return <HeroCard key={hero.id} {...hero} />;
            })}
        </div>
    );
};
