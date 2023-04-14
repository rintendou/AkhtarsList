import useAuth from "../../../lib/hooks/useAuth"
import { useListingDetailContextQuery } from "./ListingDetailContext"

const Bidders = () => {
  const { data, isLister } = useListingDetailContextQuery()
  const { auth } = useAuth()
  const { data: listing } = data
  const { bidders } = listing

  const CrownSVG = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      height="2em"
      width="2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M899.6 276.5L705 396.4 518.4 147.5a8.06 8.06 0 0 0-12.9 0L319 396.4 124.3 276.5c-5.7-3.5-13.1 1.2-12.2 7.9L188.5 865c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6c.8-6.7-6.5-11.4-12.3-7.9zm-126 534.1H250.3l-53.8-409.4 139.8 86.1L512 252.9l175.7 234.4 139.8-86.1-53.9 409.4zM512 509c-62.1 0-112.6 50.5-112.6 112.6S449.9 734.2 512 734.2s112.6-50.5 112.6-112.6S574.1 509 512 509zm0 160.9c-26.6 0-48.2-21.6-48.2-48.3 0-26.6 21.6-48.3 48.2-48.3s48.2 21.6 48.2 48.3c0 26.6-21.6 48.3-48.2 48.3z"></path>
    </svg>
  )

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold">Bidders</h1>
      <div className="space-y-5 w-full overflow-y-auto h-96 border-2 p-4 border-secondary rounded-md">
        <div className="flex items-center space-x-4">
          <h1>Number of Bidders: </h1>
          <p className="text-lg font-semibold">{bidders.length}</p>
        </div>

        <ul>
          {bidders.length !== 0 && (
            <div className="flex items-center gap-3"></div>
          )}
          {bidders.length !== 0 ? (
            bidders.map((bidder: string, index: number) => (
              <li
                key={index}
                className={`${
                  index === 0 ? "text-black font-bold" : "text-gray-500"
                } flex items-center gap-3`}
              >
                {index + 1}.) {bidder} {auth.username === bidder && "(You)"}
                {index === 0 && CrownSVG}
              </li>
            ))
          ) : (
            <div className="text-center">
              <h1 className="font-semibold text-lg">No bidders yet!</h1>
              {isLister ? (
                <p className="text-sm">Waiting for other users to bid!</p>
              ) : (
                <p className="text-sm">Be the first one to bid!</p>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Bidders
