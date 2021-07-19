import { heros } from "../data/heros";

export const getHerosByPublisher = (publisher) => {
    const validPublishers = ["DC Comics", "Marvel Comics"];

    if (!validPublishers.includes(publisher)) {
        throw new Error(`Publisher ${publisher} doesn't exist`);
    }

    return heros.filter((hero) => hero.publisher === publisher);
};
