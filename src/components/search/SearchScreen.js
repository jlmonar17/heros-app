import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heros/HeroCard";
import queryString from "query-string";
import { getHerosByName } from "../../selectors/getHerosByName";
import { useMemo } from "react";

export const SearchScreen = ({ history }) => {
    // Get prop location from props of the component
    const location = useLocation();

    // Detructuring to get only query value that I need
    const { q = "" } = queryString.parse(location.search);

    const { formValues, handleInputChange } = useForm({
        search: q,
    });

    const { search } = formValues;

    // Get heroes array only when "q" value changes, otherwise, heroes array will be memorized
    const herosFiltered = useMemo(() => getHerosByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        // Added query string to current url
        history.push(`?q=${search}`);
    };

    return (
        <>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h5>Search Form</h5>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Your search"
                            className="form-control"
                            autoComplete="off"
                            value={search}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn w-100 btn-outline-primary mt-3"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {q === "" && (
                        <div className="alert alert-info">Search a hero...</div>
                    )}

                    {q !== "" && herosFiltered.length === 0 && (
                        <div className="alert alert-danger">
                            No heros found with {q}
                        </div>
                    )}

                    {herosFiltered.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
