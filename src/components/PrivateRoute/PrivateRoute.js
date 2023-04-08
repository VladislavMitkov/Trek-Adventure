import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function PrivateRoute() {
	const { user } = UserAuth();

	if (user) {
		return <Outlet />;
	} else {
		return <Navigate to='/signIn' />;
	}
}

export default PrivateRoute;
