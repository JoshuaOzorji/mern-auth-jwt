import { RequestHandler } from "express";
import { Types } from "mongoose";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";

interface TokenPayload {
	userId: Types.ObjectId;
	sessionId: Types.ObjectId;
}

const authenticate: RequestHandler = (req, res, next) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	appAssert(
		accessToken,
		UNAUTHORIZED,
		"Not authorized",
		AppErrorCode.InvalidAccessToken,
	);

	const { error, payload } = verifyToken(accessToken);
	appAssert(
		payload,
		UNAUTHORIZED,
		error === "jwt expired" ? "Token expired" : "Invalid token",
		AppErrorCode.InvalidAccessToken,
	);

	// Type assertion since we know the payload structure
	const typedPayload = payload as TokenPayload;

	req.userId = typedPayload.userId;
	req.sessionId = typedPayload.sessionId;
	next();
};

export default authenticate;
