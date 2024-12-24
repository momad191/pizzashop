import { NextResponse } from "next/server";
import { Order } from "@/model/order";
import { dbConnect } from "@/lib/mongo";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get query parameters for pagination (page and limit)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1; // default to page 1
    const limit = parseInt(searchParams.get("limit")) || 10; // default to 10 tasks per page
    const skip = (page - 1) * limit;

    // Fetch orders with pagination from the database
    const orders = await Order.find({ status: "Processing" })
      .skip(skip)
      .limit(limit);

    // Get the total count of orders
    const totalOrders = await Order.countDocuments({ status: "Processing" });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalOrders / limit);

    // Return the orders and pagination info as JSON
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Orders retrieved successfully",
        page,
        totalPages,
        totalOrders,
        orders,
      })
    );
  } catch (error) {
    return new NextResponse("Error in fetching: " + error.message, {
      status: 500,
    });
  }
}
