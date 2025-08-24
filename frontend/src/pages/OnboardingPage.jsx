import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants/rowData.js";
import useOboarding from "../hooks/useOboarding.jsx";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  //* using a custom hook for onboardingMutation
  const { onboardingMutation, isPending } = useOboarding();

  const handleOnboarded = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  // * Avatar changing handling fun()
  const handleRadomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Avatar changed successfully !");
  };

  return (
    <div id="onBoardWrapper">
      <div className="onBoardMainContainer">
        <div className="profileContainer">
          <h1 className="text-4xl">Complete Your Profile</h1>
          {/* profilePic */}
          <div>
            {formState.profilePic ? (
              <img src={formState.profilePic} alt="Avatar image" />
            ) : (
              <div>
                <i className="text-5xl">📸</i>
              </div>
            )}
          </div>
          {/* generate random Avatar */}
          <div>
            <button
              type="button"
              onClick={handleRadomAvatar}
              className="btn btn-outline btn-secondary "
            >
              Genrate Random Avatar
            </button>
          </div>
        </div>
        {/* onBoardForm-container */}
        <div className="onBoardForm-container">
          <form onSubmit={handleOnboarded}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formState.fullName}
                placeholder="Enter your full name"
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
              />
            </div>
            {/* Bio*/}
            <div>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                rows={5}
                cols={10}
                type="text"
                name="bio"
                value={formState.bio}
                placeholder="Describe Yourself here !"
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
              />
            </div>

            {/* language */}
            <div className="language-container">
              {/* nativeLang */}
              <div className="nativeLang">
                <label htmlFor="nativeLang">Native Language</label>
                <select
                  id="nativeLang"
                  name="nativeLang "
                  value={formState.nativeLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    });
                  }}
                >
                  <option value="">--Select--</option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* learningLang */}
              <div className="learningLang">
                <label htmlFor="learningLang">Learning Language</label>
                <select
                  id="learningLang"
                  name="learningLang"
                  value={formState.learningLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    });
                  }}
                >
                  <option value="">
                    Select language your learning language
                  </option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option
                        key={`learning-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Location */}
            <div>
              <label htmlFor="location">Location</label>
              <i className="text-4xl">📍</i>
              <input
                id="location"
                type="text"
                name="location"
                value={formState.location}
                placeholder="City, Country"
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-outline btn-primary"
                disabled={isPending}
              >
                {isPending ? "Onboarding..." : "Complete Onboarding"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
