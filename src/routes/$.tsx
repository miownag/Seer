import { useNavigate } from '@modern-js/runtime/router';
import { Box } from '@mui/material';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 rounded-lg">
      <div className="text-center">
        <p className="text-3xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Box
            component="a"
            onClick={() => navigate('/')}
            className="cursor-pointer rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Box>
          <Box
            component="a"
            className="cursor-pointer text-sm font-semibold text-gray-900"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default Page404;
