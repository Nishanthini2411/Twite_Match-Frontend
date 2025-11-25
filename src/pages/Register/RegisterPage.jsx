import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city"; // ⭐ ADDED

const steps = [
  "Profile For",
  "Gender", // NEW STEP ADDED
  "Phone Verification",
  "Basic Details",
  "Height and Weight",
  "From",
  "Upload Images",
  "Verification", // ⭐ NEW CONDITIONAL STEP (Face / ID)
  "Marital Status", // ✅ NEW STEP
  "Hobbies & Interests",
  "Horoscope",
  "Religion",
  "Eating Habits",
  "Education",
  "Work Details",
  "Family Details",
  "Sibling Details", // ✅ NEW STEP
  "Partner Details",
  "Review",
  "Account Creation",
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [anim, setAnim] = useState("");
  const navigate = useNavigate();

  // NEW: global state needed for conditional logic
  const [profileFor, setProfileFor] = useState(""); // who is profile for?
  const [uploadedImages, setUploadedImages] = useState([]); // photos
  const [faceVerified, setFaceVerified] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  // 🔹 NEW: central profile state to export to ProfilePage
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    skinTone: "",
  });

  const [locationInfo, setLocationInfo] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [educationInfo, setEducationInfo] = useState({
    qualification: "",
    institute: "",
  });

  const [workInfo, setWorkInfo] = useState({
    occupation: "",
    income: "",
    company: "",
  });

  const [familyInfo, setFamilyInfo] = useState({
    father: "",
    mother: "",
    familyType: "",
    familyValues: "",
  });

  const [partnerInfo, setPartnerInfo] = useState({
    minAge: 18,
    maxAge: 30,
    location: "",
  });

  // whenever profileFor changes, reset verification flags
  useEffect(() => {
    setFaceVerified(false);
    setIdVerified(false);
  }, [profileFor]);

  const next = () => {
    const currentStepName = steps[step];

    // ✅ Validation: must upload at least 1 photo (max 4 controlled in UploadImages)
    if (currentStepName === "Upload Images") {
      if (!uploadedImages || uploadedImages.length === 0) {
        alert("Please upload at least one photo before continuing.");
        return;
      }
    }

    // ✅ Validation: verification step logic
    if (currentStepName === "Verification") {
      if (profileFor === "Myself") {
        if (!faceVerified) {
          alert("Please complete face verification before continuing.");
          return;
        }
      } else {
        if (!idVerified) {
          alert("Please complete ID verification before continuing.");
          return;
        }
      }
    }

    if (step < steps.length - 1) {
      setAnim("slideContentUp");
      setTimeout(() => {
        setStep((s) => s + 1);
        setAnim("slideContentInUp");
      }, 380);
    } else {
      // 🔚 last step navigation (Account now handles finish via onFinish)
      navigate("/app/home");
    }
  };

  const prev = () => {
    if (step > 0) {
      setAnim("slideContentDown");
      setTimeout(() => {
        setStep((s) => s - 1);
        setAnim("slideContentInDown");
      }, 380);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8EEDF] p-6 md:p-10">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <p className="text-xs font-semibold text-pink-600 tracking-wider">
          STEP {step + 1} OF {steps.length}
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {steps[step]}
        </h1>

        <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className={`max-w-4xl mx-auto ${anim}`}>
        {step === 0 && (
          <ProfileFor value={profileFor} onChange={setProfileFor} />
        )}
        {step === 1 && <Gender />} {/* NEW */}
        {step === 2 && <PhoneVerify />}
        {step === 3 && (
          <BasicDetails basic={basicInfo} setBasic={setBasicInfo} />
        )}
        {step === 4 && <HeightandWeight />}
        {step === 5 && <From onLocationChange={setLocationInfo} />}
        {step === 6 && (
          <UploadImages images={uploadedImages} setImages={setUploadedImages} />
        )}
        {step === 7 && (
          <Verification
            profileFor={profileFor}
            faceVerified={faceVerified}
            setFaceVerified={setFaceVerified}
            idVerified={idVerified}
            setIdVerified={setIdVerified}
          />
        )}
        {step === 8 && <MaritalStatus />}{/* ✅ NEW */}
        {step === 9 && <Hobbies />}
        {step === 10 && <Horoscope />}
        {step === 11 && <Religion />}
        {step === 12 && <Eating />}
        {step === 13 && (
          <Education onEducationChange={setEducationInfo} />
        )}
        {step === 14 && <Work onWorkChange={setWorkInfo} />}
        {step === 15 && <Family onFamilyChange={setFamilyInfo} />}
        {step === 16 && <SiblingDetails />}{/* ✅ NEW */}
        {step === 17 && (
          <PartnerDetails onPartnerChange={setPartnerInfo} />
        )}
        {step === 18 && <Review />}
        {step === 19 && (
          <Account
            profileData={{
              basic: basicInfo,
              location: locationInfo,
              education: educationInfo,
              work: workInfo,
              family: familyInfo,
              partner: partnerInfo,
            }}
            onFinish={() => {
              // ✅ After OTP + premium flow, go to dashboard
              navigate("/app/home");
            }}
          />
        )}
      </div>

      {/* BUTTONS – HIDE ON LAST STEP (Account handles its own flow) */}
      {step !== steps.length - 1 && (
        <div className="max-w-4xl mx-auto flex justify-between mt-10">
          <button
            onClick={prev}
            disabled={step === 0}
            className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 disabled:opacity-40"
          >
            ← Back
          </button>

          <button
            onClick={next}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:opacity-90"
          >
            {step === steps.length - 1
              ? "Finish & Go to Dashboard"
              : " Continue →"}
          </button>
        </div>
      )}

      {/* ANIMATION CSS */}
      <style>{`
        @keyframes slideContentInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideContentUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-40px); }
        }

        @keyframes slideContentInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideContentDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(40px); }
        }

        .slideContentInUp { animation: slideContentInUp .38s ease forwards; }
        .slideContentUp { animation: slideContentUp .38s ease forwards; }
        .slideContentInDown { animation: slideContentInDown .38s ease forwards; }
        .slideContentDown { animation: slideContentDown .38s ease forwards; }
      `}</style>
    </div>
  );
}

/* ==== STEP CARD COMPONENT ==== */
function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

/* ==== ALL STEPS ==== */

function ProfileFor({ value, onChange }) {
  const options = [
    "Myself",
    "Sister",
    "Brother",
    "Daughter",
    "Son",
    "Friend",
    "Others",
  ];
  const [selected, setSelected] = useState(value || "");

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  return (
    <div className="w-full">
      {/* QUESTION */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Who are you creating this profile for?
      </h2>
      <p className="text-xs text-gray-500 mb-3">
        Select one option from the list below.
      </p>

      {/* SIMPLE LIST STYLE (NO CARD / NO PILLS) */}
      <div className="mt-1 border border-gray-200 rounded-lg divide-y bg-white">
        {options.map((o) => {
          const active = selected === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => {
                setSelected(o);
                onChange && onChange(o);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors
                ${active ? "bg-pink-50" : "bg-white hover:bg-gray-50"}`}
            >
              <span className="text-gray-800">{o}</span>

              {/* custom radio indicator */}
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-full border 
                  ${
                    active
                      ? "border-pink-500 bg-pink-500"
                      : "border-gray-300 bg-white"
                  }`}
              >
                {active && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function Gender() {
  const [gender, setGender] = useState("");

  const options = [
    { value: "Male", label: "Male", hint: "Creating a groom profile" },
    { value: "Female", label: "Female", hint: "Creating a bride profile" },
  ];

  return (
    <div className="w-full">
      {/* TITLE */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Select Gender
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Choose the gender of the person this profile is for.
      </p>

      {/* CARD STYLE BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isActive = gender === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setGender(opt.value)}
              className={`text-left px-4 py-3 rounded-2xl border text-sm transition-all
                bg-white hover:bg-pink-50 hover:-translate-y-[1px] shadow-sm
                ${
                  isActive
                    ? "border-pink-500 ring-2 ring-pink-100"
                    : "border-gray-200"
                }`}
            >
              <div className="font-semibold text-gray-900">{opt.label}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {opt.hint}
              </div>
            </button>
          );
        })}
      </div>

      {gender && (
        <p className="text-xs text-gray-500 mt-3">
          Selected:{" "}
          <span className="font-medium text-pink-600">{gender}</span>
        </p>
      )}
    </div>
  );
}


function PhoneVerify() {
  return (
    <Section title="Phone Verification">
      {/* COUNTRY CODE + PHONE IN ONE ROW */}
      <div className="flex gap-3 mb-3">
        {/* COUNTRY CODE DROPDOWN */}
        <select
          className="w-32 p-2 border rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-pink-400 outline-none"
          defaultValue="+91"
        >
          {/* (Big list of codes unchanged) */}
          <option value="+1">+1 (United States)</option>
          <option value="+7">+7 (Russia)</option>
          <option value="+20">+20 (Egypt)</option>
          <option value="+27">+27 (South Africa)</option>
          <option value="+30">+30 (Greece)</option>
          <option value="+31">+31 (Netherlands)</option>
          <option value="+32">+32 (Belgium)</option>
          <option value="+33">+33 (France)</option>
          <option value="+34">+34 (Spain)</option>
          <option value="+36">+36 (Hungary)</option>
          <option value="+39">+39 (Italy)</option>
          <option value="+40">+40 (Romania)</option>
          <option value="+41">+41 (Switzerland)</option>
          <option value="+43">+43 (Austria)</option>
          <option value="+44">+44 (United Kingdom)</option>
          <option value="+45">+45 (Denmark)</option>
          <option value="+46">+46 (Sweden)</option>
          <option value="+47">+47 (Norway)</option>
          <option value="+48">+48 (Poland)</option>
          <option value="+49">+49 (Germany)</option>
          <option value="+51">+51 (Peru)</option>
          <option value="+52">+52 (Mexico)</option>
          <option value="+53">+53 (Cuba)</option>
          <option value="+54">+54 (Argentina)</option>
          <option value="+55">+55 (Brazil)</option>
          <option value="+56">+56 (Chile)</option>
          <option value="+57">+57 (Colombia)</option>
          <option value="+58">+58 (Venezuela)</option>
          <option value="+60">+60 (Malaysia)</option>
          <option value="+61">+61 (Australia)</option>
          <option value="+62">+62 (Indonesia)</option>
          <option value="+63">+63 (Philippines)</option>
          <option value="+64">+64 (New Zealand)</option>
          <option value="+65">+65 (Singapore)</option>
          <option value="+66">+66 (Thailand)</option>
          <option value="+81">+81 (Japan)</option>
          <option value="+82">+82 (South Korea)</option>
          <option value="+84">+84 (Vietnam)</option>
          <option value="+86">+86 (China)</option>
          <option value="+90">+90 (Turkey)</option>
          <option value="+91">+91 (India)</option>
          <option value="+92">+92 (Pakistan)</option>
          <option value="+93">+93 (Afghanistan)</option>
          <option value="+94">+94 (Sri Lanka)</option>
          <option value="+95">+95 (Myanmar)</option>
          <option value="+98">+98 (Iran)</option>
          <option value="+211">+211 (South Sudan)</option>
          <option value="+212">+212 (Morocco)</option>
          <option value="+213">+213 (Algeria)</option>
          <option value="+216">+216 (Tunisia)</option>
          <option value="+218">+218 (Libya)</option>
          <option value="+220">+220 (Gambia)</option>
          <option value="+221">+221 (Senegal)</option>
          <option value="+222">+222 (Mauritania)</option>
          <option value="+223">+223 (Mali)</option>
          <option value="+224">+224 (Guinea)</option>
          <option value="+225">+225 (Ivory Coast)</option>
          <option value="+226">+226 (Burkina Faso)</option>
          <option value="+227">+227 (Niger)</option>
          <option value="+228">+228 (Togo)</option>
          <option value="+229">+229 (Benin)</option>
          <option value="+230">+230 (Mauritius)</option>
          <option value="+231">+231 (Liberia)</option>
          <option value="+232">+232 (Sierra Leone)</option>
          <option value="+233">+233 (Ghana)</option>
          <option value="+234">+234 (Nigeria)</option>
          <option value="+235">+235 (Chad)</option>
          <option value="+236">+236 (Central African Rep.)</option>
          <option value="+237">+237 (Cameroon)</option>
          <option value="+238">+238 (Cape Verde)</option>
          <option value="+239">+239 (São Tomé and Príncipe)</option>
          <option value="+240">+240 (Equatorial Guinea)</option>
          <option value="+241">+241 (Gabon)</option>
          <option value="+242">+242 (Congo)</option>
          <option value="+243">+243 (DR Congo)</option>
          <option value="+244">+244 (Angola)</option>
          <option value="+248">+248 (Seychelles)</option>
          <option value="+249">+249 (Sudan)</option>
          <option value="+250">+250 (Rwanda)</option>
          <option value="+251">+251 (Ethiopia)</option>
          <option value="+252">+252 (Somalia)</option>
          <option value="+254">+254 (Kenya)</option>
          <option value="+255">+255 (Tanzania)</option>
          <option value="+256">+256 (Uganda)</option>
          <option value="+260">+260 (Zambia)</option>
          <option value="+263">+263 (Zimbabwe)</option>
          <option value="+268">+268 (Eswatini)</option>
          <option value="+297">+297 (Aruba)</option>
          <option value="+298">+298 (Faroe Islands)</option>
          <option value="+299">+299 (Greenland)</option>
          <option value="+350">+350 (Gibraltar)</option>
          <option value="+351">+351 (Portugal)</option>
          <option value="+352">+352 (Luxembourg)</option>
          <option value="+353">+353 (Ireland)</option>
          <option value="+354">+354 (Iceland)</option>
          <option value="+355">+355 (Albania)</option>
          <option value="+356">+356 (Malta)</option>
          <option value="+357">+357 (Cyprus)</option>
          <option value="+358">+358 (Finland)</option>
          <option value="+359">+359 (Bulgaria)</option>
          <option value="+370">+370 (Lithuania)</option>
          <option value="+371">+371 (Latvia)</option>
          <option value="+372">+372 (Estonia)</option>
          <option value="+380">+380 (Ukraine)</option>
          <option value="+381">+381 (Serbia)</option>
          <option value="+382">+382 (Montenegro)</option>
          <option value="+385">+385 (Croatia)</option>
          <option value="+386">+386 (Slovenia)</option>
          <option value="+387">+387 (Bosnia & Herzegovina)</option>
          <option value="+389">+389 (North Macedonia)</option>
          <option value="+420">+420 (Czech Republic)</option>
          <option value="+421">+421 (Slovakia)</option>
          <option value="+852">+852 (Hong Kong)</option>
          <option value="+853">+853 (Macau)</option>
          <option value="+855">+855 (Cambodia)</option>
          <option value="+856">+856 (Laos)</option>
          <option value="+880">+880 (Bangladesh)</option>
          <option value="+961">+961 (Lebanon)</option>
          <option value="+962">+962 (Jordan)</option>
          <option value="+963">+963 (Syria)</option>
          <option value="+964">+964 (Iraq)</option>
          <option value="+965">+965 (Kuwait)</option>
          <option value="+966">+966 (Saudi Arabia)</option>
          <option value="+967">+967 (Yemen)</option>
          <option value="+968">+968 (Oman)</option>
          <option value="+971">+971 (UAE)</option>
          <option value="+972">+972 (Israel)</option>
          <option value="+973">+973 (Bahrain)</option>
          <option value="+974">+974 (Qatar)</option>
          <option value="+975">+975 (Bhutan)</option>
          <option value="+976">+976 (Mongolia)</option>
          <option value="+977">+977 (Nepal)</option>
          <option value="+992">+992 (Tajikistan)</option>
          <option value="+993">+993 (Turkmenistan)</option>
          <option value="+994">+994 (Azerbaijan)</option>
          <option value="+995">+995 (Georgia)</option>
          <option value="+996">+996 (Kyrgyzstan)</option>
          <option value="+998">+998 (Uzbekistan)</option>
        </select>

        {/* PHONE NUMBER INPUT */}
        <input
          className="flex-1 p-2 border rounded-lg"
          placeholder="Phone Number"
          type="tel"
        />
      </div>

      {/* SEND OTP */}
      <button className="w-full py-2 bg-pink-500 text-white rounded-lg mb-3">
        Send OTP
      </button>

      {/* OTP INPUT */}
      <input
        className="w-full border rounded-lg p-2 text-center tracking-[0.3em]"
        placeholder="Enter OTP"
      />
    </Section>
  );
}

/* ==== UPDATED BASIC DETAILS: controlled + lifted to parent ==== */
function BasicDetails({ basic, setBasic }) {
  const handleChange = (field, value) => {
    if (!setBasic) return;
    setBasic((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const values = basic || {};

  return (
    <Section title="Basic Details">
      <div className="grid md:grid-cols-2 gap-4">
        {/* FIRST NAME */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            placeholder="Enter first name"
            value={values.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        {/* LAST NAME */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            placeholder="Enter last name"
            value={values.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* AGE */}
        <div>
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            placeholder="Age"
            value={values.age || ""}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* SKIN TONE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Skin Tone
          </label>
          <select
            className="mt-1 w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            value={values.skinTone || ""}
            onChange={(e) => handleChange("skinTone", e.target.value)}
          >
            <option value="" disabled>
              Select skin tone
            </option>
            <option value="Light">Light</option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Mid Brown">Mid Brown</option>
            <option value="Dark Brown">Dark Brown</option>
            <option value="Very Dark Brown">Very Dark Brown</option>
          </select>
        </div>
      </div>
    </Section>
  );
}

function HeightandWeight() {
  const MIN_HEIGHT = 124; // 4'1" = 124cm
  const MAX_HEIGHT = 220;

  const [minHeight, setMinHeight] = useState(124);
  const [maxHeight, setMaxHeight] = useState(161);

  const MIN_WEIGHT = 30;
  const MAX_WEIGHT = 150;

  const [minWeight, setMinWeight] = useState(30);
  const [maxWeight, setMaxWeight] = useState(70);

  const cmToFeet = (cm) => {
    const inches = cm * 0.393701;
    const ft = Math.floor(inches / 12);
    const inch = Math.round(inches % 12);
    return `${ft}'${inch}"`;
  };

  const getPercent = (value, min, max) => ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full mt-6">
      {/* ---------------- HEIGHT ---------------- */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">Select Height</h2>
      <p className="text-sm font-semibold text-gray-700 mb-6">
        from <span className="text-pink-600">{cmToFeet(minHeight)}</span> –{" "}
        {minHeight} cm to{" "}
        <span className="text-pink-600">{cmToFeet(maxHeight)}</span> –{" "}
        {maxHeight} cm
      </p>

      {/* HEIGHT SLIDER */}
      <div className="relative w-[60%] mx-auto h-6 select-none">
        <div className="absolute w-full h-[3px] bg-gray-300 rounded-full top-1/2 -translate-y-1/2"></div>

        <div
          className="absolute h-[3px] bg-pink-500 rounded-full top-1/2 -translate-y-1/2"
          style={{
            left: `${getPercent(minHeight, MIN_HEIGHT, MAX_HEIGHT)}%`,
            width: `${
              getPercent(maxHeight, MIN_HEIGHT, MAX_HEIGHT) -
              getPercent(minHeight, MIN_HEIGHT, MAX_HEIGHT)
            }%`,
          }}
        ></div>

        <div
          className="absolute w-[14px] h-[14px] bg-pink-500 rounded-full top-1/2 pointer-events-none"
          style={{
            left: `${getPercent(minHeight, MIN_HEIGHT, MAX_HEIGHT)}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        <div
          className="absolute w-[14px] h-[14px] bg-pink-500 rounded-full top-1/2 pointer-events-none"
          style={{
            left: `${getPercent(maxHeight, MIN_HEIGHT, MAX_HEIGHT)}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        <input
          type="range"
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          value={minHeight}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < maxHeight) setMinHeight(v);
          }}
          className="absolute w-full opacity-0 cursor-pointer"
        />

        <input
          type="range"
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          value={maxHeight}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > minHeight) setMaxHeight(v);
          }}
          className="absolute w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* ---------------- WEIGHT ---------------- */}
      <h2 className="text-lg font-bold text-gray-900 mt-12 mb-2">
        Select Weight
      </h2>
      <p className="text-sm font-semibold text-gray-700 mb-6">
        from <span className="text-pink-600">{minWeight} kg</span> to{" "}
        <span className="text-pink-600">{maxWeight} kg</span>
      </p>

      {/* WEIGHT SLIDER */}
      <div className="relative w-[60%] mx-auto h-6 select-none">
        <div className="absolute w-full h-[3px] bg-gray-300 rounded-full top-1/2 -translate-y-1/2"></div>

        <div
          className="absolute h-[3px] bg-pink-500 rounded-full top-1/2 -translate-y-1/2"
          style={{
            left: `${getPercent(minWeight, MIN_WEIGHT, MAX_WEIGHT)}%`,
            width: `${
              getPercent(maxWeight, MIN_WEIGHT, MAX_WEIGHT) -
              getPercent(minWeight, MIN_WEIGHT, MAX_WEIGHT)
            }%`,
          }}
        ></div>

        <div
          className="absolute w-[14px] h-[14px] bg-pink-500 rounded-full top-1/2 pointer-events-none"
          style={{
            left: `${getPercent(minWeight, MIN_WEIGHT, MAX_WEIGHT)}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        <div
          className="absolute w-[14px] h-[14px] bg-pink-500 rounded-full top-1/2 pointer-events-none"
          style={{
            left: `${getPercent(maxWeight, MIN_WEIGHT, MAX_WEIGHT)}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        <input
          type="range"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={minWeight}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < maxWeight) setMinWeight(v);
          }}
          className="absolute w-full opacity-0 cursor-pointer"
        />

        <input
          type="range"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={maxWeight}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > minWeight) setMaxWeight(v);
          }}
          className="absolute w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

/* ==== NEW FROM() USING country-state-city (searchable) ==== */

function From({ onLocationChange }) {
  const [countries, setCountries] = useState([]);

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityName, setCityName] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    const all = Country.getAllCountries();
    setCountries(all);
  }, []);

  useEffect(() => {
    if (!onLocationChange) return;

    const selectedCountry = countries.find((c) => c.isoCode === countryCode);
    const selectedState = states.find((s) => s.isoCode === stateCode);

    onLocationChange({
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      city: cityName || "",
    });
  }, [countryCode, stateCode, cityName, countries, states, onLocationChange]);

  const handleCountrySelect = (code) => {
    setCountryCode(code);
    setStateCode("");
    setCityName("");
    setSearchCountry("");

    const st = State.getStatesOfCountry(code) || [];
    setStates(st);
    setCities([]);
    setSearchState("");
    setSearchCity("");
  };

  const handleStateSelect = (code) => {
    setStateCode(code);
    setCityName("");
    setSearchState("");

    const ct = City.getCitiesOfState(countryCode, code) || [];
    setCities(ct);
    setSearchCity("");
  };

  const selectedCountryName =
    countries.find((c) => c.isoCode === countryCode)?.name || "";
  const selectedStateName =
    states.find((s) => s.isoCode === stateCode)?.name || "";

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        Where are you from?
      </h2>

      {/* COUNTRY */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Country</p>

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Search country..."
          value={selectedCountryName || searchCountry}
          onChange={(e) => {
            setCountryCode("");
            setStateCode("");
            setCityName("");
            setStates([]);
            setCities([]);
            setSearchCountry(e.target.value);
          }}
        />

        {!countryCode && (
          <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
            {countries
              .filter((c) =>
                c.name.toLowerCase().includes(searchCountry.toLowerCase())
              )
              .map((c) => (
                <div
                  key={c.isoCode}
                  onClick={() => handleCountrySelect(c.isoCode)}
                  className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {c.name}
                </div>
              ))}

            {countries.filter((c) =>
              c.name.toLowerCase().includes(searchCountry.toLowerCase())
            ).length === 0 && (
              <div className="p-3 text-gray-500 text-sm">
                No country found
              </div>
            )}
          </div>
        )}
      </div>

      {/* STATE */}
      {countryCode && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">State</p>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Search state..."
            value={selectedStateName || searchState}
            onChange={(e) => {
              setStateCode("");
              setCityName("");
              setCities([]);
              setSearchState(e.target.value);
            }}
          />

          {!stateCode && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
              {states
                .filter((st) =>
                  st.name.toLowerCase().includes(searchState.toLowerCase())
                )
                .map((st) => (
                  <div
                    key={st.isoCode}
                    onClick={() => handleStateSelect(st.isoCode)}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {st.name}
                  </div>
                ))}

              {states.length === 0 && (
                <div className="p-3 text-gray-500 text-sm">
                  No states found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* CITY */}
      {stateCode && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">City</p>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Search city..."
            value={cityName || searchCity}
            onChange={(e) => {
              setCityName("");
              setSearchCity(e.target.value);
            }}
          />

          {!cityName && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
              {cities
                .filter((ct) =>
                  ct.name.toLowerCase().includes(searchCity.toLowerCase())
                )
                .map((ct) => (
                  <div
                    key={ct.name}
                    onClick={() => {
                      setCityName(ct.name);
                      setSearchCity("");
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {ct.name}
                  </div>
                ))}

              {cities.length === 0 && (
                <div className="p-3 text-gray-500 text-sm">
                  No cities found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ==== UPDATED: UPLOAD 4 IMAGES WITH PREVIEW ==== */

function UploadImages({ images = [], setImages }) {
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // merge existing + new, but max 4
    const merged = [...images, ...files].slice(0, 4);
    setImages && setImages(merged);
  };

  const removeImage = (index) => {
    if (!setImages) return;
    const next = images.filter((_, i) => i !== index);
    setImages(next);
  };

  return (
    <Section title="Upload Photos">
      <p className="text-sm text-gray-600 mb-3">
        Upload clear recent photos. You can upload up to <b>4</b> images. At
        least <b>1 photo is required</b> to continue.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, index) => {
          const file = images[index];
          return (
            <div
              key={index}
              className="relative border-2 border-dashed rounded-xl flex items-center justify-center aspect-[3/4] overflow-hidden bg-gray-50"
            >
              {file ? (
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className="text-xs text-gray-400">No Photo</span>
              )}
            </div>
          );
        })}
      </div>

      <label className="inline-block px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-semibold cursor-pointer hover:bg-pink-600">
        Choose Photos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="hidden"
        />
      </label>

      <p className="text-xs text-gray-500 mt-2">
        Supported: JPG, JPEG, PNG. Face should be clearly visible.
      </p>
    </Section>
  );
}

/* ==== NEW: CONDITIONAL VERIFICATION STEP ==== */
/* - If profileFor === "Myself" → Face verification (camera)
   - Else → ID verification (ID number + image) */

function Verification({
  profileFor,
  faceVerified,
  setFaceVerified,
  idVerified,
  setIdVerified,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraError, setCameraError] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);

  const [idType, setIdType] = useState("National ID");
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [idMessage, setIdMessage] = useState("");

  // Start/stop camera when profileFor is "Myself"
  useEffect(() => {
    if (profileFor !== "Myself") {
      // stop camera if running
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      return;
    }

    setCameraError("");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access is not supported on this device.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(() => {
        setCameraError("Unable to access camera. Please allow camera access.");
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [profileFor]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
    setFaceVerified(true);
  };

  const handleIdFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdFile(file);
      setIdMessage("");
    }
  };

  const handleVerifyId = () => {
    if (!idNumber.trim() || !idFile) {
      setIdMessage("Please enter ID number and upload an ID image.");
      setIdVerified(false);
      return;
    }
    // here you can later call backend API to really verify
    setIdVerified(true);
    setIdMessage("ID details saved. We’ll verify and proceed.");
  };

  if (!profileFor) {
    return (
      <Section title="Verification">
        <p className="text-sm text-gray-700">
          Please go back and select who you are creating this profile for
          (Myself / Sister / Brother / etc.) in the <b>Profile For</b> step.
        </p>
      </Section>
    );
  }

  // SELF REGISTRATION → FACE VERIFICATION
  if (profileFor === "Myself") {
    return (
      <Section title="Face Verification">
        <p className="text-sm text-gray-700 mb-4">
          We need to verify that it&apos;s really you. Your camera will turn on
          automatically. Align your face inside the frame and click{" "}
          <b>Capture &amp; Verify</b>.
        </p>

        {cameraError && (
          <p className="text-sm text-red-600 mb-3">{cameraError}</p>
        )}

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="w-full bg-black/5 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
              />
            </div>
            <button
              type="button"
              onClick={handleCapture}
              className="mt-3 px-4 py-2 rounded-lg bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700"
            >
              Capture &amp; Verify
            </button>
          </div>

          <div className="w-full md:w-56">
            <p className="text-xs text-gray-600 mb-2">Captured Image</p>
            <div className="w-full border rounded-xl bg-gray-50 aspect-[3/4] flex items-center justify-center overflow-hidden">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">
                  Capture will appear here
                </span>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {faceVerified && (
          <p className="mt-4 text-sm text-green-700 font-semibold">
            ✅ Face verification completed. You can click <b>Continue</b> to
            move to the next step.
          </p>
        )}
      </Section>
    );
  }

  // OTHER REGISTRATION → ID VERIFICATION
  return (
    <Section title="ID Verification">
      <p className="text-sm text-gray-700 mb-4">
        Since you are creating this profile for{" "}
        <b>{profileFor.toLowerCase()}</b>, we need to verify a government ID or
        license number. Enter the ID details and upload a clear photo of the
        ID.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            ID Type
          </label>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="National ID">National ID</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="Other">Other Government ID</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            ID Number
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Enter ID / License number"
            value={idNumber}
            onChange={(e) => {
              setIdNumber(e.target.value);
              setIdMessage("");
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Upload ID Image
        </label>
        <label className="inline-block px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-semibold cursor-pointer hover:bg-pink-600">
          Choose ID Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleIdFile}
          />
        </label>

        {idFile && (
          <p className="text-xs text-gray-600 mt-2">
            Selected: <b>{idFile.name}</b>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleVerifyId}
        className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
      >
        Verify ID
      </button>

      {idMessage && (
        <p
          className={`mt-3 text-sm ${
            idVerified ? "text-green-700" : "text-red-600"
          }`}
        >
          {idMessage}
        </p>
      )}

      {idVerified && (
        <p className="mt-1 text-xs text-gray-600">
          After verification, click <b>Continue</b> to move to the next step.
        </p>
      )}
    </Section>
  );
}

function MaritalStatus() {
  const [status, setStatus] = useState("");
  const [divorceDate, setDivorceDate] = useState("");

  return (
    <Section title="Marital Status">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Select your marital status
      </p>

      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="maritalStatus"
            value="Single"
            checked={status === "Single"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Single
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="maritalStatus"
            value="Divorced"
            checked={status === "Divorced"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Divorced
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="maritalStatus"
            value="Widow"
            checked={status === "Widow"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Widow
        </label>
      </div>

      {/* Divorce date only if divorced */}
      {status === "Divorced" && (
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Divorce Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={divorceDate}
            onChange={(e) => setDivorceDate(e.target.value)}
          />
        </div>
      )}
    </Section>
  );
}

function Hobbies() {
  const categories = ["Music", "Reading", "Sports", "Fitness", "Movies", "Languages"];

  const musicList = [
    "S. P. Balasubrahmanyam",
    "Hariharan",
    "K. J. Yesudas",
    "Unnikrishnan",
    "Tippu",
    "Hariharasudhan",
    "Yuvan Shankar Raja",
    "Anirudh Ravichander",
    "G. V. Prakash Kumar",
    "Sid Sriram",
    "Sean Roldan",
    "Santhosh Narayanan",
    "Vijay Yesudas",
    "Shankar Mahadevan",
    "Haricharan",
    "Naresh Iyer",
    "Armaan Malik",
    "S. Janaki",
    "P. Susheela",
    "L. R. Eswari",
    "Chithra",
    "Shreya Ghoshal",
    "Chinmayi",
    "Bombay Jayashri",
    "Swetha Mohan",
    "Saindhavi",
    "Harini",
    "Andrea",
    "Dhee",
    "Jonita",
    "Shashaa Tirupati",
  ];

  const readingList = [
    "Comics",
    "Humor",
    "History",
    "Autobiographies",
    "Business / Professional",
    "Classics",
    "Fantasy",
    "Fiction",
    "Literature",
    "Love Reading Anything",
    "Magazines",
    "Philosophy",
    "Poetry",
    "Romance",
  ];

  const sportsList = [
    "Cricket",
    "Football",
    "Volleyball",
    "Kabaddi",
    "Athletics",
    "Tennis",
    "Badminton",
    "Hockey",
    "Basketball",
    "Swimming",
    "Cycling",
    "Throwball",
    "Chess",
    "Carrom",
    "Table Tennis",
    "Snooker",
    "Board Games",
    "E-Sports",
  ];

  const fitnessList = [
    "Yoga",
    "Running",
    "Gym / Weightlifting",
    "Aerobics",
    "Pilates",
    "Cycling",
    "Stretching",
    "Crossfit",
    "Martial Arts",
    "Zumba",
    "Walking",
  ];

  const movieList = [
    "Drama",
    "Comedy",
    "Romantic",
    "Horror",
    "Thriller",
    "Fantasy",
    "Documentaries",
    "Action",
    "Short Films",
    "Romantic Comedies",
    "Sci-Fi",
  ];

  const langList = [
    "English",
    "Tamil",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Portuguese",
    "Italian",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Bengali",
    "Punjabi",
    "Urdu",
  ];

  const [openCategory, setOpenCategory] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleChip = (val) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const getList = (cat) => {
    switch (cat) {
      case "Music":
        return musicList;
      case "Reading":
        return readingList;
      case "Sports":
        return sportsList;
      case "Fitness":
        return fitnessList;
      case "Movies":
        return movieList;
      case "Languages":
        return langList;
      default:
        return [];
    }
  };

  return (
    <Section title="Hobbies & Interests">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
            className={`px-4 py-1.5 rounded-full text-sm border 
              ${
                openCategory === cat
                  ? "bg-pink-600 text-white"
                  : "border-gray-300 text-gray-800 bg-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EXPANDED CATEGORY */}
      {openCategory && (
        <div className="mt-4 p-4 rounded-xl border bg-white shadow-sm animate-fadeIn">
          <h3 className="text-md font-semibold mb-3 text-gray-800">
            Select {openCategory}
          </h3>

          <div className="flex flex-wrap gap-2">
            {getList(openCategory).map((item) => (
              <button
                key={item}
                onClick={() => toggleChip(item)}
                className={`px-4 py-1.5 rounded-full text-xs border transition 
                  ${
                    selectedValues.includes(item)
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "border-gray-300 text-gray-700 bg-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform: translateY(10px); }
          to { opacity:1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn .25s ease-out; }
      `}</style>
    </Section>
  );
}

function Horoscope() {
  const raasiList = [
    "Mesha (Aries)",
    "Vrishabha (Taurus)",
    "Mithuna (Gemini)",
    "Kataka (Cancer)",
    "Simha (Leo)",
    "Kanya (Virgo)",
    "Tula (Libra)",
    "Vrischika (Scorpio)",
    "Dhanusu (Sagittarius)",
    "Makara (Capricorn)",
    "Kumbha (Aquarius)",
    "Meena (Pisces)",
  ];

  const nakshatraList = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati",
  ];

  return (
    <Section title="Horoscope Details">
      {/* Date */}
      <input className="w-full p-2 border rounded mb-3" type="date" />

      {/* Time */}
      <input className="w-full p-2 border rounded mb-3" type="time" />

      {/* Place */}
      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Place of Birth"
      />

      {/* Nakshatra Dropdown */}
      <select className="w-full p-2 border rounded mb-3 focus:ring-pink-500 focus:border-pink-500">
        <option value="">Select Nakshatra</option>
        <option value="Prefer Not to Say">Prefer Not to Say</option>

        {nakshatraList.map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>

      {/* Raasi Dropdown */}
      <select className="w-full p-2 border rounded focus:ring-pink-500 focus:border-pink-500">
        <option value="">Select Raasi</option>
        <option value="Prefer Not to Say">Prefer Not to Say</option>

        {raasiList.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </Section>
  );
}

function Religion() {
  const religions = [
    "Hindu",
    "Christian",
    "Muslim",
    "Buddhist",
    "Jain",
    "Sikh",
    "Zoroastrian",
    "Jewish",
    "Spiritual",
    "Agnostic",
    "Atheist",
    "Prefer Not to Say",
  ];

  const casteList = [
    "Brahmin",
    "Kshatriya",
    "Vaishya",
    "Shudra",
    "Reddy",
    "Gounder",
    "Nadar",
    "Naidu",
    "Vanniyar",
    "Mudaliyar",
    "Chettiar",
    "Yadava",
    "SC / ST",
    "Other",
    "Prefer Not to Say",
  ];

  const [religion, setReligion] = useState("");
  const [searchReligion, setSearchReligion] = useState("");

  const [caste, setCaste] = useState("");
  const [searchCaste, setSearchCaste] = useState("");

  return (
    <Section title="Religion Details">
      {/* RELIGION */}
      <p className="text-sm font-medium text-gray-700 mb-2">Religion</p>
      <input
        className="w-full border rounded-xl p-3"
        placeholder="Search religion..."
        value={religion || searchReligion}
        onChange={(e) => {
          setReligion("");
          setSearchReligion(e.target.value);
        }}
      />

      {!religion && (
        <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
          {religions
            .filter((r) =>
              r.toLowerCase().includes(searchReligion.toLowerCase())
            )
            .map((r) => (
              <div
                key={r}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => {
                  setReligion(r);
                  setSearchReligion("");
                }}
              >
                {r}
              </div>
            ))}
        </div>
      )}

      {/* CASTE */}
      <p className="text-sm font-medium text-gray-700 mt-6 mb-2">Caste</p>
      <input
        className="w-full border rounded-xl p-3"
        placeholder="Search caste..."
        value={caste || searchCaste}
        onChange={(e) => {
          setCaste("");
          setSearchCaste(e.target.value);
        }}
      />

      {!caste && (
        <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
          {casteList
            .filter((c) =>
              c.toLowerCase().includes(searchCaste.toLowerCase())
            )
            .map((c) => (
              <div
                key={c}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => {
                  setCaste(c);
                  setSearchCaste("");
                }}
              >
                {c}
              </div>
            ))}
        </div>
      )}

      {/* DOSHAM */}
      <input
        className="w-full p-3 border rounded-xl mb-3 mt-6"
        placeholder="Dosham"
      />

      {/* GOTHRA */}
      <input className="w-full p-3 border rounded-xl" placeholder="Gothra" />
    </Section>
  );
}

function Eating() {
  return (
    <div>
      <label className="block mb-2">
        <input type="radio" name="food" value="Non-Vegetarian" /> Non-Vegetarian
      </label>

      <label className="block mb-2">
        <input type="radio" name="food" value="Vegetarian" /> Vegetarian
      </label>

      <label className="block mb-2">
        <input type="radio" name="food" value="Eggetarian" /> Eggetarian
      </label>

      <label className="block mb-2">
        <input type="radio" name="food" value="Pescatarian" /> Pescatarian
      </label>

      <label className="block mb-2">
        <input type="radio" name="food" value="Vegan" /> Vegan
      </label>

      <label className="block mb-2">
        <input type="radio" name="food" value="Jain Food" /> Jain Food
      </label>
    </div>
  );
}

/* ==== UPDATED EDUCATION WITH COUNTRY -> UNIVERSITIES ==== */
function Education({ onEducationChange }) {
  const countryList = [
    "India",
    "Sri Lanka",
    "USA",
    "UK",
    "Australia",
    "Canada",
    "Germany",
    "France",
    "Japan",
    "China",
    "Singapore",
    "Malaysia",
    "New Zealand",
    "UAE",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Switzerland",
    "Ireland",
    "South Africa",
    "Brazil",
    "Mexico",
    "Russia",
    "Spain",
    "Portugal",
    "Bangladesh",
    "Pakistan",
    "Nepal",
  ];

  // 🔹 fallback universities if API fails (just some popular ones)
  const fallbackUniversitiesByCountry = {
    India: [
      "Indian Institute of Technology Madras",
      "Indian Institute of Technology Bombay",
      "Indian Institute of Technology Delhi",
      "Anna University",
      "University of Madras",
      "SRM Institute of Science and Technology",
      "Vellore Institute of Technology",
      "Loyola College",
      "Christ University",
      "Delhi University",
    ],
    "Sri Lanka": [
      "University of Colombo",
      "University of Peradeniya",
      "University of Moratuwa",
      "University of Sri Jayewardenepura",
      "University of Kelaniya",
      "Eastern University of Sri Lanka",
      "Rajarata University",
      "Sabaragamuwa University",
    ],
    USA: [
      "Harvard University",
      "Massachusetts Institute of Technology",
      "Stanford University",
      "University of California, Berkeley",
      "University of California, Los Angeles",
      "Carnegie Mellon University",
    ],
    UK: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London",
      "London School of Economics",
    ],
  };

  const [qualification, setQualification] = useState("");

  const [country, setCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  // 🔹 universities based on country
  const [universities, setUniversities] = useState([]); // ✅ no <string[]>
  const [university, setUniversity] = useState("");
  const [searchUniversity, setSearchUniversity] = useState("");
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [uniError, setUniError] = useState("");

  // 🔹 fetch universities whenever country changes
  useEffect(() => {
    if (!country) {
      setUniversities([]);
      setUniversity("");
      setSearchUniversity("");
      setUniError("");
      return;
    }

    setLoadingUniversities(true);
    setUniversities([]);
    setUniError("");

    axios
      .get(
        `https://universities.hipolabs.com/search?country=${encodeURIComponent(
          country
        )}`
      )
      .then((res) => {
        const names = Array.from(
          new Set((res.data || []).map((u) => u.name))
        ).sort();

        if (names.length > 0) {
          setUniversities(names); // ✅ API gives full list
        } else {
          // 🔸 API returned nothing → fallback list (if available)
          if (fallbackUniversitiesByCountry[country]) {
            setUniversities(fallbackUniversitiesByCountry[country]);
          } else {
            setUniversities([]);
          }
        }
      })
      .catch((err) => {
        console.log("University Fetch Error:", err);
        setUniError(
          "Unable to load universities from server. You can type manually."
        );
        // 🔸 use fallback if possible
        if (fallbackUniversitiesByCountry[country]) {
          setUniversities(fallbackUniversitiesByCountry[country]);
        } else {
          setUniversities([]);
        }
      })
      .finally(() => setLoadingUniversities(false));
  }, [country]);

  // 🔹 Sync to parent (RegisterPage) whenever qualification/university changes
  useEffect(() => {
    if (onEducationChange) {
      onEducationChange({
        qualification,
        institute: university || "",
      });
    }
  }, [qualification, university, onEducationChange]);

  return (
    <Section title="Education">
      {/* Qualification */}
      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Qualification (e.g., B.E, B.Sc, MBA)"
        value={qualification}
        onChange={(e) => setQualification(e.target.value)}
      />

      {/* COUNTRY */}
      <p className="text-sm font-medium text-gray-700 mb-2">Country</p>

      <input
        className="w-full border rounded-xl p-3"
        placeholder="Search country..."
        value={country || searchCountry}
        onChange={(e) => {
          setCountry("");
          setSearchCountry(e.target.value);
        }}
      />

      {/* COUNTRY DROPDOWN */}
      {!country && (
        <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
          {countryList
            .filter((c) =>
              c.toLowerCase().includes(searchCountry.toLowerCase())
            )
            .map((c) => (
              <div
                key={c}
                onClick={() => {
                  setCountry(c); // ✅ important: actual selection
                  setSearchCountry("");
                }}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {c}
              </div>
            ))}

          {countryList.filter((c) =>
            c.toLowerCase().includes(searchCountry.toLowerCase())
          ).length === 0 && (
            <div className="p-3 text-gray-500 text-sm">No match found</div>
          )}
        </div>
      )}

      {/* 🔹 WHERE STUDIED – UNIVERSITIES DROPDOWN */}
      {country && (
        <>
          <p className="text-sm font-medium text-gray-700 mt-6 mb-2">
            Where Studied (University / College)
          </p>

          <input
            className="w-full p-2 border rounded"
            placeholder={
              loadingUniversities
                ? "Loading universities..."
                : "Search university / college..."
            }
            value={university || searchUniversity}
            onChange={(e) => {
              setUniversity("");
              setSearchUniversity(e.target.value);
            }}
          />

          {/* UNIVERSITY DROPDOWN */}
          {!university && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
              {loadingUniversities && (
                <div className="p-3 text-gray-500 text-sm">
                  Loading universities...
                </div>
              )}

              {!loadingUniversities &&
                universities
                  .filter((u) =>
                    u.toLowerCase().includes(searchUniversity.toLowerCase())
                  )
                  .map((u) => (
                    <div
                      key={u}
                      onClick={() => {
                        setUniversity(u); // ✅ selection
                        setSearchUniversity("");
                      }}
                      className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                    >
                      {u}
                    </div>
                  ))}

              {!loadingUniversities &&
                universities.filter((u) =>
                  u.toLowerCase().includes(searchUniversity.toLowerCase())
                ).length === 0 && (
                  <div className="p-3 text-gray-500 text-sm">
                    {uniError
                      ? uniError
                      : "No universities found. You can type the institute name manually."}
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </Section>
  );
}

/* ==== UPDATED WORK: MONTHLY INCOME + CURRENCY + lift to parent ==== */
function Work({ onWorkChange }) {
  const occupationList = [
    "Software Engineer",
    "Teacher",
    "Professor",
    "Doctor",
    "Nurse",
    "Pharmacist",
    "Chartered Accountant",
    "Bank Employee",
    "Police Officer",
    "Lawyer / Advocate",
    "Business Owner",
    "Self Employed",
    "Farmer",
    "Govt. Clerk",
    "Govt. Officer",
    "Engineer (Civil)",
    "Engineer (Mechanical)",
    "Engineer (Electrical)",
    "Engineer (Electronics)",
    "IT Support / Technician",
    "Designer",
    "Architect",
    "Marketing",
    "Sales Executive",
    "HR Professional",
    "Call Center / BPO",
    "Driver",
    "Technician",
    "Student",
    "Not Working",
  ];

  const [occupation, setOccupation] = useState("");
  const [searchOccupation, setSearchOccupation] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  // 🔹 NEW: monthly income + currency
  const currencyOptions = [
    { code: "INR", label: "₹ Indian Rupee" },
    { code: "LKR", label: "Rs Sri Lankan Rupee" },
    { code: "USD", label: "$ US Dollar" },
    { code: "EUR", label: "€ Euro" },
    { code: "GBP", label: "£ British Pound" },
    { code: "AED", label: "د.إ UAE Dirham" },
    { code: "AUD", label: "A$ Australian Dollar" },
    { code: "CAD", label: "C$ Canadian Dollar" },
    { code: "SGD", label: "S$ Singapore Dollar" },
  ];
  const [incomeCurrency, setIncomeCurrency] = useState("INR");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [company, setCompany] = useState("");

  // 🔹 Sync to parent
  useEffect(() => {
    if (!onWorkChange) return;
    const incomeText = incomeAmount
      ? `${incomeCurrency} ${incomeAmount}`
      : "";
    onWorkChange({
      occupation,
      income: incomeText,
      company,
    });
  }, [occupation, incomeCurrency, incomeAmount, company, onWorkChange]);

  return (
    <Section title="Work Details">
      {/* OCCUPATION – SEARCHABLE DROPDOWN */}
      <p className="text-sm font-medium text-gray-700 mb-2">Occupation</p>

      <input
        className="w-full border rounded-xl p-3"
        placeholder="Search occupation..."
        value={occupation || searchOccupation}
        onChange={(e) => {
          setOccupation("");
          setSearchOccupation(e.target.value);
        }}
      />

      {!occupation && (
        <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow">
          {occupationList
            .filter((o) =>
              o.toLowerCase().includes(searchOccupation.toLowerCase())
            )
            .map((o) => (
              <div
                key={o}
                onClick={() => {
                  setOccupation(o);
                  setSearchOccupation("");
                }}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {o}
              </div>
            ))}

          {occupationList.filter((o) =>
            o.toLowerCase().includes(searchOccupation.toLowerCase())
          ).length === 0 && (
            <div className="p-3 text-gray-500 text-sm">No match found</div>
          )}
        </div>
      )}

      {/* 🔹 MONTHLY INCOME WITH CURRENCY */}
      <p className="text-sm font-medium text-gray-700 mb-2 mt-4">
        Monthly Income
      </p>
      <div className="flex gap-2 mb-3">
        <select
          className="w-40 p-2 border rounded bg-white text-sm"
          value={incomeCurrency}
          onChange={(e) => setIncomeCurrency(e.target.value)}
        >
          {currencyOptions.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
      </div>

      {/* EMPLOYMENT TYPE – DROPDOWN (Government / Private) */}
      <p className="text-sm font-medium text-gray-700 mb-2">
        Employment Type
      </p>
      <select
        className="w-full p-2 border rounded mb-3 bg-white"
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <option value="" disabled>
          Select employment type
        </option>
        <option value="Government">Government</option>
        <option value="Private">Private</option>
        <option value="Self Employed">Self Employed</option>
        <option value="Business">Business</option>
        <option value="Not Working">Not Working</option>
      </select>

      {/* COMPANY NAME */}
      <input
        className="w-full p-2 border rounded"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
    </Section>
  );
}

/* ==== UPDATED FAMILY: controlled + lift to parent ==== */
function Family({ onFamilyChange }) {
  // 👉 1. Family Type
  const familyTypes = ["Nuclear", "Joint", "Extended"];

  // 👉 2. Family Background / Status
  const familyStatusList = [
    "Middle Class",
    "Upper Middle Class",
    "Affluent / Rich",
    "Self-Made",
    "Prefer Not to Say",
  ];

  // 👉 3. Family Situation (Optional)
  const specialBackgroundList = [
    "Parents Alive",
    "Single Parent",
    "Orphan",
    "Raised by Guardians",
    "Living Alone",
  ];

  // 👉 4. Family Values
  const familyValuesList = ["Traditional", "Moderate", "Liberal"];

  // ---------- PARENT STATES ----------
  const [fatherName, setFatherName] = useState("");
  const [fatherOcc, setFatherOcc] = useState("");
  const [fatherIncome, setFatherIncome] = useState("");

  const [motherName, setMotherName] = useState("");
  const [motherOcc, setMotherOcc] = useState("");
  const [motherIncome, setMotherIncome] = useState("");

  // Single parent sub-option
  const [singleParentType, setSingleParentType] = useState("");

  // Guardian fields (for Orphan / Raised by Guardians)
  const [guardianName, setGuardianName] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("");
  const [guardianOcc, setGuardianOcc] = useState("");
  const [guardianIncome, setGuardianIncome] = useState("");
  const [raisedIn, setRaisedIn] = useState("");

  // Common fields
  const [familyType, setFamilyType] = useState("");
  const [familyValues, setFamilyValues] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [specialBackground, setSpecialBackground] = useState("");

  // ---------- SEND CLEAN DATA TO PARENT ----------
  useEffect(() => {
    const finalFamily = {
      familyType,
      familyValues,
      familyStatus,
      specialBackground,
    };

    // SPECIAL CASE HANDLING

    if (specialBackground === "Parents Alive") {
      finalFamily.father = {
        name: fatherName,
        occupation: fatherOcc,
        income: fatherIncome,
      };
      finalFamily.mother = {
        name: motherName,
        occupation: motherOcc,
        income: motherIncome,
      };
    }

    if (specialBackground === "Single Parent") {
      finalFamily.singleParent = singleParentType;

      if (singleParentType === "Father Only") {
        finalFamily.father = {
          name: fatherName,
          occupation: fatherOcc,
          income: fatherIncome,
        };
      }

      if (singleParentType === "Mother Only") {
        finalFamily.mother = {
          name: motherName,
          occupation: motherOcc,
          income: motherIncome,
        };
      }
    }

    if (specialBackground === "Orphan") {
      finalFamily.raisedIn = raisedIn;
      finalFamily.guardian = {
        name: guardianName,
        occupation: guardianOcc,
        income: guardianIncome,
      };
    }

    if (specialBackground === "Raised by Guardians") {
      finalFamily.guardian = {
        name: guardianName,
        relation: guardianRelation,
        occupation: guardianOcc,
        income: guardianIncome,
      };
    }

    if (specialBackground === "Living Alone") {
      // No parent or guardian fields needed
    }

    onFamilyChange(finalFamily);
  }, [
    fatherName,
    fatherOcc,
    fatherIncome,
    motherName,
    motherOcc,
    motherIncome,
    singleParentType,
    guardianName,
    guardianRelation,
    guardianOcc,
    guardianIncome,
    raisedIn,
    familyType,
    familyValues,
    familyStatus,
    specialBackground,
  ]);

  return (
    <Section title="Family Details">
      {/* 1. FAMILY TYPE */}
      <SelectField
        label="Family Type"
        value={familyType}
        onChange={setFamilyType}
        options={familyTypes}
      />

      {/* 2. FAMILY BACKGROUND / STATUS */}
      <SelectField
        label="Family Background / Status"
        value={familyStatus}
        onChange={setFamilyStatus}
        options={familyStatusList}
      />

      {/* 3. FAMILY SITUATION */}
      <SelectField
        label="Family Situation"
        value={specialBackground}
        onChange={(v) => {
          setSpecialBackground(v);
          setSingleParentType(""); // reset
        }}
        options={specialBackgroundList}
      />

      {/* CONDITIONAL SECTIONS */}

      {/* 🔷 Parents Alive */}
      {specialBackground === "Parents Alive" && (
        <>
          <ParentSection
            title="Father’s Details"
            name={fatherName}
            setName={setFatherName}
            occupation={fatherOcc}
            setOccupation={setFatherOcc}
            income={fatherIncome}
            setIncome={setFatherIncome}
          />

          <ParentSection
            title="Mother’s Details"
            name={motherName}
            setName={setMotherName}
            occupation={motherOcc}
            setOccupation={setMotherOcc}
            income={motherIncome}
            setIncome={setMotherIncome}
          />
        </>
      )}

      {/* 🔷 Single Parent Logic */}
      {specialBackground === "Single Parent" && (
        <>
          <SelectField
            label="Which Parent?"
            value={singleParentType}
            onChange={setSingleParentType}
            options={["Father Only", "Mother Only"]}
          />

          {singleParentType === "Father Only" && (
            <ParentSection
              title="Father’s Details"
              name={fatherName}
              setName={setFatherName}
              occupation={fatherOcc}
              setOccupation={setFatherOcc}
              income={fatherIncome}
              setIncome={setFatherIncome}
            />
          )}

          {singleParentType === "Mother Only" && (
            <ParentSection
              title="Mother’s Details"
              name={motherName}
              setName={setMotherName}
              occupation={motherOcc}
              setOccupation={setMotherOcc}
              income={motherIncome}
              setIncome={setMotherIncome}
            />
          )}
        </>
      )}

      {/* 🔷 Orphan */}
     {specialBackground === "Orphan" && (
  <>
    <SelectField
      label="Raised In"
      value={raisedIn}
      onChange={(v) => {
        setRaisedIn(v);

        // ⭐ If Not Applicable → clear guardian fields
        if (v === "Not Applicable") {
          setGuardianName("");
          setGuardianOcc("");
          setGuardianIncome("");
        }
      }}
      options={["Orphanage", "Relative’s Home", "Not Applicable"]}
    />

    {/* ⭐ SHOW ONLY IF NOT APPLICABLE */}
    {raisedIn !== "Not Applicable" && (
      <GuardianSection
        guardianName={guardianName}
        setGuardianName={setGuardianName}
        guardianRelation={""}
        setGuardianRelation={() => {}}
        guardianOcc={guardianOcc}
        setGuardianOcc={setGuardianOcc}
        guardianIncome={guardianIncome}
        setGuardianIncome={setGuardianIncome}
        showRelation={false}
      />
    )}
  </>
)}


      {/* 🔷 Raised by Guardians */}
      {specialBackground === "Raised by Guardians" && (
        <GuardianSection
          guardianName={guardianName}
          setGuardianName={setGuardianName}
          guardianRelation={guardianRelation}
          setGuardianRelation={setGuardianRelation}
          guardianOcc={guardianOcc}
          setGuardianOcc={setGuardianOcc}
          guardianIncome={guardianIncome}
          setGuardianIncome={setGuardianIncome}
          showRelation={true}
        />
      )}

      {/* 🔷 Living Alone */}
      {specialBackground === "Living Alone" && (
        <p className="text-xs text-gray-500">No additional details needed.</p>
      )}

      {/* 4. FAMILY VALUES */}
      <SelectField
        label="Family Values"
        value={familyValues}
        onChange={setFamilyValues}
        options={familyValuesList}
      />
    </Section>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        className="mt-1 w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-pink-400 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ParentSection({ title, name, setName, occupation, setOccupation, income, setIncome }) {
  return (
    <div className="mb-3 border rounded-lg p-3 bg-slate-50">
      <h3 className="font-medium text-slate-800 mb-2">{title}</h3>

      <input
        className="w-full mb-2 p-2 border rounded-lg"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-2 p-2 border rounded-lg"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Income (optional)"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
    </div>
  );
}

function GuardianSection({
  guardianName,
  setGuardianName,
  guardianRelation,
  setGuardianRelation,
  guardianOcc,
  setGuardianOcc,
  guardianIncome,
  setGuardianIncome,
  showRelation,
}) {
  return (
    <div className="mb-3 border rounded-lg p-3 bg-slate-50">
      <h3 className="font-medium text-slate-800 mb-2">Guardian Details</h3>

      <input
        className="w-full mb-2 p-2 border rounded-lg"
        placeholder="Guardian Name"
        value={guardianName}
        onChange={(e) => setGuardianName(e.target.value)}
      />

      {showRelation && (
        <input
          className="w-full mb-2 p-2 border rounded-lg"
          placeholder="Relationship (Uncle / Aunt / Grandparent / Other)"
          value={guardianRelation}
          onChange={(e) => setGuardianRelation(e.target.value)}
        />
      )}

      <input
        className="w-full mb-2 p-2 border rounded-lg"
        placeholder="Guardian Occupation"
        value={guardianOcc}
        onChange={(e) => setGuardianOcc(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Income (optional)"
        value={guardianIncome}
        onChange={(e) => setGuardianIncome(e.target.value)}
      />
    </div>
  );
}

/* ==== NEW: SIBLING DETAILS STEP ==== */

function SiblingDetails() {
  return (
    <Section title="Sibling Details">
      <p className="text-sm text-gray-700 mb-4">
        Please enter your siblings and their marital status.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* BROTHERS MARRIED */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Brothers (Married)
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="0"
          />
        </div>

        {/* BROTHERS UNMARRIED */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Brothers (Unmarried)
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="0"
          />
        </div>

        {/* SISTERS MARRIED */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Sisters (Married)
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="0"
          />
        </div>

        {/* SISTERS UNMARRIED */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Sisters (Unmarried)
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="0"
          />
        </div>
      </div>
    </Section>
  );
}

/* ==== UPDATED PARTNER DETAILS USING country-state-city ==== */

function PartnerDetails({ onPartnerChange }) {
  const [relation, setRelation] = useState("man-woman");
  const [minAge, setMinAge] = useState(52);
  const [maxAge, setMaxAge] = useState(55);

  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityName, setCityName] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const ageOptions = Array.from({ length: 63 }, (_, i) => 18 + i); // 18–80

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (!onPartnerChange) return;

    const countryName =
      countries.find((c) => c.isoCode === countryCode)?.name || "";
    const stateName =
      states.find((s) => s.isoCode === stateCode)?.name || "";

    const locParts = [countryName, stateName, cityName].filter(Boolean);

    onPartnerChange({
      minAge,
      maxAge,
      location: locParts.join(", "),
    });
  }, [minAge, maxAge, countryCode, stateCode, cityName, countries, states, onPartnerChange]);

  const selectedCountryName =
    countries.find((c) => c.isoCode === countryCode)?.name || "";
  const selectedStateName =
    states.find((s) => s.isoCode === stateCode)?.name || "";

  const handleCountrySelect = (code) => {
    setCountryCode(code);
    setStateCode("");
    setCityName("");
    setSearchCountry("");

    const st = State.getStatesOfCountry(code) || [];
    setStates(st);
    setCities([]);
    setSearchState("");
    setSearchCity("");
  };

  const handleStateSelect = (code) => {
    setStateCode(code);
    setCityName("");
    setSearchState("");

    const ct = City.getCitiesOfState(countryCode, code) || [];
    setCities(ct);
    setSearchCity("");
  };

  return (
    <div className="w-full flex justify-center mt-10 animate-slideIn">
      {/* Card */}
      <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-[32px] shadow-2xl px-7 py-7 relative overflow-hidden">
        {/* HEADER: HEART + BRAND */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center text-white text-xl">
            ❤
          </div>
          <span className="text-xl font-bold text-gray-800">Partner</span>
        </div>

        {/* (Relation dropdown optional – kept for future) */}
        <div className="mb-4 text-xs text-gray-600">
          <span>Looking for </span>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white ml-1"
          >
            <option value="man-woman">Woman for a Man</option>
            <option value="woman-man">Man for a Woman</option>
            <option value="any">Any</option>
          </select>
        </div>

        {/* AGE RANGE */}
        <div className="mb-4 text-sm text-gray-700">
          <div className="flex items-center justify-between gap-2">
            <span>Between ages</span>

            <select
              value={minAge}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= maxAge) setMinAge(v);
              }}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            >
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>

            <span>and</span>

            <select
              value={maxAge}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= minAge) setMaxAge(v);
              }}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            >
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LOCATION PREFERENCE – COUNTRY / STATE / CITY */}
        <div className="space-y-4 mb-5">
          {/* COUNTRY */}
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">
              Preferred Country
            </p>
            <input
              className="w-full border rounded-xl px-3 py-2.5 text-sm"
              placeholder="Search country..."
              value={selectedCountryName || searchCountry}
              onChange={(e) => {
                setCountryCode("");
                setStateCode("");
                setCityName("");
                setStates([]);
                setCities([]);
                setSearchCountry(e.target.value);
              }}
            />

            {!countryCode && (
              <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow text-sm">
                {countries
                  .filter((c) =>
                    c.name.toLowerCase().includes(searchCountry.toLowerCase())
                  )
                  .map((c) => (
                    <div
                      key={c.isoCode}
                      onClick={() => handleCountrySelect(c.isoCode)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {c.name}
                    </div>
                  ))}

                {countries.filter((c) =>
                  c.name.toLowerCase().includes(searchCountry.toLowerCase())
                ).length === 0 && (
                  <div className="px-3 py-2 text-gray-500">
                    No country found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STATE */}
          {countryCode && (
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">
                Preferred State
              </p>
              <input
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
                placeholder="Search state..."
                value={selectedStateName || searchState}
                onChange={(e) => {
                  setStateCode("");
                  setCityName("");
                  setCities([]);
                  setSearchState(e.target.value);
                }}
              />

              {!stateCode && (
                <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow text-sm">
                  {states
                    .filter((st) =>
                      st.name.toLowerCase().includes(searchState.toLowerCase())
                    )
                    .map((st) => (
                      <div
                        key={st.isoCode}
                        onClick={() => handleStateSelect(st.isoCode)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {st.name}
                      </div>
                    ))}

                  {states.length === 0 && (
                    <div className="px-3 py-2 text-gray-500">
                      No states found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CITY */}
          {stateCode && (
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">
                Preferred City
              </p>
              <input
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
                placeholder="Search city..."
                value={cityName || searchCity}
                onChange={(e) => {
                  setCityName("");
                  setSearchCity(e.target.value);
                }}
              />

              {!cityName && (
                <div className="max-h-40 overflow-y-auto mt-2 border rounded-xl bg-white shadow text-sm">
                  {cities
                    .filter((ct) =>
                      ct.name.toLowerCase().includes(searchCity.toLowerCase())
                    )
                    .map((ct) => (
                      <div
                        key={ct.name}
                        onClick={() => {
                          setCityName(ct.name);
                          setSearchCity("");
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {ct.name}
                      </div>
                    ))}

                  {cities.length === 0 && (
                    <div className="px-3 py-2 text-gray-500">
                      No cities found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gray-200 mb-5" />
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn .4s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ==== REVIEW: OURTIME-STYLE BAR (NO EMAIL TEXT) ==== */

function Review() {
  return (
    <div className="bg-[#F8EEDF] -mx-6 md:-mx-10 px-6 md:px-10 py-10 border-t border-b border-[#e2d3bf]">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-sm text-gray-700 leading-relaxed bg-white/70 rounded-lg p-4 border border-[#e0d2be]"
          contentEditable
          suppressContentEditableWarning={true}
        >
          Personal info, location, education, work, family, siblings and partner
          preferences – everything you’ve shared in this registration can be
          summarized here. You can type and edit this paragraph as you like.
        </p>
      </div>
    </div>
  );
}

/* ==== ACCOUNT CREATION: EMAIL → PASSWORD → OTP → PREMIUM ==== */

function Account({ onFinish, profileData }) {
  const [stage, setStage] = useState("email"); // "email" | "password" | "otp" | "premium"

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("free"); // "free" | "gold" | "diamond"

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Minimum 8 characters required";
    if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Add at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Add at least one number";
    return "";
  };

  const handleEmailContinue = () => {
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;
    setStage("password");
  };

  const sendOtp = () => {
    setIsSendingOtp(true);
    setOtpError("");
    // 🔐 In real app call backend here. For now generate demo OTP.
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtp("");
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      // (Optional) you can remove this alert later.
      alert(`Demo OTP for ${email}: ${code}`);
    }, 600);
  };

  const handlePasswordContinue = () => {
    const err = validatePassword(password);
    setPasswordError(err);
    if (err) return;

    // After password is valid, go to OTP screen and send OTP
    setStage("otp");
    sendOtp();
  };

  const handleVerifyOtp = () => {
    setIsVerifyingOtp(true);
    setOtpError("");

    setTimeout(() => {
      if (!otp.trim()) {
        setOtpError("Please enter the OTP.");
        setIsVerifyingOtp(false);
        return;
      }
      if (otp !== generatedOtp) {
        setOtpError("Incorrect OTP. Please try again.");
        setIsVerifyingOtp(false);
        return;
      }
      // OTP correct
      setIsVerifyingOtp(false);
      setStage("premium");
    }, 500);
  };

  const handleFinishPlan = (plan) => {
    setSelectedPlan(plan);

    // ✅ SAVE PROFILE TO LOCALSTORAGE SO PROFILE PAGE CAN READ IT
    if (profileData) {
      try {
        const merged = {
          ...profileData,
          // you could also include email/plan later:
          account: {
            email,
            plan,
          },
        };
        localStorage.setItem("matrimony_profile", JSON.stringify(merged));
      } catch (e) {
        console.error("Error saving profile to localStorage", e);
      }
    }

    // TODO: send plan + email + password to backend
    if (typeof onFinish === "function") {
      onFinish();
    }
  };

  /* 1️⃣ EMAIL SCREEN */
  if (stage === "email") {
    return (
      <div className="bg-[#F8EEDF] -mx-6 md:-mx-10 px-6 md:px-10 py-10 border-t border-b border-[#e2d3bf]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#24253A] mb-10">
            Almost done. What&apos;s your email?
          </h2>

          <div className="mb-4">
            <p className="text-[11px] tracking-[0.26em] text-gray-500 uppercase mb-3">
              Email
            </p>

            {/* underline input */}
            <div className="border-b border-gray-300 pb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder=""
                className="w-full bg-transparent outline-none text-base text-[#24253A] placeholder:text-gray-400"
              />
            </div>

            {emailError && (
              <p className="text-xs text-red-600 mt-2">{emailError}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleEmailContinue}
            className="px-6 py-2.5 rounded-full bg-[#e85b65] hover:bg-[#d94c57] text-white text-sm font-semibold tracking-wide shadow-md transition"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  /* 2️⃣ PASSWORD SCREEN */
  if (stage === "password") {
    return (
      <div className="bg-[#F8EEDF] -mx-6 md:-mx-10 px-6 md:px-10 py-10 border-t border-b border-[#e2d3bf]">
        <div className="max-w-3xl mx-auto">
          {/* Brand row */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center text-white text-xl">
              ❤
            </div>
            <span className="text-lg font-semibold text-[#24253A]">
              Ourtime
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#24253A] mb-8">
            Now let&apos;s get you set up with a password.
          </h2>

          {/* Password input with underline + Show */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 border-b border-gray-300 pb-2">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full bg-transparent outline-none text-base text-[#24253A] placeholder:text-gray-400"
                placeholder=""
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <div className="border-b border-gray-300 mb-4" />

          {passwordError && (
            <p className="text-xs text-red-600 mb-3">{passwordError}</p>
          )}

          <p className="text-sm text-gray-700 mb-3">
            To make your account more secure, your password must contain:
          </p>

          <ul className="space-y-1 text-sm text-[#1b6d2b]">
            <li className="flex gap-2">
              <span>✓</span>
              <span>At least one upper case letter</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>At least one lower case letter</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>At least one number</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>At least 8 characters</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={handlePasswordContinue}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#e85b65] hover:bg-[#d94c57] text-white text-sm font-semibold tracking-wide shadow-md transition"
          >
            Continue &amp; Send OTP
          </button>
        </div>
      </div>
    );
  }

  /* 3️⃣ OTP SCREEN */
  if (stage === "otp") {
    return (
      <div className="bg-[#F8EEDF] -mx-6 md:-mx-10 px-6 md:px-10 py-10 border-t border-b border-[#e2d3bf]">
        <div className="max-w-md mx-auto bg-white/80 rounded-2xl shadow-lg p-6 border border-[#e0d2be]">
          <h2 className="text-xl font-bold text-[#24253A] mb-2">
            Verify your email
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="font-semibold">{email}</span>. Enter it below to
            confirm your email.
          </p>

          <label className="text-xs font-semibold text-gray-600 uppercase tracking-[0.18em] mb-2 block">
            OTP Code
          </label>
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              setOtpError("");
            }}
            className="w-full border-b border-gray-400 bg-transparent outline-none text-center text-lg tracking-[0.6em] pb-2"
            placeholder="••••••"
          />

          {otpError && (
            <p className="text-xs text-red-600 mt-2">{otpError}</p>
          )}

          {otpSent && (
            <p className="text-[11px] text-gray-500 mt-2">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                disabled={isSendingOtp}
                onClick={sendOtp}
                className="text-pink-600 font-semibold disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          )}

          {/* DEV ONLY: Show OTP for testing – remove in production */}
          {generatedOtp && (
            <p className="text-[11px] text-gray-400 mt-1">
              (Dev note: OTP = <b>{generatedOtp}</b>)
            </p>
          )}

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={isVerifyingOtp}
            className="mt-6 w-full py-2.5 rounded-full bg-[#e85b65] hover:bg-[#d94c57] text-white text-sm font-semibold tracking-wide shadow-md transition disabled:opacity-60"
          >
            {isVerifyingOtp ? "Verifying..." : "Verify & Continue"}
          </button>
        </div>
      </div>
    );
  }

  /* 4️⃣ PREMIUM SCREEN */
  if (stage === "premium") {
    const plans = [
      {
        id: "free",
        name: "Free Member",
        price: "₹0",
        description: "Browse profiles & send limited interests.",
        highlight: "Start with free plan and upgrade later.",
      },
      {
        id: "gold",
        name: "Gold",
        price: "₹999 / 3 months",
        description: "Unlimited chat, see who viewed you.",
        highlight: "Most popular for serious matches.",
      },
      {
        id: "diamond",
        name: "Diamond",
        price: "₹1999 / 6 months",
        description: "All Gold features + top placement.",
        highlight: "Best for maximum visibility.",
      },
    ];

    return (
      <div className="bg-[#F8EEDF] -mx-6 md:-mx-10 px-6 md:px-10 py-10 border-t border-b border-[#e2d3bf]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center text-white text-xl">
              ❤
            </div>
            <span className="text-lg font-semibold text-[#24253A]">
              Choose your plan
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#24253A] mb-6">
            Upgrade to premium or continue for free.
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`text-left rounded-2xl border p-4 shadow-sm bg-white transition transform hover:-translate-y-1 hover:shadow-md ${
                  selectedPlan === plan.id
                    ? "border-pink-500 ring-2 ring-pink-200"
                    : "border-[#e0d2be]"
                }`}
              >
                <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide mb-1">
                  {plan.name}
                </p>
                <p className="text-lg font-bold text-[#24253A] mb-1">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  {plan.description}
                </p>
                <p className="text-[11px] text-gray-500">{plan.highlight}</p>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={() => handleFinishPlan(selectedPlan)}
              className="px-6 py-2.5 rounded-full bg-[#e85b65] hover:bg-[#d94c57] text-white text-sm font-semibold tracking-wide shadow-md transition"
            >
              {selectedPlan === "free"
                ? "Continue with Free Plan"
                : "Upgrade & Go to Dashboard"}
            </button>

            <button
              type="button"
              onClick={() => handleFinishPlan("free")}
              className="text-sm font-semibold text-gray-700 underline underline-offset-4"
            >
              Maybe later – go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
