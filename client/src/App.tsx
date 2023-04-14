import { Routes, Route } from "react-router-dom"

// Routes
import Application from "./components/routes/application/Application"

import PageNotFound from "./components/routes/page-not-found/PageNotFound"
import Login from "./components/routes/login/Login"
import Register from "./components/routes/register/Register"
import Profile from "./components/routes/protected/profile/Profile"
import ForgotPassword from "./components/routes/forgot-password/ForgotPassword"
import Deposit from "./components/routes/protected/deposit/Deposit"
import Withdraw from "./components/routes/protected/withdraw/Withdraw"
import ChangePassword from "./components/routes/forgot-password/ResetPassword"
import Category from "./components/routes/categories/Category"
import Sell from "./components/routes/protected/sell/Sell"
import Preview from "./components/routes/protected/preview/Preview"
import ListingDetail from "./components/routes/dev-route/test-nonpolled/ListingDetail"
import ListingNotFound from "./components/routes/page-not-found/ListingNotFound"
import Edit from "./components/routes/protected/edit/Edit"

// Components
import Body from "./components/layout/body/Body"
import Footer from "./components/layout/footer/Footer"
import Header from "./components/layout/header/Header"

// Navguard
import RequireAuth from "./components/routes/protected/RequireAuth"

// Layouts
import ProfileLayout from "./components/routes/protected/ProfileLayout"
import DevListingDetail from "./components/routes/dev-route/test-custom-hook/DevListingDetail"
import WonListings from "./components/routes/protected/won-listings/WonListings"
import DisputedListings from "./components/routes/protected/disputed-listings/DisputedListings"
import Unauthorized from "./components/routes/unauthorized/Unauthorized"
import ManageListings from "./components/routes/protected/admin/ManageListings"
import ManageDisputes from "./components/routes/protected/admin/ManageDisputes"
import RequireAdmin from "./components/routes/protected/admin/RequireAdmin"
import Settings from "./components/routes/protected/settings/Settings"

// Providers
import ListingDetailContextProvider from "./components/routes/dev-route/test-nonpolled/ListingDetailContext"

// DEV
import DevListingDetailContextProvider from "./components/routes/dev-route/test-global-ctx/DevListingDetailContext"
import DevListingDetailGlobal from "./components/routes/dev-route/test-global-ctx/DevListingDetailGlobal"
import SearchResults from "./components/routes/search-results/SearchResults"
import ListingDetailContextQueryProvider from "./lib/store/ListingDetailContext"
import ListingDetailQuery from "./components/routes/listing-detail/ListingDetailQuery"
import Dev from "./components/routes/dev-route/ui/Dev"

function App() {
  return (
    <div className="bg-primary text-black tracking-tight overflow-x-hidden">
      <Header />
      <Body>
        <Routes>
          {/*  Unprotected Routes */}
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Application />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route
            path="/listings-query/:listingId"
            element={
              <ListingDetailContextQueryProvider>
                <ListingDetailQuery />
              </ListingDetailContextQueryProvider>
            }
          />

          {/*  Dev Routes */}
          <Route path="/dev" element={<Dev />} />
          <Route path="/dev-listing-detail" element={<DevListingDetail />} />
          <Route
            path="/dev-listing-detail-global"
            element={
              <DevListingDetailContextProvider>
                <DevListingDetailGlobal />
              </DevListingDetailContextProvider>
            }
          />
          <Route
            path="/listings-nonpolled/:listingId"
            element={
              <ListingDetailContextProvider>
                <ListingDetail />
              </ListingDetailContextProvider>
            }
          />

          {/* Authorized Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/sell" element={<Sell />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/edit" element={<Edit />} />

            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/won-listings" element={<WonListings />} />
              <Route path="/disputed-listings" element={<DisputedListings />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAdmin />}>
              <Route element={<ProfileLayout />}>
                <Route
                  path="/admin/manage-listings"
                  element={<ManageListings />}
                />
                <Route
                  path="/admin/manage-disputes"
                  element={<ManageDisputes />}
                />
              </Route>
            </Route>
          </Route>

          {/* Catch-All Routes */}
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/listings/listing-not-found"
            element={<ListingNotFound />}
          />
          <Route path="/unauthorized-access" element={<Unauthorized />} />
        </Routes>
      </Body>
      <Footer />
    </div>
  )
}

export default App
