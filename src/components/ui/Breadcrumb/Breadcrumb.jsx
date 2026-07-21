import { Fragment } from "react";
import { Link, useMatches } from "react-router";

const Breadcrumb = () => {
  const matches = useMatches();
  const filteredMatches = matches.filter((match) => match.handle);

  return (
    <div className="flex items-center gap-x-1 text-slate-grey text-sm lg:text-base">
      {filteredMatches.map((match, i) => {
        if (filteredMatches.length === i + 1) {
          return (
            <span className="text-black" key={match.id}>
              {match.handle?.breadcrumb}
            </span>
          );
        }

        return (
          <Fragment key={match.id}>
            <Link to={match.pathname}>{match.handle?.breadcrumb}</Link>
            <svg className="size-4 -rotate-90">
              <use href="#chevron-down"></use>
            </svg>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
