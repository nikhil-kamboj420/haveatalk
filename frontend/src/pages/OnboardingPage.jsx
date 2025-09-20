import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants/rowData.js";
import useOboarding from "../hooks/useOboarding.jsx";
import { Link } from "react-router";
import { capitalize } from "../lib/utils.js";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    userName: authUser?.userName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { onboardingMutation, isPending } = useOboarding();

  const handleOnboarded = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRadomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Avatar changed successfully !");
  };

  return (
    <>
      <title>OnBoard | HaveaTalk</title>
      <link rel="icon" href="/onboard-fav-icon.webp" />
      <div
        className="w-screen h-screen grid place-content-center   bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)] px-4"
      >
        <div className="absolute top-1">
          <Link
            to="/"
            type="button"
            className="w-[4vw] px-6   rounded-lg bg-white hover:bg-[#e12afb] transition    sm: text-2xl xl:text-2xl lg:text-lg "
            title="go back"
          >
            🔙
          </Link>
        </div>
        <div className=" w-full max-w-[90vw] border-2 border-b-fuchsia-500 md:max-w-[80vw] min-h-[70vh] flex flex-col md:flex-row gap-8  rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
          {/* Profile Section */}
          <div className=" flex flex-col justify-center items-center gap-6 md:w-1/2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[dragrace] tracking-[1rem] text-white text-center">
              Complete Your Profile
            </h1>

            {/* Avatar Wrapper */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 grid place-content-center shadow shadow-black rounded-full p-4 sm:p-6 lg:p-8 border-2 border-b-fuchsia-500">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover "
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-4xl sm:text-5xl text-[#e12afb]">
                  <img src="/camera-img.webp" alt="camera image" />
                </div>
              )}
            </div>

            <div className="relative flex justify-center items-center bg-[#6742bc]">
              <button
                type="button"
                onClick={handleRadomAvatar}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#6742bc] hover:bg-[#e12afb] transition text-white font-semibold  sm: text-2xl xl:text-2xl "
              >
                Generate Random Avatar
              </button>
              <img
                src="/magic-stick-icon.webp"
                alt="magic stick icon"
                className=" px-6  h-10 relative  right-10"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className=" md:w-1/2 flex flex-col justify-center">
            <form
              onSubmit={handleOnboarded}
              className="flex flex-col gap-6 text-white"
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="userName"
                  className=" text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] mb-1"
                >
                  User_Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={capitalize(formState.userName)}
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setFormState({ ...formState, userName: e.target.value })
                  }
                  className="px-3 sm:px-4 py-2 sm:py-3  text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] border-2 border-b-fuchsia-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#e12afb]"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col">
                <label
                  htmlFor="bio"
                  className=" text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={formState.bio}
                  placeholder="Describe yourself here!"
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                  className="resize-y font-[mori] border border-[wheat]  text-2xl xl:text-2xl sm:text-lg lg:text-xl cursor-pointer p-3 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#6742bc]"
                />
              </div>

              {/* Language Container */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Native Language */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="nativeLang"
                    className=" text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] mb-1"
                  >
                    Native Language
                  </label>
                  <select
                    id="nativeLang"
                    value={formState.nativeLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="px-3 sm:px-4 py-2 sm:py-3  text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] border-2 border-b-fuchsia-500 bg-transparent rounded-md"
                  >
                    <option value="">--Select--</option>
                    {LANGUAGES.map((lang) => (
                      <option
                        key={`native-${lang}`}
                        value={lang.toLowerCase()}
                        className="text-black"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="learningLang"
                    className=" text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] mb-1"
                  >
                    Learning Language
                  </label>
                  <select
                    id="learningLang"
                    value={formState.learningLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        learningLanguage: e.target.value,
                      })
                    }
                    className="px-3 sm:px-4 py-2 sm:py-3  text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] border-2 border-b-fuchsia-500 bg-transparent rounded-md"
                  >
                    <option value="">--Select--</option>
                    {LANGUAGES.map((lang) => (
                      <option
                        key={`learning-${lang}`}
                        value={lang.toLowerCase()}
                        className="text-black"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className=" text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] mb-1"
                >
                  Location{" "}
                  <img
                    src="/location-icon.webp"
                    alt="location icon"
                    className="w-10 h-10 inline-block"
                  />
                </label>
                <input
                  id="location"
                  type="text"
                  value={formState.location}
                  placeholder="City, Country"
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="px-3 sm:px-4 py-2 sm:py-3  text-2xl xl:text-2xl sm:text-lg lg:text-xl font-[mori] tracking-[0.2rem] border-2 border-b-fuchsia-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#e12afb]"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-6 py-3 sm:py-4 rounded-lg bg-[#6742bc] hover:bg-[#e12afb] transition text-white font-semibold  sm: text-2xl xl:text-2xl lg:text-lg"
                >
                  {isPending ? "Onboarding..." : "Complete Onboarding"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
