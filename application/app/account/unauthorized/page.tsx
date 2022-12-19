import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">401</div>

          <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            Unauthorized
          </div>

          <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            Looks like your session was expired, please authenticate again
          </div>
          <div className="mt-8 flex">
            <Link
              href="/account/login"
              className="bg-indigo-500 text-white mx-4 px-12 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/account/register"
              className="border-2 border-indigo-500 text-indigo-500 mx-4 px-12 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
