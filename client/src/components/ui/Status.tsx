// Types
type Props = {
  status: string
}

const Status = ({ status }: Props) => {
  let statusMessage

  if (status === "disputed") {
    statusMessage = "Disputed"
  } else if (status === "sold") {
    statusMessage = "Sold"
  } else if (status === "expired") {
    statusMessage = "Expired"
  }

  return (
    <div className="flex flex-row items-center gap-2 text-primary border-2 border-tertiary bg-tertiary rounded-lg px-4 py-2 ">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#000"
          strokeWidth="2"
          d="M2,3.99079514 C2,2.89130934 2.89821238,2 3.99079514,2 L20.0092049,2 C21.1086907,2 22,2.89821238 22,3.99079514 L22,20.0092049 C22,21.1086907 21.1017876,22 20.0092049,22 L3.99079514,22 C2.89130934,22 2,21.1017876 2,20.0092049 L2,3.99079514 Z M12,10 L12,18 M12,6 L12,8"
        ></path>
      </svg>
      <h1>Status: {statusMessage}</h1>
    </div>
  )
}

export default Status
