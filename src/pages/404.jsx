import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-svw h-svh flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-semibold">404</h1>
        <p className="text-lg">Page Not Found</p>
        <Link
          className="btn btn--small btn--primary max-w-45 mt-5 mx-auto"
          href={"/"}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

NotFound.getLayout = function Layout(page) {
  return <>{page}</>;
};

export default NotFound;
