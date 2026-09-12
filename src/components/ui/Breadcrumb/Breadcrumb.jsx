import { breadcrumbPath } from "@/utils/urlUtil";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Breadcrumb = ({ indexPathName }) => {
  const { pathname } = useRouter();
  const breadcrumbs = breadcrumbPath(pathname, indexPathName);

  return (
    <div  className="flex items-center capitalize gap-x-1 text-slate-grey text-sm lg:text-base">
      {breadcrumbs.map((breadcrumb, i) => {
        return (
          <Fragment key={breadcrumb.path}>
            {breadcrumbs.length === i + 1 ? (
              <span className="text-black">{breadcrumb.label}</span>
            ) : (
              <>
                <Link href={breadcrumb.path}>{breadcrumb.label}</Link>
                <svg className="size-4 -rotate-90">
                  <use href="#chevron-down"></use>
                </svg>
              </>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
