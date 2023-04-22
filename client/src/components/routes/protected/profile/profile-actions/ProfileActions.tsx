import { useNavigate } from "react-router-dom"

import ProfileButton from "./ProfileButton"
import ProfileRouterLink from "./ProfileRouterLink"
import useAuthContext from "../../../../../lib/hooks/context-hooks/useAuthContext"
import AdminButton from "./AdminButton"

type Props = {
  logout: () => void
}

const ProfileActions = ({ logout }: Props) => {
  const navigate = useNavigate()
  const { auth } = useAuthContext()

  const logoutHandler = () => {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <div className="hidden md:flex flex-col justify-between rounded-md tracking-normal h-full max-h-fit">
      <div>
        <ProfileRouterLink to="/profile">
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z"></path>
            </g>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Profile</h1>
            <p className="text-gray-500">See your details</p>
          </div>
        </ProfileRouterLink>
        <ProfileRouterLink to="/profile/deposit">
          <svg
            className="mr-3"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="2.6em"
            width="2.6em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.41 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Deposit</h1>
            <p className="text-gray-500">Top up your balance</p>
          </div>
        </ProfileRouterLink>
        <ProfileRouterLink to="/profile/withdraw">
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 496 512"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M378.1 45C337.6 19.9 292.6 8 248.2 8 165 8 83.8 49.9 36.9 125.9c-71.9 116.6-35.6 269.3 81 341.2s269.3 35.6 341.2-80.9c71.9-116.6 35.6-269.4-81-341.2zm51.8 323.2c-40.4 65.5-110.4 101.5-182 101.5-6.8 0-13.6-.4-20.4-1-9-13.6-19.9-33.3-23.7-42.4-5.7-13.7-27.2-45.6 31.2-67.1 51.7-19.1 176.7-16.5 208.8-17.6-4 9-8.6 17.9-13.9 26.6zm-200.8-86.3c-55.5-1.4-81.7-20.8-58.5-48.2s51.1-40.7 68.9-51.2c17.9-10.5 27.3-33.7-23.6-29.7C87.3 161.5 48.6 252.1 37.6 293c-8.8-49.7-.1-102.7 28.5-149.1C128 43.4 259.6 12.2 360.1 74.1c74.8 46.1 111.2 130.9 99.3 212.7-24.9-.5-179.3-3.6-230.3-4.9zm183.8-54.8c-22.7-6-57 11.3-86.7 27.2-29.7 15.8-31.1 8.2-31.1 8.2s40.2-28.1 50.7-34.5 31.9-14 13.4-24.6c-3.2-1.8-6.7-2.7-10.4-2.7-17.8 0-41.5 18.7-67.5 35.6-31.5 20.5-65.3 31.3-65.3 31.3l169.5-1.6 46.5-23.4s3.6-9.5-19.1-15.5z"></path>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Withdraw</h1>
            <p className="text-gray-500">Take your funds</p>
          </div>
        </ProfileRouterLink>
        <ProfileRouterLink to="/profile/biddings">
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zm386 32h286c17.7 0 32-14.3 32-32V550H546v376zm334-616H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32zm-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70zm138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z"></path>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Biddings</h1>
            <p className="text-gray-500">Your bids are here</p>
          </div>
        </ProfileRouterLink>
        <ProfileRouterLink to="/profile/listings">
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z"></path>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Listings</h1>
            <p className="text-gray-500">Your listings are here</p>
          </div>
        </ProfileRouterLink>
        {auth.isAdmin === "true" && <AdminButton />}
      </div>

      <div>
        <ProfileRouterLink to="/profile/settings">
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <div className="text-xs">
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-gray-500">Manage user details</p>
          </div>
        </ProfileRouterLink>
        <ProfileButton onClick={logoutHandler}>
          <svg
            className="mr-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="2.4em"
            width="2.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <h1 className="text-lg font-semibold">Logout</h1>
        </ProfileButton>
      </div>
    </div>
  )
}

export default ProfileActions
