import { ChangeEvent, FormEvent, useState } from "react";
import SectionWrapper from "../../wpappers/SectionWrapper";
import { TUserInfo } from "../../types/Types";
import Button from "../../utilities/Button";
import { Fieldset } from "../../css/UnityDataBase.styled";

export default function SendForm() {
  const [formIsSended, setFormIsSended] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    team: "",
    position: "",
    hand: "",
    telephone: "",
    birthday: "",
    height: 0,
    weight: 0,
    number: 0,
    reach: 0,
    photo: "",
  });

  function handleUserChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleUserTeamCancel() {
    setUserInfo({ ...userInfo, team: "" });
  }

  function handleFillCoachFields() {
    setUserInfo({
      ...userInfo,
      hand: "none",
      height: "none",
      weight: "none",
      number: "none",
      reach: "none",
    });
  }
  function handleBackNonCoachesFields() {
    if (userInfo.position !== "coach") {
      setUserInfo({ ...userInfo, hand: "", height: 0, weight: 0, number: 0, reach: 0 });
    }
  }

  const submitUserInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormIsSended(!formIsSended);
  };

  const checkLength = (text: string) => {
    return text.toString().length <= 1;
  };
  const checkUserEmail = (email: string) => {
    const doubleDots = email.match(/[.]{2,}/g);
    const startWithDot = email.match(/^[.]/);
    const nameAbuse = email.match(/^abuse[@]/);
    const namePostmaster = email.match(/^postmaster[@]/);
    const correctLength = email.match(/^.{1,30}[@]\w{2,9}[.]\w{2,9}$/);
    const specialSymbols = email.match(/[&=+<>,_'-\s]/g);
    if (doubleDots) return true;
    else if (startWithDot) return true;
    else if (nameAbuse) return true;
    else if (namePostmaster) return true;
    else if (!correctLength) return true;
    else if (specialSymbols) return true;
    else return false;
  };
  const checkPhotoFormat = (photo: string) => {
    const jpg = photo.toLowerCase().match(/jpg/g);
    const png = photo.toLowerCase().match(/png/g);
    if (jpg || png) return false;
    else return true;
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputNumber = e.target.value.replace(/\D/g, "");
    inputNumber = inputNumber.substring(0, 10);
    if (inputNumber.length > 3) {
      inputNumber = inputNumber.substring(0, 3) + "-" + inputNumber.substring(3);
    }
    if (inputNumber.length > 7) {
      inputNumber = inputNumber.substring(0, 7) + "-" + inputNumber.substring(7);
    }
    setUserInfo({ ...userInfo, [e.target.name]: inputNumber });
  };
  const styledComponentValidator = (boolean: boolean): string => {
    return boolean.toString();
  };
  const isEmptyFields = Object.values(userInfo).some((field) => checkLength(field as string));
  const properPhoneLength = userInfo.telephone.length !== 12;

  const disabledButton =
    checkUserEmail(userInfo.email) ||
    isEmptyFields ||
    properPhoneLength ||
    checkPhotoFormat(userInfo.photo);
  return (
    <SectionWrapper
      content={
        <div className="block-content">
          <div className="form-wrapper">
            <div className="title-form-wrapper">
              <h2>Unity Member Form</h2>
            </div>
            <form action="" onSubmit={submitUserInfo}>
              {formIsSended ? (
                <>
                  <div className="field-list">
                    {/* Name  */}
                    <Fieldset valid={styledComponentValidator(checkLength(userInfo.firstName))}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>First Name</strong>
                          </span>
                          {checkLength(userInfo.firstName) && (
                            <span style={{ opacity: 0.5 }}> (required)</span>
                          )}
                        </div>
                      </legend>
                      <input
                        type="text"
                        onChange={handleUserChange}
                        value={userInfo.firstName.replace(/[^a-zA-Zа-яА-Я]/g, "")}
                        name="firstName"
                        required
                      />
                    </Fieldset>
                    {/* Surname */}
                    <Fieldset valid={styledComponentValidator(checkLength(userInfo.lastName))}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Last Name</strong>
                          </span>
                          {checkLength(userInfo.lastName) && (
                            <span style={{ opacity: 0.5 }}> (required)</span>
                          )}
                        </div>
                      </legend>
                      <input
                        type="text"
                        onChange={handleUserChange}
                        value={userInfo.lastName.replace(/[^a-zA-Zа-яА-Я]/g, "")}
                        name="lastName"
                        required
                      />
                    </Fieldset>
                    {/* Email */}
                    <Fieldset valid={styledComponentValidator(checkUserEmail(userInfo.email))}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Email</strong>
                          </span>
                          {!userInfo.email && <span style={{ opacity: 0.5 }}> (required)</span>}
                          {checkUserEmail(userInfo.email) && userInfo.email && (
                            <span style={{ opacity: 0.5 }}>(invalid Email)</span>
                          )}
                        </div>
                      </legend>
                      <input
                        type="email"
                        onChange={handleUserChange}
                        value={userInfo.email}
                        name="email"
                        required
                      />
                    </Fieldset>
                    {/* Telephone */}
                    <Fieldset valid={styledComponentValidator(properPhoneLength)}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Telephone</strong>
                          </span>
                          {properPhoneLength && <span style={{ opacity: 0.5 }}> (required)</span>}
                        </div>
                      </legend>
                      <input
                        type="tel"
                        onChange={handlePhoneChange}
                        value={userInfo.telephone}
                        name="telephone"
                        required
                      />
                    </Fieldset>
                    {/* Birthday */}
                    <Fieldset valid={styledComponentValidator(!userInfo.birthday)}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Date of Birth</strong>
                          </span>
                          {!userInfo.birthday && <span style={{ opacity: 0.5 }}> (required)</span>}
                        </div>
                      </legend>
                      <input
                        type="date"
                        onChange={handleUserChange}
                        value={userInfo.birthday}
                        name="birthday"
                        style={{ textAlign: "center" }}
                        required
                      />
                    </Fieldset>
                    {/* Gender*/}
                    <Fieldset valid={styledComponentValidator(!userInfo.gender)}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Your gender</strong>
                          </span>
                          {!userInfo.gender && <span style={{ opacity: 0.5 }}> (required)</span>}
                        </div>
                      </legend>
                      <select onChange={handleUserChange} name="gender">
                        <option value="" onClick={handleUserTeamCancel}>
                          Choose your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </Fieldset>
                    {/* Belongs to team */}
                    {userInfo.gender && (
                      <Fieldset valid={styledComponentValidator(!userInfo.team)}>
                        <legend>
                          <div className="forspan">
                            <span>
                              <strong>Team</strong>
                            </span>
                            {!userInfo.team && <span style={{ opacity: 0.5 }}> (required)</span>}
                          </div>
                        </legend>
                        <select onChange={handleUserChange} name="team">
                          <option value="">Choose your team</option>
                          <option value="u-13">U-13</option>
                          <option value="u-14">U-14</option>
                          <option value="u-15">U-15</option>
                          <option value="u-16">U-16</option>
                          <option value="u-17">U-17</option>
                          <option value="u-18">U-18</option>
                        </select>
                      </Fieldset>
                    )}
                    {/* Position */}
                    <Fieldset valid={styledComponentValidator(!userInfo.position)}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Position</strong>
                          </span>
                          {!userInfo.position && <span style={{ opacity: 0.5 }}> (required)</span>}
                        </div>
                      </legend>
                      <select onChange={handleUserChange} name="position">
                        <option value="" onClick={handleBackNonCoachesFields}>
                          Choose position
                        </option>
                        <option value="outsideHitter" onClick={handleBackNonCoachesFields}>
                          Outside Hitter
                        </option>
                        <option value="opposite" onClick={handleBackNonCoachesFields}>
                          Opposite
                        </option>
                        <option value="setter" onClick={handleBackNonCoachesFields}>
                          Setter
                        </option>
                        <option value="libero" onClick={handleBackNonCoachesFields}>
                          Libero
                        </option>
                        <option value="middleBlocker" onClick={handleBackNonCoachesFields}>
                          Middle Blocker
                        </option>
                        <option value="coach" onClick={handleFillCoachFields}>
                          Coach
                        </option>
                      </select>
                    </Fieldset>
                    {!(userInfo.position === "coach" || userInfo.position === "") && (
                      <>
                        {/* Hand */}
                        <Fieldset valid={styledComponentValidator(!userInfo.hand)}>
                          <legend>
                            <div className="forspan">
                              <span>
                                <strong>Dominant Hand</strong>
                              </span>
                              {!userInfo.hand && <span style={{ opacity: 0.5 }}> (required)</span>}
                            </div>
                          </legend>
                          <select onChange={handleUserChange} name="hand">
                            <option value="">Choose hand</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="ambidextrous">Ambidextrous</option>
                          </select>
                        </Fieldset>
                        {/* Height */}
                        <Fieldset valid={styledComponentValidator(!userInfo.height)}>
                          <legend>
                            <div className="forspan">
                              <span>
                                <strong>Height</strong>
                              </span>
                              {!userInfo.height && (
                                <span style={{ opacity: 0.5 }}> (required)</span>
                              )}
                            </div>
                          </legend>
                          <div className="measure-wrapper">
                            <div>
                              {userInfo.height} cm ;{" "}
                              {Math.round(+userInfo.height / 2.54 / 1.2) / 10} Foots
                            </div>
                            <input
                              type="range"
                              onChange={handleUserChange}
                              value={userInfo.height}
                              name="height"
                              min={150}
                              max={220}
                            />
                          </div>
                        </Fieldset>
                        {/* Weight */}
                        <Fieldset valid={styledComponentValidator(!userInfo.weight)}>
                          <legend>
                            <div className="forspan">
                              <span>
                                <strong>Weight</strong>
                              </span>
                              {!userInfo.weight && (
                                <span style={{ opacity: 0.5 }}> (required)</span>
                              )}
                            </div>
                          </legend>
                          <div className="measure-wrapper">
                            <div>{userInfo.weight} kg</div>
                            <input
                              type="range"
                              onChange={handleUserChange}
                              value={userInfo.weight}
                              name="weight"
                              min={40}
                              max={120}
                            />
                          </div>
                        </Fieldset>
                        {/* Number */}
                        <Fieldset valid={styledComponentValidator(!userInfo.number)}>
                          <legend>
                            <div className="forspan">
                              <span>
                                <strong>Jersey number</strong>
                              </span>
                              {!userInfo.number && (
                                <span style={{ opacity: 0.5 }}> (required)</span>
                              )}
                            </div>
                          </legend>
                          <div className="measure-wrapper">
                            <div># {userInfo.number}</div>
                            <input
                              type="range"
                              onChange={handleUserChange}
                              value={userInfo.number}
                              name="number"
                              min={1}
                              max={99}
                            />
                          </div>
                        </Fieldset>
                        {/* Reach Height */}
                        <Fieldset valid={styledComponentValidator(!userInfo.reach)}>
                          <legend>
                            <div className="forspan">
                              <span>
                                <strong>Reach height</strong>
                              </span>
                              {!userInfo.reach && <span style={{ opacity: 0.5 }}> (required)</span>}
                            </div>
                          </legend>
                          <div className="measure-wrapper">
                            <div>
                              {userInfo.reach} cm ; {Math.round(+userInfo.reach / 2.54 / 1.2) / 10}{" "}
                              Foots
                            </div>
                            <input
                              type="range"
                              onChange={handleUserChange}
                              value={userInfo.reach}
                              name="reach"
                              min={280}
                              max={380}
                            />
                          </div>
                        </Fieldset>
                      </>
                    )}
                    {/* Photo */}
                    <Fieldset valid={styledComponentValidator(checkPhotoFormat(userInfo.photo))}>
                      <legend>
                        <div className="forspan">
                          <span>
                            <strong>Photo</strong>
                          </span>
                          {!userInfo.photo && <span style={{ opacity: 0.5 }}> (required)</span>}
                          {checkPhotoFormat(userInfo.photo) && userInfo.photo && (
                            <span style={{ opacity: 0.5 }}>(File resolution is invalid)</span>
                          )}
                        </div>
                      </legend>
                      <input
                        type="file"
                        onChange={handleUserChange}
                        value={userInfo.photo}
                        name="photo"
                        required
                      />
                    </Fieldset>
                  </div>
                  <div className="form-button-wrapper">
                    <Button text="Submit" type="submit" disabled={disabledButton} />
                  </div>
                </>
              ) : (
                <div className="form-sended-wrapper">Thank you</div>
              )}
            </form>
          </div>
        </div>
      }
    />
  );
}
