import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/Schemas/signUpSchema";

const UserNameQuerySchema = z.object({
  username: usernameValidation,
});
export async function GET(request: Request) {
  await dbConnect();
  //   localhost:3000/api/cuu?username=Azlan?phone=android is tareeqy se URL ho saktay hai.
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    const result = UserNameQuerySchema.safeParse(queryParams);
    console.log(result);
    if (!result.success) {
      // .format me to saaray k saaray errors ajaynegay but mujhy sirf or sirf username ka error chahiye to menay format k baad .username laga kar lelia..
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(", ")
            : "Invalid query parameter",
      });
    }
    const { username } = result.data;
    const verifiedExistingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (verifiedExistingUser) {
      return Response.json(
        {
          success: false,
          message: "username is already taken", 
        },
        { status: 400 }
      );
    }
    return Response.json(
      { 
        success: true ,
        message: "username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
