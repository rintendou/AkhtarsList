import { Routes, Route } from "react-router-dom";

// Routes
import Application from "./components/routes/application/Application";
import PageNotFound from "./components/routes/page-not-found/PageNotFound";
import Login from "./components/routes/login/Login";
import Register from "./components/routes/register/Register";
import Profile from "./components/routes/protected/profile/Profile";
import ForgotPassword from "./components/routes/forgot-password/ForgotPassword";
import Deposit from "./components/routes/protected/deposit/Deposit";
import Withdraw from "./components/routes/protected/withdraw/Withdraw";
import ChangePassword from "./components/routes/forgot-password/ResetPassword";
import Category from "./components/routes/categories/Category";
import Sell from "./components/routes/protected/sell/Sell";
import Preview from "./components/routes/protected/preview/Preview";
import ListingDetail from "./components/routes/dev-route/test-nonpolled/ListingDetail";
import ListingNotFound from "./components/routes/page-not-found/ListingNotFound";
import Edit from "./components/routes/protected/edit/Edit";
import Unauthorized from "./components/routes/unauthorized/Unauthorized";
import Settings from "./components/routes/protected/settings/Settings";
import Biddings from "./components/routes/protected/biddings/Biddings";
import Listings from "./components/routes/protected/listings/Listings";
import ListingDetailQuery from "./components/routes/listing-detail/ListingDetail";
import AdminDashboard from "./components/routes/protected/admin/AdminDashboard";
import SearchResults from "./components/routes/search-results/SearchResults";

// Components
import Body from "./components/layout/body/Body";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";

// Navguards
import RequireAuth from "./components/routes/protected/navigation-guards/RequireAuth";
import RequireAdmin from "./components/routes/protected/navigation-guards/RequireAdmin";

// Layouts
import ProfileLayout from "./components/routes/protected/layout-containers/ProfileLayout";

// Providers
import ListingDetailContextQueryProvider from "./lib/store/ListingDetailContext";

// DEV
import DevUnpolledListingDetailContextProvider from "./components/routes/dev-route/test-nonpolled/ListingDetailContext";
import DevListingDetailContextProvider from "./components/routes/dev-route/test-global-ctx/DevListingDetailContext";
import DevListingDetailGlobal from "./components/routes/dev-route/test-global-ctx/DevListingDetailGlobal";
import DevListingDetail from "./components/routes/dev-route/test-custom-hook/DevListingDetail";
import Dev from "./components/routes/dev-route/ui/Dev";
import AdminLayout from "./components/routes/protected/layout-containers/AdminLayout";
import Transactions from "./components/routes/protected/admin/transactions/Transactions";
import DisputesToManage from "./components/routes/protected/admin/disputes-to-manage/DisputesToManage";
import AnalyticsDashboard from "./components/routes/protected/admin/analytics/AnalyticsDashboard";
import ReportedListings from "./components/routes/protected/admin/reported-listings/ReportedListings";

function App() {
	return (
		<div className="bg-blue-50 text-black tracking-tight overflow-x-hidden dark:bg-black dark:text-primary duration-700 ease-in-out">
			<Header />
			<Body>
				<Routes>
					{/*  Unprotected Routes */}
					<Route path="/" element={<Application />} />
					<Route path="/search-results" element={<SearchResults />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ChangePassword />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route
						path="/listings/:listingId"
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
							<DevUnpolledListingDetailContextProvider>
								<ListingDetail />
							</DevUnpolledListingDetailContextProvider>
						}
					/>

					{/* Protected Routes */}
					<Route element={<RequireAuth />}>
						<Route path="/sell" element={<Sell />} />
						<Route path="/preview" element={<Preview />} />
						<Route path="/edit" element={<Edit />} />

						<Route element={<ProfileLayout />}>
							<Route path="/profile" element={<Profile />} />
							<Route path="/profile/deposit" element={<Deposit />} />
							<Route path="/profile/withdraw" element={<Withdraw />} />
							<Route path="/profile/biddings" element={<Biddings />} />
							<Route path="/profile/listings" element={<Listings />} />
							<Route path="/profile/settings" element={<Settings />} />
						</Route>
					</Route>

					{/* Admin Routes */}
					<Route element={<RequireAdmin />}>
						<Route element={<AdminLayout />}>
							<Route path="/admin" element={<AdminDashboard />} />
							<Route path="/admin/transactions" element={<Transactions />} />
							<Route path="/admin/analytics" element={<AnalyticsDashboard />} />
							<Route path="/admin/disputes" element={<DisputesToManage />} />
							<Route path="/admin/reported" element={<ReportedListings />} />
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
	);
}

export default App;
