import AdminRouterLink from "./AdminRouterLink"

const AdminActions = () => {
  return (
    <div>
      <AdminRouterLink to="/admin/analytics" twClasses="text-secondary">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3"
          height="2.4em"
          width="2.4em"
        >
          <path d="M27.028 25.367c0 1.071-0.876 1.947-1.947 1.947h-18.163c-1.071 0-1.947-0.876-1.947-1.947v-18.163c0-1.071 0.876-1.947 1.947-1.947h18.163c1.071 0 1.947 0.876 1.947 1.947v18.163zM27.028 12.187l-1.992-1.342c0.040-0.172 0.064-0.351 0.064-0.536 0-1.294-1.049-2.344-2.344-2.344s-2.344 1.049-2.344 2.344c0 0.509 0.164 0.979 0.44 1.364l-4.307 6.586c-0.175-0.042-0.358-0.067-0.546-0.067-0.577 0-1.104 0.209-1.513 0.555l-2.883-1.659c0.015-0.106 0.025-0.213 0.025-0.323 0-1.294-1.049-2.344-2.344-2.344s-2.344 1.049-2.344 2.344c0 0.321 0.065 0.627 0.182 0.906l-2.153 1.997v2.125l3.198-2.967c0.332 0.18 0.712 0.282 1.116 0.282 0.62 0 1.182-0.242 1.601-0.636l2.813 1.619c-0.028 0.144-0.043 0.292-0.043 0.444 0 1.294 1.049 2.343 2.344 2.343s2.344-1.049 2.344-2.343c0-0.539-0.184-1.034-0.49-1.43l4.277-6.54c0.2 0.055 0.409 0.087 0.626 0.087 0.543 0 1.041-0.186 1.439-0.496l2.833 1.909v-1.878z"></path>
        </svg>
        <div className="text-xs">
          <h1 className="text-lg font-semibold">Analytics</h1>
          <p>Track Marketing Results </p>
        </div>
      </AdminRouterLink>
      <AdminRouterLink to="/admin/transactions" twClasses="text-secondary">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="mr-4"
          height="2.2em"
          width="2.2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#000"
            strokeWidth="2"
            d="M2,7 L20,7 M16,2 L21,7 L16,12 M22,17 L4,17 M8,12 L3,17 L8,22"
          ></path>
        </svg>
        <div className="text-xs">
          <h1 className="text-lg font-semibold">Transactions</h1>
          <p>See Successfully Sold Listings</p>
        </div>
      </AdminRouterLink>
      <AdminRouterLink to="/admin/disputes" twClasses="text-secondary">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="mr-4"
          height="2.2em"
          width="2.2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#000"
            strokeWidth="2"
            d="M16,12 C18.3736719,13.1826446 20,15.6506255 20,19 L20,23 L4,23 L4,19 C4,15.6457258 5.6310898,13.1754259 8,12 M12,13 C15.3137085,13 18,10.3137085 18,7 C18,3.6862915 15.3137085,1 12,1 C8.6862915,1 6,3.6862915 6,7 C6,10.3137085 8.6862915,13 12,13 Z M18,7 C16.5,7 15,7.3599999 13,5 C11,7.3599999 8.5,8 6,7 M7,13 L12.0249378,18.2571942 L17,13 M12,18 L12,23"
          ></path>
        </svg>
        <div className="text-xs">
          <h1 className="text-lg font-semibold">Disputes</h1>
          <p>Oversee Lister and Bidder Dispute</p>
        </div>
      </AdminRouterLink>
    </div>
  )
}

export default AdminActions
