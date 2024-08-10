import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink , Link } from 'react-router-dom';
import axios from 'axios';

function SideBar() {
  const mode = useSelector(state => state.theme.mode)
  const isLogged = useSelector(state => state.auth.authStatus)
  const authData = useSelector(state => state.auth.authData)
  const [subsData, setSubsData] = useState([])
  useEffect(() => {

    if (isLogged) {
      ; (async () => {
        try {
          const req = await axios.get(`/api/v1/sub/all/${authData.username}`)
          req.data.data.map((e) => {
              setSubsData(prev => [...prev, {fullname: e.subscribedToName.fullname, avatar: e.subscribedToName.avatar , username: e.subscribedToName.username}])
          })

        }
        catch (error) {
          // no subscriptions found
        }

      })
        ()
    }

  }, [])

  return (
    <div className="fixed top-20 left-0 h-screen w-80 tracking-tighter hidden bg-theme sm:block">
      <div className="px-6 w-full mx-auto flex flex-col gap-1.5 py-4">
        <SideItems Logo={(props) => customSVG({ color: mode === 'dark' ? 'white' : 'black', ...props })} text="Home" slug="/" />
        <SideItems
          Logo={(props) => customSVG({ color: mode === 'dark' ? 'white' : 'black', ...props, path: "M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" })}
          text="Subscriptions" slug={!isLogged ? "/login" : `c/${authData.username}/subscribedto`}
        />
        <SideItems
          Logo={(props) => customSVG({ color: mode === 'dark' ? 'white' : 'black', ...props, path: "M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z" })}
          text="History" slug={!isLogged ? "/login" : `c/${authData.username}/history`}
        />
        {
          isLogged ?
            (
              <>


                <SideItems
                  Logo={(props) => customSVG({ viewBox: "0 0 407.484 407.484", color: mode === 'dark' ? 'white' : 'black', ...props, path: "M378.939,16.564H28.544C12.805,16.564,0,29.369,0,45.108v219.985c0,15.739,12.805,28.544,28.544,28.544h131.46l-7.197,33.431h-24.994c-3.723,0-7.278,1.546-9.818,4.268l-34.512,37c-3.646,3.909-4.627,9.608-2.495,14.51c2.131,4.902,6.967,8.073,12.313,8.073h220.885c0.006-0.001,0.015-0.001,0.02,0c7.415,0,13.427-6.011,13.427-13.426c0-3.766-1.55-7.168-4.047-9.606l-34.094-36.551c-2.54-2.723-6.096-4.268-9.818-4.268h-24.994l-7.197-33.431h131.459c15.74,0,28.545-12.805,28.545-28.544V45.108C407.484,29.369,394.68,16.564,378.939,16.564z M371.242,259.737h-335V50.465h335V259.737z" })}
                  text="My Channel" slug={`c/${authData.username}/videos`}
                />

                <SideItems
                  Logo={(props) => customSVG({ color: mode === 'dark' ? 'white' : 'black', ...props, path: "M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z" })}
                  text="Logout" slug="/logout"
                />


                <div className="mt-5 mb-2 mx-4">
                  <span className="font-bold text-lg text-theme">Subscriptions</span>
                </div>
                {

                  subsData && subsData.map((e, ind) => (
                    <SubscriptionCard key = {ind} channelLogo={e.avatar} channelName={e.fullname} username = {e.username} />
                  ))
                  
                }
              </>
            )
            :
            (
              <SideItems
                Logo={(props) => customSVG({ ...props, color: mode === 'dark' ? '#0F0F0F' : 'white', stroke: mode === 'dark' ? 'white' : 'black', path: "M17 10H20M23 10H20M20 10V7M20 10V13 M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20 M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" })}
                text="Register" slug="/register"
              />
            )
        }


      </div>
    </div>
  );
}

function customSVG({ color = "currentColor", enableBackground = "new 0 0 24 24", viewBox = "0 0 24 24", path = "m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z", stroke = "none" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground={enableBackground}
      height="28"
      viewBox={viewBox}
      width="28"
      focusable="false"
      fill={color}
      aria-hidden="true"
      stroke={stroke}
    >
      <path d={path} />
    </svg>
  );
}

function SideItems({ Logo, text, slug }) {
  return (

    <NavLink
      to={slug}
      className={({ isActive }) => `cursor-pointer text-white flex justify-start gap-5 items-center rounded-xl py-4 px-4 h-14 hover:bg-black hover:bg-opacity-10 ${isActive && slug !== '/login' ? "bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10" : "bg-black bg-opacity-0 dark:bg-gray-100 dark:bg-opacity-0"}`}>
      <Logo />
      <span className="font-semibold text-md text-theme">{text}</span>
    </ NavLink>
  )
}

function SubscriptionCard({ channelLogo, channelName , username}) {
  return (
    <Link to = {`c/${username}/videos`} className="text-white flex justify-start gap-4 items-center border-black rounded-md py-4 px-4 h-10">
      <div className="rounded-full size-9 bg-white flex justify-center items-center overflow-hidden">
        <img className="w-full h-full object-contain" src={channelLogo} />
      </div>
      <span className="font-semibold text-md text-theme">{channelName}</span>
    </Link>
  );
}

export default SideBar;