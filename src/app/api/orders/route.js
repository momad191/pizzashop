import { NextResponse } from "next/server";
import { Order } from "@/model/order";
import { createOrder } from "@/queries/orders";
import { dbConnect } from "@/lib/mongo";

// export async function GET() {
//   return new Response("Hello, Next.js!");
// }

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
    const orders = await Order.find({}).skip(skip).limit(limit);

    // Get the total count of orders
    const totalOrders = await Order.countDocuments({});

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

export const POST = async (request) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    street_name,
    street_no,
    block,
    floor,
    apt_no,
    mentions,
    total,
    status,
    delivery_rep_name,
    cart,
  } = await request.json();
  console.log(
    first_name,
    last_name,
    email,
    phone,
    street_name,
    street_no,
    block,
    floor,
    apt_no,
    mentions,
    total,
    status,
    delivery_rep_name,
    cart
  );
  // Create a DB Conenction
  await dbConnect();

  // Form a DB payload
  const newOrder = {
    first_name,
    last_name,
    email,
    phone,
    street_name,
    street_no,
    block,
    floor,
    apt_no,
    mentions,
    total,
    status,
    delivery_rep_name,
    cart,
  };
  // add to DB
  try {
    await createOrder(newOrder);
  } catch (err) {
    return new NextResponse(err.mesage, {
      status: 500,
    });
  }
  return new NextResponse(
    JSON.stringify({
      status: "success",
      message: "orders retrieved successfully",
    }),
    {
      status: 201,
    }
  );
};

//////////////////////////////////////////////////////////////////////////////////////////

export const PATCH = async (request) => {
  try {
    // Parse the request body and URL for the order ID and updated data
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id"); // Order ID from query parameters
    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    const updatedData = await request.json(); // Updated fields sent in the request body

    // Connect to the database
    await dbConnect();

    // Update the order in the database
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedOrder) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Return the updated order as JSON
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Order updated successfully",
        order: updatedOrder,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error updating order: " + error.message, {
      status: 500,
    });
  }
};
