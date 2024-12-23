import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get query parameters for pagination (page and limit)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1; // default to page 1
    const limit = parseInt(searchParams.get("limit")) || 10; // default to 10 users per page
    const skip = (page - 1) * limit;

    // Fetch users with pagination from the database
    const users = await User.find({})

      .skip(skip)
      .limit(limit);

    // Get the total count of users
    const totalUsers = await User.countDocuments({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Return the users and pagination info as JSON
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "users retrieved successfully",
        page,
        totalPages,
        totalUsers,
        users,
      })
    );
  } catch (error) {
    return new NextResponse("Error in fetching users: " + error.message, {
      status: 500,
    });
  }
}
