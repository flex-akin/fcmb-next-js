"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@styles/globals.css";
import Image from "next/image";
import { User, Lock, Eye, Key, EyeSlash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "@redux/actions/authActions";
import ButtonLoader from "@components/ButtonLoader";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  let router = useRouter();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!username || username == "") {
      setUsernameError("Username is required");
      setTokenError("");
      setPasswordError("");
    } else if (!password || password == "") {
      setPasswordError("Password is required");
      setTokenError("");
      setUsernameError("");
    } else if (!token || token == "") {
      setTokenError("Token is required");
      setPasswordError("");
      setUsernameError("");
    } else {
      dispatch(loginUser(username, password, token));
    }
  };
  console.log(error);
  if (error) {
    toast.error(error.Message);
    dispatch(clearErrors());
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <section className="body-screen">
      <div className="min-h-screen flex flex-row mx-auto justify-center">
        <div className="rectanglesOne">
          <div className=" rectanglesOne-trf origin-top-left rotate-[-111.38deg] w-[235.79px] h-[210.05px] relative">
            <div className="w-[130.24px] h-[130.24px] left-[45.54px] top-[-102.58px] absolute origin-top-left rotate-[-111.38deg] rounded-[8.98px] border border-purple-800 border-opacity-50"></div>
            <div className="w-[44.91px] h-[44.91px] left-[-23.59px] top-[-195.75px] absolute origin-top-left rotate-[-111.38deg] rounded border border-gray-400"></div>
            <div className="w-[94.32px] h-[87.58px] pl-[53.89px] pr-[13.47px] pt-[6.74px] pb-[51.65px] left-[-17.19px] top-[-43.91px] absolute origin-top-left rotate-[-111.38deg] rounded border border-white border-opacity-50 justify-end items-center inline-flex">
              <div className="w-[26.95px] h-[29.19px] relative rounded border border-amber-400"></div>
            </div>
            <div className="w-[47.16px] h-[44.91px] left-[11.99px] top-[-43.28px] absolute origin-top-left rotate-[-111.38deg] rounded border border-zinc-400 border-opacity-50"></div>
            <div className="w-[58.39px] h-[56.14px] left-[75.28px] top-[-29.47px] absolute origin-top-left rotate-[-111.38deg] rounded border border-amber-400"></div>
            <div className="w-[94.32px] h-[92.07px] left-[47px] top-[-40.11px] absolute origin-top-left rotate-[-111.38deg] rounded border border-zinc-400 border-opacity-50"></div>
            <div className="w-[58.39px] h-[56.14px] left-[116.18px] top-[-91.31px] absolute origin-top-left rotate-[-111.38deg] rounded border border-purple-950 border-opacity-50"></div>
            <div className="w-[44.91px] h-[44.91px] left-[31.51px] top-[-202.85px] absolute origin-top-left rotate-[-111.38deg] rounded border border-amber-400"></div>
          </div>
        </div>
        <Toaster />
        <div className="basis-[46%] flex flex-col justify-center items-center">
          <div className="flex flex-col min-w-[67%] ">
            <div className=" text-zinc-800 text-[40px] font-light pb-7 leading-[68.40px]">
              Mastercard
            </div>
            <h1 className="text-2xl text-zinc-800 font-bold pb-3">Sign In</h1>
            <p className="text-[11px] font-light pb-7">
              Enter your username, password and token to sign in
            </p>
            <form onSubmit={loginSubmit} className="space-y-6">
              <div>
                <p className="py-1 font-light text-[13px]">Username</p>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center p-2">
                    <User className="m-4" size="24" color="#292D32" />
                  </span>
                  <input
                    className=" placeholder:text-slate-400 block bg-neutral-50 min-w-full h-10 border border-neutral-50 rounded-md py-2 pl-16 pr-3 shadow-sm focus:outline-none focus:border-purple-600 focus:bg-white  sm:text-sm"
                    placeholder="Munah1234"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <p className="py-1 font-light text-red-700 text-[13px]">
                  {usernameError}
                </p>
              </div>

              <div>
                <p className="py-1 font-light text-[13px] self-stretch text-zinc-800 leading-tight">
                  Password
                </p>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 right-0 flex items-center p-2">
                    <div type="button">
                      {passwordType === "password" ? (
                        <Eye
                          onClick={togglePassword}
                          className="m-4"
                          size="24"
                          color="#292D32"
                        />
                      ) : (
                        <EyeSlash
                          onClick={togglePassword}
                          className="m-4"
                          size="24"
                          color="#292D32"
                        />
                      )}
                    </div>
                  </span>

                  <span className="absolute inset-y-0 left-0 flex items-center p-2">
                    <Lock className="m-4" size="24" color="#292D32" />
                  </span>
                  <input
                    className=" placeholder:text-slate-400 block bg-neutral-50 min-w-full h-10 border border-neutral-50 rounded-md py-2 pl-16 pr-3 shadow-sm focus:outline-none focus:border-purple-600 focus:bg-white  sm:text-sm"
                    placeholder="**********"
                    type={passwordType}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <p className="py-1 text-red-700 font-light text-[13px]">
                  {passwordError}
                </p>
              </div>

              <div>
                <p className="py-1 font-light text-[13px]">Token</p>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center p-2">
                    <Key className="m-4" size="24" color="#292D32" />
                  </span>
                  <input
                    className=" placeholder:text-slate-400 block bg-neutral-50 min-w-full h-10 border border-neutral-50 rounded-md py-2 pl-16 pr-3 shadow-sm focus:outline-none focus:border-purple-600 focus:bg-white  sm:text-sm"
                    placeholder="*********"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </label>
                <p className="py-1 text-red-700 font-light text-[13px]">
                  {tokenError}
                </p>
              </div>

              <div className=" w-full gap-2.5 inline-flex">
                {loading ? (
                  <button className="justify-center items-center gap-2.5 flex w-full h-10 p-2.5 bg-purple-200 rounded-md relative disabled">
                    <ButtonLoader />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="justify-center items-center gap-2.5 flex w-full h-10 p-2.5 bg-purple-900 rounded-md"
                  >
                    <div className="text-center text-white text-lg font-semibold leading-snug ">
                      Sign In
                    </div>
                  </button>
                )}
              </div>
            </form>
            <p className="text-[11px] font-light pt-6">
              want to reset details?{" "}
              <span className="text-purple-800">Reset</span>
            </p>
          </div>
          <div className="rectanglesBottom">
            <div className=" w-[235.79px] h-[210.05px] ">
              <div className="w-[130.24px] h-[130.24px] left-[45.54px] top-[-102.58px] absolute origin-top-left rotate-[-111.38deg] rounded-[8.98px] border border-purple-800 border-opacity-50"></div>
              <div className="w-[44.91px] h-[44.91px] left-[-23.59px] top-[-195.75px] absolute origin-top-left rotate-[-111.38deg] rounded border border-gray-400"></div>
              <div className="w-[94.32px] h-[87.58px] pl-[53.89px] pr-[13.47px] pt-[6.74px] pb-[51.65px] left-[-17.19px] top-[-43.91px] absolute origin-top-left rotate-[-111.38deg] rounded border border-white border-opacity-50 justify-end items-center inline-flex">
                <div className="w-[26.95px] h-[29.19px] relative rounded border border-amber-400"></div>
              </div>
              <div className="w-[47.16px] h-[44.91px] left-[11.99px] top-[-43.28px] absolute origin-top-left rotate-[-111.38deg] rounded border border-zinc-400 border-opacity-50"></div>
              <div className="w-[58.39px] h-[56.14px] left-[75.28px] top-[-29.47px] absolute origin-top-left rotate-[-111.38deg] rounded border border-amber-400"></div>
              <div className="w-[94.32px] h-[92.07px] left-[47px] top-[-40.11px] absolute origin-top-left rotate-[-111.38deg] rounded border border-zinc-400 border-opacity-50"></div>
              <div className="w-[58.39px] h-[56.14px] left-[116.18px] top-[-91.31px] absolute origin-top-left rotate-[-111.38deg] rounded border border-purple-950 border-opacity-50"></div>
              <div className="w-[44.91px] h-[44.91px] left-[31.51px] top-[-202.85px] absolute origin-top-left rotate-[-111.38deg] rounded border border-amber-400"></div>
            </div>
          </div>
        </div>

        <div className="card-bg max-width-full basis-[54%]">
          <div className="flex flex-row-reverse m-12">
            <Image
              src="/assets/fcmblogo.png"
              width={78}
              height={78}
              alt="fcmb_logo"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/cards.png"
              width={600}
              height={600}
              alt="fcmb_logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
